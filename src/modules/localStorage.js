import toDoController from './toDoController';

function addProject(project) {
  localStorage.setItem(project, JSON.stringify({}));
}

function addToDoItem(project, toDoItem) {
  const updatedProject = JSON.parse(localStorage.getItem(project));
  console.log(updatedProject);
  updatedProject[toDoItem.title] = toDoItem;
  console.log(JSON.stringify(updatedProject));
  localStorage.setItem(project, JSON.stringify(updatedProject));
  return updatedProject;
}

addProject('hello');
addProject('school');

const test = {
  test1: {
    title: 'Work',
    dateCreated: +new Date(),
    desc: 'List of work activities',
    dueDate: '06-10-2023',
    index: 0,
    priority: 0,
  },
};

const testSerialized = JSON.stringify(test);

localStorage.setItem('test', testSerialized);

const test2 = {
  title: 'Shopping',
  dateCreated: +new Date(),
  desc: 'Go get food',
  dueDate: '05-06-2023',
  index: 1,
  priority: 1,
};

addToDoItem('test', test2);
// addToDoItem(
//   'test',
//   toDoController.createNewToDoItem(
//     'Learn Programming',
//     'Get head around JSON',
//     '23/2/2024',
//     0,
//     0
//   )
// );
addToDoItem(
  'hello',
  toDoController.createNewToDoItem(
    'Learn Programming',
    'Get head around JSON',
    '23/2/2024',
    0,
    0
  )
);

addToDoItem(
  'hello',
  toDoController.createNewToDoItem('Learn', 'JSON', '23/2/2024', 0, 0)
);

addToDoItem('school', toDoController.createNewToDoItem('school'));
console.log(test2);
console.log(
  toDoController.createNewToDoItem(
    'Learn Programming',
    'Get head around JSON',
    '23/2/2024',
    0,
    0
  )
);
// addToDoItem(
//   'hello',
// toDoController.createNewToDoItem(
//   'Learn Programming',
//   'Get head around JSON',
//   '23/2/2024',
//   0,
//   0
// )
// );
console.log(localStorage);
console.log(JSON.parse(localStorage.getItem('hello')));
console.log(JSON.parse(localStorage.getItem('test')));

console.log(JSON.stringify(localStorage));

export { addToDoItem, addProject };
