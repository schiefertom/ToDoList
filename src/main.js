"use strict";
const LOCAL_STORAGE_KEY = 'ToDos';

let addButton = document.querySelector('#todo-button-add');
let clearCompletedButton = document.querySelector('#todo-button-clear-completed');
let emptyListButton = document.querySelector('#todo-button-empty');
let saveListButton = document.querySelector('#todo-button-save');
let inputField = document.querySelector('#todo-entry-box');
let olTodoList = document.querySelector('#todo-list');

addButton.addEventListener('click', addToDoItemWrapper);
clearCompletedButton.addEventListener('click', clearCompleted);
emptyListButton.addEventListener('click', emptyList);
saveListButton.addEventListener('click', saveList);

window.addEventListener('load', loadList);

function addToDoItemWrapper(){
    addToDoItem(inputField.value, "");
    return false;
}

function addToDoItem(todoDescription, completed) {
    let toDoItem = document.createElement("li");

    if(!todoDescription) return;

    if(completed !== "") toDoItem.classList.add(completed);
    toDoItem.appendChild(document.createTextNode((todoDescription)));
    olTodoList.appendChild(toDoItem);
    toDoItem.addEventListener('dblclick', () => {
       toDoItem.classList.toggle("completed");
       saveList();
    });
    inputField.value = '';
    console.log("Item added and saving list");
    saveList();
}



function clearCompleted() {
    /* Within a function called by an eventlistener "this" always refers to
        the element which has the eventlistener registered.
     */
    console.log(this.innerHTML);

    let listOfCompletedItems = document.querySelectorAll('.completed');

    listOfCompletedItems.forEach((listItem) => {
        listItem.remove();
    });

    console.log("Removed completed tasks from list.");
    saveList();
}

function emptyList() {
    //you can also empty the list like this
    /*
    while(olTodoList.firstChild) {
        olTodoList.removeChild(olTodoList.lastChild);
    }
    */
    olTodoList.replaceChildren();
    console.log("ToDo List is now empty. All entries removed.");
}

function saveList() {
    let listOfAllTodoItems = olTodoList.querySelectorAll('li');
    let todoItemArray = [];
    listOfAllTodoItems.forEach((childNode) =>{
        let toDoItem = {
            "taskDescription": childNode.innerText,
            "completedStatus": childNode.classList.contains('completed') ? 'completed' : ''
        };
        todoItemArray.push(toDoItem);
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoItemArray));

    console.log("All Items saved to localStorage.");
}

function loadList(){
    if(!localStorage.getItem(LOCAL_STORAGE_KEY)) return;
    let todoItemArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    todoItemArray.forEach((todoItem) => {
        addToDoItem(todoItem.taskDescription, todoItem.completedStatus);
    });
}