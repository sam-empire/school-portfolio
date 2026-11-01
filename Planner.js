"use strict";

const STORAGE_KEY = "schoolPortfolioTasks";
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const plannerStatus = document.querySelector("#planner-status");

if (taskForm && taskList && plannerStatus) {
    const titleInput = document.querySelector("#task-title");
    const courseInput = document.querySelector("#task-course");
    const dueDateInput = document.querySelector("#task-due-date");

    function showStatus(message) {
        plannerStatus.textContent = message;
    }

    function loadTasks() {
        try {
            const storedTasks = localStorage.getItem(STORAGE_KEY);
            if (storedTasks === null) {
                return [];
            }

            const parsedTasks = JSON.parse(storedTasks);
            if (!Array.isArray(parsedTasks) || !parsedTasks.every((task) =>
                task
                && typeof task.id === "string"
                && typeof task.title === "string"
                && typeof task.course === "string"
                && typeof task.dueDate === "string"
                && typeof task.completed === "boolean"
            )) {
                throw new Error("Saved tasks have an invalid format.");
            }

            return parsedTasks;
        } catch (error) {
            showStatus("Your saved tasks could not be loaded. Check your browser storage settings.");
            console.error("Could not load academic planner tasks.", error);
            return [];
        }
    }

    let tasks = loadTasks();

    function saveTasks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            return true;
        } catch (error) {
            showStatus("Your change could not be saved. Check your browser storage settings and try again.");
            console.error("Could not save academic planner tasks.", error);
            return false;
        }
    }

    function renderTasks() {
        taskList.replaceChildren();

        if (tasks.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "No tasks yet. Add one using the form above.";
            taskList.append(emptyMessage);
            return;
        }

        tasks.forEach((task) => {
            const item = document.createElement("li");
            item.className = task.completed ? "task-item is-complete" : "task-item";

            const details = document.createElement("div");
            details.className = "task-details";

            const title = document.createElement("strong");
            title.className = "task-title";
            title.textContent = task.title;
            details.append(title);

            const course = document.createElement("p");
            course.textContent = task.course;
            details.append(course);

            if (task.dueDate) {
                const dueDate = document.createElement("p");
                const time = document.createElement("time");
                time.dateTime = task.dueDate;
                time.textContent = `Due: ${task.dueDate}`;
                dueDate.append(time);
                details.append(dueDate);
            }

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const completeButton = document.createElement("button");
            completeButton.type = "button";
            completeButton.dataset.action = "toggle";
            completeButton.dataset.taskId = task.id;
            completeButton.setAttribute("aria-pressed", String(task.completed));
            completeButton.textContent = task.completed ? "Mark incomplete" : "Mark complete";

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.dataset.action = "delete";
            deleteButton.dataset.taskId = task.id;
            deleteButton.textContent = "Delete";

            actions.append(completeButton, deleteButton);
            item.append(details, actions);
            taskList.append(item);
        });
    }

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTask = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            title: titleInput.value.trim(),
            course: courseInput.value.trim(),
            dueDate: dueDateInput.value,
            completed: false
        };

        if (!newTask.title || !newTask.course) {
            showStatus("Enter both a task name and a course.");
            return;
        }

        tasks.push(newTask);
        if (!saveTasks()) {
            tasks.pop();
            return;
        }

        renderTasks();
        taskForm.reset();
        showStatus("Task added.");
        titleInput.focus();
    });

    taskList.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const button = event.target.closest("button[data-action][data-task-id]");
        if (!button) {
            return;
        }

        const taskIndex = tasks.findIndex((task) => task.id === button.dataset.taskId);
        if (taskIndex === -1) {
            return;
        }

        if (button.dataset.action === "toggle") {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
        } else if (button.dataset.action === "delete") {
            tasks.splice(taskIndex, 1);
        } else {
            return;
        }

        if (!saveTasks()) {
            tasks = loadTasks();
            renderTasks();
            return;
        }

        renderTasks();
        showStatus(button.dataset.action === "delete" ? "Task deleted." : "Task status updated.");
    });

    renderTasks();
}
