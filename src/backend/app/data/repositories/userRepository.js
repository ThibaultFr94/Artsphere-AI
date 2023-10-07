import executeQuery from '../executeQuery.js';

const userRepository = {
  /** List all users */
	list: () =>
		executeQuery("SELECT id, email from artsphereai.user"),

  /** Register a new user */
	create: (email, password) =>
		executeQuery(`
			INSERT INTO artsphereai.user
			(id, email, password)
			VALUES (NULL, :email, :password);
		`, { email, password }),

	getConnectionInfo: (email) =>
		executeQuery(`
			SELECT password, gpt_version
			FROM artsphereai.user
			WHERE email = :email;
		`, { email }).then(result => result[0])
};

export default userRepository;