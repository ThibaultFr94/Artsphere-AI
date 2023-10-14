// import des dépendances
import express from "express";
import cors from "cors";
import multer from "multer";

import userRepository from "./data/repositories/userRepository.js";
import artRepository from "./data/repositories/artRepository.js";
import studentRepository from "./data/repositories/studentRepository.js";
import classroomRepository from "./data/repositories/classroomRepository.js";
import aiService from "./services/aiService.js";
import userService from "./services/userService.js";

(await import('dotenv')).config();

///////////////////////// ROUTES CONFIGURATION /////////////////////////

// création d'une application
const app = express();
const uploader = multer({ dest: artService.uploadDirectory });

// création d'un routeur
const router = express.Router();

// associer l'application au routeur
app.use(router);

// ajouter la méthode JSON à toutes les routes, pour récupérer le body des requêtes
router.use(express.json());

// ajouter le middleware CORS à toutes les routes
router.use(
  cors({ origin: process.env.SERVER_CORS?.split(',') })
);





/////////////////////////// AI ROUTES ///////////////////////////

// générer du texte
router.get("/ai/generateText/:prompt", (req, res) =>
  aiService.generateText(req.params.prompt, userService.getCurrentUser(req))
    .then(text => res.json(text))
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
);

// générer une image
router.post("/ai/generateImage", (req, res) => {
  aiService.generateImage(req.body.typeId, req.body.title, req.body.prompt, userService.getCurrentUser(req))
    .then(text => res.json(text))
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
});


router.get("/ai/list", (req, res) => {
  artRepository.list()
    .then(text => res.json(text))
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
});


/////////////////////////// ART ROUTES ///////////////////////////

// récupérer un étudiant par son identifiant : /students/:id
router.get("/art/:id", (req, res) =>
  studentRepository.get(req.params.id)
    .then(students => res.json(students.shift()))
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
);

// créer un étudiant, ajouter le middleware de multer : uploader.any
router.post("/art/create", uploader.any(), (req, res) =>
  artService.createStudent(req.body, req.files.length[0])
    .then(result => res.json(result))
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
);

// modifier un étudiant, ajouter le middleware de multer : uploader.any
router.put("/art/update", uploader.any(), (req, res) =>
  artService.updateStudent(req.body, req.files.length[0])
    .then(_ => res.json())
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
);

// supprimer un étudiant
router.delete("/art/delete", (req, res) =>
  artService.delete(req.body.id)
    .then(_ => res.json())
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
);


/////////////////////////// USER ROUTES ///////////////////////////

// Récupérer l'utilisateur courant
app.get('/users/current', (req, res) =>
  res.json(userService.getCurrentUser(req))
);

router.post('/users/register', async (req, res) =>
  userService.register(req.body.email, req.body.password)
    .then(_ => res.json({ message: "User created" }))
    .catch(error => res.status(400)
      .json({ error: error.message || error }))
);

router.post('/users/login', (req, res) => {
  userService.login(req.body.email, req.body.password)
    .then(token => res.json({ token }))
    .catch(error => res.status(401)
      .json({ error: error.message || error }))
});


/////////////////////////// STARTUP ///////////////////////////

// lancer le serveur
app.listen(process.env.SERVER_PORT, () =>
  console.log(`ArtSphere API listening on port ${process.env.SERVER_PORT}`)
);
