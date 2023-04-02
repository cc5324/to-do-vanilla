import { getLocalStorageData } from "../utilities/localStorage.js";

function getFilterTasks(status) {
  let tasks = getLocalStorageData("tasks") || [];

  // 改用物件
  const tasksByStatusMap = {
    main: tasks,
    progress: tasks.filter((task) => task.done !== true),
    complete: tasks.filter((task) => task.done === true),
  };
  return tasksByStatusMap[status] ?? tasks;

  // 原本的 switch case
  switch (status) {
    case "main":
      return tasks;
    case "progress":
      return tasks.filter((task) => task.done !== true);
    case "complete":
      return tasks.filter((task) => task.done === true);
    default:
      return tasks;
  }
}

export { getFilterTasks };
