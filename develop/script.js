var search = document.getElementById("search-bar")
var API = "a99dd08de39acd515bcc2062fdb6aa30"
var savedCities = []; // Array to store searched cities

search.addEventListener("submit",function(event){
    event.preventDefault();
    var city = document.getElementById("city-input").value;
    retrieveCurrentWeather(city);
    retrieveInfo(city);
})

function retrieveCurrentWeather(city) {
  var URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=imperial`;
  fetch(URL)
      .then(response => response.json())
      .then(apiData => {
          console.log(apiData);
          var currentWeather = document.getElementById("current-weather");
          currentWeather.innerHTML = ""; // Clear previous data

          var html = `<div class="card" style="width: 18rem;">
              <p>${apiData.weather[0].description}</p>
              <img src="https://openweathermap.org/img/wn/${apiData.weather[0].icon}.png" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${apiData.name}</h5>
                  <p class="card-text">Temperature: ${apiData.main.temp}°F</p>
                  <p class="card-text">Humidity: ${apiData.main.humidity}%</p>
                  <p class="card-text">Wind Speed: ${apiData.wind.speed} mph</p>
              </div>
          </div>`;
          currentWeather.innerHTML = html;
      })
      .catch(error => {
          console.log("Error fetching current weather data:", error);
      });
}


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

    // Save searched city to local storage
    saveCity(city);
    // Render saved cities as a list
    renderSavedCities();

  })
} 

function saveCity(city) {
  // Check if the city is already saved
  if (savedCities.indexOf(city) === -1) {
      savedCities.push(city);
      localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }
}

function renderSavedCities() {
  var savedCitiesContainer = document.getElementById("saved-cities");
  savedCitiesContainer.innerHTML = ""; // Clear previous list

  // Retrieve saved cities from local storage
  var savedCitiesData = JSON.parse(localStorage.getItem("savedCities"));

  if (savedCitiesData && savedCitiesData.length > 0) {
      savedCities = savedCitiesData;
      savedCities.forEach(function(city) {
          var listItem = document.createElement("li");
          listItem.textContent = city;
          savedCitiesContainer.appendChild(listItem);
      });
  }
}

// Render saved cities on page load
renderSavedCities();