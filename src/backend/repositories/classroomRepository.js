import executeQuery from "./dbConnection.js";

const classroomRepository = {
    list: () => {
        const query = `
            SELECT classroom.*
            FROM formation.classroom;
        `;
        return executeQuery(query);
    },
}

export default classroomRepository;