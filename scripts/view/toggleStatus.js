//事件監聽綁在 tasks 上
//切換樣式：所有星星點擊共用
function toggleStar(event) {
  console.log("toggle star");
  if (!event.target.matches(".task_marker_star")) return;
  const currentTask = event.target.closest(".task");

  currentTask.classList.toggle("task--important");

  currentTask.querySelector(".task_marker_star").classList.toggle("far");
  currentTask.querySelector(".task_marker_star").classList.toggle("fa");
}

//切換樣式：勾選完成
function toggleDone(event) {
  const currentTask = event.target.closest(".task");
  currentTask.classList.toggle("task--done");
}

export { toggleStar, toggleDone };
