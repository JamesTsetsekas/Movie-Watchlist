const apiKey = "e3add478"

const searchBox = document.getElementById("searchTextBox")
const searchBtn = document.getElementById("searchBtn")
const errorMsg = document.getElementById("errorMsg")
const movieList = document.getElementById("movie-list")
const startExploring = document.getElementById("start-exploring")
const watchlistBtn = document.getElementsByClassName("watchlist-btn")
const placeholderPoster = `./img/NoPosterAvailable.jpg`

let movies = [];
let watchlist = [];


function renderMovies(movieData) {
    movies.push(movieData)
    if (movieData.Poster === "N/A") {movieData.Poster = placeholderPoster}
    movieList.innerHTML +=     
    `<div id="movie">
        <img id="poster" src="${movieData.Poster}" alt="">
        <div id="movie-details">
        <div id="line1">
            <h4 id="movie-title">${movieData.Title}</h4>
            <i class="star"></i> <span id="movie-rating">${movieData.imdbRating} / 10</span>
        </div>
        <div id="line2">
            <span>${movieData.Runtime}</span> <span>${movieData.Genre}</span> <button class="watchlist-btn"><i class="watchlist-plus"></i> Watchlist</button>
        </div>
        <p id="plot">${movieData.Plot}</p>
        </div> <!--  movie-details  -->
    </div> <!--  movie  -->
    <hr>`
}

function watchlistListener(movieData) {
    for(let i = 0; i < watchlistBtn.length; ++i) {
        watchlistBtn[i].addEventListener("click", () => {
            addToWatchlist(movies[i]);
        });
    }
}

function addToWatchlist(movieData) {
    watchlist.push(movieData)
    if(!localStorage.getItem('watchlist')) {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } else {
        const existing = JSON.parse(localStorage.getItem("watchlist"))
        existing.push(movieData);
        localStorage.setItem("watchlist", JSON.stringify(existing))
    }
}

searchBtn.addEventListener("click", async (event) => {
    movies = []
    event.preventDefault();
    const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchBox.value}`)
    const movieData = await searchResponse.json()
    if (movieData.Response === "True") {
    startExploring.style.display = "none"
    errorMsg.style.display = "none"
    movieList.textContent = ""
    movieList.style.display = "block"
        movieData.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
            const data = await res.json()
            renderMovies(data)
            watchlistListener(data);
        });
    }
    else {
        startExploring.style.display = "none"
        errorMsg.style.display = "block"
        errorMsg.textContent = movieData.Error
        movieList.style.display = "none"
    } 
    
})

