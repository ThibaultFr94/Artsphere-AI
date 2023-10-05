import dbConnection from "./dbConnection.js";

// récupérer un étudiant par son identifiant
const getUsers = async (id) => {
	// requête
	const query = `
		SELECT user.*
		FROM forma.student
		WHERE student.id = :id;
	`;

	try {
		const [results] = await dbConnection.execute(query, { id: id });
		return results.shift();
	} catch (error) {
		return error;
	}
};

export { getStudentsById };
