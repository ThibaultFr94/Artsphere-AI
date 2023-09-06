// import des dépendances
import express, { json } from "express";
import { log } from "node:console";
import http from "node:http";

// création d'une application
const app = express();

// création d'un routeur
const router = express.Router();

// associer l'application au routeur
app.use(router);

// ajouter la méthode json a toutes les routes pour recuperer le body des requetes

router.use(express.json());

/*
	création d'une route
		liée à une méthode, ou un verbe, HTTP
		liée à une réponse
	req: paramètre représente la requête HTTP
	res: paramètre représente la réponse HTTP
*/
router.get("/", (req, res) => res.send("coucou"));
router.get("/products/:id", (req, res) => {
  const { id } = req.params;

  return res.send(`product ${id}`);
});

router.get("/products", (req, res) => {
  return res.status(200).json({
    status: 200,
    messsage: "OK",
    data: [
      { id: 1, name: "product1", price: 10 },
      { id: 5, name: "product5", price: 50 },
    ],
  });
});

//creer une route avec la méthode post:

router.post("/products", (req, res) => {
  console.log(req.body);
  return res.send("POST products 123");
});

// création du serveur http
const server = http.createServer(app);

// exporter le serveur pour l'importer dans index.js
export default server;
