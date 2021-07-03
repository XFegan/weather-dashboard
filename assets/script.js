  var searchButtonEl = document.getElementById("search-button");
  var cityEl = document.getElementById("enter-city");
  var clearEl = document.getElementById("clear-history");
  var cityNameEl = document.getElementById("city-name");
  var currentPictureEl = document.getElementById("current-picture");
  var currentTempEl = document.getElementById("temperature");
  var currentWindEl = document.getElementById("wind-speed");
  var currentHumidityEl = document.getElementById("humidity");
  var currentUVEl = document.getElementById("UV-index");
  var historyEl = document.getElementById("history");
  var fiveDayEl = document.getElementById("five-day");
  var todayWeatherEl = document.getElementById("today-weather");
  var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  var api = "&units=imperial&appid=9a14f6c7f1d7fe60a328bfd813252503";
  var url = "https://api.openweathermap.org/data/2.5/weather?q="

fetch(url + cityEl + api)
    .then((response)=>{
        return response.json()
     })
     .then ((data)=>{
         console.log(data)
     })




