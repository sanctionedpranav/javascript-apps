// DOM
import { taskOperation } from "./models/task_operations.js";
import { showAlert } from "./utils/dialogue.js";
import Task from "./models/task.js";
window.addEventListener("load", init);

function init() {
  bindEvents();
  showCounts();
  focus("id");
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
}

function edit() {
  console.log("This is edit", this);
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

function addTask() {
  // Reading the fields
  let id = document.querySelector("#id").value;
  let name = document.querySelector("#name").value;
  let description = document.querySelector("#description").value;
  let date = document.querySelector("#date").value;
  let url = document.querySelector("#url").value;

  const task = taskOperation.add(id, name, description, date, url);
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
    if(key == 'isMarked' && task[key]){
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

const clearAll = () =>
  document
    .querySelectorAll(".form-control")
    .forEach((txtBox) => (txtBox.value = ""));

const focus = (fieldId) => document.querySelector("#" + fieldId).focus();
