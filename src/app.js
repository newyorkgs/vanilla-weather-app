function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);

    let hours = date.getHours();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Sunday',
        'Sunday',
    ];

    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    console.log(response.data);
    let header = document.querySelector('#cityHeader');
    header.innerHTML = response.data.name;

    let countryHead = document.querySelector('#countryHeader');
    countryHead.innerHTML = response.data.sys.country;

    farenheitTemperature = response.data.main.temp;

    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = Math.round(farenheitTemperature);

    let description = document.querySelector('#description');
    description.innerHTML = response.data.weather[0].main;

    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = response.data.main.humidity;

    let wind = document.querySelector('#wind');
    wind.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector('#currentTime');
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconMonday = document.querySelector('#iconMonday');
    iconMonday.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function displayForecast() {
    let forecastElement = document.querySelector('.white-weekly');

    let days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    let forecastHTML = '<div class="row weeklyForecast">';

    days.forEach(function (day) {
        forecastHTML =
            forecastHTML +
            `
              <div class="col-2 daily">
              <div class="weeklyForecast-date">${day}</div>
              <img class="wafer-img-native wafer-img-loaded"
                data-wf-src="https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/clear_night@2x.png"
                src="https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/clear_night@2x.png" width="28" height="28"
                alt="Clear" loading="lazy" id="iconMonday" />
              <div class="forecast-temp">
                <span class="degrees max">5°</span> <span class="degrees min">42°</span>
              </div>
            </div>
            `;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

function search(city) {
    let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#city-input');
    search(cityInputElement.value);
}
function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector('#temperature');
    // remove the active class from the f link and add active to c link
    celsiusLink.classList.add('active');
    farenheitLink.classList.remove('active');
    let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFarenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitTemperature = null;

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemp);

let farenheitLink = document.querySelector('#farenheit-link');
farenheitLink.addEventListener('click', displayFarenheitTemp);

search('New York');
displayForecast();
