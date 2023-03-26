import './sass/main.scss';
import userInterface from './modules/ui';
import { getToDoItems } from './modules/toDoController';

console.log(getToDoItems());
getToDoItems();
userInterface.addEventListeners();
userInterface.init();
