
const newClassroomRepository = (executeQuery) => ({
  list: () =>
    executeQuery(`
      SELECT classroom.*
      FROM formation.classroom;
    `),
})

export default newClassroomRepository;