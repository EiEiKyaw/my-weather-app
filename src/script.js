let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
let units = "metric";
let weatherApi = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}`;

let searchCity = document.querySelector("#search-city");
let d2Title = document.querySelector(".d2-title");
let currentDateRow = document.querySelector("#current-date");
let curDegree = document.querySelector("#degree-value");
let curDegreeType = document.querySelector("#degree-type");
let cDegree = document.querySelector("#convert-c-degree");
let fDegree = document.querySelector("#convert-f-degree");
let searchForm = document.querySelector("#search-form");
let currentLocation = document.querySelector("#current-location");

function getDay(dayValue) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayValue];
}

function getHours(value) {
  let hours = value;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return hours;
}

function getMins(value) {
  let mins = value;
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return mins;
}

function changeCurrentDegree(response) {
  curDegree.innerHTML = Math.round(response.data.main.temp);
}

function searchCityName(event) {
  event.preventDefault();
  d2Title.innerHTML = searchCity.value;
  axios.get(`${weatherApi}&q=${searchCity.value}`).then(changeCurrentDegree);
}

function changeCurrentDegreeAndCity(response) {
  d2Title.innerHTML = response.data.name;
  curDegree.innerHTML = Math.round(response.data.main.temp);
}

function callCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${weatherApi}&lat=${lat}&lon=${long}`)
    .then(changeCurrentDegreeAndCity);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(callCurrentPosition);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let fah = (curDegree.innerHTML * 9) / 5 + 32;
  curDegree.innerHTML = Math.round(fah);
  curDegreeType.innerHTML = `°F`;
  cDegree.style.display = "block";
  fDegree.style.display = "none";
}

function convertCelsius(event) {
  event.preventDefault();
  let cel = ((curDegree.innerHTML - 32) * 5) / 9;
  curDegree.innerHTML = Math.round(cel);
  curDegreeType.innerHTML = `°C`;
  fDegree.style.display = "block";
  cDegree.style.display = "none";
}

let current = new Date();
let day = getDay(current.getDay());
let hours = getHours(current.getHours());
let mins = getMins(current.getMinutes());

cDegree.style.display = "none";

currentDateRow.innerHTML = `${day} ${hours}:${mins}`;

searchForm.addEventListener("submit", searchCityName);

fDegree.addEventListener("click", convertFahrenheit);

cDegree.addEventListener("click", convertCelsius);

currentLocation.addEventListener("click", searchCurrentLocation);
