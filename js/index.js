"use strict";

// Get All HTML Element

var add = document.getElementById("add");
var titleInput = document.getElementById("title");
var list = document.getElementById("list");
var emptyList = document.getElementById("emptyList");
var createdTasks = [];
var tasksFromStorege = localStorage.getItem("tasks");
var tasksNumberSpan = document.getElementById("tasks-number");
var removeAllTasks = document.getElementById("removeAll");
if (removeAllTasks) removeAllTasks.addEventListener("click", function () {
  createdTasks = [];
  localStorage.clear();
  l;
});
if (tasksFromStorege) {
  createdTasks = JSON.parse(tasksFromStorege);
}
getDataFromLocalStorege();
function createNewTask(title, id) {
  var task = document.createElement("div");
  task.classList.add("task");
  var taskTitle = document.createElement("div");
  taskTitle.classList.add("title");
  var taskTitleContent = document.createTextNode(title);
  taskTitle.appendChild(taskTitleContent);
  task.appendChild(taskTitle);
  var taskDate = document.createElement("div");
  taskDate.classList.add("task-date");
  var date = new Date(Date.now());
  taskDate.innerText = "".concat(date.getDate(), " / ").concat(date.getMonth() + 1, " / ").concat(date.getFullYear(), " ");
  task.appendChild(taskDate);
  var removeTask = document.createElement("div");
  removeTask.classList.add("delete");
  removeTask.innerHTML = "<div class=\"remove\"></div>\n  <i class=\"fa-solid fa-trash btn btn-danger\"></i>";
  task.appendChild(removeTask);
  task.setAttribute("data-id", "".concat(id));
  list === null || list === void 0 || list.prepend(task);
}
function addTask() {
  if (titleInput.value.length > 0) {
    createTaskStorege(titleInput.value, Date.now());
    titleInput.value = "";
    createRealTaskOnPage(createdTasks);
    if (emptyList) {
      if (emptyList.classList.contains("d-flex")) {
        emptyList.classList.remove("d-flex");
        emptyList.classList.add("d-none");
      }
    }
  }
}
if (add) {
  add.addEventListener("click", function () {
    addTask();
  });
}
if (titleInput) {
  titleInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
}
function createTaskStorege(title, date) {
  var task = {
    id: date,
    title: title,
    completed: false
  };
  createdTasks.push(task);
  addToLocalStorege(createdTasks);
}
function createRealTaskOnPage(tasks) {
  if (list) {
    list.innerHTML = "";
  }
  tasks.forEach(function (e) {
    createNewTask(e.title, e.id);
  });
}
function addToLocalStorege(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getDataFromLocalStorege() {
  var data = window.localStorage.getItem("tasks");
  if (data) {
    var tasks = JSON.parse(data);
    createRealTaskOnPage(tasks);
    if (tasks.length < 1) {
      if (emptyList) {
        emptyList.classList.remove("d-none");
        emptyList.classList.add("d-flex");
      }
    } else {
      if (emptyList) {
        emptyList.classList.remove("d-flex");
        emptyList.classList.add("d-none");
      }
    }
  }
}
if (list) {
  list.addEventListener("click", function (ele) {
    if (ele.target.classList.contains("remove")) {
      //   ele.target.parentNode.parentNode.remove();

      var removedElement = ele.target.parentNode.parentNode;
      var removedElementId = removedElement.getAttribute("data-id");
      if (deleteElementFromLocalStoreg(removedElementId) < 1) {
        if (emptyList) {
          emptyList.classList.remove("d-none");
          emptyList.classList.add("d-flex");
        }
      } else {
        if (emptyList) {
          emptyList.classList.remove("d-flex");
          emptyList.classList.add("d-none");
        }
      }
      removedElement.remove();
    }
  });
}
function deleteElementFromLocalStoreg(taskId) {
  var tasksFromStorege = JSON.parse(localStorage.getItem("tasks"));
  var tasksWithOutRemovedTask = tasksFromStorege.filter(function (task) {
    return task.id != taskId;
  });
  window.localStorage.setItem("tasks", JSON.stringify(tasksWithOutRemovedTask));
  return tasksWithOutRemovedTask.length;
}