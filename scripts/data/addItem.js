import { getLocalStorageData } from "../utilities/localStorage.js";
import { getSubmitValue } from "./getSubmitValue.js";

export function addItem(event) {
  // console.log("addItem");
  event.preventDefault();

  const task = getSubmitValue(this);
  // console.log(`addItem task`, task);

  const tasks = getLocalStorageData("tasks") || [];
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // event.preventDefault();
  //阻止 form 表單的預設行為 > 送出 > reload
}
