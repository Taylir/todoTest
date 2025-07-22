const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");
const emptyImage = document.querySelector(".empty-image")

function toggleEmptyState() {
  emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
}

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) {
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="checkbox">
    <span>${taskText}</span>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
  toggleEmptyState();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    addTask(e);
  }
})
