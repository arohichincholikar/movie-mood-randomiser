const findBtn = document.getElementById("findBtn");
const reroll = document.getElementById("reroll");
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDY1MjU2MDcwODEyNzIxNjJiYzIzN2Y1MGRmMDliZiIsIm5iZiI6MTc3OTY5Mzg4Ny4yMjU5OTk4LCJzdWIiOiI2YTEzZjkzZmM2YjM0NjU0NDMwMmQ2NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.erGT33SPiFoKBfF9AuYMpERxoPd05rIghAIlVeIGoLE";
/* -----------------------------
   MOOD → TMDB GENRE MAP
------------------------------ */

const moodMap = {
  happy: {
    genres: "35,12",
    snack: "🍿 Popcorn",
    reason: "You wanted something fun and light 🎉"
  },

  sad: {
    genres: "18",
    snack: "☕ Coffee",
    reason: "Time for something emotional 🫠"
  },

  romantic: {
    genres: "10749",
    snack: "🍫 Chocolate",
    reason: "Love is in the air 💕"
  },

  chaotic: {
    genres: "28,53",
    snack: "🌶 Nachos",
    reason: "High energy chaos mode 🔥"
  },

  nostalgic: {
    genres: "16,10751",
    snack: "🍪 Cookies",
    reason: "Comfort rewind vibes 📼"
  },

  scared: {
    genres: "27",
    snack: "🍫 Hot chocolate",
    reason: "Let’s get terrified 😈"
  }
};

/* -----------------------------
   FETCH MOVIES FROM TMDB
------------------------------ */

async function fetchMovies(genres) {
  const url =
    `https://api.themoviedb.org/3/discover/movie` +
    `?with_genres=${genres}` +
    `&sort_by=vote_average.desc` +
    `&vote_count.gte=300`;

  console.log("REQUEST URL:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  });

  const data = await res.json();
  console.log("TMDB RESPONSE:", data);
  console.log("RESULTS:", data.results);
  return data.results;
}

/* -----------------------------
   MAIN FUNCTION
------------------------------ */

async function generateMovie() {
    console.log("BUTTON CLICKED");
  const mood = document.getElementById("mood").value;

  if (!mood) {
    alert("Pick a mood first!");
    return;
  }

  const config = moodMap[mood];

  const movies = await fetchMovies(config.genres);

  if (!movies || movies.length === 0) {
    alert("No movies found!");
    return;
  }

  const movie =
    movies[Math.floor(Math.random() * movies.length)];

  showMovie(movie, config);
}

/* -----------------------------
   DISPLAY MOVIE
------------------------------ */
function showMovie(movie, config) {
  const result = document.getElementById("result");
  const poster = document.getElementById("poster");

  // reset animation (important for reroll)
  result.classList.remove("show");
  void result.offsetWidth; // force reflow

  result.classList.add("show");

  // poster
  if (movie.poster_path) {
    poster.src =
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  } else {
    poster.src = "";
  }

  document.getElementById("movieTitle").textContent =
    movie.title;

  document.getElementById("movieGenre").textContent =
    `⭐ ${movie.vote_average} | 📅 ${movie.release_date}`;

  document.getElementById("movieRuntime").textContent =
    movie.overview;

  document.getElementById("movieSnack").textContent =
    config.snack;

  document.getElementById("movieReason").textContent =
    config.reason;
}

/* -----------------------------
   EVENTS
------------------------------ */

findBtn.addEventListener("click", generateMovie);
reroll.addEventListener("click", generateMovie);
