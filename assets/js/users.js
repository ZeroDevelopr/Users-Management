document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems, {});

  const addUserButton = document.getElementById("add-user-button");
  const addUserModalBack = document.getElementById("add-user-modal-back");
  const addUserModal = document.getElementById("add-user-modal");
  
  addUserButton.addEventListener("click", () => {
    addUserModalBack.classList.remove("hidden");
    addUserModal.classList.add("show");
  });

  addUserModalBack.addEventListener("click", (e) => {
    e.target.classList.add("hidden");
    addUserModal.classList.remove("show");
  });
});
