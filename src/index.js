import './sass/main.scss';
import { addToDoItem } from './modules/storage';
import userInterface from './modules/ui';

document.addEventListener('DOMContentLoaded', userInterface.addEventListeners);
document.addEventListener('click', function (e) {
  console.log(e.target.classList);
});

// localStorage.setItem('name', 'tadgh');
// localStorage.setItem('job', 'webdev');
// localStorage.removeItem('job');
// localStorage.setItem('age', 27);

// console.log(localStorage);
// console.log(localStorage.getItem('age'));
// console.log(localStorage.key(0)); // good for looping through local storage

// let myObj = {
//   name: 'tig',
//   lastName: 'purple',
// };

// let myObj2 = {
//   name: 'tag',
//   lastName: 'parple',
// };

// let myObjSerialized = JSON.stringify(myObj);

// let myObjSerialized2 = JSON.stringify(myObj2);

// localStorage.setItem('myObj', myObjSerialized);
// localStorage.setItem('myObj', myObjSerialized2);

// let myObjDeserialized = JSON.parse(localStorage.getItem('myObj'));

// console.log(myObjDeserialized);
