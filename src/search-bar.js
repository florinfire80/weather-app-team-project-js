import axios from 'axios';
import { fetchCityImage } from './background.js';
import { todayWeather } from './today.js';
import { displayCurrentTime } from './display_currentdate.js';
import { updateTimeForCity } from './display_citydate.js';
import { updateTimeWithTimeZone } from './display_citydate.js';

const Key = '07aed853a2b3116bf7e19dfeee63b968';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.search-bar');
  const searchBarInput = document.querySelector('.search-bar_input');
  const starIcon = document.querySelector('.search-bar_favorites-icon');
  const favoritesList = document.querySelector('.favorites_list');
  const favoritesLeftIcon = document.querySelector('.favorites_prev-btn');
  const favoritesRightIcon = document.querySelector('.favorites_next-btn');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = searchBarInput.value.trim();
    if (cityName) {
      fetchWeather(cityName);
      todayWeather(cityName);
    }
  });

  starIcon.addEventListener('click', function () {
    const cityName = searchBarInput.value.trim();
    this.classList.toggle('selected');
    if (cityName && !isCityInFavorites(cityName)) {
      addToFavorites(cityName);
    }
  });

  const SCROLL_AMOUNT = 100;
  favoritesLeftIcon.addEventListener('click', function () {
    favoritesList.scrollBy({
      left: -SCROLL_AMOUNT,
      top: 0,
      behavior: 'smooth',
    });
  });

  favoritesRightIcon.addEventListener('click', function () {
    favoritesList.scrollBy({
      left: SCROLL_AMOUNT,
      top: 0,
      behavior: 'smooth',
    });
  });

  displayCurrentTime();
  function fetchWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Key}`;
    axios
      .get(url)
      .then(response => {
        const data = response.data;
        if (data.cod === 200) {
          fetchCityImage(cityName)
            .then(imageUrl => {
              document.body.style.backgroundImage = `url(${imageUrl})`;
              document.body.style.backgroundSize = 'cover';
              document.body.style.backgroundPosition = 'center';
              document.body.style.backgroundRepeat = 'no-repeat';
              const timezoneOffset = data.timezone / 3600;

              updateTimeForCity(cityName);
              updateTimeWithTimeZone(timezoneOffset);
            })
            .catch(error => {
              console.error('Error fetching city image:', error);
            });
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  function isCityInFavorites(cityName) {
    const items = favoritesList.querySelectorAll('.favorites_item');
    for (let item of items) {
      if (item.textContent.trim().toLowerCase() === cityName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  function addToFavorites(cityName) {
    const listItem = document.createElement('li');
    listItem.classList.add('favorites_item');
    listItem.textContent = cityName;

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', function () {
      listItem.remove();
    });

    listItem.appendChild(closeButton);
    favoritesList.appendChild(listItem);
  }

  const findCityLocation = () => {
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${Key}`;

      fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const cityName = data[0].name;

            fetchWeather(cityName);
            todayWeather(cityName);
          } else {
            console.error('City not found.');
          }
        })
        .catch(error => {
          console.error('Error fetching city name:', error);
        });
    };

    const error = () => {
      console.error('Could not get location.');
    };
    navigator.geolocation.getCurrentPosition(success, error);
    const locationIcon = document.querySelector('.search-bar_location-icon');
    locationIcon.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(success, error);
    });
  };
  findCityLocation();
});
