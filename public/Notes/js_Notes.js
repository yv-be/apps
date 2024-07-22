function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const noteInput = document.getElementById('noteInput');
    noteInput.focus();

    noteInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default newline behavior
            addNote();
        }
    });
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function openEditPopup(noteElement) {
    const editPopup = document.getElementById('editPopup');
    const editNoteInput = document.getElementById('editNoteInput');
    
    editNoteInput.value = noteElement.textContent.trim();
    editPopup.style.display = 'block';

    const saveButton = document.getElementById('saveButton');
    saveButton.onclick = function() {
        noteElement.textContent = editNoteInput.value;
        closeEditPopup();
        saveData();
    };

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.onclick = function() {
        noteElement.parentElement.remove();
        closeEditPopup();
        saveData();
    };
}

function closeEditPopup() {
    document.getElementById('editPopup').style.display = 'none';
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText) {
        createNoteElement(noteText);
        noteInput.value = '';
        closePopup();
        saveData();
    }
}

function createNoteElement(noteText) {
    const ul = document.getElementById('list');
    const li = document.createElement('li');
    const noteDiv = document.createElement('div');
    noteDiv.textContent = noteText;
    noteDiv.title = noteText; // Add tooltip for long text

    noteDiv.onclick = function() {
        openEditPopup(noteDiv);
    };

    li.appendChild(noteDiv);
    ul.appendChild(li);
}

function check(e) {
    if (e.target.tagName === "LI") { // If clicked on list element
        e.target.classList.toggle("checked"); // Toggle between checked and unchecked
        saveData();
    }
}

// Event listener for check and remove list elements
const listContainer = document.getElementById('list');
listContainer.addEventListener("click", function(event) { //"click" is a predefined js event type
    check(event); // handle check functionality
}, false);

// Store user input locally
function saveData() {
    const listItems = [];
    document.querySelectorAll('#list li').forEach(li => {
        listItems.push({
            text: li.querySelector('div').textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('data', JSON.stringify(listItems));
}

function showTask() {
    const savedData = JSON.parse(localStorage.getItem('data'));
    if (savedData) {
        savedData.forEach(item => {
            createNoteElement(item.text);
            if (item.checked) {
                document.querySelectorAll('#list li').forEach(li => {
                    if (li.querySelector('div').textContent === item.text) {
                        li.classList.add('checked');
                    }
                });
            }
        });
    }
}

showTask();
