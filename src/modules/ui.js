import dom from './dom';
import MakeToDoItem from './toDoController';
import toDoController from './toDoController';

const userInterface = (() => {
  //form elements
  const title = document.querySelector('#title');
  const desc = document.querySelector('#desc');
  const dueDate = document.querySelector('#due-date');
  const priority = document.querySelector('#priority');
  //buttons
  const BtnAddProject = document.querySelector('.add-project');
  const btnAddToDo = document.querySelector('.new-todo');
  const btnResetProject = document.querySelector('.btn-reset-project');
  const btnAll = document.querySelector('.btn--all');
  const btnCreateProject = document.querySelector('.btn-create-project');

  function addEventListeners() {
    BtnAddProject.addEventListener('click', dom.toggleModal);
    btnAddToDo.addEventListener('click', function (e) {
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

    btnAll.addEventListener('click', dom.toggleModal);

    btnCreateProject.addEventListener('click', function (e) {
      e.preventDefault();
      toDoController.createNewProject(e);
      dom.sidebarProjectSection.innerHTML = '';
      toDoController.allToDoProjects.forEach((el, i) =>
        dom.sidebarProjectSection.appendChild(dom.printAllProjects(el, i))
      );
      console.log(toDoController.allToDoProjects);
    });
  }
  return { addEventListeners };
})();

export default userInterface;
