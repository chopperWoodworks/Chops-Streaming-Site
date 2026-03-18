const movielistHolderSecond = document.querySelector(".movielistHolderSecond");
movielistHolderSecond.innerHTML = ``;
const APIKEY = "d8f1a9c985f12819bb82378a65008c32";
let moviecount = 0;
async function LoadMoviesToList(page) {
  try {
    const GetAPI = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&page=${page}`,
    );
    const JsonData = await GetAPI.json();

    JsonData.results.forEach((movie) => {
      const MovieCard = document.createElement("div");
      MovieCard.classList.add("movieThumbnail");

      MovieCard.innerHTML = ` 
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.name} Poster" />
        <h3>${movie.name}</h3>
    `;
      movielistHolderSecond.appendChild(MovieCard);
      moviecount++;
      MovieCard.addEventListener("click", () => {
        Movieplayer(movie.id, movie.name, movie.overview);
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
      `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&page=${page}`,
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
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.name} Poster" />
        <div class="movieThumbnailimgholder"><h3>${movie.name}</h3></div>
    `;
      movielistHolderSecond.appendChild(MovieCard);
      moviecount++;
      MovieCard.addEventListener("click", () => {
        Movieplayer(movie.id, movie.name, movie.overview);
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
          if (movie.name) {
            if (alreadyloaded.includes(movie.name.toLowerCase())) return;
            alreadyloaded.push(movie.name.toLowerCase());
            const MovieCard = document.createElement("div");
            MovieCard.classList.add("movieThumbnail");
            console.log(movie.name.toLowerCase());
            MovieCard.innerHTML += ` 
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.name} Poster" />
        <h3>${movie.name}</h3>`;
            movielistHolderSecond.appendChild(MovieCard);
            moviecount++;
            MovieCard.addEventListener("click", () => {
              Movieplayer(movie.id, movie.name, movie.overview);
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

async function GetSeasons(tvshowid) {
  document.querySelector(".seasonsHolder").innerHTML = ``;
  const GetApi = await fetch(
    `https://api.themoviedb.org/3/tv/${tvshowid}?api_key=${APIKEY}`,
  );
  const JsonData = await GetApi.json();
  console.log(JsonData);

  for (const season of JsonData.seasons) {
    const seasonTitle = document.createElement("h2");
    seasonTitle.textContent = "Season " + season.season_number;
    seasonTitle.classList.add("seasonTitle");
    const seasoncard = document.createElement("div");
    seasoncard.classList.add("seasoncard");
    const seasondata = await fetch(
      `https://api.themoviedb.org/3/tv/${tvshowid}/season/${season.season_number}?api_key=${APIKEY}`,
    );
    const seasonJson = await seasondata.json();
    const list = document.createElement("ul");
    list.classList.add("episodelist");

    seasonJson.episodes.forEach((episode) => {
      const episodecard = document.createElement("button");
      episodecard.classList.add("episodecard");
      episodecard.textContent =
        "Season " + season.season_number + ". " + episode.name;

      episodecard.addEventListener("click", () => {
        episodecard.classList.add("active");
        const seasoncards = document.querySelectorAll(".episodecard");
        seasoncards.forEach((card) => {
          if (card !== episodecard) {
            card.classList.remove("active");
          }
        });
        let playername = document.querySelector(".player h2");
        let playervid = document.querySelector(".player iframe");
        let playeroverview = document.querySelector(".player p");
        playervid.src = `https://vidsrc.mov/embed/tv/${tvshowid}/${season.season_number}/${episode.episode_number}`;
        playername.textContent = episode.name;
        playeroverview.textContent = episode.overview;
      });

      list.appendChild(episodecard);
    });
    document.querySelector(".seasonsHolder").appendChild(seasonTitle);
    document.querySelector(".seasonsHolder").appendChild(seasoncard);
    seasoncard.appendChild(list);
  }
}

function Movieplayer(movieid, moviename, movieoverview) {
  let playerHolder = document.querySelector(".playerHolder");
  let playername = document.querySelector(".player h2");
  let playervid = document.querySelector(".player iframe");
  let playeroverview = document.querySelector(".player p");
  playervid.src = `https://vidsrc.mov/embed/tv/${movieid}`;
  playername.textContent = moviename;
  playeroverview.textContent = movieoverview;
  playerHolder.style.display = "block";
  GetSeasons(movieid);
  document.querySelector(".backdrop").style.display = "block";
}

const ToTopbtn = document.querySelector(".ToTopBtn");
ToTopbtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const closeBtn = document.querySelector(".CloseBtn");
closeBtn.addEventListener("click", () => {
  let playerHolder = document.querySelector(".playerHolder");
  playerHolder.style.display = "none";
  document.querySelector(".backdrop").style.display = "none";
  let playervid = document.querySelector(".player iframe");
  playervid.src = ``;
});
