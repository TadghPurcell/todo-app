import './sass/main.scss';
import MakeToDoItem from './modules/makeToDoItem';
import printAllToDoItems from './modules/printAllToDoItems';
import makeProject from './modules/makeProject';
import printAllProjects from './modules/printAllProjects';

const title = document.querySelector('#title');
const desc = document.querySelector('#desc');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');

const allToDoProjects = [];
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
    sidebar.innerHTML = '';
    allToDoProjects.forEach((el, i) =>
      sidebar.appendChild(printAllProjects(el, i))
    );
    console.log(allToDoProjects);
  });

btnNew.addEventListener('click', function (e) {
  e.preventDefault();
  const newItem = new MakeToDoItem(
    `${title.value}`,
    `${desc.value}`,
    `${dueDate.value}`,
    `${priority.value}`,
    `${priority.value}`
  );
  main.innerHTML = '';
  newItem.addToDoItem(allToDoProjects);
  allToDoProjects.flat().forEach(x => main.appendChild(printAllToDoItems(x)));
  console.log(allToDoProjects);
});

console.log(testItem);
