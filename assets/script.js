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