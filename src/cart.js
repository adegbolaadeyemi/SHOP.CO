const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const cancelIcon = document.getElementById("cancel-icon");
menuIcon.addEventListener("click", function () {
  mobileNav.style.display = "flex";
});
cancelIcon.addEventListener("click", function () {
  mobileNav.style.display = "none";
});
