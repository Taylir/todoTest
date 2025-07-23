const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");
const emptyImage = document.querySelector(".empty-image");
const todosContainer = document.querySelector(".todos-container");
const progressBar = document.querySelector("#progress");
const progressNumbers = document.querySelector("#numbers");

function toggleEmptyState() {
  emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
  todosContainer.style.width = taskList.children.length > 0 ? "100%" : "50%";
}

function updateProgress(checkCompletion = true) {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".checkbox:checked").length;

  progressBar.style.width = totalTasks
    ? `${(completedTasks / totalTasks) * 100}%`
    : "0%";
  progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
}

function loadTasks() {
  const saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  saveTasks.forEach(({ text, completed }) => addTask(text, completed, false));
  toggleEmptyState();
  updateProgress();
}

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => ({
    text: li.querySelector("span").textContent,
    completed: li.querySelector(".checkbox").checked,
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text, completed = false, checkCompletion = true) {
  const taskText = text || taskInput.value.trim();
  if (!taskText) {
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
    <span>${taskText}</span>
    <div class="task-buttons">
      <button class="edit-btn">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  const checkbox = li.querySelector(".checkbox");
  const editBtn = li.querySelector(".edit-btn");

  if (completed) {
    li.classList.add("completed");
    editBtn.disabled = true;
    editBtn.style.opacity = "0.5";
    editBtn.style.pointerEvents = "none";
  }

  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    li.classList.toggle("completed", isChecked);
    editBtn.disabled = isChecked;
    editBtn.style.opacity = isChecked ? "0.5" : 1;
    editBtn.style.pointerEvents = isChecked ? "none" : "auto";
    updateProgress();
    saveTasks();
  });

  editBtn.addEventListener("click", () => {
    if (!checkbox.checked) {
      taskInput.value = li.querySelector("span").textContent;
      li.remove();
      toggleEmptyState();
      updateProgress(false);
      saveTasks();
    }
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    toggleEmptyState();
    updateProgress();
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  toggleEmptyState();
  updateProgress(checkCompletion);
  saveTasks();
}

loadTasks();

addTaskBtn.addEventListener("click", () => {
  addTask();
});
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});
