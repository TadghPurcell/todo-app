export default function printAllProjects(el, i) {
  const project = document.createElement('div');
  project.classList.add('project');
  project.setAttribute('data-index', i);

  const projectTitle = document.createElement('h2');
  projectTitle.classList.add('project__title');
  projectTitle.textContent = `${el[0]}`;

  project.appendChild(projectTitle);

  return project;
}
