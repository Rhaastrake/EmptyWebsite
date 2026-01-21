function updateServiceButtonLinks() {
  const buttons = document.querySelectorAll(".serviceButton, .serviceStartButton");
  const target = document.querySelector(".selectedServiceBox");

  buttons.forEach((btn) => {
    if (btn._scrollHandler) {
      btn.removeEventListener("click", btn._scrollHandler);
      btn._scrollHandler = null;
    }

    if (window.innerWidth <= 1200) {
      const scrollHandler = () => {
        if (target) target.scrollIntoView({ behavior: "smooth" });
      };
      btn._scrollHandler = scrollHandler;
      btn.addEventListener("click", scrollHandler);
    }
  });
}

window.addEventListener("DOMContentLoaded", updateServiceButtonLinks);
window.addEventListener("resize", updateServiceButtonLinks);
