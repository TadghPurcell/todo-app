import dom from './dom';
import {
  createNewToDoItem,
  addToDoItem,
  addProject,
  editToDoItem,
} from './toDoController';

const userInterface = (() => {
  //form elements
  const desc = document.querySelector('#desc');
  const dueDate = document.querySelector('#due-date');
  const priority = document.querySelector('#priority');
  //buttons
  const btnAddProject = document.querySelector('.add-project');
  const btnAddToDoForm = document.querySelector('.new-todo');
  const btnAddProjectForm = document.querySelector('.new-project');
  const btnEditProjectForm = document.querySelector('.edit-project');

  const btnResetProject = document.querySelector('.btn-reset-project');
  const btnResetToDoForm = document.querySelector('.btn-reset-form');

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
    const allSidebarBtns = [...document.querySelectorAll('.sidebar__btn')];

    btnAddProject.addEventListener('click', function (e) {
      dom.toggleModal(e);
      btnAddProjectForm.classList.remove('hidden');
    });
    btnResetProject.addEventListener('click', dom.clearFormInputs);
    btnResetToDoForm.addEventListener('click', dom.clearFormInputs);

    btnAddToDoForm.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(btnAddToDoForm.form.checkValidity());

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

      if (btnAddToDoForm.form.checkValidity()) {
        dom.main.innerHTML = '';
        console.log(activeBtn.textContent);
        addToDoItem(activeBtn.textContent, newItem);
        dom.printSidebarLink(activeBtn.textContent);

        dom.clearFormInputs(e);
        dom.newToDoForm.classList.add('hidden');
        dom.btnAddToDoForm.classList.add('hidden');
        dom.btnEditToDoForm.classList.add('hidden');
      }
    });

    dom.btnEditToDoForm.addEventListener('click', function (e) {
      e.preventDefault();
      const activeBtn = [...document.querySelectorAll('.sidebar__btn')].find(
        x => x.classList.contains('active')
      );
      console.log(e.currentTarget.form.title.value);
      if (btnAddToDoForm.form.checkValidity()) {
        dom.main.innerHTML = '';
        editToDoItem(e);
        console.log(activeBtn.textContent);
        dom.printSidebarLink(activeBtn.textContent);

        dom.clearFormInputs(e);
        dom.newToDoForm.classList.add('hidden');
        dom.btnAdd.classList.add('hidden');
        dom.btnEditToDoForm.classList.add('hidden');
      }
    });

    btnAddProjectForm.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(btnAddProjectForm.form.checkValidity());
      if (btnAddProjectForm.form.checkValidity()) {
        addProject(e.target.form.title.value);
        dom.clearFormInputs(e);
        dom.sidebarProjectSection.innerHTML = '';
        dom.printProjectButtonsSidebar();
        dom.newProjectForm.classList.add('hidden');
        addSidebarEventListeners(allSidebarBtns);
      }
    });
  }

  function init() {
    dom.printProjectButtonsSidebar();
    dom.printSidebarLink('all');

    const allSidebarBtns = [...document.querySelectorAll('.sidebar__btn')];

    addSidebarEventListeners(allSidebarBtns);
  }

  return { addEventListeners, init };
})();

export default userInterface;
