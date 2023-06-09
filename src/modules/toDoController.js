import { el } from 'date-fns/locale';
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

function createNewToDoItem(a, b, c, d, e) {
  return new MakeToDoItem(a, b, c, d, e);
}

function addProject(project) {
  localStorage.setItem(project.toLowerCase(), JSON.stringify({}));
}

function addToDoItem(project, toDoItem) {
  const updatedProject = JSON.parse(localStorage.getItem(project));

  updatedProject[toDoItem.title] = toDoItem;

  localStorage.setItem(project, JSON.stringify(updatedProject));

  return updatedProject;
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
  const projectDeserialized = JSON.parse(
    localStorage.getItem(e.currentTarget.parentNode.lastChild.textContent)
  );

  for (const item of Object.values(projectDeserialized)) {
    if (item.title === e.currentTarget.nextSibling.textContent) {
      item.complete
        ? (e.currentTarget.attributes.complete.value = 'false')
        : (e.currentTarget.attributes.complete.value = 'true');

      item.complete = !item.complete;

      localStorage.setItem(
        e.currentTarget.parentNode.lastChild.textContent,
        JSON.stringify(projectDeserialized)
      );
    }
  }
  if (document.querySelector('.active').textContent === 'complete') {
    dom.main.innerHTML = '';
    dom.printSidebarLink(document.querySelector('.active').textContent);
  }

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
  return currentItem;
}

function editToDoItem(e) {
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
}

function deleteToDoItem(e) {
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

  return getToDoItems();
}

function getCurrentlyEditedProject(e) {
  currentProject = {};
  currentProjectName = '';

  currentProjectName = e;
  currentProject = JSON.parse(localStorage.getItem(e));
}

function editProject(e) {
  for (const value of Object.values(currentProject)) {
    value.project = e;
  }
  localStorage.removeItem(currentProjectName);
  localStorage.setItem(e, JSON.stringify(currentProject));
}

function deleteProject(e) {
  localStorage.removeItem(
    e.currentTarget.parentNode.parentNode.firstChild.textContent
  );
}

export {
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
};
