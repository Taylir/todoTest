const task = document.querySelector("#task");

task.checked && task.classList.add("checked");

task.addEventListener("click", () => task.classList.toggle("checked"));
