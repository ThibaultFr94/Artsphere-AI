// import des dépendances
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import configuration from "./services/configuration.js";

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
	cors({ origin: configuration.server.cors }),
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


app.listen(configuration.server.port, () => 
    console.log(`Server listening on port ${configuration.server.port}`));
