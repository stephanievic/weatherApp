// primeiro endpoint: dados atuais do tempo/clima da cidade
function getActualForecast (cityName) {
    const apiKey = '5eeb8c8921ffebe37450927019b3dd8f';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`)

        .then((data) => {
            if (!data.ok) {
                alert('Não foi possível localizar o local digitado...')
            }
            return data.json(); 
        })
        .then((data) => {
            
            showActualForecast(data)
        })
}

function showActualForecast (data) {
    document.querySelector('#container').classList.remove('container-toggle')

    document.querySelector('.city').innerHTML= `<h1>${data.name}</h1>
                                                <i class="bi bi-star"></i> `

    document.querySelector('.main-information').querySelector('p').textContent = ` ${data.weather[0].description} `

    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

    document.querySelector('.temp').querySelector('p').textContent = ` ${data.main.temp.toFixed(0).toString()}ºC`

    document.querySelector('#temp-max').querySelector('span').textContent = `${data.main.temp_max.toFixed(0).toString()}ºC`

    document.querySelector('#temp-min').querySelector('span').textContent = `${data.main.temp_min.toFixed(0).toString()}ºC`

    document.querySelector('#umidade').querySelector('span').textContent = `${data.main.humidity}%`

    document.querySelector('#vento').querySelector('span').textContent = `${data.wind.speed} km/h`
}

// segundo endpoint: temperatura das proximas horas na cidade
function getDailyForecast (cityName) {
    const apiKey = '5eeb8c8921ffebe37450927019b3dd8f';

    const endpointUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(endpointUrl)
        .then(data => {
            if (!data.ok) {
                alert('Não foi possível localizar o local digitado...')
            }
            return data.json(); 
        })
        .then((data) => {
            //console.log(data.list)
            dailyForecast (data)
        })
    
}

function dailyForecast (data) {
    document.querySelector('#container').classList.remove('container-toggle')

    const dayTemps = document.querySelectorAll('.day-temp');

    for (let i = 0; i < 4; i++) {
        const forecast = data.list[i];
        const time = new Date(forecast.dt * 1000).toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' });
        const temperature = forecast.main.temp.toFixed(0);

        dayTemps[i].querySelector('h3').textContent = time;
        dayTemps[i].querySelector('img').setAttribute('src', `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`)
        dayTemps[i].querySelector('span').textContent = `${temperature}°C`;
    }
    
}


document.querySelector('.search-btn').addEventListener("click", (e) => {
    e.preventDefault()
    
    const cityName = document.querySelector('#search-input').value;

    getActualForecast(cityName)
    getDailyForecast(cityName)
});


