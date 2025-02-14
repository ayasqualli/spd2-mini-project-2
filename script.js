const task = document.getElementById("task");
const TasksItems = document.querySelector(".todos");
const FieldForm = document.querySelector(".add");
const message = document.getElementById("return-message");
const searchInput = document.querySelector(".form-control");

//Load thestored tasks after loading the page
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

// Call the add fucntion when the form is submitted by hitting 'Enter'
task.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    AddTask(event);
  }
});

// Hide error message when typing
task.addEventListener("input", function () {
  message.textContent = "";
});

function AddTask(event) {
  const input = task.value.trim();

  if (input === "") {
    if (message.textContent === "") {
      Message("Please enter your task!", "error");
    }
  } else {
    let taskItem = document.createElement("li");
    taskItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    taskItem.innerHTML =  
            `<span>${input}</span> 
            <i class="far fa-trash-alt delete"></i> 
        </li>` ;
    TasksItems.appendChild(taskItem);

    SaveTasks();

    // Clear The input
    task.value = "";
    message.textContent = "";
  }
}

function SaveTasks() {
  const tasks = [];
  document.querySelectorAll(".todos li span ").forEach((task) => {
    tasks.push(task.textContent.trim());
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  TasksItems.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    let taskItem = document.createElement("li");
    taskItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    taskItem.innerHTML =  
        `<span>${taskText}</span> 
        <i class="far fa-trash-alt delete"></i>`
    ;
    TasksItems.appendChild(taskItem);
  });
}

TasksItems.addEventListener("click", DeleteTask);

function DeleteTask(event) {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    SaveTasks();
  }
}

function SearchTask(filter) {
  const tasks = document.querySelectorAll(".todos li");
  const searchTerm = filter.trim().toLowerCase();

  tasks.forEach(task => {
    const taskText = task.querySelector("span").textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", function () {
  SearchTask(this.value);
});

function Message(messageText, type) {
    message.textContent = messageText;
    if (type === "error") {
        message.style.color = "red";
    } else {
        message.style.color = "green";
    }
}