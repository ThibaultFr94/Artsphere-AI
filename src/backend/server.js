// import des dépendances
import express from "express";
import http from "node:http";
// import studentRouter from "./routes/studentRouter.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
// import userRouter from "./routes/userRouter.js";

// création d'une application
const app = express();

// création d'un routeur
const router = express.Router();

// associer l'application au routeur
app.use(router);

// ajouter la méthode JSON à toutes les routes, pour récupérer le body des requêtes
router.use(express.json());

// autoriser les serveurs à dialoguer avec l'API
// router.use(cors());

router.use(
	cors({
		origin: ["http://localhost:5500", 'http://127.0.0.1:5500']
	}),
);

// appel des routeurs avec un préfixe de routes (éviter de répéter le préfixe dans le routeur)
router.use("/", userRouter);
// router.use("/users", userRouter);

/*
	création d'une route
		liée à une méthode, ou un verbe, HTTP
		liée à une réponse
	req: paramètre représente la requête HTTP
	res: paramètre représente la réponse HTTP
*/
router.get("/", (req, res) => res.send("coucou"));
router.get("/a", (req, res) => res.send(req));

// création du serveur http
const server = http.createServer(app);

// exporter le serveur pour l'importer dans index.js
export default server;
