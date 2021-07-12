var fetchWeather = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");

const locationElement = document.querySelector(".place");
const error = document.querySelector(".error");
const country = document.querySelector(".country");

const dateElement = document.querySelector(".date");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dateElement.textContent =
  new Date().getDate() +
  ", " +
  monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  locationElement.textContent = "Loading...";
  country.textContent = "";
  tempElement.textContent = "";

  weatherCondition.textContent = "";
  const locationApi = fetchWeather + "?address=" + search.value;
  fetch(locationApi).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.textContent = data.error;
        locationElement.textContent = "";
        country.textContent = "";
        tempElement.textContent = "";
        weatherCondition.textContent = "";
        search.value = " ";
      } else {
        if (data.description === "rain" || data.description === "fog") {
          weatherIcon.className = "wi wi-day-" + data.description;
        } else {
          weatherIcon.className = "wi wi-day-cloudy";
        }
        locationElement.textContent = data.cityName;
        error.textContent = " ";
        country.textContent = data.country;
        tempElement.textContent =
          (data.temperature - 273.5).toFixed(2) +
          String.fromCharCode(176) +
          "C";
        weatherCondition.textContent = data.description.toUpperCase();
        search.value = " ";
      }
    });
  });
});
