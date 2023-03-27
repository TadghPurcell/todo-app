import dom from './dom';
let toDoItems = [];
let currentItem = [];
let currentProject;
let currentProjectName;

class MakeToDoItem {
  constructor(title = 'test', desc = 'test', dueDate, priority, project) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.dateCreated = +new Date();
    this.complete = false;
  }
}

function addProject(project) {
  localStorage.setItem(project.toLowerCase(), JSON.stringify({}));
}

function addToDoItem(project, toDoItem) {
  console.log(localStorage.getItem(project));
  console.log(project);
  const updatedProject = JSON.parse(localStorage.getItem(project));
  console.log(updatedProject);
  updatedProject[toDoItem.title] = toDoItem;
  console.log(JSON.stringify(updatedProject));
  localStorage.setItem(project, JSON.stringify(updatedProject));
  return updatedProject;
}

function createNewToDoItem(a, b, c, d, e) {
  return new MakeToDoItem(a, b, c, d, e);
}

function getToDoItems() {
  toDoItems = [];
  for (const project of Object.values(localStorage)) {
    for (const item of Object.values(JSON.parse(project))) {
      toDoItems.push(item);
    }
  }

  return toDoItems.sort((a, b) => b.dateCreated - a.dateCreated);
}

function editCompleteStatus(e) {
  console.log(e.currentTarget.parentNode.parentNode.lastChild.textContent);
  const projectDeserialized = JSON.parse(
    localStorage.getItem(
      e.currentTarget.parentNode.parentNode.lastChild.textContent
    )
  );
  for (const item of Object.values(projectDeserialized)) {
    if (item.title === e.currentTarget.parentNode.nextSibling.textContent) {
      item.complete
        ? (e.currentTarget.attributes.complete.value = 'false')
        : (e.currentTarget.attributes.complete.value = 'true');
      item.complete = !item.complete;
      localStorage.setItem(
        e.currentTarget.parentNode.parentNode.lastChild.textContent,
        JSON.stringify(projectDeserialized)
      );
    }
  }
  dom.main.innerHTML = '';
  dom.printSidebarLink(document.querySelector('.active').textContent);
  console.log(localStorage[e.currentTarget.parentNode.lastChild.textContent]);

  return getToDoItems();
}

function deleteToDoItem(e) {
  console.log(e.currentTarget.parentNode.lastChild.textContent);
  const projectDeserialized = JSON.parse(
    localStorage.getItem(e.currentTarget.parentNode.lastChild.textContent)
  );
  for (const item of Object.values(projectDeserialized)) {
    if (item.title === e.currentTarget.parentNode.childNodes[1].textContent) {
      delete projectDeserialized[item.title];
      localStorage.setItem(
        e.currentTarget.parentNode.lastChild.textContent,
        JSON.stringify(projectDeserialized)
      );
    }
  }
  dom.main.innerHTML = '';
  dom.printSidebarLink(document.querySelector('.active').textContent);
  console.log(
    localStorage[e.target.parentNode.parentNode.lastChild.textContent]
  );

  return getToDoItems();
}

function getCurrentlyEditedItem(title, project) {
  currentItem = [];
  const projectDeserialized = JSON.parse(localStorage.getItem(project));
  for (const item of Object.values(projectDeserialized)) {
    if (item.title === title) {
      for (const property of Object.values(projectDeserialized[item.title]))
        currentItem.push(property);
    }
  }
  console.log(currentItem);
  return currentItem;
}

function editToDoItem(e) {
  console.log(currentItem);
  console.log(currentItem[4]);
  console.log(currentItem[1]);
  const projectDeserialized = JSON.parse(localStorage.getItem(currentItem[4]));
  for (const item of Object.values(projectDeserialized)) {
    if (item.title === currentItem[0]) {
      delete projectDeserialized[item.title];
      projectDeserialized[e.currentTarget.form.title.value] = {
        title: e.currentTarget.form.title.value,
        desc: e.currentTarget.form.desc.value,
        dueDate: e.currentTarget.form['due-date'].value,
        priority: e.currentTarget.form.priority.value,
        project: currentItem[4],
        dateCreated: currentItem[5],
        complete: false,
      };
      localStorage.setItem(currentItem[4], JSON.stringify(projectDeserialized));
    }
  }
  console.log(localStorage[currentItem[4]]);
}

function getCurrentlyEditedProject(e) {
  currentProject = {};
  currentProjectName = '';

  currentProjectName = e;
  currentProject = JSON.parse(localStorage.getItem(e));
}

function editProject(e) {
  console.log(currentProjectName);
  console.log(e);
  localStorage.removeItem(currentProjectName);
  localStorage.setItem(e, JSON.stringify(currentProject));
}

export {
  createNewToDoItem,
  getCurrentlyEditedItem,
  addToDoItem,
  addProject,
  getToDoItems,
  editCompleteStatus,
  deleteToDoItem,
  editToDoItem,
  getCurrentlyEditedProject,
  editProject,
};
