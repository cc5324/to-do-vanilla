import { convertDateFormat } from "../data/getSubmitValue.js";

//即時 render 新增的資訊
function renderChangingInfo(event) {
  const currentTask = event.target.closest(".task");
  if (event.target.matches("input[name=file]")) {
    updateFileName.call(currentTask, event);
  }

  if (event.target.matches("input[name=date]")) {
    updateDeadline.call(currentTask, event);
  }

  //* focus 要離開 textarea 才會觸發他的 change 事件！
  if (event.target.matches("textarea[name=comment]")) {
    updateComment.call(currentTask, event);
  }
}

function updateFileName(event) {
  const fileName = event.target.files[0].name;
  this.querySelector(".file_name").innerHTML = `<div>${fileName}<div>`;
  console.log(`update file this`, this);
  if (!fileName) {
    this.querySelector(".task_hint_file").classList.add("hidden");
  } else {
    this.querySelector(".task_hint_file").classList.remove("hidden");
  }
}

function updateDeadline(event) {
  console.log(`update ddl`);
  const date = event.target.value;
  const dateShort = convertDateFormat(date);
  const dateHint = this.querySelector(".task_hint_deadline");
  dateHint.innerHTML = `<span class="task_hint_deadline" ><i class="far fa-calendar-alt"></i>&thinsp;${dateShort}</span>`;

  if (!date) {
    console.log("if");
    this.querySelector(".task_hint_deadline").classList.add("hidden");
  } else {
    console.log("else");
    this.querySelector(".task_hint_deadline").classList.remove("hidden");
  }
}

function updateComment(event) {
  console.log("update comment");
  const comment = event.target.value;
  if (!comment) {
    console.log("if");
    this.querySelector(".task_hint_comment").classList.add("hidden");
  } else {
    console.log("else");
    this.querySelector(".task_hint_comment").classList.remove("hidden");
  }
}

export { renderChangingInfo };
