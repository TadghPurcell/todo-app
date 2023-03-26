let toDoItems = [];

class MakeToDoItem {
  constructor(title = 'test', desc = 'test', dueDate, priority, project) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.dateCreated = new Date();
    this.index;
    this.complete = false;
  }
}

function addProject(project) {
  localStorage.setItem(project.toLowerCase(), JSON.stringify({}));
}

function addToDoItem(project, toDoItem) {
  console.log(localStorage.getItem(project));
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
  return toDoItems;
}

function editCompleteStatus(e) {
  const project = toDoItems.find(
    x => x.title === e.target.nextSibling.textContent
  );
  const projectDeserialized = JSON.parse(localStorage.getItem(project.project));
  for (const item of Object.values(projectDeserialized)) {
    if (item.title === e.target.nextSibling.textContent) {
      item.complete = !item.complete;
      localStorage.setItem(
        project.project,
        JSON.stringify(projectDeserialized)
      );
    }
  }
  console.log(localStorage.school);
}

export {
  createNewToDoItem,
  addToDoItem,
  addProject,
  getToDoItems,
  editCompleteStatus,
};
