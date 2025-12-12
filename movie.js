const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click",getMovie);

async function getMovie() {
    const movieName = movieInput.value.trim();
    if(!movieName){
        result.textContent = "Please enter a movie name";
        return;
    }
    result.textContent = "Loading...";

    const url = `https://api.themoviedb.org/3/search/movie?api_key=ac86f01f73cbdef003c860229771c1fb&query=${encodeURIComponent(movieName)}`;
    try{
        const res = await fetch(url);
        const data = await res.json();

        if(!data.results || data.results.length === 0){
            result.textContent = "Movie not found.";
            return;
        }
        const movie = data.results[0];
        const poster = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

        result.innerHTML = `
            <img src="${poster}" alt="Poster" style="width:200px; border-radius:10px;">
            <h2>${movie.title}</h2>
            <p><strong>Year:</strong> ${movie.release_date.slice(0,4)}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        `;

        console.log(movie);
    }
    catch(err){
        result.textContent = "error fetching movie data.";
        console.log(err);
    }
}