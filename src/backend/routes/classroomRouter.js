import express from "express";
import dbConnection from "../services/dbConnection.js";

const classroomRouter = express.Router();

// exécuter une requête sur le serveur mysql
/*
	le nom d'une table SQL devient une route
		- par ex. avec une table student
			GET : /students > renvoyer tous les étudiants
			POST : /students > créer un étudiant
			PUT : /students/IDENTIFIANT > modifier un étudiant
			DELETE : /students/IDENTIFIANT > supprimer un étudiant
*/
classroomRouter.get("/", async (req, res) => {
	// requête SQl à exécuter
	const query = `
		SELECT classroom.*
		FROM formation.classroom;
	`;

	// exécuter la requête
	try {
		// récupérer les résultats de la requête
		const [results] = await dbConnection.execute(query);
		// console.log(results);

		// renvoyer la réponse HTTP
		return res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	} catch (error) {
		// renvoyer une erreur
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}

	// return res.send("endpoint students");
});

export default classroomRouter;
