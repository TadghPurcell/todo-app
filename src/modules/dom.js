const dom = (() => {
  const main = document.querySelector('main');
  const sidebar = document.querySelector('aside');
  const sidebarProjectSection = document.querySelector(
    '.sidebar__projects--container'
  );

  const newProjectForm = document.querySelector('.new-project-form');
  const newToDoForm = document.querySelector('.new-todo-form');

  function printAllProjects(el, i) {
    const project = document.createElement('div');
    project.classList.add('project');
    project.setAttribute('data-index', i);

    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('project__title');
    projectTitle.textContent = el;

    project.appendChild(projectTitle);

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
    if (e.target.classList.value === 'add-project')
      newProjectForm.classList.toggle('hidden');
    if (e.target.classList.value === 'sidebar__btn btn-add-todo')
      newToDoForm.classList.toggle('hidden');
  }

  function printAll() {
    main.innerHTML = '';
    for (const value of Object.values(localStorage)) {
      // const { hello, goodbye } = JSON.parse(value);
      // console.log(hello);
      // console.log(goodbye);
      // console.log(array);
      // console.log(valueNested);
      // dom.main.appendChild(dom.printToDoItem(value));
      // console.log(key);
      console.log(value);
      for (const item of Object.values(JSON.parse(value))) {
        main.appendChild(dom.printToDoItem(item));
      }
      // console.log(JSON.parse(value));
      // console.log(JSON.parse(value));
    }
  }
  function printProjectButtonsSidebar() {
    let index = 0;

    for (const key of Object.keys(localStorage)
      .map(x => x.toLowerCase())
      .sort()) {
      index++;
      console.log(printAllProjects(key, index));
      sidebarProjectSection.appendChild(printAllProjects(key, index));
    }
  }
  return {
    main,
    toggleModal,
    sidebarProjectSection,
    printAll,
    printAllProjects,
    printToDoItem,
    printProjectButtonsSidebar,
  };
})();

export default dom;
