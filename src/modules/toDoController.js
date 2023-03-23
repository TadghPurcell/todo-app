const toDoController = (() => {
  const allToDoProjects = [];

  class MakeToDoItem {
    constructor(title, desc, dueDate = 'None', priority, index = 0) {
      this.title = title;
      this.desc = desc;
      this.dueDate = dueDate;
      this.priority = priority;
      this.index = index;
      this.dateCreated = +new Date();
    }
  }

  function createNewToDoItem() {
    return new MakeToDoItem();
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
