import './sass/main.scss';
import userInterface from './modules/ui';
import { getToDoItems } from './modules/toDoController';

userInterface.addEventListeners();
userInterface.init();
