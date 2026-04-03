const currentYear = "2026";
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
const Scinput = document.querySelector(".Scinput");
const SearchMenuCloseButton = document.querySelector(
  ".searchmenu_title_closebtn",
);
Scinput.addEventListener("click", () => {
  if (SearchMenuSection.classList.contains("Hidden")) {
    SearchMenuSection.classList.add("Hidden");
  }
});
SearchButton.addEventListener("mouseenter", () => {
  Scinput.classList.remove("Hidden");

  Scinput.classList.remove("Hidden");
});
SearchButton.addEventListener("mouseleave", () => {
  Scinput.classList.add("Hidden");
});
const SearchMenuInput = document.querySelector(".searchmenu_input");
const APIKEY = "d8f1a9c985f12819bb82378a65008c32";
let page = 1;
function clearTopMenuactivebutton() {
  let activebutton = document.querySelector(".active");
  activebutton.classList.toggle("active");
}
let isSearching = false;

const nextbtn = document.querySelector(".Next");
const Backbtn = document.querySelector(".Back");
function SetTopMenuactivebutton(button) {
  button.classList.toggle("active");
}
let FT = true;
function NextPage() {
  if (page < MaxPages) {
    page++;

    LoadPopularMovies();
    MovieList.innerHTML = "";
    LoadMoviesToList();

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}
function NextGPage(currentgen) {
  console.log("asdad");
  if (page < MaxPages) {
    page++;
    loadGenre(currentgen[0], currentgen[1]);
    MovieList.innerHTML = "";
    LoadMoviesToList();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}

function BackPage() {
  if (page > 1) {
    page--;
    LoadPopularMovies();
    LoadMoviesToList();
  }
}
function BackGPage() {
  if (page > 1) {
    page--;
    loadGenre(currentgen[0], currentgen[1]);
    LoadMoviesToList();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}
function ShowSearchMenuSection() {
  SearchMenuSection.classList.toggle("Hidden");

  if (SearchMenuSection.classList.contains("Hidden")) {
    isSearching = false;
  } else {
    isSearching = true;
  }
}

SearchButton.addEventListener("click", () => {
  if (!Scinput.matches(":focus")) {
    ShowSearchMenuSection();
  }
});

SearchMenuCloseButton.addEventListener("click", () => {
  SearchMenuSection.classList.add("Hidden");
  isSearching = false;
});
const searchmenubackground = document.querySelector(".searchmenubackground");

let MaxPages = 0;
let MaxCards = 0;
const MovieList = document.querySelector(".MovieList");
let AllFullMovieData = [];
async function LoadPopularMovies() {
  const APIFETCH = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&page=${page}`,
  );
  const APIDATA = await APIFETCH.json();

  const APIFETCHT = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&page=${page + 1}`,
  );
  const APIDATAT = await APIFETCHT.json();
  if (isSearching) return;
  AllFullMovieData = [];
  const Movies = APIDATA.results;
  Movies.forEach((movie) => {
    const FullMovieData = {
      MovieTitle: movie.name || movie.original_title,
      MovieId: movie.id,
      MovieOverview: movie.overview,
      MovieVoteAverage: movie.vote_average,
      MoviePopularity: movie.popularity,
      MoviePosterPath: movie.poster_path,
      Movierelease_date: movie.first_air_date || movie.release_date,
      MovieLanguage: movie.original_language,
      MovieCountry: movie.origin_country,
      MovieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
    AllFullMovieData.push(FullMovieData);
    MaxPages = APIDATA.total_pages;
  });

  const MoviesT = APIDATAT.results;
  const viewportWidth = window.innerWidth;
  MoviesT.forEach((movie) => {
    if (viewportWidth == 1920) {
      MaxCards = 35;
    }
    if (viewportWidth == 1440) {
      MaxCards = 34;
    }
    if (viewportWidth <= 1024) {
      MaxCards = 40;
    }
    const FullMovieData = {
      MovieTitle: movie.name || movie.original_title,
      MovieId: movie.id,
      MovieOverview: movie.overview,
      MovieVoteAverage: movie.vote_average,
      MoviePopularity: movie.popularity,
      MoviePosterPath: movie.poster_path,
      Movierelease_date: movie.first_air_date || movie.release_date,
      MovieLanguage: movie.original_language,
      MovieCountry: movie.origin_country,
      MovieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
    AllFullMovieData.push(FullMovieData);
    MaxPages += APIDATAT.total_pages;
  });
}
nextbtn.addEventListener("click", () => {
  if (genreenabled) {
    console.log(currentgen);
    NextGPage(currentgen);
  } else {
    NextPage();
  }
});
Backbtn.addEventListener("click", () => {
  if (genreenabled) {
    BackGPage();
  } else {
    BackPage();
  }
});
const AprovedQuerys = [];
async function LoadSearchedMovies() {
  if (isSearching == false) {
    AllFullMovieData.splice(0, AllFullMovieData.length);
    isSearching = true;
  }
  MovieList.innerHTML = "";

  const SearchValue = document.querySelector(".searchmenu_input input");
  if (SearchValue.value.trim() === "") {
    page = page + 1;
    await LoadPopularMovies();
    LoadMoviesToList();
  }
  if (SearchValue.value.trim() !== "") {
    const APIFETCH = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${APIKEY}&query=${encodeURIComponent(SearchValue.value.trim())}`,
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
        movie.name !== undefined &&
        movie.poster_path !== null &&
        movie.poster_path !==
          `https://image.tmdb.org/t/p/w500/hfniiftuGyPDlZyM2RxjoVGioel.jpg`
      ) {
        const FullMovieData = {
          MovieTitle: movie.name || movie.original_title,
          MovieId: movie.id,
          MovieOverview: movie.overview,
          MovieVoteAverage: movie.vote_average,
          MoviePopularity: movie.popularity,
          MoviePosterPath: movie.poster_path,
          Movierelease_date: movie.first_air_date,
          MovieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };
        AllFullMovieData.push(FullMovieData);
        console.log(AllFullMovieData);
      }
    });
    LoadMoviesToList();
    isSearching == false;
  }
}
const genrelist = document.querySelector(".genrelistcontainer");
const acgenreList = document.querySelector(".genrelistcontainer_List");
let TVGenres = [];
async function addtogenrelist() {
  const apidata = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${APIKEY}`,
  );
  const jsondata = await apidata.json();
  console.log(jsondata);
  jsondata.genres.forEach((genre) => {
    const thisgenre = {
      GenreName: genre.name,
      GenreId: genre.id,
    };
    TVGenres.push(thisgenre);
  });
  TVGenres.forEach((genre) => {
    const genrediv = document.createElement("div");
    genrediv.classList.add("genrelistcontainer_List_item");
    genrediv.classList.add("BHidden");
    genrediv.textContent = genre.GenreName;
    acgenreList.appendChild(genrediv);
    genrediv.addEventListener("click", () => {
      loadGenre(genre.GenreName, genre.GenreId);
    });
  });
}
console.log;
addtogenrelist();
document.querySelector(".genres").addEventListener("click", () => {
  Showgenrelist();
});
let currentgen = "";
let genreenabled = false;
let current;
async function loadGenre(genrename, genreid) {
  if (currentgen[0] !== genreid) {
    MovieList.innerHTML = "";
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${APIKEY}&with_genres=${genreid}&page=${page}`,
  );
  const data = await res.json();
  console.log(data);
  AllFullMovieData.splice(0, AllFullMovieData.length);
  data.results.forEach((movie, i) => {
    if (movie.poster_path === null) return;
    const FullMovieData = {
      MovieTitle: movie.name || movie.original_title,
      MovieId: movie.id,
      MovieOverview: movie.overview,
      MovieVoteAverage: movie.vote_average,
      MoviePopularity: movie.popularity,
      MoviePosterPath: movie.poster_path,
      Movierelease_date: movie.first_air_date,
      MovieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
    AllFullMovieData.push(FullMovieData);
  });
  currentgen = [genreid, genrename];

  LoadMoviesToList();
  genreenabled = true;
}
let opened = false;
let timeouts = [];
function Showgenrelist() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth == 768) {
    genrelist.classList.remove("side");
    genrelist.classList.toggle("sside");
    opened = !opened;
    console.log(opened);
  } else if (viewportWidth <= 425) {
    genrelist.classList.remove("side");
    genrelist.classList.add(".genrelistcontainerT");
    genrelist.classList.toggle("bside");
    opened = !opened;
    console.log(opened);
  } else {
    genrelist.classList.toggle("side");
    opened = !opened;
    console.log(opened);
  }
  if (opened === true) {
    timeouts = [];
    [...document.querySelectorAll(".genrelistcontainer_List_item")].forEach(
      (genrelistiem, i) => {
        const yea = setTimeout(() => {
          genrelistiem.classList.remove("BHidden");
        }, i * 75);
        timeouts.push(yea);
      },
    );
  } else {
    [...timeouts].forEach((timeout) => clearTimeout(timeout));
    [...document.querySelectorAll(".genrelistcontainer_List_item")].forEach(
      (genrelistiem, i) => {
        genrelistiem.classList.add("BHidden");
      },
    );
  }
}
function RatingToStars(rating) {
  const Fullstars = Math.floor(rating / 2);
  const halfstars = rating % 2 >= 1 ? 1 : 0;
  const emptystars = 5 - Fullstars - halfstars;
  return "★".repeat(Fullstars) + "½".repeat(halfstars) + "☆".repeat(emptystars);
}
function convertdate(date) {
  if (!date) return 2025;
  const seperated = date.split("-");
  const year = seperated[0];
  return year;
}
function LoadMoviesToList() {
  AllFullMovieData.forEach((movie, index) => {
    if (index >= MaxCards) {
      return;
    }
    const MovieCard = document.createElement("div");
    MovieCard.classList.add("MovieList_Movie");
    MovieCard.classList.add("BHidden");
    MovieCard.innerHTML = `
    <div class="Tags"> <div class="tag">${convertdate(movie.Movierelease_date)}</div> <div class="tag">HD</div> </div>
      <div class="MoviePosterContainer">
        <img src="${movie.MovieImage}"/>
      </div>
      <div class="bottomsender">
        <div class="MovieInfo">
          <h3 class="MovieTitle">${movie.MovieTitle}</h3>
          <div class="bottomsendertHolder">
<div class="bottomsendert">
            <div class="MovieExtraInfo">
              <p class="MovieGenre">Views:<br>${Math.round(movie.MoviePopularity)}</p>
              <p class="MovieGenre">Rating:<br>${RatingToStars(movie.MovieVoteAverage)} ${Math.round(movie.MovieVoteAverage * 10) / 10}</p>
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
    changebgcolortag(
      MovieCard.querySelector(".Tags").querySelector(".tag"),
      convertdate(movie.Movierelease_date),
    );
    const playbutton = MovieCard.querySelector(".playbutton");
    playbutton.addEventListener("click", () => {
      LoadVideoPlayer(movie.MovieId);
      if (opened !== false) Showgenrelist();
    });
    setTimeout(() => {
      MovieCard.classList.remove("BHidden");
    }, index * 50);
  });
}
function changebgcolortag(tag, year) {
  if (parseInt(year) === parseInt(currentYear))
    tag.style.backgroundColor = "#06ac00";

  if (parseInt(year) !== parseInt(currentYear)) {
    if (parseInt(year) === parseInt(currentYear) - 1) {
      tag.style.backgroundColor = "#58b600";
      return;
    } else if (
      parseInt(year) <= parseInt(currentYear) - 2 &&
      parseInt(year) >= parseInt(currentYear) - 11
    ) {
      tag.style.backgroundColor = "#06ac00";
      return;
    } else if (
      parseInt(year) <= parseInt(currentYear) - 11 &&
      parseInt(year) >= parseInt(currentYear) - 26
    ) {
      tag.style.backgroundColor = "#ff6600";
      return;
    } else if (parseInt(year) < parseInt(currentYear) - 26) {
      tag.style.backgroundColor = "#444444";
      return;
    }
  }
}
async function LoadVideoPlayer(movieId) {
  countedalready = [];
  allseasons.splice(0, allseasons.length);
  countedepisodes = [];
  countComplete = false;
  const selectedMovie = AllFullMovieData.find(
    (movie) => movie.MovieId === Number(movieId),
  );
  console.log(AllFullMovieData);
  if (!selectedMovie) {
    console.error("Movie not found with ID:", movieId);
    return;
  }
  console.log("Selected movie for video player:", selectedMovie);
  VideoPlayerSection.classList.toggle("Hidden");
  VideoPlayerTitle.textContent = selectedMovie.MovieTitle;
  VideoPlayerOverview.textContent = selectedMovie.MovieOverview;
  VideoPlayerReleaseDate.textContent = `Release Date: ${selectedMovie.Movierelease_date}`;
  VideoPlayerPopularity.textContent = `MovieLanguage: ${selectedMovie.MovieLanguage} | Country: ${selectedMovie.MovieCountry}`;
  VideoPlayerVoteAverage.textContent = `Rating: ${RatingToStars(selectedMovie.MovieVoteAverage)}`;
  VideoplayerVid.src = `https://vidsrc.mov/embed/tv/${selectedMovie.MovieId}`;
  VideoPlayerVoteAverage.style = "color: gold; font-size: 18px;";
  VideoPlayerPopularity.style = "color: cyan; font-size: 18px;";
  VideoPlayerReleaseDate.style = "color: lightgreen; font-size: 18px;";

  LoopTvShowSeasons(selectedMovie.MovieId);
  setTimeout(() => {
    LoadTvShowEpisodeList(selectedMovie.MovieId);
  }, 111);
}
VideoPlayerExitbtn.addEventListener("click", () => {
  VideoPlayerSection.classList.toggle("Hidden");
  VideoplayerVid.src = "";
  window.location.href = window.location.href;
});

let seasonCount;
let countedalready = [];

const allseasons = [];
let countedepisodes = [];
let countComplete = false;

const gHolder = document.querySelector(
  ".ViddeoPlayerDiv_MainSection_EpisdoeListHolder_EpisodeList",
);

async function LoopTvShowSeasons(tvshowidD) {
  const APIFETCH = await fetch(
    `https://api.themoviedb.org/3/tv/${tvshowidD}?api_key=${APIKEY}`,
  );
  const APIDATA = await APIFETCH.json();
  seasonCount = APIDATA.seasons.length;
  allseasons.splice(0, allseasons.length);
  for (let i = 1; i <= seasonCount; i++) {
    if (i === seasonCount) {
      countComplete = true;
      countedalready.push(i);
      countComplete = true;
      console.log("All seasons loaded:", allseasons);
      await LoadTvShowSeasons(tvshowidD, i);
      break;
    }
    if (!countedalready.includes(i)) {
      await LoadTvShowSeasons(tvshowidD, i);
      countedalready.push(i);
    }
  }
  countComplete = true;
}

async function LoadTvShowSeasons(tvshowidD, seasonNumber) {
  const APIFETCH = await fetch(
    `https://api.themoviedb.org/3/tv/${tvshowidD}/season/${seasonNumber}?api_key=${APIKEY}`,
  );
  const season = await APIFETCH.json();
  if (
    allseasons.length >= seasonCount + 1 ||
    season.season_number === undefined ||
    season.episodes === undefined ||
    season.episodes.length < 1
  ) {
    console.log(
      "Season data incomplete or all seasons loaded, skipping season:",
      seasonNumber,
    );
    seasonCount--;
    if (seasonNumber > 0) {
      countComplete = true;
      const seasondata = {
        seasonNumber: season.season_number,
        episodes: season.episodes,
      };

      allseasons.push(seasondata);
    }
    if (countComplete === true) {
      console.log("odfghfiughdfgyhfdfiodufpioj");
      console.log(countComplete, seasonNumber);
      LoadTvShowEpisodeList(tvshowidD);
    }
    console.log(allseasons);
    return;
  }
  console.log(`Loaded season ${seasonNumber} for TV show ID ${tvshowidD}`);
  //console.log(seasonNumber, " ", season);
  const seasondata = {
    seasonNumber: season.season_number,
    episodes: season.episodes,
  };
  allseasons.push(seasondata);
  console.log(countComplete, "  ", allseasons.length, "  ", seasonCount);
}

function Removeactiveepisodes() {
  const activeepisodes = document.querySelectorAll(".episodeactive");
  activeepisodes.forEach((episode) => {
    episode.classList.toggle("episodeactive");
  });
}
function LoadTvShowEpisodeList(tvshowidD) {
  console.log(
    "allseasons typeof:",
    typeof allseasons,
    Array.isArray(allseasons),
  );
  const allgls = document.querySelectorAll(
    ".ViddeoPlayerDiv_MainSection_EpisdoeListHolder_EpisodeList_SeasonHolder",
  );
  [...allgls].forEach((g) => {
    g.remove();
  });
  console.log("Loading episode list for all seasons:", allseasons);
  allseasons.forEach((season) => {
    console.log(season);
    let seasonNumber = season.seasonNumber;
    let episodes = season.episodes;
    console.log("Loading episode list for all seasons AG:", allseasons);
    console.log(seasonNumber, "  PART 2 ", season);
    if (!episodes || episodes.length === 0) {
      return;
    }
    const seasonContainer = document.createElement("div");
    seasonContainer.classList.add(
      "ViddeoPlayerDiv_MainSection_EpisdoeListHolder_EpisodeList_SeasonHolder",
    );

    seasonContainer.innerHTML = `<h3>Season ${seasonNumber}</h3>`;

    episodes.forEach((episode) => {
      const episodeContainer = document.createElement("div");
      episodeContainer.classList.add("episodeactive");
      episodeContainer.classList.toggle("episodeactive");
      episodeContainer.classList.add(
        "ViddeoPlayerDiv_MainSection_EpisdoeListHolder_EpisodeList_SeasonHolder_Episode",
      );
      episodeContainer.innerHTML = `
        <p class="EpisodeTitle">Episode ${episode.episode_number}: ${episode.name}</p>
        <p class="EpisodeOverview">${episode.overview}</p>
      `;
      seasonContainer.appendChild(episodeContainer);
      episodeContainer.addEventListener("click", () => {
        VideoplayerVid.src = `https://vidsrc.mov/embed/tv/${tvshowidD}/${seasonNumber}/${episode.episode_number}`;

        Removeactiveepisodes();
        episodeContainer.classList.toggle("episodeactive");
      });

      gHolder.appendChild(seasonContainer);
    });
  });
}
const countedseasonnumbers = [];

async function LoadSeasons(tvshowidD, seasonNumber) {
  const APIFETCH = await fetch(
    `https://api.themoviedb.org/3/tv/${tvshowidD}/season/${seasonNumber}?api_key=${APIKEY}`,
  );
  const season = await APIFETCH.json();
}

async function InitT() {
  await LoadSearchedMovies();
}
let timeout;
SearchMenuInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    InitT();
    AllFullMovieData.splice(0, AllFullMovieData.length);
  }, 50);
});
let movie = document.querySelectorAll(".MovieList_Movie");
async function Init() {
  await LoadPopularMovies();
  LoadMoviesToList();
  const viewportWidth = window.innerWidth;
  movie = document.querySelector(".MovieList_Movie");
  if (viewportWidth == 353) {
    console.log(getComputedStyle(movie).width);
    const btns = document.querySelectorAll(".active");
    let target = "";
    target = btns[0];
    target.textContent = "TV";
  }
  Showgenrelist();
  Showgenrelist();
}

window.onload = () => {
  Init();
};
