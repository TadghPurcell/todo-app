import './sass/main.scss';
import userInterface from './modules/ui';

document.addEventListener('DOMContentLoaded', userInterface.addEventListeners);

// localStorage.setItem('name', 'tadgh');
// localStorage.setItem('job', 'webdev');
// localStorage.removeItem('job');
// localStorage.setItem('age', 27);

// console.log(localStorage);
// console.log(localStorage.getItem('age'));
// console.log(localStorage.key(0)); // good for looping through local storage

// let myObj = {
//   name: 'tig',
//   lastName: 'purple',
// };

// let myObj2 = {
//   name: 'tag',
//   lastName: 'parple',
// };

// let myObjSerialized = JSON.stringify(myObj);

// let myObjSerialized2 = JSON.stringify(myObj2);

// localStorage.setItem('myObj', myObjSerialized);
// localStorage.setItem('myObj', myObjSerialized2);

// let myObjDeserialized = JSON.parse(localStorage.getItem('myObj'));

// console.log(myObjDeserialized);

function addToDoItem(project, toDoItem) {
  const updatedProject = JSON.parse(localStorage.getItem(project));
  console.log(updatedProject);
  updatedProject[toDoItem.title] = toDoItem;
  console.log(JSON.stringify(updatedProject));
  localStorage.setItem(project, JSON.stringify(updatedProject));
  return updatedProject;
}

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
console.log(localStorage);

console.log(JSON.stringify(localStorage));
