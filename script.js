document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const taskList = document.getElementById("taskList");

    let tasks = [];

   
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.dataset.id = task.id;

            
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            listItem.appendChild(taskText);

          
            const priorityText = document.createElement("span");
            priorityText.textContent = " - Priority : " + task.priority;
            listItem.appendChild(priorityText);

            const statusText = document.createElement("span");
            statusText.textContent = task.completed ? "  -  Completed  " : "  - Pending  ";
            listItem.appendChild(statusText);

            listItem.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasksToLocalStorage();
                renderTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");
            listItem.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-btn");
            listItem.appendChild(editButton);

            taskList.appendChild(listItem);

            editButton.addEventListener("click", () => {
                const newText = prompt("Enter new task text:", task.text);
                if (newText !== null && newText.trim() !== "") {
                    task.text = newText.trim();
                    saveTasksToLocalStorage();
                    renderTasks();
                }
            });
        });
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    }

  
    loadTasksFromLocalStorage();

    taskForm.addEventListener("submit", event => {
        event.preventDefault();
        const text = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (text) {
            const newTask = {
                id: Date.now(),
                text,
                priority,
                completed: false
            };
            tasks.push(newTask);
            saveTasksToLocalStorage();
            renderTasks();
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", event => {
        const target = event.target;
        if (target.classList.contains("delete-btn")) {
            const taskId = target.parentElement.dataset.id;
            tasks = tasks.filter(task => task.id != taskId);
            saveTasksToLocalStorage();
            renderTasks();
        }
    });
});
