import './style.scss';
import MakeToDoItem from './makeToDoItem';
import printToDoItem from './printAllToDoItems';
import makeProject from './makeProject';

const title = document.querySelector('#title');
const desc = document.querySelector('#desc');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');

const allToDoProjects = [[]];
const main = document.querySelector('main');
const sidebar = document.querySelector('aside');

const testItem = new MakeToDoItem(
  'Go to shop',
  'go to the shop and buy food',
  'Tomorrow',
  'low',
  0
);

const btnNew = document.querySelector('.new-todo');

document
  .querySelector('.btn-add-project')
  .addEventListener('click', function (e) {
    e.preventDefault();
    makeProject(allToDoProjects, e);
    // obj.push([e.target.form.title.value]);
    console.log(allToDoProjects);
  });

btnNew.addEventListener('click', function (e) {
  e.preventDefault();
  const newItem = new MakeToDoItem(
    `${title.value}`,
    `${desc.value}`,
    `${dueDate.value}`,
    `${priority.value}`
  );
  main.innerHTML = '';
  newItem.addToDoItem(allToDoProjects);
  allToDoProjects.flat().forEach(x => main.appendChild(printToDoItem(x)));
  console.log(allToDoProjects);
});

console.log(testItem);
