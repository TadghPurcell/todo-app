import dom from './dom';
import { createNewToDoItem, addToDoItem, addProject } from './toDoController';

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
  const btnAll = document.querySelector('.btn--all');
  const btnCreateProject = document.querySelector('.btn-create-project');

  function addSidebarEventListeners(e) {
    e.forEach(btn => {
      btn.addEventListener('click', function () {
        e.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        dom.main.innerHTML = '';
        console.log(btn.textContent);
        dom.printProject(btn.textContent);
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
      const newItem = createNewToDoItem(
        `${e.target.form.title.value}`,
        `${desc.value}`,
        `${dueDate.value}`,
        `${priority.value}`,
        `${priority.value}`
      );

      const activeBtn = [...document.querySelectorAll('.project__btn')].find(
        x => x.classList.contains('active')
      );
      console.log(activeBtn.textContent);

      addToDoItem(activeBtn.textContent, newItem);
      dom.printProject(activeBtn.textContent);

      dom.clearFormInputs(e);
      dom.newToDoForm.classList.add('hidden');
    });

    btnAll.addEventListener('click', dom.printAll);

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
      const allProjectBtns = [...document.querySelectorAll('.project__btn')];
      addSidebarEventListeners(allProjectBtns);
    });
  }

  function init() {
    dom.printProjectButtonsSidebar();
    dom.printAll();
    const allProjectBtns = [...document.querySelectorAll('.project__btn')];
    // console.log(allProjectBtns);
    addSidebarEventListeners(allProjectBtns);
    // allProjectBtns.forEach(btn => {
    //   btn.addEventListener('click', function (e) {
    //     allProjectBtns.forEach(btn => btn.classList.remove('active'));
    //     btn.classList.add('active');
    //     dom.main.innerHTML = '';
    //   });
    // });
  }

  return { addEventListeners, init };
})();

export default userInterface;
