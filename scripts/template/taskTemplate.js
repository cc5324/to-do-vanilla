//踩雷記：textarea 不支援 value，要直接放在 <textarea></textarea> 裡面
function getTaskTemplate(taskInfo) {
  return `
<form class="task ${taskInfo.done ? "task--done" : ""} ${
    taskInfo.important ? "task--important" : ""
  }" id="${taskInfo.id}" draggable="true">
  <div class="task_head">
    <i class="fas fa-ellipsis-v"></i>
    <div class="task_title">
      <input type="checkbox" id="" aria-label="check" ${
        taskInfo.done ? "checked" : ""
      }/>
      <input
        type="text"
        name="item"
        value="${taskInfo.text}"
        disabled
      />
      <div class="task_marker">
        <i
          class="${
            taskInfo.important ? "fa" : "far"
          } fa-solid fa-star task_marker_star"
        ></i>
        <i class="fa fa-light fa-pen task_marker_pen"></i>
      </div>
    </div>
    <div class="task_hint">
      <span class="task_hint_deadline ${showAccordingToStatus(
        taskInfo.date
      )}" ><i class="far fa-calendar-alt"></i>&thinsp;${
    taskInfo.dateShort
  }</span>
      <i class="far fa-file fa-fw task_hint_file ${showAccordingToStatus(
        taskInfo.fileName
      )}" ></i>
      <i class="far fa-comment-dots task_hint_comment ${showAccordingToStatus(
        taskInfo.comment
      )}" ></i>
    </div>
  </div>
  <div class="task_body hidden">
    <div class="task_detail">
        <div class="task_detail_item deadline">
          <div class="task_detail_subtitle">
            <i class="far fa-calendar-alt"></i>
            <span class="subtitle-font">Deadline</span>
          </div>
          <div class="task_detail_inputs">
            <input type="date" name="date" value="${taskInfo.date}"/>
            <input type="time" name="time" value="${taskInfo.time}"/>
          </div>
        </div>
        <div class="task_detail_item file">
          <div class="task_detail_subtitle">
            <i class="far fa-file"></i>
            <span class="subtitle-font">File</span>
          </div>
          <div class="task_detail_inputs">
            <div class="file_name"><div>${taskInfo.fileName}</div></div>
            <label class="file_custom">
              <input type="file" name="file" value="${taskInfo.filePath}">
              <span class="file_custom_input" >+</span>
            </label>
          </div>
        </div>
        <div class="task_detail_item comment">
          <div class="task_detail_subtitle">
            <i class="far fa-comment-dots"></i>
            <span class="subtitle-font">Comment</span>
          </div>
          <div class="task_detail_inputs">
            <textarea
              name="comment"
              id=""
              cols="30"
              rows="10"
            >${taskInfo.comment}</textarea>
          </div>
        </div>
    </div>
    <div class="task_button_group">
      <button type="reset" name="cancel">X Cancel</button>
      <button type="submit" name="save">+ Save</button>
    </div>
  </div>
</form>
  `;
}

function showAccordingToStatus(status) {
  if (!status) {
    return "hidden";
  } else {
    return "";
  }
}

export { getTaskTemplate };
