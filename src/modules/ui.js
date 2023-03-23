import dom from './dom';

const userInterface = (() => {
  const BtnAddProject = document.querySelector('.add-project');
  const btnAddToDo = '';

  function addEventListeners() {
    BtnAddProject.addEventListener('click', dom.toggleModal);
  }
  return { addEventListeners };
})();

export default userInterface;
