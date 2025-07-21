const task = document.querySelector("#task");
const addTask = document.querySelector(".addTask");

task.checked && task.classList.add("checked");
task.addEventListener("click", () => task.classList.toggle("checked"));

addTask.addEventListener("click", () => {
  const newTask = document.createElement("input");
  newTask.classList.add("newInput");
  addTask.parentElement.appendChild(newTask);
  newTask.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {

    }
  })
})
