const watchlistEl = document.getElementById("watchlist");
const watchlistEmpty = document.getElementById("watchlist-empty")
const watchlistBtn = document.getElementsByClassName("watchlist-btn")


function renderWatchlist () {
    const watchlist = JSON.parse(localStorage.watchlist)
    for (let movie of watchlist) {
        watchlistEl.innerHTML += `
            <div id="movie">
                <img id="poster" src="${movie.Poster}" alt="Poster for ${movie.Title}">
                <div id="movie-details">
                <div id="line1">
                    <h4 id="movie-title">${movie.Title}</h4>
                    <i class="star"></i> <span id="movie-rating">${movie.imdbRating} / 10</span>
                </div>
                <div id="line2">
                    <span>${movie.Runtime}</span> <span>${movie.Genre}</span> <button class="watchlist-btn"><i class="watchlist-minus"></i> Remove</button>
                </div>
                <p id="plot">${movie.Plot}</p>
                </div> <!--  movie-details  -->
            </div> <!--  movie  -->
            <hr>`
        
    }
}

function removeWatchlistItem(i) {
    const newWatchlist = JSON.parse(localStorage.watchlist)
    newWatchlist.splice(i, 1)
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
}

document.onload = checkForWatchlist()

  function checkForWatchlist() {
          if (!localStorage.watchlist||localStorage.watchlist == "[]") {
            watchlistEmpty.style.display = "block"
            } else if (localStorage.watchlist) {
            watchlistEmpty.style.display = "none"
            renderWatchlist();
            } 
  }
        
for(let i = 0; i < watchlistBtn.length; ++i) {
    watchlistBtn[i].addEventListener("click", () => {
    removeWatchlistItem(i);
    location.reload();
});
}        
