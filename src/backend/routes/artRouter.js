import express from "express";
import dbConnection from "../services/dbConnection.js";
import multer from "multer";
import { getExtensionFromMimeType } from "../services/fileService.js";
import fs from "node:fs/promises";
import { getStudentsById } from "../services/api.js";

const studentRouter = express.Router();

const uploadDirectory = "public/img/";
const uploader = multer({ dest: uploadDirectory });

// exécuter une requête sur le serveur mysql
/*
	le nom d'une table SQL devient une route
		- par ex. avec une table student
			GET : /students > renvoyer tous les étudiants
			POST : /students > créer un étudiant
			PUT : /students/IDENTIFIANT > modifier un étudiant
			DELETE : /students/IDENTIFIANT > supprimer un étudiant
*/
// studentRouter.get("/", async (req, res) => {
// 	// requête SQl à exécuter
// 	const query = `
// 		SELECT student.*
// 		FROM formation.student;
// 	`;

	// exécuter la requête
	// try {
	// 	// récupérer les résultats de la requête
	// 	const [results] = await dbConnection.execute(query);
	// 	// console.log(results);

	// 	// renvoyer la réponse HTTP
	// 	return res.status(200).json({
	// 		status: 200,
	// 		message: "OK",
	// 		data: results,
	// 	});
	// } catch (error) {
	// 	// renvoyer une erreur
	// 	return res.status(400).json({
	// 		status: 400,
	// 		message: "Error",
	// 	});
	// }

	// return res.send("endpoint students");
// });

// récupérer un étudiant par son identifiant : /students/:id
studentRouter.get("/:id", async (req, res) => {
	// récupérer la variable id de la route
	const { id } = req.params;
	// console.log(req.params);

	// requête
	const query = `
		SELECT student.*
		FROM formation.student
		WHERE student.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		// const [results] = await dbConnection.execute(query, { id: 1 });
		const [results] = await dbConnection.execute(query, req.params);
		return res.status(200).json({
			status: 200,
			message: "OK",
			// shift : récupérer le premier indice d'un array
			data: results.shift(),
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

// créer un étudiant
// ajouter le middleware de multer : uploader.any
studentRouter.post("/create", uploader.any(), async (req, res) => {
	// nom final du fichier transféré : ajout de l'extension
	const portrait = `${req.files[0].filename}.${getExtensionFromMimeType(
		req.files[0].mimetype,
	)}`;

	// requête
	const query = `
		INSERT INTO formation.student
		VALUE (NULL, :firstname, :lastname, :age, :birthday, :isExternal, :portrait, :classroom_id);
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		// ajout du nom final du fichier dans les variables de requête
		const [results] = await dbConnection.execute(query, {
			...req.body,
			portrait: portrait,
		});

		// renommer le fichier transféré avec son nom final
		await fs.rename(
			`${req.files[0].destination}${req.files[0].filename}`,
			`${req.files[0].destination}${portrait}`,
		);

		// donner un accès 777 au fichier transféré
		// await fs.chmod(`${req.files[0].destination}${portrait}`, 0o777);

		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}
});

// modifier un étudiant
// ajouter le middleware de multer : uploader.any
studentRouter.put("/update", uploader.any(), async (req, res) => {
	// console.log(req.body, req.files);
	// {
	// 	fieldname: 'portrait',
	// 	originalname: 'logo_h3_campus_online.svg',
	// 	encoding: '7bit',
	// 	mimetype: 'image/svg+xml',
	// 	destination: 'public/img/',
	// 	filename: '869d1fed42c5140b73266e806159908a',
	// 	path: 'public/img/869d1fed42c5140b73266e806159908a',
	// 	size: 3660
	//   }

	// récupérer les informations dans la base de données pour connaître l'image existante
	const { id } = req.body;
	const student = await getStudentsById(id);

	// récupérer le body de la requête
	let bodyWithImage = req.body;

	// si aucune image n'a été sélectionnée dans le formulaire, utiliser l'image existante en base de données
	if (req.files.length === 0) {
		bodyWithImage = { ...bodyWithImage, portrait: student.portrait };
	}
	// si une image a été sélectionnée dans le formulaire, transférer la nouvelle image et supprimer l'ancienne
	else {
		// nom final du fichier transféré : ajout de l'extension
		const portrait = `${req.files[0].filename}.${getExtensionFromMimeType(
			req.files[0].mimetype,
		)}`;

		// renommer le fichier transféré avec son nom final
		await fs.rename(
			`${req.files[0].destination}${req.files[0].filename}`,
			`${req.files[0].destination}${portrait}`,
		);

		// supprimer l'ancienne image
		await fs.rm(`${uploadDirectory}${student.portrait}`);

		// utiliser la nouvelle image dans le body de la requête
		bodyWithImage = { ...bodyWithImage, portrait: portrait };
	}

	// requête
	const query = `
		UPDATE formation.student
		SET
			student.firstname = :firstname,
			student.lastname = :lastname,
			student.age = :age,
			student.birthday = :birthday,
			student.isExternal = :isExternal,
			student.portrait = :portrait,
			student.classroom_id = :classroom_id
			WHERE student.id = :id;
		`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, bodyWithImage);
		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			// message: "Error",
			message: error,
		});
	}
});

// supprimer un étudiant
studentRouter.delete("/delete", async (req, res) => {
	// récupérer les informations dans la base de données pour connaître l'image à supprimer
	const { id } = req.body;
	const student = await getStudentsById(id);

	// requête
	const query = `
		DELETE FROM formation.student
		WHERE student.id = :id;
	`;

	/*
		la valeur de la variable id de la requête SQL est définie dans un objet JS dont les propriétés reprennent les noms des variables SQL
			variable SQL :id > { id: ... }
			variable SQL :name et :id > { name: ..., id: ... }
	*/

	try {
		const [results] = await dbConnection.execute(query, req.body);

		// supprimer l'image
		await fs.rm(`${uploadDirectory}${student.portrait}`);

		return res.status(200).json({
			status: 200,
			message: "OK",
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			// message: "Error",
			message: error,
		});
	}
});

export default studentRouter;
