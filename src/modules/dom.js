const dom = (() => {
  const newProjectForm = document.querySelector('.new-project-form');

  function toggleModal(e) {
    if (e.target.classList.value === 'add-project')
      newProjectForm.classList.toggle('hidden');
  }
  return { toggleModal };
})();

export default dom;
