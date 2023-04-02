function getSubmitValue(form, previousFilePath) {
  console.log(`form`, form);
  const id = +form.getAttribute("id") || new Date().valueOf();
  const text = form.querySelector("input[name=item]").value;
  const date = form.querySelector("input[name=date]").value;
  const dateShort = convertDateFormat(date);
  const time = form.querySelector("input[name=time]").value;

  //! file update problem
  //因為安全問題，無法幫 input[type="file"]預設路徑 value，所以如果更新值為空，就選擇原本的預設值
  const filePath =
    form.querySelector("input[name=file]").value || previousFilePath || "";
  // const filePath = form.querySelector("input[name=file]").value;
  console.log(`filePath`, filePath);
  const fileName = getNameByFilePath(filePath);
  const comment = form.querySelector("textarea[name=comment]").value;

  const done = form.classList.contains("task--done");
  const important = form.classList.contains("task--important");

  return {
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
  };
}

function convertDateFormat(originalDateString) {
  const [year, month, day] = originalDateString.split("-");
  const dateShort = originalDateString ? `${month}/${day}` : "";
  return dateShort;
}

function getNameByFilePath(filePath) {
  return filePath.split(/(\\|\/)/g).pop();
}

export { getSubmitValue, convertDateFormat, getNameByFilePath };
