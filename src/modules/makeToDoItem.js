export default function MakeToDoItem(
  title,
  desc,
  dueDate,
  priority,
  index = 0
) {
  const dateCreated = +new Date();

  function addToDoItem(e) {
    e[this.index]?.push(this);
  }
  return {
    title,
    desc,
    dateCreated,
    dueDate,
    priority,
    index,
    addToDoItem,
  };
}
