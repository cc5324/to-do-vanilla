import {
  getByTestId,
  fireEvent,
  getByRole,
  getByText,
} from "@testing-library/dom";
import "@testing-library/jest-dom";
import timekeeper from "timekeeper";

import { showCreateTask, clearCreateTask } from "../view/toggleEditArea.js";
import { addItem } from "../data/addItem.js";
import { createTask } from "../view/createTask.js";

/**
 * 新增任務的過程
 * 1. 事件綁定在 add task 的按鈕上
 * 2. 事件觸發會顯現編輯區域
 * 3. 編輯完畢，提交事件綁定在 submit button 上
 * 4. 新增 task card
 * +5. 取消新增
 * +6. 即時渲染編輯中的卡片
 */

beforeAll(() => {
  // Lock Time: 因為 task id 是使用 new Date value，所以要 mock Date
  // timekeeper.freeze(new Date("2022-06-10"));
  jest.spyOn(Date.prototype, "valueOf").mockReturnValue(1654819200000);
});

afterAll(() => {
  // Unlock Time: 移除 mock Date
  // timekeeper.reset();
  jest.restoreAllMocks();
});

// 測試是否有存入 localStorage 的動作
jest.spyOn(window.localStorage.__proto__, "setItem");
// window.localStorage.__proto__.setItem = jest.fn();

// afterEach(() => {
//   document.body.innerHTML = "";
// });

describe("測試新增任務", () => {
  document.body.innerHTML = `
      <main>
      <div class="container">
        <button class="add_task" id="addTask" data-testid='addTask'>
          <span>+</span>
          <span>Add Task</span>
        </button>
        <section class="create_task">
          <form class="task hidden" action="" id="createTask" data-testid='createTask'>
            <div class="task_head">
              <div class="task_title">
                <input type="checkbox" aria-label="check" disabled />
                <input
                  type="text"
                  name="item"
                  placeholder="Type Something Here..."
                  required
                  data-testid="title"
                />
                <div class="task_marker">
                  <i class="far fa-solid fa-star task_marker_star"></i>
                  <i class="fa fa-light fa-pen task_marker_pen"></i>
                </div>
              </div>
              <div class="task_hint">
                <span class="task_hint_deadline hidden"
                  ><i class="far fa-calendar-alt"></i
                ></span>
                <i class="far fa-file fa-fw task_hint_file hidden"></i>
                <i class="far fa-comment-dots task_hint_comment hidden"></i>
              </div>
            </div>
            <div class="task_body">
              <div class="task_detail">
                <div class="task_detail_item deadline">
                  <div class="task_detail_subtitle">
                    <i class="far fa-calendar-alt"></i>
                    <span class="subtitle-font">Deadline</span>
                  </div>
                  <div class="task_detail_inputs">
                    <input type="date" name="date" data-testid="date"/>
                    <input type="time" name="time" />
                  </div>
                </div>
                <div class="task_detail_item file">
                  <div class="task_detail_subtitle">
                    <i class="far fa-file"></i>
                    <span class="subtitle-font">File</span>
                  </div>
                  <div class="task_detail_inputs">
                    <div class="file_name"></div>
                    <label class="file_custom" data-file="">
                      <input type="file" name="file" data-file="" />
                      <span class="file_custom_input" data-file="">+</span>
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
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="task_button_group">
                <button type="reset" name="cancel">X Cancel</button>
                <button type="submit" name="save" form="createTask">
                  + Save
                </button>
              </div>
            </div>
          </form>
        </section>
        <section class="tasks" data-testid="listArea"></section>
        <p class="status-font task_count">4 tasks left</p>
      </div>
      <template>
        <form class="task" id="" draggable="true">
          <div class="task_head">
            <i class="fas fa-ellipsis-v"></i>
            <div class="task_title">
              <input type="checkbox" name="checkbox" id="" aria-label="check" />
              <input type="text" name="item" value="" disabled />
              <div class="task_marker">
                <i class="far fa-solid fa-star task_marker_star"></i>
                <i class="fa fa-light fa-pen task_marker_pen"></i>
              </div>
            </div>
            <div class="task_hint">
              <span class="task_hint_deadline hidden"
                ><i class="far fa-calendar-alt"></i>&thinsp;</span
              >
              <i class="far fa-file fa-fw task_hint_file hidden"></i>
              <i class="far fa-comment-dots task_hint_comment hidden"></i>
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
                  <input type="date" name="date" value="" />
                  <input type="time" name="time" value="" />
                </div>
              </div>
              <div class="task_detail_item file">
                <div class="task_detail_subtitle">
                  <i class="far fa-file"></i>
                  <span class="subtitle-font">File</span>
                </div>
                <div class="task_detail_inputs">
                  <div class="file_name"><div></div></div>
                  <label class="file_custom">
                    <input type="file" name="file" value="" />
                    <span class="file_custom_input">+</span>
                  </label>
                </div>
              </div>
              <div class="task_detail_item comment">
                <div class="task_detail_subtitle">
                  <i class="far fa-comment-dots"></i>
                  <span class="subtitle-font">Comment</span>
                </div>
                <div class="task_detail_inputs">
                  <textarea name="comment" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
            </div>
            <div class="task_button_group">
              <button type="reset" name="cancel">X Cancel</button>
              <button type="submit" name="save">+ Save</button>
            </div>
          </div>
        </form>
      </template>
    </main>
  `;
  const createArea = getByTestId(document.body, "createTask");

  test("展開創建區域", () => {
    const addButton = getByTestId(document.body, "addTask");
    addButton.addEventListener("click", showCreateTask);
    fireEvent.click(addButton);
    // addButton.click();
    // addButton.dispatchEvent(new Event("click", { bubbles: true }));
    // fireEvent(addButton, new MouseEvent("click", { bubbles: true }));

    // const createArea = getByTestId(document.body, "createTask");
    expect(createArea).not.toHaveClass("hidden");
    expect(createArea).toBeVisible();
  });

  test("提交後新增任務卡片", () => {
    const listArea = getByTestId(document.body, "listArea");

    createArea.addEventListener("submit", function (event) {
      event.preventDefault();
      addItem.call(this, event);
      createTask.call(this, event);
      // const newTask = createTask.call(this, event);
      // listArea.appendChild(newTask);
      clearCreateTask(event);
    });

    const title = getByTestId(document.body, "title");
    fireEvent.change(title, { target: { value: "buy cookie" } });

    fireEvent.submit(createArea);
    expect(listArea.innerHTML).toMatchSnapshot();
  });

  test("是否存入 localStorage", () => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

test("測試新增任務", () => {
  document.body.innerHTML = `
      <main>
      <div class="container">
        <button class="add_task" id="addTask" data-testid='addTask'>
          <span>+</span>
          <span>Add Task</span>
        </button>
        <section class="create_task">
          <form class="task hidden" action="" id="createTask" data-testid='createTask'>
            <div class="task_head">
              <div class="task_title">
                <input type="checkbox" aria-label="check" disabled />
                <input
                  type="text"
                  name="item"
                  placeholder="Type Something Here..."
                  required
                  data-testid="title"
                />
                <div class="task_marker">
                  <i class="far fa-solid fa-star task_marker_star"></i>
                  <i class="fa fa-light fa-pen task_marker_pen"></i>
                </div>
              </div>
              <div class="task_hint">
                <span class="task_hint_deadline hidden"
                  ><i class="far fa-calendar-alt"></i
                ></span>
                <i class="far fa-file fa-fw task_hint_file hidden"></i>
                <i class="far fa-comment-dots task_hint_comment hidden"></i>
              </div>
            </div>
            <div class="task_body">
              <div class="task_detail">
                <div class="task_detail_item deadline">
                  <div class="task_detail_subtitle">
                    <i class="far fa-calendar-alt"></i>
                    <span class="subtitle-font">Deadline</span>
                  </div>
                  <div class="task_detail_inputs">
                    <input type="date" name="date" data-testid="date"/>
                    <input type="time" name="time" />
                  </div>
                </div>
                <div class="task_detail_item file">
                  <div class="task_detail_subtitle">
                    <i class="far fa-file"></i>
                    <span class="subtitle-font">File</span>
                  </div>
                  <div class="task_detail_inputs">
                    <div class="file_name"></div>
                    <label class="file_custom" data-file="">
                      <input type="file" name="file" data-file="" />
                      <span class="file_custom_input" data-file="">+</span>
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
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="task_button_group">
                <button type="reset" name="cancel">X Cancel</button>
                <button type="submit" name="save" form="createTask">
                  + Save
                </button>
              </div>
            </div>
          </form>
        </section>
        <section class="tasks" data-testid="listArea"></section>
        <p class="status-font task_count">4 tasks left</p>
      </div>
      <template>
        <form class="task" id="" draggable="true">
          <div class="task_head">
            <i class="fas fa-ellipsis-v"></i>
            <div class="task_title">
              <input type="checkbox" name="checkbox" id="" aria-label="check" />
              <input type="text" name="item" value="" disabled />
              <div class="task_marker">
                <i class="far fa-solid fa-star task_marker_star"></i>
                <i class="fa fa-light fa-pen task_marker_pen"></i>
              </div>
            </div>
            <div class="task_hint">
              <span class="task_hint_deadline hidden"
                ><i class="far fa-calendar-alt"></i></span
              >
              <i class="far fa-file fa-fw task_hint_file hidden"></i>
              <i class="far fa-comment-dots task_hint_comment hidden"></i>
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
                  <input type="date" name="date" value="" />
                  <input type="time" name="time" value="" />
                </div>
              </div>
              <div class="task_detail_item file">
                <div class="task_detail_subtitle">
                  <i class="far fa-file"></i>
                  <span class="subtitle-font">File</span>
                </div>
                <div class="task_detail_inputs">
                  <div class="file_name"><div></div></div>
                  <label class="file_custom">
                    <input type="file" name="file" value="" />
                    <span class="file_custom_input">+</span>
                  </label>
                </div>
              </div>
              <div class="task_detail_item comment">
                <div class="task_detail_subtitle">
                  <i class="far fa-comment-dots"></i>
                  <span class="subtitle-font">Comment</span>
                </div>
                <div class="task_detail_inputs">
                  <textarea name="comment" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
            </div>
            <div class="task_button_group">
              <button type="reset" name="cancel">X Cancel</button>
              <button type="submit" name="save">+ Save</button>
            </div>
          </div>
        </form>
      </template>
    </main>
  `;

  const addButton = getByTestId(document.body, "addTask");
  addButton.addEventListener("click", showCreateTask);
  fireEvent.click(addButton);
  // addButton.click();
  // addButton.dispatchEvent(new Event("click", { bubbles: true }));
  // fireEvent(addButton, new MouseEvent("click", { bubbles: true }));

  const createArea = getByTestId(document.body, "createTask");
  expect(createArea).not.toHaveClass("hidden");
  expect(createArea).toBeVisible();
  const listArea = getByTestId(document.body, "listArea");

  createArea.addEventListener("submit", function (event) {
    event.preventDefault();
    addItem.call(this, event);
    createTask.call(this, event);
    // const newTask = createTask.call(this, event);
    // listArea.appendChild(newTask);
    clearCreateTask(event);
  });

  const title = getByTestId(document.body, "title");
  fireEvent.change(title, { target: { value: "buy cookie" } });

  const date = getByTestId(document.body, "date");
  fireEvent.change(date, { target: { value: "2022-06-10" } });

  fireEvent.submit(createArea);
  expect(listArea.innerHTML).toMatchSnapshot();

  const expectCard = `
        <form class="task" id="1654819200000" draggable="true">
          <div class="task_head">
            <i class="fas fa-ellipsis-v"></i>
            <div class="task_title">
              <input type="checkbox" name="checkbox" id="" aria-label="check">
              <input type="text" name="item" value="" disabled="">
              <div class="task_marker">
                <i class="far fa-solid fa-star task_marker_star"></i>
                <i class="fa fa-light fa-pen task_marker_pen"></i>
              </div>
            </div>
            <div class="task_hint">
              <span class="task_hint_deadline"><i class="far fa-calendar-alt"></i>06/10</span>
              <i class="far fa-file fa-fw task_hint_file hidden"></i>
              <i class="far fa-comment-dots task_hint_comment hidden"></i>
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
                  <input type="date" name="date" value="">
                  <input type="time" name="time" value="">
                </div>
              </div>
              <div class="task_detail_item file">
                <div class="task_detail_subtitle">
                  <i class="far fa-file"></i>
                  <span class="subtitle-font">File</span>
                </div>
                <div class="task_detail_inputs">
                  <div class="file_name"><div></div></div>
                  <label class="file_custom">
                    <input type="file" name="file" value="">
                    <span class="file_custom_input">+</span>
                  </label>
                </div>
              </div>
              <div class="task_detail_item comment">
                <div class="task_detail_subtitle">
                  <i class="far fa-comment-dots"></i>
                  <span class="subtitle-font">Comment</span>
                </div>
                <div class="task_detail_inputs">
                  <textarea name="comment" id="" cols="30" rows="10"></textarea>
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

  expect(listArea.innerHTML).toBe(expectCard);
});
