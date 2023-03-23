import './sass/main.scss';
import userInterface from './modules/ui';
import dom from './modules/dom';
import MakeToDoItem from './modules/makeToDoItem';
import printAllToDoItems from './modules/printAllToDoItems';
import makeProject from './modules/makeProject';
import printAllProjects from './modules/printAllProjects';

console.log(userInterface);
const title = document.querySelector('#title');
const desc = document.querySelector('#desc');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');

const newProjectForm = document.querySelector('.new-project-form');

document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded');
  userInterface.addEventListeners();
});

const allToDoProjects = [];
const main = document.querySelector('main');
const sidebar = document.querySelector('aside');
const sidebarProjectSection = document.querySelector(
  '.sidebar__projects--container'
);

const btnResetProject = document.querySelector('.btn-reset-project');

const testItem = new MakeToDoItem(
  'Go to shop',
  'go to the shop and buy food',
  'Tomorrow',
  'low',
  0
);

const btnNew = document.querySelector('.new-todo');

document
  .querySelector('.btn-create-project')
  .addEventListener('click', function (e) {
    e.preventDefault();
    makeProject(allToDoProjects, e);
    sidebarProjectSection.innerHTML = '';
    allToDoProjects.forEach((el, i) =>
      sidebarProjectSection.appendChild(printAllProjects(el, i))
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
