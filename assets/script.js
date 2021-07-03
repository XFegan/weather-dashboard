var searchButtonEl = document.getElementById("search-button");
var cityEl = document.getElementById("enter-city");
var clearEl = document.getElementById("clear-history");
var nameEl = document.getElementById("city-name");
var currentPictureEl = document.getElementById("current-picture")
var currentTempEl = document.getElementById("temperature");
var currentWindEl = document.getElementById("wind-speed");
var currentHumidityEl = document.getElementById("humidity");
var currentUVEl = document.getElementById("UV-index");
var hsitoryEl = document.getElementById("history");
var fiveDayEl = document.getElementById("five-day");
var todayWeatherEl = document.getElementById("today-weather");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
currentCity = "Storrs";
var apiBase = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&units=imperial&appid=9a14f6c7f1d7fe60a328bfd813252503";

fetch(apiBase + currentCity + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);


    })