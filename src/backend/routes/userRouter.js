// import des dépendances
import express from "express";
import argon2 from 'argon2';
import dbConnection from "../services/dbConnection.js";

// création d'un routeur
const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    // hacher le mot de passe contenu dans req.body
    const bodyHashed = {
        ...req.body,
        password: await argon2.hash(req.body.password),
    };

    // console.log(bodyHashed);

    // console.log(bodyHashed);
    const query = `
        INSERT INTO artsphereai.user
        VALUE (NULL, :email, :password);
    `;

    try {
        // récupérer le body de la requête avec la propriété body de la requête
        const [results] = await dbConnection.execute(query, bodyHashed);
        return res.status(201).json({
            status: 201,
            message: "User created",
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Error",
        });
    }
});

// connexion
userRouter.post("/login", async (req, res) => {
	// requête SQL
	const query = `
		SELECT user.*
		FROM artsphereai.user
		WHERE user.email = :email;
	`;

	// exécution de la requête
	let results;

	try {
		// récupération des resultats de la requête
		[results] = await dbConnection.execute(query, req.body);

		// console.log(results);

		// si l'email n'existe pas dans la table
		if (results.length === 0) {
			return res.status(403).json({
				status: 403,
				message: "Forbidden",
			});
		}
	} catch (error) {
		return res.status(400).json({
			status: 400,
			message: "Error",
		});
	}

	// récupérer l'utilisateur
	const user = results.shift();

	// vérifier la concordance entre le hash contenu dans le table avec le mot de passe saisi
	/*
		user.password : le hash est contenu dans la table, récupéré dans le select
		req.body.password : la saisie en clair du champ de formulaire nommé password
	*/

	if (!(await argon2.verify(user.password, req.body.password))) {
		return res.status(403).json({
			status: 403,
			message: "Forbidden",
		});
	}

	// si l'utilisateur existe, renvoyer l'utilisateur dans la réponse HTTP
	return res.status(200).json({
		status: 200,
		message: "OK",
		data: user,
	});
});


export default userRouter;