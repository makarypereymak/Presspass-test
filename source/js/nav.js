const button = document.querySelector(".page-header__nav-button");
const menu = document.querySelector(".page-header__list");
const modalGeo = document.querySelector(".modal--for-geo");

button.addEventListener('click', () => {
  if (menu.style.display === "none") {
    console.log(1);
    menu.style.display = "flex";
  } else {
    console.log(2);
    menu.style.display = "none";
  }
});

export {modalGeo};
