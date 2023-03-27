let toDoItems = [];

class MakeToDoItem {
  constructor(title = 'test', desc = 'test', dueDate, priority, project) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.dateCreated = +new Date();
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
  console.log(
    localStorage[e.target.parentNode.parentNode.lastChild.textContent]
  );

  return getToDoItems();
}

export {
  createNewToDoItem,
  addToDoItem,
  addProject,
  getToDoItems,
  editCompleteStatus,
  deleteToDoItem,
};
