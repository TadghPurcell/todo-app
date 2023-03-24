import dom from './dom';
import MakeToDoItem from './toDoController';
import toDoController from './toDoController';
import { addToDoItem, addProject } from './storage';
import { cloneDeep } from 'lodash';

const userInterface = (() => {
  //form elements
  const desc = document.querySelector('#desc');
  const dueDate = document.querySelector('#due-date');
  const priority = document.querySelector('#priority');
  //buttons
  const btnAddProject = document.querySelector('.add-project');
  const btnAddToDoSidebar = document.querySelector('.btn-add-todo');
  const btnAddToDoForm = document.querySelector('.new-todo');
  const btnResetProject = document.querySelector('.btn-reset-project');
  const btnAll = document.querySelector('.btn--all');
  const btnCreateProject = document.querySelector('.btn-create-project');

  function addEventListeners() {
    btnAddProject.addEventListener('click', dom.toggleModal);
    btnAddToDoForm.addEventListener('click', function (e) {
      e.preventDefault();
      const newItem = toDoController.createNewToDoItem(
        `${e.target.form.title.value}`,
        `${desc.value}`,
        `${dueDate.value}`,
        `${priority.value}`,
        `${priority.value}`
      );

      const activeBtn = [...document.querySelectorAll('.project__btn')].find(
        x => x.classList.contains('active')
      );
      console.log(activeBtn);
      console.log(localStorage);

      addToDoItem(activeBtn.textContent, newItem);

      dom.main.innerHTML = '';
      toDoController.addToDoItem(toDoController.allToDoProjects);
      dom.clearFormInputs(e);
      dom.newToDoForm.classList.add('hidden');
      // toDoController.allToDoProjects
      //   .flat()
      //   .forEach(x => dom.main.appendChild(dom.printAllToDoItems(x)));
      console.log(toDoController.allToDoProjects);
    });

    btnAll.addEventListener('click', dom.printAll);

    btnAddToDoSidebar.addEventListener('click', dom.toggleModal);

    btnCreateProject.addEventListener('click', function (e) {
      // function setActiveProject(e) {
      //   e.target.classList.add('active');
      // }
      e.preventDefault();
      addProject(e.target.form.title.value);
      toDoController.createNewProject(e);
      // dom.clearFormInputs(e);
      dom.sidebarProjectSection.innerHTML = '';
      dom.printProjectButtonsSidebar();
      e.target.form.title.value = '';
      dom.newProjectForm.classList.add('hidden');
    });
  }
  function init() {
    dom.printProjectButtonsSidebar();
    const allProjectBtns = [...document.querySelectorAll('.project__btn')];
    allProjectBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        allProjectBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        dom.main.innerHTML = '';
        dom.printProject(e);
      });
    });
  }

  return { addEventListeners, init };
})();

export default userInterface;
