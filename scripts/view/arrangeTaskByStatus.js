const importantArea = document.querySelector(".tasks_important");
const commonArea = document.querySelector(".tasks_common");
const doneArea = document.querySelector(".tasks_done");

export function arrangeElement(event) {
  const currentTask = event.target.closest(".task");
  const isDone = currentTask.classList.contains("task--done");
  const isImportant = currentTask.classList.contains("task--important");

  if (isDone) {
    doneArea.insertAdjacentElement("afterbegin", currentTask);
    return;
  }

  if (isImportant) {
    importantArea.insertAdjacentElement("afterbegin", currentTask);
    return;
  }

  commonArea.insertAdjacentElement("beforeend", currentTask);
}
