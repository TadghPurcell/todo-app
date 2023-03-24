const dom = (() => {
  const main = document.querySelector('main');
  const sidebar = document.querySelector('aside');
  const sidebarProjectSection = document.querySelector(
    '.sidebar__projects--container'
  );

  const newProjectForm = document.querySelector('.new-project-form');
  const newToDoForm = document.querySelector('.new-todo-form');

  function clearFormInputs(e) {
    e.target.form.title.value = '';
    e.target.form.desc.value = '';
    e.target.form['due-date'].value = '';
    e.target.form.priority.value = '';
  }

  function printAllProjects(el, i) {
    const project = document.createElement('div');
    project.classList.add('project');

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project__btn');
    projectBtn.setAttribute('index', i);
    projectBtn.textContent = el;

    project.appendChild(projectBtn);

    return project;
  }

  function printToDoItem(item) {
    // console.log(str);
    // const item = JSON.parse(str);
    console.log(item);
    const toDoItem = document.createElement('div');
    toDoItem.classList.add(`item--${item.index}`);
    toDoItem.setAttribute('data-index', `${item.index}`);

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = `${item.title || ''}`;

    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.textContent = `${item.desc || ''}`;

    const dateCreated = document.createElement('p'); // maybe not
    dateCreated.classList.add('date-created');
    dateCreated.textContent = `${item.dateCreated || ''}`;

    const dueDate = document.createElement('p');
    dueDate.classList.add('due-date');
    dueDate.textContent = `${item.dueDate || ''}`;

    const priority = document.createElement('p');
    priority.classList.add('priority');
    priority.textContent = `${item.priority || ''}`;

    toDoItem.appendChild(title);
    toDoItem.appendChild(desc);
    toDoItem.appendChild(dateCreated);
    toDoItem.appendChild(dueDate);
    toDoItem.appendChild(priority);

    return toDoItem;
  }

  function toggleModal(e) {
    if (e.target.classList.value === 'add-project') {
      newProjectForm.classList.toggle('hidden');
      newToDoForm.classList.add('hidden');
    }
    if (e.target.classList.value === 'sidebar__btn btn-add-todo') {
      newToDoForm.classList.toggle('hidden');
      newProjectForm.classList.add('hidden');
    }
  }

  function printAll() {
    main.innerHTML = '';
    for (const value of Object.values(localStorage)) {
      for (const item of Object.values(JSON.parse(value))) {
        main.appendChild(dom.printToDoItem(item));
      }
    }
  }
  function printProjectButtonsSidebar() {
    let index = 0;

    for (const key of Object.keys(localStorage)
      .map(x => x.toLowerCase())
      .sort()) {
      console.log(printAllProjects(key, index));
      sidebarProjectSection.appendChild(printAllProjects(key, index));
      index++;
    }
  }
  return {
    main,
    clearFormInputs,
    toggleModal,
    sidebarProjectSection,
    printAll,
    printAllProjects,
    printToDoItem,
    printProjectButtonsSidebar,
    newProjectForm,
    newToDoForm,
  };
})();

export default dom;
