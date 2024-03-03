let todoList = document.getElementById("unorderList"); 
let AddButtonElement = document.getElementById("addButton"); 
let saveButton = document.getElementById("saveButton");


function getToListFromLocalStorage() {
    let stringfyToList = localStorage.getItem("todoListItem");
    let parsedToDoList = JSON.parse(stringfyToList);
    if (parsedToDoList === null) {
        return []
    } else {
        return parsedToDoList
    }
}


let todoItems = getToListFromLocalStorage() 



let todoCount = todoItems.length; 

AddButtonElement.onclick = function() {
    onAddToDo()
}


saveButton.onclick = function() {
    localStorage.setItem("todoListItem",JSON.stringify(todoItems))
    
}

function TodoStatusChange(checkboxId,labelId,todoId) {
    let labelElement = document.getElementById(labelId);
    let checkboxElement = document.getElementById(checkboxId); 
    labelElement.classList.toggle("checked");
    checkboxElement.classList.toggle("checked");

    let todoObjectIndex = todoItems.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })

    let todoItemsIndex = todoItems[todoObjectIndex];

    if (todoItemsIndex.isChecked === true) {
        todoItemsIndex.isChecked = false;
    } else {
 
    } todoItemsIndex.isChecked = true;
}


function onDeleteFunction(todoId) {
    let todoIdElement = document.getElementById(todoId);
    todoList.removeChild(todoIdElement);
    
    let deleteItems = todoItems.findIndex(function(eachId) { 
        let checkId = "todo" + eachId.uniqueNo; 

        if (checkId === todoId) {
            return true;
        } else {
            return false;
        }

    })
    todoItems.splice(deleteItems,1);

}

function AppendTodoItem(todo) { 
    let checkboxId = "checkbox" + todo.uniqueNo
    let labelId = "label" + todo.uniqueNo
    let todoId = "todo" + todo.uniqueNo
    let listItem = document.createElement("li");
    listItem.id = todoId;
    listItem.classList.add("item-list");
    todoList.appendChild(listItem);   


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox")
    inputElement.onclick = function() {
        TodoStatusChange(checkboxId,labelId,todoId)
    }
    listItem.appendChild(inputElement);  



    let divElement = document.createElement("div");
    divElement.classList.add("label-container");
    listItem.appendChild(divElement);



    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",checkboxId)
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId
    divElement.appendChild(labelElement); 

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }



    let deleteElement = document.createElement("div");
    deleteElement.classList.add("delete-element");
    divElement.appendChild(deleteElement);  



    let deleteicon = document.createElement("i");
    deleteicon.classList.add("delete","far", "fa-trash-alt", "delete-icon");
    deleteicon.onclick = function() {
        onDeleteFunction(todoId)
    }
    deleteElement.appendChild(deleteicon)
}

function onAddToDo() { 
    
    
    todoCount = todoCount + 1;
    let userInput = document.getElementById("inputelement");
    let uservalue = userInput.value; 

    if (uservalue === "") {
        alert("Enter Valid Text");
        return;
    }
    
    let newTodo = {
        text : uservalue,
        uniqueNo : todoCount,
        isChecked : false
    } 

    todoItems.push(newTodo);
    AppendTodoItem(newTodo);
    userInput.value = "";
}


for (let todo of todoItems) {
    AppendTodoItem(todo)
} 