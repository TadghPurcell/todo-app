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
    projectTitle.textContent = `${el[0]}`;

    project.appendChild(projectTitle);

    return project;
  }

  function printToDoItem(item) {
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
    if (e.target.classList.value === 'sidebar__btn btn--all')
      newToDoForm.classList.toggle('hidden');
  }
  return {
    main,
    toggleModal,
    sidebarProjectSection,
    printAllProjects,
    printToDoItem,
  };
})();

export default dom;
