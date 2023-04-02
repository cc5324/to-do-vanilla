import { getSubmitValue } from "../data/getSubmitValue.js";

export function createTask(info) {
  const container = document.querySelector(".tasks");
  const importantArea = document.querySelector(".tasks_important");
  const commonArea = document.querySelector(".tasks_common");
  const doneArea = document.querySelector(".tasks_done");

  const taskInfo = info || getSubmitValue(this);

  const template = document.querySelector("template");
  const task = template.content.cloneNode(true);
  fillInfo(task, taskInfo);
  // console.log(`準備 append task`);

  if (taskInfo.done) {
    doneArea.appendChild(task);
    // console.log(`task is done`);
  } else if (taskInfo.important) {
    // console.log(`task is important`);
    importantArea.appendChild(task);
  } else {
    commonArea.appendChild(task);
  }
}

function fillInfo(taskNode, taskInfo) {
  const {
    id,
    text,
    date,
    dateShort,
    time,
    filePath,
    fileName,
    comment,
    important,
    done,
  } = taskInfo;
  const get = (selector) => taskNode.querySelector(selector);
  //head 部份
  const task = get("form");
  task.setAttribute("id", `${id}`);
  if (done) task.classList.add("task--done");
  if (important) task.classList.add("task--important");

  const checkbox = get("input[name=checkbox]");
  if (done) checkbox.setAttribute("checked", "");

  const title = get("input[name=item]");
  title.value = text;

  const star = get(".task_marker_star");
  star.classList.add(important ? "fa" : "far");

  const ddlHint = get(".task_hint_deadline");
  checkTaskHint(ddlHint, dateShort);
  if (dateShort) ddlHint.insertAdjacentHTML("beforeend", `${dateShort}`);

  const fileHint = get(".task_hint_file");
  checkTaskHint(fileHint, filePath);

  const commentHint = get(".task_hint_comment");
  checkTaskHint(commentHint, comment);

  //body 部份
  const dateInput = get("input[name=date]");
  dateInput.value = date;

  const timeInput = get("input[name=time]");
  timeInput.value = time;

  const fileInput = get("input[type=file]");
  // fileInput.value = filePath || "";
  //因為安全問題，無法幫 input[type="file"]預設路徑 value

  const fileNameBox = get(".file_name");
  fileNameBox.textContext = fileName;

  const commentInput = get("textarea[name=comment]");
  commentInput.textContext = commentHint;
}

function checkTaskHint(item, status) {
  if (status) {
    item.classList.remove("hidden");
  } else {
    item.classList.add("hidden");
  }
}
