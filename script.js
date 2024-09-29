const apiKey = "4f5f732a1819193e8f3160547722b18e";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    
    document.querySelector(".description").innerHTML = description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".weather").style.display = "block";
    error.style.display = "none"
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather();
