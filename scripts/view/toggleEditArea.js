import { hideElements } from "../utilities/toggleHidden.js";
import { toggleStar } from "./toggleStatus.js";

const createTasks = document.querySelector("#createTask");
const hints = document.querySelectorAll(".task_hint > *");

function showCreateTask(event) {
  const createTasks = document.querySelector("#createTask");
  createTasks.classList.toggle("hidden");
  // event.target.nextElementSibling
  //   .querySelector("form")
  //   .classList.toggle("hidden");
}

function clearCreateTask(event) {
  //測試
  const createTasks = document.querySelector("#createTask");

  createTasks.reset();
  // toggleStar(event);
  hideElements([...hints, createTasks]);
  // [...hints, createTasks].forEach((ele) => {
  //   ele.classList.add("hidden");
  // });
  createTasks.classList.remove("task--important", "task--done");

  createTasks.querySelector(".task_marker_star").classList.add("far");
  createTasks.querySelector(".task_marker_star").classList.remove("fa");
  createTasks.querySelector(".file_name").textContent = "";
}

function showEditTask(event) {
  const currentTask = event.target.closest(".task");
  currentTask.classList.toggle("task--editing");
  currentTask.querySelector(".task_body").classList.toggle("hidden");
  currentTask.querySelector("input[name=item]").toggleAttribute("disabled");

  const tasks = this.querySelectorAll(".task");
  tasks.forEach((task) => {
    if (task !== currentTask) {
      task.classList.remove("task--editing");
      task.querySelector(".task_body").classList.add("hidden");
    }
  });
}

function clearEditTask(event) {
  const currentTask = event.target.closest(".task");
  currentTask.querySelector(".task_body").classList.add("hidden");
  currentTask.classList.remove("task--editing");

  if (event.target.matches("button[type=reset]")) {
    currentTask.reset();
  }
}

export { showCreateTask, clearCreateTask, showEditTask, clearEditTask };
