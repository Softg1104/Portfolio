console.log("Running the script");

const form = document.getElementById("schedule-form");
const tableBody = document.getElementById("schedule-table").getElementsByTagName("tbody")[0];
const notification = document.getElementById("notification");
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";

});


function showNotification() {
  notification.classList.remove("hidden");
  setTimeout(() => notification.classList.add("hidden"), 2000);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const eventName = document.getElementById("event").value;
    const time = document.getElementById("time").value;

    if (!date || !eventName || !time) {
        alert("Please fill in all fields.");
        return;
    }

    const newRow = tableBody.insertRow();
    newRow.classList.add("new-row"); 

    const dateCell = newRow.insertCell(0);
    const eventCell = newRow.insertCell(1);
    const timeCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    dateCell.textContent = date;
    eventCell.textContent = eventName;
    timeCell.textContent = time;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => newRow.remove());
    actionCell.appendChild(deleteBtn);

    showNotification();

    form.reset();
});

document.getElementById("clear-all").addEventListener("click", () => {
    tableBody.innerHTML = "";
});

form.addEventListener("input", (e) => {
  if (e.target.value) {
    e.target.classList.remove("input-error");
  }
});
