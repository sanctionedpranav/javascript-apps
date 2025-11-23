// DOM
import { taskOperation } from "./models/task_operations.js";
import { showAlert } from "./utils/dialogue.js";
import Task from "./models/task.js";
window.addEventListener("load", init);

function init() {
  bindEvents();
  showCounts();
  focus("id");
  disableButtons();
}

function disableButtons() {
  document.querySelector("#update").disabled = true;
  document.querySelector("#delete").disabled = true;
}

function save() {
  let tasks = taskOperation.getAllTask();
  console.log("JSON is", JSON.stringify(tasks));
  console.log("Tasks are", tasks);
  if (window.localStorage) {
    localStorage.tasks = JSON.stringify(tasks);
    showAlert("Record Saved Successfully");
  } else {
    showAlert("Your Browswe is Out-dated");
  }
}

function load() {
  if (localStorage) {
    let generictasks = JSON.parse(localStorage.tasks);
    let tasks = generictasks.map(
      (task) =>
        new Task(
          task.id,
          task.name,
          task.description,
          task.date,
          task.url,
          task.isMarked
        )
    );
    console.log(
      "After Parse",
      typeof tasks,
      tasks instanceof Task,
      tasks instanceof Object
    );
    taskOperation.tasks = tasks;
    showCounts();
    printTasks(taskOperation.tasks);
  } else {
    showAlert("Your Browswe is Out-dated");
  }
}

function bindEvents() {
  document.querySelector("#save").addEventListener("click", save);
  document.querySelector("#load").addEventListener("click", load);
  document.querySelector("#delete").addEventListener("click", deleteTask);
  document.querySelector("#add").addEventListener("click", addTask);
  document.querySelector("#update").addEventListener("click", updateTask);
  document.querySelector("#clear_all").addEventListener("click", clearAll);
}

function updateTask() {
  const taskObj = readFields();

  for (let key in taskObj) {
    taskObjectForUpdate[key] = taskObj[key];
  }

  printTasks(taskOperation.tasks);
}


function deleteTask() {
  let tasks = taskOperation.deleteMark();
  showCounts();
  printTasks(tasks);
}

function toggleDelete() {
  console.log("This is delete", this.getAttribute("task-id"));
  let icon = this;
  let id = icon.getAttribute("task-id");
  let tr = icon.parentNode.parentNode;
  tr.classList.toggle("alert-danger");
  taskOperation.mark(id);
  showCounts();

  if (taskOperation.countMark() > 0) {
    document.querySelector("#delete").disabled = false;
  }
}

let taskObjectForUpdate;
function edit() {
  const id = this.getAttribute("task-id");
  taskObjectForUpdate = taskOperation.tasks.find((task) => task.id == id);

  for (let key in taskObjectForUpdate) {
    if (key === "isMarked") continue;
    document.querySelector("#" + key).value = taskObjectForUpdate[key];
  }

  document.querySelector("#update").disabled = false;
}


function showCounts() {
  document.querySelector("#total").innerText = taskOperation.tasks.length;
  document.querySelector("#marked").innerText = taskOperation.countMark();
  document.querySelector("#un_marked").innerText =
    taskOperation.countUnMarked();
}

function createIcon(className, fn, id) {
  let icon = document.createElement("i");
  icon.className = `fas fa-${className} me-3 hand`;
  icon.addEventListener("click", fn);
  icon.setAttribute("task-id", id);
  return icon;
}

function readFields() {
  const fields = ["id", "name", "description", "date"];
  const taskObj = {};

  for (let field of fields) {
    taskObj[field] = document.querySelector("#" + field).value;
  }

  return taskObj;
}

function addTask() {
  // Reading the fields
  const task = readFields();

  // Print in the table
  printTask(task);
  showCounts();
  clearAll();
  focus("id");

  // Store in object and then it goes in array
}

function printTasks(tasks) {
  const tbody = document.querySelector("#tasks");
  tbody.innerHTML = "";
  tasks.forEach(printTask);
}

function printTask(task) {
  const tbody = document.querySelector("#tasks");
  const tr = tbody.insertRow();
  let id = task.id;
  let cellIndex = 0;
  for (let key in task) {
    if (key == 'isMarked' && task[key]) {
      tr.classList.toggle("alert-danger");
    }
    if (key == "isMarked" || typeof task[key] === "function") {
      continue;
    }
    let value = task[key];
    let td = tr.insertCell(cellIndex);
    td.innerText = value;
    cellIndex++;
  }
  let td = tr.insertCell(cellIndex);
  td.appendChild(createIcon("edit", edit, id));
  td.appendChild(createIcon("trash", toggleDelete, id));
}

const clearAll = () => {
  document.querySelectorAll(".form-control").forEach((txtBox) => (txtBox.value = ""));
  disableButtons();
}
const focus = (fieldId) => document.querySelector("#" + fieldId).focus();
