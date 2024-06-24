let city = '';
let iconAddFav = document.querySelector('.add-fav')
const iconRemoveFav = document.querySelector('.remove-fav')
let divFavoritesID = ''
// primeiro endpoint: dados atuais do tempo/clima da cidade
function getActualForecast (cityName) {
    const apiKey = '5eeb8c8921ffebe37450927019b3dd8f';

    const endpointUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

        fetch(endpointUrl)
            .then((data) => {
                if (!data.ok) {
                    alert('Não foi possível localizar o local digitado...')
                }
                return data.json(); 
            })
            .then((data) => {
                city = data.name

                showActualForecast({
                    city: data.name,
                    country: data.sys.country,
                    description: data.weather[0].description,
                    tempIcon: data.weather[0].icon,
                    temperature: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    humidity: data.main.humidity,
                    wind: data.wind.speed
                })  
            })
}

function showActualForecast (data) {
    document.querySelector('#container').classList.remove('container-toggle')

    document.querySelector('.city').querySelector('h1').textContent = `${data.city}, ${data.country} `

    document.querySelector('.main-information').querySelector('p').textContent = ` ${data.description} `

    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${data.tempIcon}.png`)

    document.querySelector('.temp').querySelector('p').textContent = ` ${data.temperature.toFixed(0).toString()}ºC`

    document.querySelector('#temp-max').querySelector('span').textContent = `${data.tempMax.toFixed(0).toString()}ºC`

    document.querySelector('#temp-min').querySelector('span').textContent = `${data.tempMin.toFixed(0).toString()}ºC`

    document.querySelector('#umidade').querySelector('span').textContent = `${data.humidity}%`

    document.querySelector('#vento').querySelector('span').textContent = `${data.wind} km/h`

    
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

function addFavorites (city) {
    const divFavorites = document.getElementById('favorites')

    let divCityFavorite = document.createElement('div');
    divCityFavorite.classList.add('city-fav');
    divCityFavorite.id = city;
    divFavoritesID = divCityFavorite.id;

    const favoriteCity = document.createElement('p')
    favoriteCity.textContent = city;
    divCityFavorite.appendChild(favoriteCity)

    const iconFav = document.createElement('i')
    iconFav.classList.add('remove-fav', 'bi', 'bi-star-fill')
    iconFav.addEventListener('click', () => {removeFavorites(city);});
    divCityFavorite.appendChild(iconFav)

    divFavorites.appendChild(divCityFavorite)
}

function removeFavorites (idCity) {
    const cityToRemove = document.getElementById(idCity)

    cityToRemove.remove()
}

document.querySelector('.search-btn').addEventListener("click", (e) => {
    e.preventDefault()
    
    const cityName = document.querySelector('#search-input').value;

    getActualForecast(cityName)
    getDailyForecast(cityName)
});

iconAddFav.addEventListener('click', (e) => {
    
    iconAddFav.classList.remove('bi-star');
    iconAddFav.classList.add('bi-star-fill')

    addFavorites(city)
})

/*iconRemoveFav.addEventListener("click", (e) => {
    const divParent = iconRemoveFav.parentElement.id;
    console.log(divParent)

    removeFavorites(divParent)
})*/

