import MakeToDoItem from './makeToDoItem';
import './style.scss';

const AllToDoProjects = {};

const testItem = new MakeToDoItem(
  'Go to shop',
  'go to the shop and buy food',
  'today',
  'Tomorrow',
  'low'
);

console.log(testItem);
