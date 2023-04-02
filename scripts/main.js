import { populateList } from "./view/populateList.js";
import {
  showCreateTask,
  clearCreateTask,
  showEditTask,
  clearEditTask,
} from "./view/toggleEditArea.js";
import { renderChangingInfo } from "./view/renderChangeInfo.js";
import { addItem } from "./data/addItem.js";
import { createTask } from "./view/createTask.js";
import { starTask, doneTask } from "./data/updateStatus.js";
import { toggleStar, toggleDone } from "./view/toggleStatus.js";
import { editItem } from "./data/editItem.js";
import "./drag.js";
import { initNav } from "./switchPage.js";
import { arrangeElement } from "./view/arrangeTaskByStatus.js";
import { updateLeft } from "./view/showLeftCount.js";

initNav();

populateList();
updateLeft();

const addTaskButton = document.querySelector("#addTask");
const taskArea = document.querySelector(".tasks");
const createTasks = document.querySelector("#createTask");

addTaskButton.addEventListener("click", showCreateTask);
createTasks.addEventListener("change", renderChangingInfo);
createTasks.addEventListener("reset", clearCreateTask);
createTasks.addEventListener("click", toggleStar);

//踩雷記：原本用 click 事件，沒有辦法觸發 submit，HTML5不會幫忙驗證表單，所以 required 就沒有用
createTasks.addEventListener("submit", function (event) {
  event.preventDefault();
  addItem.call(this, event);
  createTask.call(this);
  clearCreateTask(event);
  // populateList();
  updateLeft();
});

//要監測三個東西 1.編輯 2.重要(星星) 3.打勾(完成)
taskArea.addEventListener("click", function (event) {
  if (event.target.matches(".task_marker_pen")) {
    showEditTask.call(this, event);
  }

  if (event.target.matches(".task_marker_star")) {
    toggleStar(event);
    starTask(event);

    // 改掉全部一次渲染
    // populateList();
    arrangeElement(event);
  }

  if (event.target.matches("input[type=checkbox]")) {
    toggleDone(event);
    doneTask(event);
    // 改掉全部一次渲染
    // populateList();
    arrangeElement(event);
    updateLeft();
  }
});

//編輯中：1. 即時 render
taskArea.addEventListener("change", renderChangingInfo);

//編輯後：提交 > 更新 localStorage > 重新渲染
taskArea.addEventListener("submit", function (event) {
  const currentTask = event.target.closest(".task");
  editItem.call(currentTask, event);
  clearEditTask(event);
  // populateList();
});

//取消編輯：提交 > 重新渲染
//踩雷記：reset 事件的 target 是 form 表單，不是 reset button
taskArea.addEventListener("reset", function (event) {
  console.log("聽到reset事件");
  console.log(event.target);
  clearEditTask(event);
  //! 要改 救命不會改
  //TODO 改掉全部一次渲染？
  renderChangingInfo(event);
  // populateList();
});
