function checkTaskHint(item, status) {
  if (!status) {
    item.classList.remove("hidden");
  } else {
    item.classList.add("hidden");
  }
}

function hideElements(elements) {
  elements.forEach((element) => {
    element.classList.add("hidden");
  });
}

export { checkTaskHint, hideElements };
