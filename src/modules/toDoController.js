class MakeToDoItem {
  constructor(title = 'test', desc = 'test', dueDate, priority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.dateCreated = new Date().toISOString();
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

function createNewToDoItem(a, b, c, d) {
  return new MakeToDoItem(a, b, c, d);
}

export { createNewToDoItem, addToDoItem, addProject };
