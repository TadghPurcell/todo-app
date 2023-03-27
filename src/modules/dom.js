import {
  deleteToDoItem,
  getToDoItems,
  editCompleteStatus,
} from './toDoController';
import { isToday, isThisWeek, parseISO } from 'date-fns';

const dom = (() => {
  const main = document.querySelector('main');
  const sidebar = document.querySelector('aside');
  const sidebarProjectSection = document.querySelector(
    '.sidebar__projects--container'
  );

  const newProjectForm = document.querySelector('.new-project-form');
  const newToDoForm = document.querySelector('.new-todo-form');

  function clearFormInputs(e) {
    e.preventDefault();
    if (e.target.form.length > 3) {
      e.target.form.title.value = '';
      e.target.form.desc.value = '';
      e.target.form['due-date'].value = '';
      e.target.form.priority.value = '';
    } else e.target.form.title.value = '';
  }

  function printToDoItem(item) {
    const toDoItem = document.createElement('div');
    toDoItem.classList.add(`main__item`);

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

    const btnCompleteContainer = document.createElement('div');
    btnCompleteContainer.classList.add('btn-complete-container');
    btnCompleteContainer.setAttribute('priority', item.priority);

    const btnComplete = document.createElement('button');
    btnComplete.classList.add('btn-complete');
    btnComplete.setAttribute('complete', `${item.complete ? 'true' : 'false'}`);
    btnComplete.addEventListener('click', editCompleteStatus);

    btnCompleteContainer.appendChild(btnComplete);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn-edit');
    btnEdit.textContent = 'edit';
    btnEdit.addEventListener('click', function () {
      toggleModal('btn-add-todo');
      const title = document.querySelector('#title-form');
      const desc = document.querySelector('#desc');
      const dueDate = document.querySelector('#due-date');
      const priority = document.querySelector('#priority');
      console.log(title);
      title.value = item.title;
      desc.value = item.desc;
      dueDate.value = item.dueDate;
      priority.value = item.priority;
    });

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 3 16 18"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;
    btnDelete.addEventListener('click', deleteToDoItem);

    const lastNode = document.createElement('div');
    lastNode.textContent = item.project;
    lastNode.classList.add('hidden');

    toDoItem.appendChild(btnCompleteContainer);
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
    const btnAddToDoMain = document.createElement('button');
    btnAddToDoMain.classList.add('btn-add-todo');
    btnAddToDoMain.textContent = 'add to do';
    main.appendChild(btnAddToDoMain);
    btnAddToDoMain.addEventListener('click', function (e) {
      toggleModal(e);
      const today = new Date().toISOString().split('T')[0];
      document.querySelector('#due-date').setAttribute('min', today);
    });

    let project;
    const sortedArray = [];
    if (JSON.parse(localStorage.getItem(e))) {
      project = JSON.parse(localStorage.getItem(e));
    } else return;
    for (const [key, value] of Object.entries(project)) {
      sortedArray.push(value);
    }
    sortedArray
      .sort((a, b) => b.dateCreated - a.dateCreated)
      .forEach(x => main.appendChild(printToDoItem(x)));
  }

  function toggleModal(e) {
    if (e.target?.classList.value === 'add-project') {
      newProjectForm.classList.toggle('hidden');
      newToDoForm.classList.add('hidden');
    }
    if (e.target?.classList.value === 'btn-add-todo' || e === 'btn-add-todo') {
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
    let index = 0;

    for (const key of Object.keys(localStorage)
      .map(x => x.toLowerCase())
      .sort()) {
      const projectBtn = document.createElement('button');
      projectBtn.classList.add('sidebar__btn', `project__${key}`);
      projectBtn.textContent = key;
      index++;
      sidebarProjectSection.appendChild(projectBtn);
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
    clearFormInputs,
    toggleModal,
    sidebarProjectSection,
    printProjectButtonsSidebar,
    newProjectForm,
    newToDoForm,
    printProject,
    printSidebarLink,
  };
})();

export default dom;
