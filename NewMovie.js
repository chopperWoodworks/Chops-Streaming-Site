let TopMenuButtons = document.querySelectorAll(
  ".PageSwapbt_PageSwapbtns_back_PageSwapbtn",
);
const VideoPlayerSection = document.querySelector(".VideoPlayerSection");
const VideoplayerVid = document.querySelector(
  ".VideoPlayerDiv_MainSection_VideoHolder_Video",
);
const VideoPlayerExitbtn = document.querySelector(".VideoPlayerDiv_Closebtn");
const VideoPlayerTitle = document.querySelector(
  ".VideoPlayerDiv_BottomSection_MovieTitle label",
);
const VideoPlayerOverview = document.querySelector(
  ".VideoPlayerDiv_BottomSection_Overview label",
);
const VideoPlayerReleaseDate = document.querySelector(
  ".VideoPlayerDiv_BottomSection_Seperator_ReleaseDate",
);
const VideoPlayerPopularity = document.querySelector(
  ".VideoPlayerDiv_BottomSection_Seperator_Popularity",
);
const VideoPlayerVoteAverage = document.querySelector(
  ".VideoPlayerDiv_BottomSection_Seperator_VoteAverage",
);
const SearchMenuSection = document.querySelector(".searchmenuSection");
const SearchMenu = document.querySelector(".searchmenu");
const searchMenuBackground = document.querySelector(".searchmenubackground");
const SearchButton = document.querySelector(".search");
const SearchMenuCloseButton = document.querySelector(
  ".searchmenu_title_closebtn",
);
const SearchMenuInput = document.querySelector(".searchmenu_input");
const APIKEY = "d8f1a9c985f12819bb82378a65008c32";
let page = 1;
function clearTopMenuactivebutton() {
  let activebutton = document.querySelector(".active");
  activebutton.classList.toggle("active");
}

function SetTopMenuactivebutton(button) {
  button.classList.toggle("active");
}
function RatingToStars(rating) {
  const Fullstars = Math.floor(rating / 2);
  const halfstars = rating % 2 >= 1 ? 1 : 0;
  const emptystars = 5 - Fullstars - halfstars;
  return "★".repeat(Fullstars) + "½".repeat(halfstars) + "☆".repeat(emptystars);
}
function NextPage() {
  if (page < MaxPages) {
    page++;
  }
}

function BackPage() {
  if (page > 1) {
    page--;
  }
}
function ShowSearchMenuSection() {
  SearchMenuSection.classList.toggle("Hidden");
  LoadPopularMovies();
}

SearchButton.addEventListener("click", () => {
  ShowSearchMenuSection();
});

SearchMenuCloseButton.addEventListener("click", () => {
  ShowSearchMenuSection();
});
let MaxPages = 0;
const MovieList = document.querySelector(".MovieList");
const AllFullMovieData = [];
async function LoadPopularMovies() {
  const APIFETCH = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${page}`,
  );
  const APIDATA = await APIFETCH.json();
  const Movies = APIDATA.results;
  Movies.forEach((movie) => {
    console.log(movie);
    const FullMovieData = {
      MovieTitle: movie.name || movie.original_title,
      MovieId: movie.id,
      MovieOverview: movie.overview,
      MovieVoteAverage: movie.vote_average,
      MoviePopularity: movie.popularity,
      MoviePosterPath: movie.poster_path,
      Movierelease_date: movie.release_date,
      MovieLanguage: movie.original_language,
      MovieCountry: movie.origin_country,
      MovieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
    AllFullMovieData.push(FullMovieData);
    MaxPages = APIDATA.total_pages;
  });
}

const AprovedQuerys = [];
async function LoadSearchedMovies() {
  MovieList.innerHTML = "";
  AllFullMovieData.splice(0, AllFullMovieData.length);

  const SearchValue = document.querySelector(".searchmenu_input input");
  if (SearchValue.value.trim() !== "") {
    console.log('Searching for: "' + SearchValue.value.trim() + '"');
    const APIFETCH = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&query=${encodeURIComponent(SearchValue.value.trim())}`,
    );
    const APIDATA = await APIFETCH.json();
    const Movies = APIDATA.results;
    MaxPages = APIDATA.total_pages;

    Movies.forEach((movie) => {
      const movieExists = AllFullMovieData.some(
        (fullmovie) => fullmovie.MovieId === movie.id,
      );

      if (
        !movieExists &&
        movie.original_title !== undefined &&
        movie.poster_path !== null &&
        movie.poster_path !==
          `https://image.tmdb.org/t/p/w500/hfniiftuGyPDlZyM2RxjoVGioel.jpg`
      ) {
        const FullMovieData = {
          MovieTitle: movie.original_title,
          MovieId: movie.id,
          MovieOverview: movie.overview,
          MovieVoteAverage: movie.vote_average,
          MoviePopularity: movie.popularity,
          MoviePosterPath: movie.poster_path,
          Movierelease_date: movie.release_date,
          MovieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };
        AllFullMovieData.push(FullMovieData);
      }
    });
  }
  LoadMoviesToList();
}

function LoadMoviesToList() {
  AllFullMovieData.forEach((movie, index) => {
    const MovieCard = document.createElement("div");
    MovieCard.classList.add("MovieList_Movie");
    MovieCard.classList.add("BHidden");
    MovieCard.innerHTML = `
      <div class="MoviePosterContainer">
        <img src="${movie.MovieImage}"/>
      </div>
      <div class="bottomsender">
        <div class="MovieInfo">
          <h3 class="MovieTitle">${movie.MovieTitle}</h3>
          <div class="bottomsendertHolder">
<div class="bottomsendert">
            <div class="MovieExtraInfo">
              <p class="MovieGenre">Views: ${Math.round(movie.MoviePopularity)}</p>
              <p class="MovieGenre">Rating:<br>${RatingToStars(movie.MovieVoteAverage)}</p>
            </div>
                    <div class="playbuttonholder">
          <button class="playbutton">
            Play
          </button>
        </div>
          </div>  
        </div>
      </div>`;
    MovieList.appendChild(MovieCard);
    const playbutton = MovieCard.querySelector(".playbutton");
    playbutton.addEventListener("click", () => {
      LoadVideoPlayer(movie.MovieId);
    });
    setTimeout(() => {
      MovieCard.classList.remove("BHidden");
    }, index * 50);
  });
}

async function LoadVideoPlayer(movieId) {
  const selectedMovie = AllFullMovieData.find(
    (movie) => movie.MovieId === movieId,
  );
  if (!selectedMovie) {
    console.error("Movie not found with ID:", movieId);
    return;
  }
  console.log("Selected movie for video player:", selectedMovie);
  VideoPlayerSection.classList.toggle("Hidden");
  VideoPlayerTitle.textContent = selectedMovie.MovieTitle;
  VideoPlayerOverview.textContent = selectedMovie.MovieOverview;
  VideoPlayerReleaseDate.textContent = `Release Date: ${selectedMovie.Movierelease_date}`;
  VideoPlayerPopularity.textContent = `MovieLanguage: ${selectedMovie.MovieLanguage.toUpperCase()} | Country: ${selectedMovie.MovieCountry}`;
  VideoPlayerVoteAverage.textContent = `Rating: ${RatingToStars(selectedMovie.MovieVoteAverage)}`;
  VideoplayerVid.src = `https://vidsrc.mov/embed/movie/${selectedMovie.MovieId}`;
  VideoPlayerVoteAverage.style = "color: gold; font-size: 18px;";
  VideoPlayerPopularity.style = "color: cyan; font-size: 18px;";
  VideoPlayerReleaseDate.style = "color: lightgreen; font-size: 18px;";
}
VideoPlayerExitbtn.addEventListener("click", () => {
  VideoPlayerSection.classList.toggle("Hidden");
  VideoplayerVid.src = "";
});
SearchMenuInput.addEventListener("input", () => {
  LoadSearchedMovies();
  LoadMoviesToList();
});

async function Init() {
  await LoadPopularMovies();
  LoadMoviesToList();
}

window.onload = () => {
  Init();
};
