import dom from './dom';

const userInterface = (() => {
  function addSidebarEventListeners(e) {
    e.forEach(btn => {
      btn.addEventListener('click', function () {
        e.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        dom.main.innerHTML = '';
        dom.printSidebarLink(btn.textContent);
      });
    });
  }

  function addEventListeners() {
    const btnAddProject = document.querySelector('.add-project');
    btnAddProject.addEventListener('click', function (e) {
      dom.newProjectFormButtonContainer.append(dom.printAddButtonProjectForm());
      dom.newProjectFormButtonContainer.append(dom.printClearBtn());
      dom.toggleModal(e);
      dom.overlay.classList.remove('hidden');
    });
  }

  function init() {
    dom.printProjectButtonsSidebar();
    dom.printSidebarLink('all');

    const allSidebarBtns = [...document.querySelectorAll('.sidebar__btn')];

    addSidebarEventListeners(allSidebarBtns);
  }

  return { addEventListeners, init };
})();

export default userInterface;
