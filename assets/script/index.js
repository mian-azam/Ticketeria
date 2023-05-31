'use strict'
// importing utils functions
import { select, print, onEvent} from "./utils.js";


//fetching movies
const movie = select(".movieSearch");
let listOfMovies = select(".movieList");
movie.value = "";
const urlForMovies = "./assets/script/movies.json";

//fetching cities
const city = select(".citySearch");
let listOfCities = select(".cityList");
city.value = "";
const urlForCities = "./assets/script/cities.json";

const grid = select(".display");

const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    mode: 'cors'
};

async function getMovies() {
    try {
      const response = await fetch(urlForMovies, options);
      if (!response.ok)
        throw new Error(`${response.statusText} ${response.status}`);
      const data = await response.json();
      
      
  
      function getMovieInfo(array) {
        grid.innerHTML = "";
  
        array.forEach((element) => {
          grid.innerHTML += ` <div class="grid-item">
          <div class="poster">
          <img
          src="${element.img}"
          alt="image"
          />
          </div>
          <p class="movie-title">${element.title}</p>
          `;
        });
      }
      getMovieInfo(data.results);
  
    } catch (error) {
      print(error.message);
    }
  }
  
  getMovies();


const searchMovies = async searchText => {
    const response = await fetch(urlForMovies, options); 
    const data = await response.json(); 
    const titles = data.results;
  

   let moviesMatches = titles.filter(movie => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return movie.title.match(regex);
   });
  
   if(searchText.length === 0) {
    moviesMatches = [];
    listOfMovies.innerHTML = '';
    listOfMovies.style.visibility = 'hidden';
   }
   outputHtml(moviesMatches);
  };

   const outputHtml = matches => {
    if(matches.length > 0) {
      listOfMovies.style.visibility = 'visible';
      const html = matches.map(match => `
          <h4>${match.title} (${match.year})</h4>
      `).join('');
  
      listOfMovies.innerHTML = html;
  
      listOfMovies.querySelectorAll('h4').forEach(item => {
        item.addEventListener('click', () => {
          movie.value = item.textContent;
          listOfMovies.style.visibility = 'hidden';
        });
      });
  
    } else if(titleInput.value === '') {
      matches = [];
      listOfMovies.innerHTML = '';
      listOfMovies.style.visibility = 'hidden';
  
    } else if(matches.length === 0) {
      listOfMovies.style.visibility = 'visible';
      listOfMovies.innerHTML = `<p>Movie not found</p>`;  
   }
  }
  
  movie.addEventListener('input', () => searchMovies(movie.value));

  async function getCities() {
    try {
      const response = await fetch(urlForCities, options);
  
      if (!response.ok)
        throw new Error(`${response.statusText} ${response.status}`);
  
      const data = await response.json();

    } catch (error) {
      print(error.message);
    }
  }
  
  getCities();


    const searchCity = async searchCity => {
    const response = await fetch(urlForCities, options); 
    const results = await response.json(); 
    const cities = results.cities;
  

   let citiesMatches = cities.filter(city => {
    const regex = new RegExp(`^${searchCity}`, 'gi');
    return city.name.match(regex);
   });
  
   if(searchCity.length === 0) {
    citiesMatches = [];
    listOfCities.innerHTML = '';
    listOfCities.style.visibility = 'hidden';
   }
   citiesHtml(citiesMatches);
  };
  
   const citiesHtml = cityMatches => {
    if(cityMatches.length > 0) {
      listOfCities.style.visibility = 'visible';
      const html2 = cityMatches.map(match => `
          <h4>${match.name}</h4>
      `).join('');
  
      listOfCities.innerHTML = html2;
  

      listOfCities.querySelectorAll('h4').forEach(item => {
        item.addEventListener('click', () => {
          city.value = item.textContent;
          listOfCities.style.visibility = 'hidden';
        });
      });
  
    } else if(citySearch.value === '') {
      cityMatches = [];
      citiesList.innerHTML = '';
      listOfCities.style.visibility = 'hidden';
  
    } else if(cityMatches.length === 0) {
      listOfCities.style.visibility = 'visible';
      listOfCities.innerHTML = `<p>City not found</p>`;  
   }
  }
  
  city.addEventListener('input', () => searchCity(city.value));

  