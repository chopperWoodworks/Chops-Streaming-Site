const APIKEY = "d8f1a9c985f12819bb82378a65008c32";
function Homepage() {
  const movieimg = document.querySelector(".Thumbnail img");
  const movietitle = document.querySelector(".Thumbnail h3");
  movietitle.textContent = "Invincible";
  movieimg.src = `https://image.tmdb.org/t/p/original/dfmPbyeZZSz3bekeESvMJaH91gS.jpg`;
}
window.onload = () => {
  Homepage();
};
