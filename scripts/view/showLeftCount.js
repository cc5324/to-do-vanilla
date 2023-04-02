import { getFilterTasks } from "../data/filterItem.js";

export function updateLeft() {
  const count = document.querySelector(".task_count");
  const left = getFilterTasks("progress").length;
  // console.log(`getFilterTasks("complete")`, getFilterTasks("progress"));
  count.textContent = `${left} tasks left`;
}
