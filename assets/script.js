document.addEventListener("DOMContentLoaded", function() {
    
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");
    if (!movieId) {
        document.getElementById("movie-details").innerHTML = "<p>No movie selected.</p>";
        return;
    }
    
   
    fetch('Data.json')
        .then(response => response.json())
        .then(data => {
            const movie = data.movies.find(movie => movie.id === movieId);
            if (movie) {
                displayMovieDetails(movie);
            } else {
                document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
            document.getElementById("movie-details").innerHTML = "<p>Unable to load movie details.</p>";
        });
});

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById("movie-details");
    const html = `
        <h1 class="movie-title">${movie.title}</h1>
        <div class="overall-movie-container">
            <img src="${movie.poster}" alt="${movie.title} Poster" class="img-fluid">
            <div class="book-ticket-container">
                <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
                <p><strong>Duration:</strong> ${movie.duration}</p>
            </div>
        </div>
        <h2>Cast</h2>
        <div>
            ${movie.cast.map(actor => `<div>${actor.name} as ${actor.role}</div>`).join('')}
        </div>
        <h2>Crew</h2>
        <ul>
            ${movie.crew.map(member => `<div>${member.name} - ${member.role}</div>`).join('')}
        </ul>
        <h2>Trailer</h2>
        <a href="${movie.trailerLink}" target="_blank" class="btn btn-primary">Watch Trailer</a>
        <br><br>
    `;
    movieDetailsContainer.innerHTML = html;
}
