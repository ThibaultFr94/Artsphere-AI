
const newStudentRepository = (executeQuery) => ({
  // récupérer un étudiant par son identifiant
  get: (id) =>
    executeQuery(`
      SELECT student.*
      FROM formation.student
      WHERE student.id = :id;
    `, { id }),

  create: (firstname, lastname, age, birthday, isExternal, portrait, classroom_id) =>
    executeQuery(`
      INSERT INTO formation.student
      VALUE (NULL, :firstname, :lastname, :age, :birthday, :isExternal, :portrait, :classroom_id);
    `, { firstname, lastname, age, birthday, isExternal, portrait, classroom_id }),

  delete: (id) =>
    executeQuery(`
      DELETE FROM formation.student
      WHERE student.id = :id;
    `, { id }),

  update: (id, firstname, lastname, age, birthday, isExternal, portrait, classroom_id) =>
    executeQuery(`
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
    `, { id, firstname, lastname, age, birthday, isExternal, portrait, classroom_id })
})

export default newStudentRepository;