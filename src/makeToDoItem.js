export default function MakeToDoItem(
  title,
  desc,
  dateCreated,
  dueDate,
  priority,
  index
) {
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
