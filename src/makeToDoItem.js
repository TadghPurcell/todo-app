export default function MakeToDoItem(
  title,
  desc,
  dateCreated,
  dueDate,
  priority
) {
  return {
    title,
    desc,
    dateCreated,
    dueDate,
    priority,
  };
}
