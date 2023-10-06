
import executeQuery from "./dbConnection.js";

const userRepository = {
    /** List all users */
	list: () => {
		const query = "SELECT * from artsphereai.user";
		return executeQuery(query);
	},

    /** Register a new user */
	create: (email, password) => {
		const query = `
			INSERT INTO artsphereai.user
			VALUE (NULL, :email, :password);
		`;
		return executeQuery(query, { email, password });
	}
};

export default userRepository;