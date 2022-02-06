function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} <font color= "#ff0000">|</font> ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];
  let forecastHTML = `
  <div class="p-2 container-fluid seven-day-forecast" id="forecast">        
  <div class="row flex-row flex-nowrap" id="scroll-text">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
           <div class="col-sm flex-shrink-1">
             <div class="card card-block">
               <ul class="list-group list-group-flush">
                 <li class="list-group-item day" id="day">${day}</li>
                 <li class="list-group-item icon" id="forecastIcon">
                   <img
                     src="http://openweathermap.org/img/wn/50d@2x.png"
                     alt=""
                     width="42"
                   />
                 </li>
                 <li class="list-group-item degrees">
                   <span id="forecastTempMax">51° </span>
                   <span id="forecastTempMin">40°</span>
                 </li>
               </ul>
             </div>
           </div>
         
 `;
  });
  forecastHTML = forecastHTML + `</div></div>`;
  forecastElement.innerHTML = forecastHTML;
}
/* function showForecast(response) {
 document.querySelector("#forecast").innerHTML = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 8) {
      document.querySelector("#day").innerHTML= `${getDay(forecastDay.dt)}`;
      document.querySelector("#forecastIcon").setAttribute("src", `http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`);
      document.querySelector("forecastIcon").setAttribute("alt", forecastDay.weather[0].description);
      document.querySelector("#high").innerHTML= Math.round(forecastDay.temp.max);
      document.querySelector("#low").innerHTML= Math.round(forecastDay.temp.min);
  }

function getForecast(coordinates) {
  let apiKey = "eb052656b887b34b8aa3dfc39bd9f4fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=7&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}
 */

function showWeather(response) {
  farenheitTemperature = response.data.main.temp;
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(farenheitTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  //getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "eb052656b887b34b8aa3dfc39bd9f4fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
  var form = document.querySelector("#search-form");
  form.reset();
}

function searchLocation(position) {
  let apiKey = "eb052656b887b34b8aa3dfc39bd9f4fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelsius(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitTemperature = null;

//change temperature
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//change date and time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//change location
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
displayForecast();
