import {
  addProject,
  addToDoItem,
  createNewToDoItem,
  getToDoItems,
  editCompleteStatus,
  getCurrentlyEditedItem,
  editToDoItem,
  deleteToDoItem,
  getCurrentlyEditedProject,
  editProject,
  deleteProject,
} from './toDoController';
import userInterface from './ui';
import { isToday, isThisWeek, parseISO } from 'date-fns';

const dom = (() => {
  const main = document.querySelector('main');
  const sidebarProjectSection = document.querySelector(
    '.sidebar__projects--container'
  );

  const overlay = document.querySelector('.overlay');
  const newProjectForm = document.querySelector('.new-project-form');
  const newToDoForm = document.querySelector('.new-todo-form');
  const newToDoFormButtonContainer = document.querySelector(
    '.new-todo-form__buttons'
  );
  const newProjectFormButtonContainer = document.querySelector(
    '.new-project-form__buttons'
  );

  overlay.addEventListener('click', function () {
    overlay.classList.add('hidden');
    newToDoForm.classList.add('hidden');
    newProjectForm.classList.add('hidden');
    newToDoFormButtonContainer.innerHTML = '';
    newProjectFormButtonContainer.innerHTML = '';
  });

  function printAddToDoButtonForm() {
    const btnAddToDoForm = document.createElement('button');
    btnAddToDoForm.classList.add('btn', 'btn-add-form', 'new-todo');
    btnAddToDoForm.textContent = 'Add';

    btnAddToDoForm.addEventListener('click', function (e) {
      e.preventDefault();
      const activeBtn = [...document.querySelectorAll('.sidebar__btn')].find(
        x => x.classList.contains('active')
      );

      const newItem = createNewToDoItem(
        `${e.target.form.title.value}`,
        `${e.target.form.desc.value}`,
        `${e.target.form['due-date'].value}`,
        `${e.target.form.priority.value}`,
        `${document.querySelector('.project-name').textContent}`
      );

      if (btnAddToDoForm.form.checkValidity()) {
        main.innerHTML = '';
        addToDoItem(activeBtn.textContent, newItem);
        printSidebarLink(activeBtn.textContent);

        clearFormInputs(e);

        newToDoFormButtonContainer.innerHTML = '';

        overlay.classList.add('hidden');
        newToDoForm.classList.add('hidden');
      }
    });

    return btnAddToDoForm;
  }

  function printEditButtonToDoForm() {
    const btnEditToDoForm = document.createElement('button');
    btnEditToDoForm.classList.add('btn', 'btn-edit-form', 'edit-todo');
    btnEditToDoForm.textContent = 'Edit';

    btnEditToDoForm.addEventListener('click', function (e) {
      e.preventDefault();
      const activeBtn = [...document.querySelectorAll('.sidebar__btn')].find(
        x => x.classList.contains('active')
      );

      if (btnEditToDoForm.form.checkValidity()) {
        main.innerHTML = '';
        editToDoItem(e);
        printSidebarLink(activeBtn.textContent);
        clearFormInputs(e);

        newToDoFormButtonContainer.removeChild(
          document.querySelector('.btn-clear-form')
        );

        overlay.classList.add('hidden');
        newToDoForm.classList.add('hidden');
      }
    });
    return btnEditToDoForm;
  }

  function printAddButtonProjectForm() {
    const btnAdd = document.createElement('button');
    btnAdd.classList.add('btn', 'btn-add-form', 'new-project');
    btnAdd.textContent = 'Add';

    btnAdd.addEventListener('click', function (e) {
      e.preventDefault();

      if (btnAdd.form.checkValidity()) {
        addProject(e.currentTarget.form.title.value);
        clearFormInputs(e);
        sidebarProjectSection.innerHTML = '';
        printProjectButtonsSidebar();

        newProjectFormButtonContainer.removeChild(
          document.querySelector('.new-project')
        );
        newProjectFormButtonContainer.removeChild(
          document.querySelector('.btn-clear-form')
        );
        console.log(e);

        overlay.classList.add('hidden');
        newProjectForm.classList.add('hidden');
      }
    });
    return btnAdd;
  }

  function printEditButtonProjectForm() {
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'btn-add-form', 'edit-project');
    btnEdit.textContent = 'Edit';

    btnEdit.addEventListener('click', function (e) {
      e.preventDefault();

      if (btnEdit.form.checkValidity()) {
        main.innerHTML = '';
        editProject(e.currentTarget.form.title.value);
        printSidebarLink(e.currentTarget.form.title.value);
        sidebarProjectSection.innerHTML = '';
        printProjectButtonsSidebar();
        clearFormInputs(e);

        newProjectFormButtonContainer.removeChild(
          document.querySelector('.edit-project')
        );
        newProjectFormButtonContainer.removeChild(
          document.querySelector('.btn-clear-form')
        );

        overlay.classList.add('hidden');
        newProjectForm.classList.add('hidden');
      }
    });

    return btnEdit;
  }

  function printClearBtn() {
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('btn', 'btn-clear-form');
    clearBtn.textContent = 'Clear';

    clearBtn.addEventListener('click', clearFormInputs);

    return clearBtn;
  }

  function clearFormInputs(e) {
    e.preventDefault();

    if (e.target.form.length > 4) {
      e.target.form.title.value = '';
      e.target.form.desc.value = '';
      e.target.form['due-date'].value = '';
      e.target.form.priority.value = '';
    } else e.target.form.title.value = '';
  }

  function printToDoItem(item) {
    const toDoItem = document.createElement('div');
    toDoItem.classList.add(`main__item`);
    toDoItem.setAttribute('priority', item.priority);

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = `${item.title || ''}`;

    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.textContent = `${item.desc || ''}`;

    const dueDate = document.createElement('p');
    dueDate.classList.add('due-date');
    dueDate.textContent = `${item.dueDate || ''}`;

    const priority = document.createElement('p');
    priority.classList.add('priority');
    priority.textContent = `${item.priority || ''}`;

    const btnComplete = document.createElement('button');
    btnComplete.classList.add('btn-complete');
    btnComplete.setAttribute('complete', `${item.complete ? 'true' : 'false'}`);
    btnComplete.addEventListener('click', editCompleteStatus);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn-edit');
    btnEdit.addEventListener('click', function (e) {
      overlay.classList.remove('hidden');
      newToDoForm.classList.remove('hidden');

      if (newToDoFormButtonContainer.firstElementChild?.textContent !== 'Edit')
        newToDoFormButtonContainer.appendChild(printEditButtonToDoForm(e));
      newToDoFormButtonContainer.appendChild(printClearBtn());

      toggleModal('btn-add-todo');

      const title = document.querySelector('#title-form');
      const desc = document.querySelector('#desc');
      const dueDate = document.querySelector('#due-date');
      const priority = document.querySelector('#priority');
      const today = new Date().toISOString().split('T')[0];

      dueDate.setAttribute('min', today);

      getCurrentlyEditedItem(item.title, item.project);

      title.value = item.title;
      desc.value = item.desc;
      dueDate.value = item.dueDate;
      priority.value = item.priority;
    });

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');

    btnDelete.addEventListener('click', deleteToDoItem);

    const lastNode = document.createElement('div');
    lastNode.textContent = item.project;
    lastNode.classList.add('hidden');

    toDoItem.appendChild(btnComplete);
    toDoItem.appendChild(title);
    toDoItem.appendChild(desc);
    toDoItem.appendChild(dueDate);
    toDoItem.appendChild(priority);
    toDoItem.appendChild(btnEdit);
    toDoItem.appendChild(btnDelete);
    toDoItem.appendChild(lastNode);

    return toDoItem;
  }

  function printProject(e) {
    const mainHeader = document.createElement('div');
    mainHeader.classList.add('main__header');

    const projectName = document.createElement('h1');
    projectName.classList.add('project-name');
    projectName.textContent = e;

    const btnAddToDoMain = document.createElement('button');
    btnAddToDoMain.classList.add('btn-add-todo');
    btnAddToDoMain.textContent = '+';

    mainHeader.appendChild(projectName);
    mainHeader.appendChild(btnAddToDoMain);
    main.appendChild(mainHeader);

    btnAddToDoMain.addEventListener('click', function (e) {
      overlay.classList.remove('hidden');
      toggleModal(e);
      newToDoFormButtonContainer.appendChild(printAddToDoButtonForm());
      newToDoFormButtonContainer.appendChild(printClearBtn());

      const title = document.querySelector('#title-form');
      const desc = document.querySelector('#desc');
      const dueDate = document.querySelector('#due-date');
      const priority = document.querySelector('#priority');

      title.value = '';
      desc.value = '';
      dueDate.value = '';
      priority.value = '';

      const today = new Date().toISOString().split('T')[0];

      document.querySelector('#due-date').setAttribute('min', today);
    });

    let project;

    const sortedArray = [];

    if (JSON.parse(localStorage.getItem(e))) {
      project = JSON.parse(localStorage.getItem(e));
    } else return;

    for (const value of Object.values(project)) {
      sortedArray.push(value);
    }

    sortedArray
      .sort((a, b) => b.dateCreated - a.dateCreated)
      .forEach(x => main.appendChild(printToDoItem(x)));
  }

  function toggleModal(e) {
    if (
      e.currentTarget?.classList.contains('add-project') ||
      e === 'add-project'
    ) {
      newProjectForm.classList.toggle('hidden');
      newToDoForm.classList.add('hidden');
    }
    if (e.currentTarget?.classList.contains('btn-add-todo') || e === '+') {
      newToDoForm.classList.toggle('hidden');
      newProjectForm.classList.add('hidden');
    }
  }

  function printAll() {
    getToDoItems().forEach(item => main.appendChild(printToDoItem(item)));
  }

  function printToday() {
    getToDoItems()
      .filter(item => isToday(parseISO(item.dueDate)))
      .forEach(item => main.appendChild(printToDoItem(item)));
  }

  function printThisWeek() {
    getToDoItems()
      .filter(item => isThisWeek(parseISO(item.dueDate)))
      .forEach(item => main.appendChild(printToDoItem(item)));
  }

  function printImportant() {
    getToDoItems()
      .filter(item => item.priority === 'high')
      .forEach(item => main.appendChild(printToDoItem(item)));
  }

  function printComplete() {
    getToDoItems()
      .filter(item => item.complete)
      .forEach(item => main.appendChild(printToDoItem(item)));
  }

  function printProjectButtonsSidebar() {
    for (const key of Object.keys(localStorage)
      .map(x => x.toLowerCase())
      .sort()) {
      const projectBtnDiv = document.createElement('div');
      projectBtnDiv.classList.add('project-container');

      const projectBtn = document.createElement('button');
      projectBtn.classList.add('sidebar__btn');
      projectBtn.textContent = key;

      projectBtn.addEventListener('click', function (e) {
        const allSidebarBtns = [...document.querySelectorAll('.sidebar__btn')];

        allSidebarBtns.forEach(btn => btn.classList.remove('active'));

        e.currentTarget.classList.add('active');

        main.innerHTML = '';
        printSidebarLink(e.currentTarget.textContent);
      });

      const projectBtnContainer = document.createElement('div');
      projectBtnContainer.classList.add('project-container-btns');

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('btn-delete');

      deleteBtn.addEventListener('click', function (e) {
        deleteProject(e);

        main.innerHTML = '';
        sidebarProjectSection.innerHTML = '';

        userInterface.addEventListeners();
        userInterface.init();
      });

      const editBtn = document.createElement('button');
      editBtn.classList.add('btn-edit');

      editBtn.addEventListener('click', function (e) {
        newProjectFormButtonContainer.append(printEditButtonProjectForm());
        newProjectFormButtonContainer.append(printClearBtn());

        overlay.classList.remove('hidden');
        getCurrentlyEditedProject(
          e.currentTarget.parentNode.firstChild.textContent
        );

        toggleModal('add-project');

        const title = document.querySelector('#title-project');
        title.value = e.currentTarget.parentNode.firstChild.textContent;
      });

      projectBtnContainer.appendChild(editBtn);
      projectBtnContainer.appendChild(deleteBtn);
      projectBtnDiv.appendChild(projectBtn);
      projectBtnDiv.appendChild(projectBtnContainer);

      sidebarProjectSection.appendChild(projectBtnDiv);
    }
  }

  function printSidebarLink(e) {
    main.innerHTML = '';
    if (e === 'all') printAll();
    if (e === 'today') printToday();
    if (e === 'this week') printThisWeek();
    if (e === 'important') printImportant();
    if (e === 'complete') printComplete();
    if (localStorage.hasOwnProperty(e)) printProject(e);
  }

  return {
    main,
    overlay,
    newProjectFormButtonContainer,
    printAddButtonProjectForm,
    printClearBtn,
    toggleModal,
    printProjectButtonsSidebar,
    printSidebarLink,
  };
})();

export default dom;
