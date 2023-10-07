
import mysql from "mysql2/promise";
import newUserRepository from "./repositories/userRepository.js";
import newStudentRepository from "./repositories/studentRepository.js";
import newClassroomRepository from "./repositories/classroomRepository.js";
(await import('dotenv')).config();

async function executeQuery(query, params) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        namedPlaceholders: true,
    });

    return connection.execute(query, params)
        .then(([result]) => result)
        .finally(() => connection.end())
}

const dataContext = {
    userRepository: newUserRepository(executeQuery),
    studentRepository: newStudentRepository(executeQuery),
    classroomRepository: newClassroomRepository(executeQuery),
}

export default dataContext;