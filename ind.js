const movielistHolderSecond = document.querySelector(".movielistHolderSecond");
movielistHolderSecond.innerHTML = ``;
const APIKEY = "d8f1a9c985f12819bb82378a65008c32";
let moviecount = 0;
async function LoadMoviesToList(page) {
  try {
    const GetAPI = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${page}`,
    );
    const JsonData = await GetAPI.json();

    JsonData.results.forEach((movie) => {
      const MovieCard = document.createElement("div");
      MovieCard.classList.add("movieThumbnail");

      MovieCard.innerHTML = ` 
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" />
        <h3>${movie.title}</h3>
                <div class="tagsHolder">
          <div class="movieThumbnailHDTag"><p>HD</p></div>
        </div>
    `;
      movielistHolderSecond.appendChild(MovieCard);
      moviecount++;
      MovieCard.addEventListener("click", () => {
        Movieplayer(movie.id, movie.title, movie.overview);
        console.log(movie.id);
      });
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    const movielistHolderSecond = document.querySelector(
      ".movielistHolderSecond",
    );
    movielistHolderSecond.innerHTML =
      "<p>Failed to load movies. Let Chopper know he cant code</p>";
  }
}

async function AddmoviesToList(page) {
  try {
    const GetAPI = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${page}`,
    );
    const JsonData = await GetAPI.json();
    const movielistHolderSecond = document.querySelector(
      ".movielistHolderSecond",
    );
    JsonData.results.forEach((movie) => {
      if (moviecount >= 36) return;
      const MovieCard = document.createElement("div");
      MovieCard.classList.add("movieThumbnail");

      MovieCard.innerHTML += ` 
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" />
        <div class="movieThumbnailimgholder"><h3>${movie.title}</h3></div>
                <div class="tagsHolder">
          <div class="movieThumbnailHDTag"><p>HD</p></div>
        </div>
    `;
      movielistHolderSecond.appendChild(MovieCard);
      moviecount++;
      MovieCard.addEventListener("click", () => {
        Movieplayer(movie.id, movie.title, movie.overview);
        console.log(movie.id);
      });
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}
let currentPage = 1;
window.onload = () => {
  movielistHolderSecond.innerHTML = ``;
  LoadMoviesToList(currentPage);
  AddmoviesToList(currentPage + 1);
  console.log(currentPage);
};

const NextBtn = document.querySelector(".NextBtn");
const PrevBtn = document.querySelector(".PrevBtn");
const searchInput = document.querySelector(".searchInput");
let alreadyloaded = [];
async function Searchformovie(value) {
  try {
    movielistHolderSecond.innerHTML = ``;
    let page = 1;
    while (page > 0) {
      const GetAPI = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&query=${encodeURIComponent(value)}`,
      );
      const JsonData = await GetAPI.json();

      if (page <= JsonData.total_pages) {
        JsonData.results.forEach((movie) => {
          if (movie.title) {
            if (alreadyloaded.includes(movie.title.toLowerCase())) return;
            alreadyloaded.push(movie.title.toLowerCase());
            const MovieCard = document.createElement("div");
            MovieCard.classList.add("movieThumbnail");
            console.log(movie.title.toLowerCase());
            MovieCard.innerHTML += ` 
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" />
        <h3>${movie.title}</h3>
                <div class="tagsHolder">
          <div class="movieThumbnailHDTag"><p>HD</p></div>
        </div>`;
            movielistHolderSecond.appendChild(MovieCard);
            moviecount++;
            MovieCard.addEventListener("click", () => {
              Movieplayer(movie.id, movie.title, movie.overview);
              console.log(movie.id);
            });
          }
        });
      }
    }
    page++;
  } catch (error) {
    console.error("Error searching for movies:", error);
  }
}

ScrolltoBottom = () => {
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, 100);
};
NextBtn.addEventListener("click", () => {
  currentPage++;
  currentPage++;
  LoadMoviesToList(currentPage);
  AddmoviesToList(currentPage + 1);
  console.log(currentPage);
  ScrolltoBottom();
});

PrevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    currentPage--;

    LoadMoviesToList(currentPage);
    AddmoviesToList(currentPage + 1);
    console.log(currentPage);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    movielistHolderSecond.innerHTML = ``;
    Searchformovie(searchInput.value);
    alreadyloaded = [];
    console.log(alreadyloaded);
    window.scrollTo({ bottom: 0, behavior: "smooth" });
  }
});

function Movieplayer(movieid, movietitle, movieoverview) {
  let playerHolder = document.querySelector(".playerHolder");
  let playerTitle = document.querySelector(".player h2");
  let playervid = document.querySelector(".player iframe");
  let playeroverview = document.querySelector(".player p");
  playervid.src = `https://vidsrc.mov/embed/movie/${movieid}`;
  playerTitle.textContent = movietitle;
  playeroverview.textContent = movieoverview;
  playerHolder.style.display = "block";
  movielistHolderSecond.innerHTML = ``;
}

const ToTopbtn = document.querySelector(".ToTopBtn");
ToTopbtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const closeBtn = document.querySelector(".CloseBtn");
closeBtn.addEventListener("click", () => {
  let playerHolder = document.querySelector(".playerHolder");
  playerHolder.style.display = "none";
  LoadMoviesToList(currentPage);
  AddmoviesToList(currentPage + 1);
});
