// permet de se connecter à la base de données
import mysql from "mysql2/promise";
(await import("dotenv")).config();

async function executeQuery(query, params) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
  });

  return connection
    .execute(query, params)
    .then(([result]) => result)
    .finally(() => connection.end());
}

export default executeQuery;
