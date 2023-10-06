import fs from "node:fs/promises";
import studentRepository from "../repositories/studentRepository.js";

const uploadDirectory = "public/img/";
const extensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};


async function replaceFile (oldFileName, newFileName, mimetype, destination) {
	const extension = extensions[mimetype];
	const portrait = `${newFileName}.${extension}`;

	// renommer le fichier transféré avec son nom final
	await fs.rename(`${destination}${newFileName}`,`${destination}${portrait}`);

	// supprimer l'ancienne image
	await fs.rm(`${uploadDirectory}${oldFileName}`);

	return portrait;
}


const artService = {
  uploadDirectory,
  updateStudent: async (studentParams, file) => {
    // récupérer les informations dans la base de données pour connaître l'image existante
    const student = await studentRepository.get(studentParams.id);
    const portrait = !file
      ? student.shift().portrait
      : await replaceFile(student.shift().portrait, file.filename, file.mimetype, file.destination);
  
    return await studentRepository.update(
      studentParams.id,
      studentParams.firstname,
      studentParams.lastname,
      studentParams.age,
      studentParams.birthday,
      studentParams.isExternal,
      portrait,
      studentParams.classroom_id);
  },

  delete: async (id) => {
    const [student] = await studentRepository.get(id);
    await studentRepository.delete(id);
  
    // supprimer l'image
    await fs.rm(`${uploadDirectory}${student.portrait}`);
  },

  createStudent: async (studentParams, file) => {// nom final du fichier transféré : ajout de l'extension
    const fileName = file.filename;
    const destination = file.destination;
    const portrait = `${fileName}.${getExtensionFromMimeType(file.mimetype)}`;
    const student = await studentRepository.create(
      studentParams.firstname,
      studentParams.lastname,
      studentParams.age,
      studentParams.birthday,
      studentParams.isExternal,
      portrait,
      studentParams.classroom_id);
    
    await fs.rename(`${destination}${fileName}`, `${destination}${portrait}`);
    return student.shift();
  }
}

export default artService;