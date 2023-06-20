import axios from "axios";

const apiKey = 'b567688a368342fe99d103839232106'
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`
let getWeatherInfoId = document.getElementById('weatherInfosId')

document.getElementById('submit').addEventListener('click', ()=> {
    processSubmit(apiUrl)
})
document.getElementById('cityOrZipCode').addEventListener('keydown', ()=> (event.key === 'Enter') && submit.click())

const getWeatherData = (url, location) => {
    let finalApiUrl = url+location

    axios.post(finalApiUrl)
    .then((response) => {
        if (response.status === 200) {
            processDisplayInfos(response.data)
        }
    })
    .catch((error) => {
        //console.log(error)
        getWeatherInfoId.innerHTML = `<p>${error.message}</p>`
    });
}

const processSubmit = (apiUrl) => {
    const locationInfo = document.getElementById('cityOrZipCode')
    const location = locationInfo.value.trim()

    if (location !== '') {
        getWeatherData(apiUrl, location)
    }
}

const processDisplayInfos = (weatherData) => {
    const data = weatherData

    const locationInfo = {
        city: data.location.name,
        country: data.location.country,
        time: data.location.localtime,
        timezone: data.location.tz_id
    }

    const weatherInfos = {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
        descriptionalIcon: data.current.condition.icon,
        descriptionWithIcon() {
            return `<img src="${this.descriptionalIcon}"><span>${this.description}</span>`
        }

    }
    //console.log(weatherInfos)
    const {temperature, humidity, ...desc} = weatherInfos

    const {city, country, ...time} = locationInfo
    //console.log(data);
    getWeatherInfoId.innerHTML = `<h3>Weather infos of ${city}, ${country}</h3>
<p class="mr-4">(<strong>Time:</strong> ${time.time}, <strong>Timezone:</strong> ${time.timezone})</p>
<br/>
<span><strong>Temperature:</strong> ${temperature}</span><br/>
<span><strong>Humidity:</strong> ${humidity}</span><br/>
<span><strong>Description:</strong> ${desc.descriptionWithIcon()}</span>`

}
