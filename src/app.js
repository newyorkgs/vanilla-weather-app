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
}

let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Columbus&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
console.log(apiUrl);
