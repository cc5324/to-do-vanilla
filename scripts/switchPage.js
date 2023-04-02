import { populateList } from "./view/populateList.js";
initNav();

function initNav() {
  const nav = document.querySelector("nav");
  nav.addEventListener("click", function (event) {
    switchPage(event);
    clear();
    populateList();
  });
}

// const nav = document.querySelector("nav");
// const tabs = nav.querySelectorAll("nav li");
// const containers = document.querySelectorAll(".tasks > div");

function clear() {
  const containers = document.querySelectorAll(".tasks > div");

  containers.forEach((container) => {
    container.textContent = "";
  });
}

// function foo(from, to) {
//   隱藏(from, to);
//   顯示(to);
//   // if (from === 'xxx' && to === 'yyy') {
//   //   // 隱藏 xxx，顯示 yyy
//   //   隱藏("xxx");
//   //   顯示("yyy");
//   // }
// }

function switchPage(event) {
  if (!event.target.matches("nav li")) return;

  const tabs = document.querySelectorAll("nav li");
  tabs.forEach((li) => {
    if (li === event.target) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

function getCurrentPage() {
  const tabs = document.querySelectorAll("nav li");
  return [...tabs].find((li) => li.classList.contains("active")).dataset.page;
}

export { initNav, getCurrentPage };
