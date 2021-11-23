const students = [];

function getLastId() {
  if (students.length > 0) {
    return students[students.length - 1].id + 1;
  }

  return 1;
}

function findAll() {
  return students;
}

function create(data) {
  const id = getLastId();
  const newStudent = { id, ...data }
  students.push(newStudent);
  return newStudent;
}

function deleteById(id) {
  const foundIndex = students.findIndex((student) => {
    return Number(student.id) === Number(id);
  });

  students.splice(foundIndex, 1);

  return foundIndex !== -1
}

function findById(id) {
  return students.find((student) => {
    return Number(student.id) === Number(id);
  });
}

function updateById(id, data) {
  const studentIndex = students.findIndex(
    (student) => Number(student.id) === Number(id)
  );

  students[studentIndex] = { ...students[studentIndex], ...data };

  return students[studentIndex];
}

module.exports = {
  findAll,
  create,
  deleteById,
  findById,
  updateById,
};
