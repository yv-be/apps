// Add elements with id from HTML
const inputBox = document.getElementById("input-box"); // User input field
const listContainer = document.getElementById("list"); // Task list

// Initialize an empty array to hold tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add tasks and event listeners
function addTask() { // Add button
    if (inputBox.value === '') { // If empty
        alert("You must write something!");
    } else if (inputBox.value.length > 40) { // Check if input is longer than 40 characters
        alert("Task must be 40 characters or less!");
    } else if (tasks.length >= 15) { // Check if there are already 15 tasks
        alert("You can only have 15 tasks at once!");
    } else {
        const task = {
            text: inputBox.value,
            checked: false
        };
        tasks.push(task);
        renderTasks();
        saveData();
    }
    inputBox.value = ''; // Empty the input field after adding the task to the list
}

// Event listener for Enter key with Add button
document.addEventListener("DOMContentLoaded", function() {
    inputBox.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function check(e) {
    if (e.target.tagName === "LI") { // If clicked on list element
        const index = Array.from(listContainer.children).indexOf(e.target);
        tasks[index].checked = !tasks[index].checked; // Toggle between checked and unchecked
        renderTasks();
        saveData();
    }
}

function remove(e) {
    if (e.target.tagName === "SPAN") { // If clicked on span (cross symbol)
        const index = Array.from(listContainer.children).indexOf(e.target.parentElement);
        tasks.splice(index, 1); // Remove the task from the array
        renderTasks();
        saveData();
    }
}

// Event listener for check and remove list elements
listContainer.addEventListener("click", function(event) { //"click" is a predefined JS event type
    check(event); // Handle check functionality
    remove(event); // Handle remove functionality
}, false);

// Store user input locally
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks from the array
function renderTasks() {
    listContainer.innerHTML = '';
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.text;
        li.title = task.text; // Add tooltip for long text
        if (task.checked) {
            li.classList.add("checked");
        }
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Show tasks on page load
function showTask() {
    renderTasks();
}
showTask();
