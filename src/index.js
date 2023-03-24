import './sass/main.scss';
import { addToDoItem } from './modules/storage';
import userInterface from './modules/ui';

document.addEventListener('DOMContentLoaded', function () {
  userInterface.addEventListeners();
  userInterface.init();
});
