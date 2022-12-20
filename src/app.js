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

    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = Math.round(response.data.main.temp);

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

search('New York');

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);
