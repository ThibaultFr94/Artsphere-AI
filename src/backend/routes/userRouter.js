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

export default userRouter;