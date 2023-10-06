// import des dépendances
import express from "express";
import cors from "cors";
import argon2 from 'argon2';
import userRepository from "./repositories/userRepository.js";
import studentRepository from "./repositories/studentRepository.js";
import classroomRepository from "./repositories/classroomRepository.js";
import artService from "./services/artService.js";
import multer from "multer";

(await import('dotenv')).config();

// création d'une application
const app = express();
const uploader = multer({ dest: artService.uploadDirectory });

// création d'un routeur
const router = express.Router();

// associer l'application au routeur
app.use(router);

// ajouter la méthode JSON à toutes les routes, pour récupérer le body des requêtes
router.use(express.json());

router.use(
  cors({ origin: process.env.SERVER_CORS?.split(',') })
);

router.get('/users/list', async (req, res) =>
  userRepository.list()
    .then(students => res.json(students))
    .catch(error => res.status(400).json({ error }))
);

router.post('/users/register', async (req, res) =>
  argon2.hash(req.body.password)
    .then(hash => userRepository.create(req.body.email, hash))
    .then(_ => res.status(400).json({ message: "User created" }))
    .catch(error => res.status(400).json({ error }))
);

router.get("/classrooms/list", async (req, res) => {
  classroomRepository.list()
    .then(classrooms => res.json(classrooms))
    .catch(error => res.status(400).json({ error }))
});

// récupérer un étudiant par son identifiant : /students/:id
router.get("art/:id", (req, res) =>
  studentRepository.get(req.params.id)
    .then(students => res.json(students.shift()))
    .catch(error => res.status(400).json({ error }))
);

// créer un étudiant
// ajouter le middleware de multer : uploader.any
router.post("art/create", uploader.any(), (req, res) =>
  artService.createStudent(req.body, req.files.length[0])
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).json({ error }))
);

// modifier un étudiant
// ajouter le middleware de multer : uploader.any
router.put("art/update", uploader.any(), (req, res) =>
  artService.updateStudent(req.body, req.files.length[0])
    .then(_ => res.status(200).json())
    .catch(error => res.status(400).json({ error }))
);

// supprimer un étudiant
router.delete("art/delete", (req, res) =>
  artService.delete(req.body.id)
    .then(_ => res.status(200).json())
    .catch(error => res.status(400).json({ error }))
);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT}`)
);
