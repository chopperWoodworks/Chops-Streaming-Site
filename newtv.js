let TopMenuButtons = document.querySelectorAll(
  ".PageSwapbt_PageSwapbtns_back_PageSwapbtn",
);
const SearchMenuSection = document.querySelector(".searchmenuSection");
const SearchMenu = document.querySelector(".searchmenu");
const searchMenuBackground = document.querySelector(".searchmenubackground");
const SearchButton = document.querySelector(".search");
const SearchMenuCloseButton = document.querySelector(
  ".searchmenu_title_closebtn",
);
function clearTopMenuactivebutton() {
  let activebutton = document.querySelector(".active");
  activebutton.classList.toggle("active");
}

function SetTopMenuactivebutton(button) {
  button.classList.toggle("active");
}

function ShowSearchMenuSection() {
  SearchMenuSection.classList.toggle("Hidden");
}

SearchButton.addEventListener("click", () => {
  ShowSearchMenuSection();
});

SearchMenuCloseButton.addEventListener("click", () => {
  ShowSearchMenuSection();
});
