function addProject(project) {
  localStorage.setItem(project, JSON.stringify({}));
}

function addToDoItem(project, toDoItem) {
  const updatedProject = JSON.parse(localStorage.getItem(project));
  console.log(updatedProject);
  updatedProject[toDoItem.title] = toDoItem;
  console.log(JSON.stringify(updatedProject));
  localStorage.setItem(project, JSON.stringify(updatedProject));
  return updatedProject;
}

export { addToDoItem, addProject };
