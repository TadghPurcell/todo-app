export default function printToDoItem(item) {
  const toDoItem = document.createElement('div');
  toDoItem.classList.add(`item--${item.index}`);
  toDoItem.setAttribute('data-index', `${item.index}`);

  const title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = `${item.title || ''}`;

  const desc = document.createElement('p');
  desc.classList.add('desc');
  desc.textContent = `${item.desc || ''}`;

  const dateCreated = document.createElement('p'); // maybe not
  dateCreated.classList.add('date-created');
  dateCreated.textContent = `${item.dateCreated || ''}`;

  const dueDate = document.createElement('p');
  dueDate.classList.add('due-date');
  dueDate.textContent = `${item.dueDate || ''}`;

  const priority = document.createElement('p');
  priority.classList.add('priority');
  priority.textContent = `${item.priority || ''}`;

  toDoItem.appendChild(title);
  toDoItem.appendChild(desc);
  toDoItem.appendChild(dateCreated);
  toDoItem.appendChild(dueDate);
  toDoItem.appendChild(priority);

  return toDoItem;
}
