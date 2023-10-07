import executeQuery from '../executeQuery.js';

const classroomRepository = {
  list: () =>
    executeQuery(`
      SELECT classroom.*
      FROM formation.classroom;
    `),
}

export default classroomRepository;