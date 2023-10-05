import mysql from "mysql2/promise";
import configuration from "./configuration.js";

const dbConnection = await mysql.createConnection({
	host: configuration.database.host,
	database: configuration.database.database,
	user: configuration.database.user,
	password: configuration.database.password,
	namedPlaceholders: true,
});

export default dbConnection;
