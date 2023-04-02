import { getLocalStorageData } from "../utilities/localStorage.js";
//事件監聽綁在 tasks 上

//儲存資料：編輯卡片用
function starTask(event) {
  const currentTask = event.target.closest(".task");
  const id = +currentTask.getAttribute("id");
  const tasks = getLocalStorageData("tasks") || [];

  const { item, index } = retrieveID(id, tasks);
  console.log(item, `item`);
  item.important = !item.important;

  let [task] = tasks.splice(index, 1);

  const { start, end } = getRange(tasks);

  if (item.important === true) {
    tasks.unshift(task);
  } else {
    tasks.splice(start, 0, task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//儲存資料
function doneTask(event) {
  const currentTask = event.target.closest(".task");
  const id = +currentTask.getAttribute("id");
  const tasks = getLocalStorageData("tasks") || [];

  const { item, index } = retrieveID(id, tasks);
  tasks[index].done = !tasks[index].done;

  //immutable??
  let [task] = tasks.splice(index, 1);

  //踩雷紀錄：splice 改變陣列，插入 index 的位置也要改變
  const { start, end } = getRange(tasks);

  if (end !== -1) {
    tasks.splice(end, 0, task);
  } else {
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 *根據 id 索引對應的資料及其 index
 * @param {Number} id
 * @param {[]} tasks
 * @returns {item, index}
 */
function retrieveID(id, tasks) {
  const index = tasks.findIndex((task) => task.id === id);
  const item = tasks[index];

  return { item, index };
}

//拿到 common task 的 index 範圍
function getRange(tasks) {
  const start = tasks.findIndex((task) => task.important === false);
  const end = tasks.findIndex((task) => task.done === true);

  return { start, end };
}

export { starTask, doneTask };
