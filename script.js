var movies = [];

var data; 

const API_Key = "0a28de7bcd459d4cd5d84483b253ec18";

const popupElement = document.querySelector(".popup");

var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}`;

let page = 1;
const descriptionElement = document.querySelector("#desc")
// &page=

const searchElement = document.querySelector("#site-search")

const searchButton = document.querySelector("#search-button")
const loadingPagesElement = document.querySelector("#load")
const movieGridElement = document.querySelector("#movie-grid")
const xElement = document.querySelector("#x-button")

const rightPosterElement = document.querySelector("#right-poster")
// Defining async function
async function getapi() {
    // Storing response
    let response = await fetch(url);
    // Storing data in form of JSON
    data = await response.json();
    movies = data.results
    console.log("HERE IN GET API")
    return true;

}

async function loadMorePages() {
    page += 1
    page_url = url + `&page=${page}` 
    let response = await fetch(page_url)

    let data = await response.json()

    console.log(data)
    data.results.forEach(element => movies.push(element))
    data.results.forEach(element => addMovies(element, movieGridElement))
}

//event listener calls function that sends in an api request with the id of the movie, log out the response and take the info required
// https://api.themoviedb.org/3/movie/ + id + "?api_key=" + api_key

async function addToPopupUnhide(id) {
    let newUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}`;
    let response = await fetch(newUrl)
    // Storing data in form of JSON
    myData = await response.json();
    const backgroundimg = popupElement.querySelector(".background")
    backgroundimg.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${myData.backdrop_path}" alt = "${myData.title}" width=100% height=100%>`
    const titleElement = popupElement.querySelector(".title")
    console.log(popupElement)
    titleElement.innerHTML = `<h1>${myData.title}<\h1>`
    descriptionElement.innerHTML = `${myData.overview}`
    rightPosterElement.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${myData.poster_path}" alt = "${myData.title}" width=100% height=100%>` 
    makeDivUnhidden(popupElement)
    console.log(popupElement)
}

async function search(value) {
    movieGridElement.innerHTML = ``
    let urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=a3016ba6049f537e33cb6a0c27a8a821&language=en-US&query=${value}`
    let response = await fetch(urlSearch)
    // Storing data in form of JSON
    data = await response.json();
    data.results.forEach(element => addMovies(element, movieGridElement))
}

function addMovies(movie, movieGridElement) {
    movieGridElement.innerHTML += `<div class="movie-card"><p> ${movie.title} </p><img src = 'https://image.tmdb.org/t/p/w500${movie.poster_path}' alt = ${movie.title} onclick = addToPopupUnhide(${movie.id}) /><p>rating: ${movie.vote_average}</p></div>`
    // x.addEventListener("click", (e) => {
    //     addToPopupUnhide(movie.id)})
}

function makeDivUnhidden(element) {
    //element.style.display = (element.style.display == "block") ? "none": "block";
        element.className = "popup"
}

function clearMovies(movieGridElement) {
    movieGridElement.innerHTML = ``
    searchElement.value = ""
    movies.forEach(element => addMovies(element, movieGridElement))
}


window.onload = function () {
    // Calling that async function
    console.log(movieGridElement);
    getapi().then((data)=>movies.forEach(element => addMovies(element, movieGridElement)));
    let x = document.querySelector("#close")
    x.onclick = () => (popupElement.className = "popup hidden")

    loadingPagesElement.onclick = () => loadMorePages();
    searchButton.onclick = (e) => search(searchElement.value)

    xElement.onclick = () => clearMovies(movieGridElement)
    
}

//scroll-behavior: smooth

    // let x = document.createElement("img")
    // x.src = "https://image.tmdb.org/t/p/w500${movie.backdrop_path}"
    // x.style.display = "none"
    // movieGridElement.innerHTML += `<div class="popup">${x}</div>`