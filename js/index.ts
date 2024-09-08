// Get All HTML Element

let add = document.getElementById("add");

let titleInput = document.getElementById("title") as HTMLInputElement;

let list: HTMLElement | null = document.getElementById("list");

let createdTasks: Task[] = [];

let tasksFromStorege = localStorage.getItem("tasks");

let tasksNumberSpan: HTMLElement | null =
  document.getElementById("tasks-number");

let removeAllTasks = document.getElementById("removeAll");

if (removeAllTasks)
  removeAllTasks.addEventListener("click", () => {
    createdTasks = [];

    localStorage.clear();

    if (list) list.innerHTML = "";

    if (tasksNumberSpan) tasksNumberSpan.innerHTML = "0";

    removeAllTasks?.classList.remove("btn-danger");
    removeAllTasks?.classList.add("btn-secondary");
    removeAllTasks?.classList.add("disabled");
  });

if (tasksFromStorege) createdTasks = JSON.parse(tasksFromStorege) as Task[];

getDataFromLocalStorege();

// Create DOM Of Task

function createNewTask(title: string, id: number) {
  let task = document.createElement("div");

  task.classList.add("task");

  let taskTitle = document.createElement("div");

  taskTitle.classList.add("title");

  let taskTitleContent = document.createTextNode(title);

  taskTitle.appendChild(taskTitleContent);

  task.appendChild(taskTitle);

  let taskDate = document.createElement("div");

  taskDate.classList.add("task-date");

  let date = new Date(Date.now());

  taskDate.innerText = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} `;

  task.appendChild(taskDate);

  let removeTask = document.createElement("div");

  removeTask.classList.add("delete");

  removeTask.innerHTML = `<div class="remove"></div>
  <i class="fa-solid fa-trash btn btn-danger"></i>`;

  task.appendChild(removeTask);

  task.setAttribute("data-id", `${id}`);

  list?.prepend(task);
}

// Add Task And Check Reset Control Status

function addTask() {
  if (titleInput.value.length > 0) {
    createTaskStorege(titleInput.value, Date.now());
    titleInput.value = "";

    createRealTaskOnPage(createdTasks);
    if (removeAllTasks) {
      if (removeAllTasks.classList.contains("disabled")) {
        removeAllTasks?.classList.remove("disabled");
        removeAllTasks?.classList.remove("btn-secondary");
        removeAllTasks?.classList.add("btn-danger");
      }
    }
  }
}

// Add Task On Clicked Or Pressed Enter

if (add) {
  add.addEventListener("click", () => {
    addTask();
  });
}

if (titleInput) {
  titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
}
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// Add Task To Tasks Array

function createTaskStorege(title: string, date: number) {
  let task = {
    id: date,
    title: title,
    completed: false,
  };

  createdTasks.push(task);

  addToLocalStorege(createdTasks);
}

// looping On Tasks Array To Add To The Page

function createRealTaskOnPage(tasks: Task[]) {
  if (list) {
    list.innerHTML = "";
  }
  tasks.forEach((e) => {
    createNewTask(e.title, e.id);
  });
  if (tasksNumberSpan) tasksNumberSpan.innerHTML = `${tasks.length}`;
}

// Add Tasks Array To Local Storege

function addToLocalStorege(tasks: Task[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get Data From Local Storege

function getDataFromLocalStorege() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    createRealTaskOnPage(tasks);
    if (tasks.length < 1) {
      if (removeAllTasks) {
        removeAllTasks.classList.remove("btn-danger");
        removeAllTasks.classList.add("btn-secondary");
        removeAllTasks.classList.add("disabled");
      }
    } else {
      if (removeAllTasks) {
        removeAllTasks.classList.add("btn-danger");
        removeAllTasks.classList.remove("btn-secondary");
        removeAllTasks.classList.remove("disabled");
      }
    }
  } else {
    if (removeAllTasks) {
      removeAllTasks.classList.remove("btn-danger");
      removeAllTasks.classList.add("btn-secondary");
      removeAllTasks.classList.add("disabled");
    }
  }
}

if (list) {
  list.addEventListener("click", (ele) => {
    let target = ele.target as HTMLElement;

    if (target.classList.contains("remove")) {
      let parentElement = target.parentNode as HTMLElement;
      let removedElement = parentElement.parentNode as HTMLElement;
      let removedElementId: string | null =
        removedElement.getAttribute("data-id");

      if (removedElementId) {
        if (deleteElementFromLocalStorege(removedElementId) < 1) {
          localStorage.clear();
          if (removeAllTasks) {
            removeAllTasks?.classList.remove("btn-danger");
            removeAllTasks?.classList.add("btn-secondary");
            removeAllTasks?.classList.add("disabled");
          }
        } else {
          if (removeAllTasks) {
            removeAllTasks?.classList.add("btn-danger");
            removeAllTasks?.classList.remove("btn-secondary");
            removeAllTasks?.classList.remove("disabled");
          }
        }

        removedElement.remove();
        if (tasksNumberSpan) {
          let parseIntTasksNums = parseInt(tasksNumberSpan.innerHTML);

          tasksNumberSpan.innerHTML = `${parseIntTasksNums - 1}`;
        }
      }
    }
  });
}

// Deleta Task As ID

function deleteElementFromLocalStorege(taskId: string): number {
  let id: number = +taskId;

  let dataFromLocalStorege = window.localStorage.getItem("tasks");
  if (dataFromLocalStorege) {
    let tasksFromStorege = JSON.parse(dataFromLocalStorege);

    let tasksWithOutRemovedTask = tasksFromStorege.filter(
      (task: Task) => +task.id != +taskId
    );

    window.localStorage.setItem(
      "tasks",
      JSON.stringify(tasksWithOutRemovedTask)
    );

    if (typeof tasksWithOutRemovedTask.length == "number")
      return tasksWithOutRemovedTask.length;
  }
  return 0;
}

// Interfaces

interface Task {
  title: string;
  id: number;
}
