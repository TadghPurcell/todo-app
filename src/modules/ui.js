import dom from './dom';
import MakeToDoItem from './toDoController';
import toDoController from './toDoController';
import { addToDoItem, addProject } from './storage';
import { cloneDeep } from 'lodash';

const userInterface = (() => {
  //form elements
  const title = document.querySelector('#title');
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
        `${title.value}`,
        `${desc.value}`,
        `${dueDate.value}`,
        `${priority.value}`,
        `${priority.value}`
      );

      dom.main.innerHTML = '';
      toDoController.addToDoItem(toDoController.allToDoProjects);
      toDoController.allToDoProjects
        .flat()
        .forEach(x => dom.main.appendChild(dom.printAllToDoItems(x)));
      console.log(toDoController.allToDoProjects);
    });

    btnAll.addEventListener('click', dom.printAll);

    btnAddToDoSidebar.addEventListener('click', dom.toggleModal);

    btnCreateProject.addEventListener('click', function (e) {
      e.preventDefault();
      addProject(e.target.form.title.value);
      toDoController.createNewProject(e);
      dom.sidebarProjectSection.innerHTML = '';
      dom.printProjectButtonsSidebar();
      // toDoController.allToDoProjects.forEach((el, i) =>
      //   dom.sidebarProjectSection.appendChild(dom.printAllProjects(el, i))
      // );
      // console.log(toDoController.allToDoProjects);
    });
  }
  return { addEventListeners };
})();

export default userInterface;
