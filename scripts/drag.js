import { getLocalStorageData } from "./utilities/localStorage.js";
// import { populateList } from "./view/populateList.js";

const areas = document.querySelectorAll(".tasks > div");
areas.forEach((area) => {
  area.addEventListener("dragstart", addDragging);
  area.addEventListener("dragover", dropElement);
  area.addEventListener("dragend", function (event) {
    removeDragging(event);
    recordTaskOrder.call(this);
    // populateList();
  });
});
const taskArea = document.querySelector(".tasks");
// taskArea.addEventListener("dragstart", addDragging);
// taskArea.addEventListener("dragover", function (event) {
//   dropElement(event);
// });
// taskArea.addEventListener("dragend", function (event) {
//   removeDragging(event);
//   recordTaskOrder();
//   // populateList();
// });

function addDragging(event) {
  console.log("開始 drag");
  event.target.classList.add("dragging");
}

function removeDragging(event) {
  console.log("結束 drag");
  event.target.classList.remove("dragging");
}

// taskArea.addEventListener("dragover", dropElement);
// taskArea.addEventListener("dragover", function (event) {
//   dropElement(event);
// });

function dropElement(event) {
  console.log("drag over");

  event.preventDefault();
  const draggable = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(this, event.clientY);
  // console.log(afterElement);

  if (afterElement) {
    console.log(`draggable`, draggable);
    this.insertBefore(draggable, afterElement);
  } else {
    this.appendChild(draggable);
  }
}

function getDragAfterElement(container, draggingCoordY) {
  const draggableElements = [
    ...container.querySelectorAll(".task:not(dragging)"),
  ];
  return draggableElements.reduce(
    (closest, draggableElement) => {
      const elementCoords = draggableElement.getBoundingClientRect();
      const offset =
        draggingCoordY - elementCoords.top - elementCoords.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: draggableElement };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function recordTaskOrder() {
  console.log("in record task order");
  const tasks = this.querySelectorAll(".task");
  const tasksOrder = [...tasks].map((task) => +task.getAttribute("id"));

  const taskInfos = getLocalStorageData("tasks");
  const newTaskInfos = taskInfos
    .map((taskInfo) => {
      taskInfo["order"] = tasksOrder.indexOf(taskInfo.id);
      return taskInfo;
    })
    .sort((a, b) => a.order - b.order);

  console.log(`newTaskInfo`, newTaskInfos);
  localStorage.setItem("tasks", JSON.stringify(newTaskInfos));
  console.log(getLocalStorageData("tasks"));
}

export { getDragAfterElement, dropElement, addDragging, removeDragging };
