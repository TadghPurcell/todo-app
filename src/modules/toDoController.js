const toDoController = (() => {
  const allToDoProjects = [];

  class MakeToDoItem {
    constructor(title, desc, dueDate = 'None', priority = 0, index = 0) {
      this.title = title;
      this.desc = desc;
      this.dueDate = dueDate;
      this.priority = priority;
      this.index = index;
      this.dateCreated = +new Date();
    }
  }

  function createNewToDoItem(a, b, c, d, e) {
    return new MakeToDoItem(a, b, c, d, e);
  }

  function createNewProject(e) {
    allToDoProjects.push([`${e.target.form.title.value}`]);
  }
  function addToDoItem(e) {
    e[this.index]?.push(this);
  }

  return { allToDoProjects, createNewToDoItem, addToDoItem, createNewProject };
})();

export default toDoController;
