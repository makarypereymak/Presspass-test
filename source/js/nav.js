const button = document.querySelector(".page-header__nav-button");
const menu = document.querySelector(".page-header__nav");

button.addEventListener('click', () => {

  if (menu.classList.contains('page-header__nav--closed')) {
    menu.classList.remove('page-header__nav--closed');
    menu.classList.add('page-header__nav--active');
  } else {
    menu.classList.add('page-header__nav--closed');
    menu.classList.remove('page-header__nav--active');
  }
});
