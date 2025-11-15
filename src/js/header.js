const burger = document.getElementById("burger-menu");
const burgerMenu = document.querySelector(".nav-buttons");


burger.addEventListener("click", () => {
  burgerMenu.classList.toggle("show");
});
