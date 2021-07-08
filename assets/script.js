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
var date = moment().format("MM/DD/YYYY");
var mainDate = document.getElementById("main-date");
//var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
currentCity = "Storrs";
var apiKey = "&units=imperial&appid=9a14f6c7f1d7fe60a328bfd813252503";
var apiBase = "https://api.openweathermap.org/data/2.5/weather?q=";

fetch(apiBase + currentCity + apiKey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    currentTempEl.textContent = "Temp: " + data.main.temp + "° F";
    currentWindEl.textContent = "Wind: " + data.wind.speed + "MPH";
    currentHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    cityNameEl.textContent = date.name;
    mainDate.textContent = date;
    var iconEl = document.createElement("img");
    iconEl.setAttribute( "src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    cityNameEl.append(iconEl);
    showUV(data.coord.lat, data.coord.lon);
  });

searchButtonEl.addEventListener("click", function (event) {
  city = cityEl.value;
  event.preventDefault();
  console.log(city);
  if (city === "") {
    alert("Use a Valid City");
  } else {
    getResults();
    saveSearchData();
  }
});

var getResults = function () {
  fetch(apiBase + city + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentTempEl.textContent = "Temp: " + data.main.temp + "° F";
      currentWindEl.textContent = "Wind: " + data.wind.speed + "MPH";
      currentHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
      cityNameEl.textContent = data.name;
      var iconEl = document.createElement("img");
      iconEl.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      cityNameEl.append(iconEl);

      oneCallApi(data.coord.lat, data.coord.lon);
    });
};

var showUV = function(lat, lon){
    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts" + apiKey;
        fetch(oneCall)
            .then(function(response){
                return response.json();
            })
            .then(function (data){
                currentUVEl.textContent = data.current.uvi;
                console.log(data);
                getForecastResults(data);
            });
}

var oneCallApi = function (lat, lon) {
    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts" + apiKey;
  fetch(oneCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentUVEl.textContent = data.current.uvi;
      console.log(data);
      getForecastResults(data);
    });
};

//5-day
var getForecastResults = function (data) {
    console.log(data);
    fiveDayEl.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        var castDate = moment().add(i+1, "days").format("MM/DD/YYYY");
        console.log(castDate);

        var castBlock = document.createElement("div");
        castBlock.setAttribute("class", "block");
        var forecastDateEl = document.createElement("h3");
        var iconEl = document.createElement("img");
        var currentTempEl = document.createElement("p");
        var currentWindEl = document.createElement("p");
        var currentHumidityEl = document.createElement("p");
        var currentUVEl = document.createElement("p");
        forecastDateEl.setAttribute("class", "forecast-date");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        
        forecastDateEl.textContent = castDate;
        currentTempEl.textContent = "Temp: " + data.daily[i].temp.day + "° F";
        console.log(data);
        currentWindEl.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
        currentHumidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
        currentUVEl.textContent = "UV Index: " + data.daily[i].uvi;

        fiveDayEl.append(castBlock)
        castBlock.append(forecastDateEl, iconEl, currentTempEl , currentHumidityEl, currentWindEl, currentUVEl);
    };
    
};

//local Storgae
var oldData = [];
var saveSearchData = function () {
  newData = {
    text: city,
  };
  oldData.push(newData);
  localStorage.setItem("search", JSON.stringify(oldData));
};

//load files
var loadData = function () {
    oldData = JSON.parse(localStorage.getItem("search")) || [];
    //console.log(oldData);
    for (let i = 0; i < oldData.length; i++) {
        search = document.createElement("p");
        search.setAttribute("class", "clear-history");
        search.textContent = oldData[i].text;
        clearEl.append(search);
    }
};
loadData();

clearEl.addEventListener("click", function () {
    newVal = oldData[0].text;
    fetch(apiBase + newVal + apiKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        currentTempEl.textContent = "Temp: " + data.main.temp + "° F";
        currentWindEl.textContent = "Wind: " + data.wind.speed + "MPH";
        currentHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
        cityNameEl.textContent = data.name;
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        cityNameEl.append(iconEl);
      });
    });
