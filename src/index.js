import './style.scss';
import MakeToDoItem from './makeToDoItem';
import printToDoItem from './printAllToDoItems';

const allToDoProjects = [];
const main = document.querySelector('main');

const testItem = new MakeToDoItem(
  'Go to shop',
  'go to the shop and buy food',
  'today',
  'Tomorrow',
  'low',
  0
);

const btnNew = document.querySelector('.new-todo');

document.querySelector('.new-project').addEventListener('click', function () {
  allToDoProjects.push([]);
  console.log(allToDoProjects);
});

btnNew.addEventListener('click', function () {
  testItem.addToDoItem(allToDoProjects);
  allToDoProjects.flat().forEach(x => main.appendChild(printToDoItem(x)));
  console.log(allToDoProjects);
});

console.log(testItem);
