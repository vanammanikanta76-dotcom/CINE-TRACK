// 1. Initial Mock Dataset Array (Task 4)
const moviesData = [
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8, year: 2010, emoji: "🌀" },
    { id: 2, title: "The Dark Knight", genre: "Action", rating: 9.0, year: 2008, emoji: "🦇" },
    { id: 3, title: "Interstellar", genre: "Sci-Fi", rating: 8.6, year: 2014, emoji: "🚀" },
    { id: 4, title: "Gladiator", genre: "Action", rating: 8.5, year: 2000, emoji: "⚔️" },
    { id: 5, title: "The Prestige", genre: "Drama", rating: 8.5, year: 2006, emoji: "🎩" },
    { id: 6, title: "Oppenheimer", genre: "Drama", rating: 8.4, year: 2023, emoji: "💣" }
];

// Initialize Watchlist Array from Local Storage or empty array
let watchlist = JSON.parse(localStorage.getItem('userWatchlist')) || [];

// DOM Element Selectors
const movieGrid = document.getElementById('movie-grid');
const genreSelect = document.getElementById('genre-select');
const sortSelect = document.getElementById('sort-select');
const cartCount = document.getElementById('cart-count');

// 2. Render Function: Renders movies inside UI
function displayMovies(moviesList) {
    movieGrid.innerHTML = ""; // Clear existing grid space

    if(moviesList.length === 0) {
        movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No movies found matching criteria.</p>`;
        return;
    }

    moviesList.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        
        card.innerHTML = `
            <div class="movie-poster-placeholder">${movie.emoji}</div>
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <div class="movie-meta">
                    <span>${movie.year} | ${movie.genre}</span>
                    <span class="rating-badge">★ ${movie.rating}</span>
                </div>
                <button class="watchlist-btn" onclick="addToWatchlist(${movie.id})">Add to Watchlist</button>
            </div>
        `;
        movieGrid.appendChild(card);
    });
    updateHeaderCount();
}

// 3. Filter and Sort Logic Combined
function filterAndSortMovies() {
    let filtered = [...moviesData];
    const selectedGenre = genreSelect.value;
    const selectedSort = sortSelect.value;

    // Apply Genre Filter
    if (selectedGenre !== 'all') {
        if(selectedGenre === 'Christopher Nolan') {
            // Filter specific to Nolan films in our dataset
            filtered = filtered.filter(m => [1, 2, 3, 5, 6].includes(m.id));
        } else {
            filtered = filtered.filter(movie => movie.genre === selectedGenre);
        }
    }

    // Apply Sorting Options
    if (selectedSort === 'rating-high') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'year-new') {
        filtered.sort((a, b) => b.year - a.year);
    }

    displayMovies(filtered);
}

// 4. Local Storage Functionality
window.addToWatchlist = function(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    
    // Check if already exists in local storage list
    if (watchlist.some(item => item.id === movieId)) {
        alert(`${movie.title} is already in your watchlist.`);
        return;
    }

    watchlist.push(movie);
    localStorage.setItem('userWatchlist', JSON.stringify(watchlist));
    updateHeaderCount();
    alert(`${movie.title} added to your watchlist!`);
};

function updateHeaderCount() {
    cartCount.innerText = watchlist.length;
}

// Event Listeners for Filters
genreSelect.addEventListener('change', filterAndSortMovies);
sortSelect.addEventListener('change', filterAndSortMovies);

// Initial Load execution
displayMovies(moviesData);