/*Изменение и сохранение темы*/

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}
  
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
}
  
const changeModeButton = document.querySelector('.changeMode');
  if (changeModeButton) {
    changeModeButton.addEventListener('click', toggleTheme);
}
  
applySavedTheme();

/*Поиск и добавление в избранное*/
function searchMovie(title) {
    const apiKey = '75fcaf4c'; 
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovieData(data);
            } else {
                document.querySelector('.movieInfo').innerHTML = '<p>Фильм не найден.</p>';
                document.querySelector('.poster').innerHTML = '';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function initSearch() {
    const searchButton = document.querySelector('.searchButton');
    const searchInput = document.querySelector('.searchInput');

    searchButton.addEventListener('click', () => {
        const movieTitle = searchInput.value;
        if (movieTitle) {
            searchMovie(movieTitle);
        }
    });
}

function displayMovieData(data) {
    const movieInfo = document.querySelector('.movieInfo');
    const poster = document.querySelector('.poster');

    movieInfo.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <p>Продолжительность: ${data.Runtime}</p>
        <p>Жанр: ${data.Genre}</p>
        <p>Режиссер: ${data.Director}</p>
        <p>Актеры: ${data.Actors}</p>
        <p>Страна: ${data.Country}</p>
        <p>Рейтинг: ${data.imdbRating}</p>
        <button class="addToFavoritesButton">Добавить в избранное</button>
    `;

    poster.innerHTML = `<img src="${data.Poster}" alt="Постер">`;

    document.querySelector('.addToFavoritesButton').addEventListener('click', () => {
        addToFavorites(data);
    });
}

function addToFavorites(movieData) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!Array.isArray(favorites)) {
        favorites = [];
    }
    favorites.push({ title: movieData.Title, poster: movieData.Poster });
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const displayFavorites = document.querySelector('.displayFavorites');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    displayFavorites.innerHTML = favorites.map(favorite => `
        <div class="favoriteItem">
            <img src="${favorite.poster}" alt="${favorite.title}" />
            <h3>${favorite.title}</h3>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.searchResults')) {
        initSearch();
    }

    if (document.querySelector('.displayFavorites')) {
        loadFavorites();
    }
});