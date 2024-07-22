//add elements with id from html
const inputBox = document.getElementById("input-box") //user input field
const listContainer = document.getElementById("list") //task list

//add tasks and event listeners
function addTask(){ //Add button
    if(inputBox.value === ''){ //if empty
        alert("You must write something!");
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        li.title = inputBox.value; // Add tooltip for long text
        listContainer.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);

    }
    inputBox.value = '' //empty the input field after adding the task to the list
    saveData();
}

//event listener for Enter key with Add button
document.addEventListener("DOMContentLoaded", function() {
    inputBox.addEventListener("keydown", function(event) {
        if (event.key === "Enter"){
            addTask();
        }
    }); 
});


function check(e) {
    if (e.target.tagName === "LI") { // If clicked on list element
        e.target.classList.toggle("checked"); // Toggle between checked and unchecked
        saveData();
    }
}

function remove(e) {
    if (e.target.tagName === "SPAN") { // if clicked on span (cross symbol)
        e.target.parentElement.remove();
        saveData();
    }
}

//event listener for check and remove list elements
listContainer.addEventListener("click", function(event) { //"click" is a predefined js event type
    check(event); // handle check functionality
    remove(event); // handle remove functionality
}, false);


//store user input locally

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
