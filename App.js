document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskInput = document.getElementById("taskInput");
    const taskDescription = document.getElementById("taskDescription");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completionPercentage = document.getElementById("completionPercentage");
    const progressBar = document.getElementById("progress");

    let tasks = [];

    addTaskButton.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        const description = taskDescription.value.trim();

        if (taskName === "") {
            alert("Task name cannot be empty!");
            return;
        }

        const task = {
            name: taskName,
            description: description,
            completed: false,
        };

        tasks.push(task);
        renderTasks();
        updateStats();
        taskInput.value = "";
        taskDescription.value = "";
    });

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";

            const taskNameSpan = document.createElement("span");
            taskNameSpan.textContent = task.name;

            const statusSpan = document.createElement("span");
            statusSpan.textContent = `Status: ${task.completed ? "Completed" : "Pending"}`;

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-btn";
            editButton.addEventListener("click", () => editTask(index));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.addEventListener("click", () => deleteTask(index));

            li.appendChild(taskNameSpan);
            li.appendChild(statusSpan);
            li.appendChild(editButton);
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }

    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        totalTasks.textContent = total;
        completionPercentage.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = percentage === 100 ? "#4CAF50" : "#76c7c0";
    }

    function editTask(index) {
        const task = tasks[index];
        const newName = prompt("Edit task name:", task.name);
        const newDescription = prompt("Edit task description:", task.description);

        if (newName !== null && newName.trim() !== "") {
            task.name = newName.trim();
        }
        if (newDescription !== null) {
            task.description = newDescription.trim();
        }

        renderTasks();
        updateStats();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
        updateStats();
    }
});
