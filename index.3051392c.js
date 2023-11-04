var apiKey="07aed853a2b3116bf7e19dfeee63b968",city="Paris",cardsContainer=document.querySelector(".days"),svgContainer=document.getElementById("svg-container"),weatherCondition="Clouds",icons={Clouds:svgContainer.querySelector("#icon-cloudy"),Clear:svgContainer.querySelector("#icon-sun"),Snow:svgContainer.querySelector("#icon-snow"),Clouds_sun:svgContainer.querySelector("#icon-clouds-and-sun"),Weather:svgContainer.querySelector("#icon-weather"),sunrise:svgContainer.querySelector("#icon-sunrise"),sunset:svgContainer.querySelector("#icon-sunset"),humidity:svgContainer.querySelector("#icon-humidity"),barometer:svgContainer.querySelector("#icon-barometer"),wind:svgContainer.querySelector("#icon-wind")};function getWeatherIconName(e){switch(e){case"Clouds":return"icon-cloudy";case"Clear":return"icon-sun";case"Snow":return"icon-snow";case"Clouds_sun":return"icon-clouds-and-sun";default:return"icon-weather"}}var weatherIconName=getWeatherIconName(weatherCondition),daySection=document.querySelector(".days"),moreBtn=document.querySelector(".more-btn");function createWeatherCard(e,n,t,r,a){var c=document.createElement("div");return c.classList.add("weather-card"),c.innerHTML='\n    <div class="weather-card__time">\n      <h2 class="weather-card__time-hour">'.concat(e,'</h2>\n      <svg class="weather-card__time-icon">\n        <use href="#').concat(weatherIconName,'"></use>\n      </svg>\n      <h1 class="weather-card__time-temp">').concat(n,'</h1>\n    </div>\n    <div class="weather-card__details">\n      <div class="weather-card__barometer">\n        <svg class="weather-card__details-icons">\n          <use href="#icon-barometer"></use>\n        </svg>\n        <p class="weather-card__details-text">').concat(t,'</p>\n      </div>\n      <div class="weather-card__humidity">\n        <svg class="weather-card__details-icons">\n          <use href="#icon-humidity"></use>\n        </svg>\n        <p class="weather-card__details-text">').concat(r,'</p>\n      </div>\n      <div class="weather-card__wind">\n        <svg class="weather-card__details-icons">\n          <use href="#icon-wind"></use>\n        </svg>\n        <p class="weather-card__details-text">').concat(a,"</p>\n      </div>\n    </div>\n  "),c}function convertPressureToMmHg(e){return(.75006375541921*e).toFixed(2)}fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(city,"&appid=").concat(apiKey,"&units=metric")).then((function(e){return e.json()})).then((function(e){e.list.slice(0,7).forEach((function(e){var n=new Date(1e3*e.dt),t=n.getHours(),r=n.getMinutes(),a=createWeatherCard("".concat(t.toString().padStart(2,"0"),":").concat(r.toString().padStart(2,"0")),"".concat(Math.round(e.main.temp),"°C"),"".concat(convertPressureToMmHg(e.main.pressure)," mm"),"".concat(e.main.humidity," %"),"".concat(e.wind.speed," m/s"));cardsContainer.appendChild(a)}))})).catch((function(e){console.error("Eroare la obținerea datelor pentru orele următoare:",e)}));
//# sourceMappingURL=index.3051392c.js.map
