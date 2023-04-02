import { getCurrentPage } from "../switchPage.js";
import { getFilterTasks } from "../data/filterItem.js";
import { createTask } from "./createTask.js";
// import { getTaskTemplate } from "../template/taskTemplate.js";
// const taskArea = document.querySelector(".tasks");

function populateList() {
  const currentPage = getCurrentPage();
  const tasks = getFilterTasks(currentPage);

  tasks.forEach((task) => {
    createTask(task);
  });
}

// function populateList(populateArea = taskArea) {
//   const currentPage = getCurrentPage();
//   const tasks = getFilterTasks(currentPage) || [];

//   importantArea.innerHTML = tasks
//     .filter((task) => task.important)
//     .map((plate) => getTaskTemplate(plate))
//     .join("");

//   const refreshListItems = tasks
//     .map((plate) => getTaskTemplate(plate))
//     .join("");
//   populateArea.innerHTML = refreshListItems;
// }

// function populateList(populateArea = taskArea) {
//   const currentPage = getCurrentPage();
//   const tasks = getFilterTasks(currentPage) || [];
//   const refreshListItems = tasks
//     .map((plate) => getTaskTemplate(plate))
//     .join("");
//   populateArea.innerHTML = refreshListItems;
// }

export { populateList };
