searchButtonEl.addEventListener("click", searchCity)

function searchCity (){
    var city = cityEl.value
    fetch(url + city + api)
    .then((response)=>{
        return response.json()
     })
     .then ((data)=>{
         console.log(data)
     })
}
console.log(cityEl)