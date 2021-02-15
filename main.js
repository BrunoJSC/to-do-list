const input = document.querySelector("#textInput");
const button = document.querySelector("#button-add");

const list = document.querySelector("#list");

function createInput() {
  const li = createLi();

  li.innerText = input.value;
  clear(li);
}

function clear(li) {
  li.innerText += " ";
  const clearButton = document.createElement("button");
  clearButton.innerText = " Clear ";
  clearButton.setAttribute("class", "clear");
  li.appendChild(clearButton);
  saveTasks();
}

function clearInput() {
  input.value = " ";
  input.focus();
}

function createLi() {
  const li = document.createElement("li");

  list.appendChild(li);

  return li;
}

function inputInner() {
  if (!input.value) return;
  createInput(input.value);
}

button.addEventListener("click", function () {
  createInput();
  inputInner();
  clearInput();
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("clear")) {
    el.parentElement.remove();
    saveTasks();
  }
});

function saveTasks() {
  const liTask = list.querySelectorAll("li");
  const listTask = [];

  for (let task of liTask) {
    let taskText = task.innerText;
    taskText = taskText.replace("clear", " ").trim();

    listTask.push(taskText);
  }

  const saveTask = JSON.stringify(listTask);
  localStorage.setItem("task", saveTask);
}

function addSaveTasks() {
  const tasks = localStorage.getItem("task");
  const listTasks = JSON.parse(tasks);
  
  for (let task of listTasks) {
    createInput(task);
  }

  console.log(listTasks);
}

addSaveTasks();