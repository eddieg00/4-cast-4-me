var search = document.getElementById("search-bar")
var API = "a99dd08de39acd515bcc2062fdb6aa30"

search.addEventListener("submit",function(event){
    event.preventDefault()
    var city = document.getElementById("city-input").value
    retrieveInfo(city)
})


function retrieveInfo(city){
  var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}&units=imperial`
  fetch(URL)
  .then(Response => Response.json())
  .then(apiData => {
    console.log(apiData)
    let html = ""
    for(let i=0;i<apiData.list.length;i=i+8) //24/3 = 8
    {
    html += `<div class="card" style="width: 18rem;">
    <p>${apiData.list[i].weather[0].description}
    <img src="https://openweathermap.org/img/wn/${apiData.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="..."></p>
    <div class="card-body">
      <h5 class="card-title">${apiData.list[i].dt_txt}</h5>
      <p class="card-text">Temp: ${apiData.list[i].main.temp}.</p>
      <p class="card-text">Humidity: ${apiData.list[i].main.humidity}.</p>
      <p class="card-text">WindSpeed: ${apiData.list[i].wind.speed}.</p>
 
    </div>
  </div>`
    }
    document.getElementById("forecast").innerHTML = html

  })
} 