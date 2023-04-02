import { getLocalStorageData } from "../utilities/localStorage.js";
import { getSubmitValue } from "./getSubmitValue.js";

//this 綁定了 task
function editItem(event) {
  // console.log("edit item");
  event.preventDefault();
  const tasks = getLocalStorageData("tasks") || [];

  //踩雷記：從 DOM 元素 get attribute 拿到的 id 是字串，存在 localStorage 的是 number
  const currentTaskIndex = tasks.findIndex(
    (task) => task.id === +this.getAttribute("id")
  );
  const currentTaskInfo = tasks.find(
    (task) => task.id === +this.getAttribute("id")
  );

  //! filePath 儲存問題
  console.log(`currentTaskInfo`, currentTaskInfo);
  const filePath = currentTaskInfo.filePath || "";
  tasks[currentTaskIndex] = getSubmitValue(this, filePath);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(`tasks`, tasks);
}

export { editItem };
