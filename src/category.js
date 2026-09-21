const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const cancelIcon = document.getElementById("cancel-icon");
const filterIcon = document.getElementById("filter-icon");
const mobileSidebar = document.getElementById("mobile-sidebar");
const clearIcon = document.getElementById("clear-icon");
menuIcon.addEventListener("click", function () {
  mobileNav.style.display = "flex";
});
cancelIcon.addEventListener("click", function () {
  mobileNav.style.display = "none";
});

filterIcon.addEventListener("click", function () {
  mobileSidebar.style.display = "flex";
});
clearIcon.addEventListener("click", function () {
  mobileSidebar.style.display = "none";
});

// SIZE BTN
const sizeButtons = document.querySelectorAll(".size-btn");

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sizeButtons.forEach((btn) => {
      btn.classList.remove("bg-[#1f2937]", "text-white");
      btn.classList.add("bg-gray-100", "text-gray-700");
    });

    button.classList.remove("bg-gray-100", "text-gray-700");
    button.classList.add("bg-[#1f2937]", "text-white");
  });
});

// COLOR
function selectColor(button) {
  document.querySelectorAll(".color").forEach((color) => {
    color.classList.remove("border-2", "border-[#1f2937]");

    color.innerHTML = "";
  });

  button.classList.add("border-2", "border-[#1f2937]");

  button.innerHTML = '<span class="text-white">✓</span>';
}
