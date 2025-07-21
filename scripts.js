const task = document.querySelector("#task");

task.addEventListener("change", (e) => {
  task.classList.toggle("checked")
  console.log(e.target.checked);
})
