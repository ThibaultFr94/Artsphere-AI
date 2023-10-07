

const newUserRepository = (executeQuery) => ({
  /** List all users */
	list: () =>
		executeQuery("SELECT id, email from artsphereai.user"),

  /** Register a new user */
	create: (email, password) =>
		executeQuery(`
			INSERT INTO artsphereai.user
			VALUE (NULL, :email, :password);
		`, { email, password }),

	getConnectionInfo: (email) =>
		executeQuery(`
			SELECT password
			FROM artsphereai.user
			WHERE email = :email;
		`, { email })
});

export default newUserRepository;