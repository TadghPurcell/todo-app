import dom from './dom';
import {
  createNewToDoItem,
  addToDoItem,
  addProject,
  editCompleteStatus,
  deleteToDoItem,
} from './toDoController';

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
  const btnResetToDoForm = document.querySelector('.btn-reset-form');
  // const btnAll = document.querySelector('.btn--all');
  // const btnToday = document.querySelector('.btn--today');
  // const btnThisWeek = document.querySelector('.btn--this-week');
  // const btnImportant = document.querySelector('.btn--important');
  const btnCreateProject = document.querySelector('.btn-create-project');

  function addSidebarEventListeners(e) {
    e.forEach(btn => {
      btn.addEventListener('click', function () {
        e.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        dom.main.innerHTML = '';
        dom.printSidebarLink(btn.textContent);
      });
    });
  }

  function addEventListeners() {
    btnAddProject.addEventListener('click', dom.toggleModal);
    btnResetProject.addEventListener('click', dom.clearFormInputs);
    btnResetToDoForm.addEventListener('click', dom.clearFormInputs);

    btnAddToDoForm.addEventListener('click', function (e) {
      e.preventDefault();
      dom.main.innerHTML = '';
      const activeBtn = [...document.querySelectorAll('.sidebar__btn')].find(
        x => x.classList.contains('active')
      );

      const newItem = createNewToDoItem(
        `${e.target.form.title.value}`,
        `${desc.value}`,
        `${dueDate.value}`,
        `${priority.value}`,
        `${activeBtn.textContent}`
      );

      console.log(activeBtn.textContent);

      addToDoItem(activeBtn.textContent, newItem);
      dom.printProject(activeBtn.textContent);

      dom.clearFormInputs(e);
      dom.newToDoForm.classList.add('hidden');
    });

    btnAddToDoSidebar.addEventListener('click', dom.toggleModal);

    btnCreateProject.addEventListener('click', function (e) {
      // function setActiveProject(e) {
      //   e.target.classList.add('active');
      // }
      e.preventDefault();
      console.log(e);
      addProject(e.target.form.title.value);
      dom.clearFormInputs(e);
      dom.sidebarProjectSection.innerHTML = '';
      dom.printProjectButtonsSidebar();
      dom.newProjectForm.classList.add('hidden');
      const allSidebarBtns = [...document.querySelectorAll('.sidebar__btn')];
      addSidebarEventListeners(allSidebarBtns);
    });
  }

  function init() {
    dom.printProjectButtonsSidebar();
    dom.printSidebarLink('all');

    const allSidebarBtns = [...document.querySelectorAll('.sidebar__btn')];
    const allCompleteBtns = [...document.querySelectorAll('.btn-complete')];
    const allDeleteBtns = [...document.querySelectorAll('.btn-delete')];
    const activeBtn = [...document.querySelectorAll('.sidebar__btn')].find(x =>
      x.classList.contains('active')
    );

    allCompleteBtns.forEach(btn =>
      btn.addEventListener('click', editCompleteStatus)
    );

    allDeleteBtns.forEach(btn =>
      btn.addEventListener('click', function (e) {
        console.log(e.target.parentNode.parentNode.lastChild.textContent);
        deleteToDoItem(e);
        console.log(activeBtn.textContent);
        dom.printSidebarLink(activeBtn.textContent);
      })
    );

    // console.log(allProjectBtns);
    addSidebarEventListeners(allSidebarBtns);
  }

  return { addEventListeners, init };
})();

export default userInterface;
