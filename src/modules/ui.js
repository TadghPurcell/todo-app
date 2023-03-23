import dom from './dom';
import MakeToDoItem from './toDoController';
import toDoController from './toDoController';
import printAllProjects from './printAllProjects';
import printAllToDoItems from './printAllToDoItems';

const userInterface = (() => {
  const BtnAddProject = document.querySelector('.add-project');
  const btnAddToDo = document.querySelector('.new-todo');
  const btnResetProject = document.querySelector('.btn-reset-project');
  const btnAll = document.querySelector('.btn--all');
  const btnCreateProject = document.querySelector('.btn-create-project');

  function addEventListeners() {
    BtnAddProject.addEventListener('click', dom.toggleModal);
    btnAddToDo.addEventListener('click', function (e) {
      e.preventDefault();
      const newItem = new MakeToDoItem(
        `${title.value}`,
        `${desc.value}`,
        `${dueDate.value}`,
        `${priority.value}`,
        `${priority.value}`
      );
      dom.main.innerHTML = '';
      newItem.addToDoItem(toDoController.allToDoProjects);
      toDoController.allToDoProjects
        .flat()
        .forEach(x => dom.main.appendChild(printAllToDoItems(x)));
      console.log(toDoController.allToDoProjects);
    });

    btnAll.addEventListener('click', function () {
      console.log('hello');
    });
    btnCreateProject.addEventListener('click', function (e) {
      e.preventDefault();
      toDoController.createNewProject(e);
      dom.sidebarProjectSection.innerHTML = '';
      toDoController.allToDoProjects.forEach((el, i) =>
        dom.sidebarProjectSection.appendChild(printAllProjects(el, i))
      );
      console.log(toDoController.allToDoProjects);
    });
  }
  return { addEventListeners };
})();

export default userInterface;
