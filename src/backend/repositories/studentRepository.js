
import executeQuery from "./dbConnection.js";

const studentRepository = {
    // récupérer un étudiant par son identifiant
	get: (id) => {
		const query = `
            SELECT student.*
            FROM formation.student
            WHERE student.id = :id;
	    `;
		return executeQuery(query, { id });
	},

    create: (firstname, lastname, age, birthday, isExternal, portrait, classroom_id) => {
        const query = `
            INSERT INTO formation.student
            VALUE (NULL, :firstname, :lastname, :age, :birthday, :isExternal, :portrait, :classroom_id);
        `;
        return executeQuery(query, { firstname, lastname, age, birthday, isExternal, portrait, classroom_id });
    },

    delete: (id) => {
        const query = `
            DELETE FROM formation.student
            WHERE student.id = :id;
        `;
        return executeQuery(query, { id });
    },

    update: (id, firstname, lastname, age, birthday, isExternal, portrait, classroom_id) => {
        const query = `
            UPDATE formation.student
            SET
                student.firstname = :firstname,
                student.lastname = :lastname,
                student.age = :age,
                student.birthday = :birthday,
                student.isExternal = :isExternal,
                student.portrait = :portrait,
                student.classroom_id = :classroom_id
                WHERE student.id = :id;
        `;
        return executeQuery(query, { id, firstname, lastname, age, birthday, isExternal, portrait, classroom_id });
    }
}

export default studentRepository;