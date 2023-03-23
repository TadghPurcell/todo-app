const dom = (() => {
  const main = document.querySelector('main');
  const sidebar = document.querySelector('aside');
  const sidebarProjectSection = document.querySelector(
    '.sidebar__projects--container'
  );
  const title = document.querySelector('#title');
  const desc = document.querySelector('#desc');
  const dueDate = document.querySelector('#due-date');
  const priority = document.querySelector('#priority');

  const newProjectForm = document.querySelector('.new-project-form');

  function toggleModal(e) {
    if (e.target.classList.value === 'add-project')
      newProjectForm.classList.toggle('hidden');
  }
  return { main, toggleModal, sidebarProjectSection };
})();

export default dom;
