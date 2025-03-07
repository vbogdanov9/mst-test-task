//ссылки навигации, прокрутка при клике
const menuItems = document.querySelectorAll(".menu__item");
if (menuItems.length > 0) {
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
      e.preventDefault();

      // если было активно меню бургер делаем неактивным
      if (burger.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        burger.classList.remove("_active");
        menuList.classList.remove("show");
      }
    });
  });
}

// burger открываем и закрываем меню при клике
const burger = document.querySelector(".burger");
const menuList = document.querySelector(".menu__list");
if (burger) {
  burger.addEventListener("click", (e) => {
    document.body.classList.toggle("_lock");
    burger.classList.toggle("_active");
    menuList.classList.toggle("show");
  });
}

// закрываем меню при клике на пустой области
const menu = document.querySelector(".menu");
document.addEventListener("click", (e) => {
  if (
    !e.composedPath().includes(menu) &&
    burger.classList.contains("_active")
  ) {
    document.body.classList.remove("_lock");
    burger.classList.remove("_active");
    menuList.classList.remove("show");
  }
});

// скрываем меню при нажатии на esc
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape" && burger.classList.contains("_active")) {
    document.body.classList.remove("_lock");
    burger.classList.remove("_active");
    menuList.classList.remove("show");
  }
});
