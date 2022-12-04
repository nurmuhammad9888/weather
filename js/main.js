
const elList = document.querySelector(".hero-wrap");
const elListDay = document.querySelector(".hero-wrap-day");
const elTemplateSearch = document.querySelector(".weather-template-search").content;
const elTemplateSearchDay = document.querySelector(".weather-day-template-search").content;
const weatherFragment = document.createDocumentFragment();
const elForm = document.querySelector(".weather-form-js");
const elInput = document.querySelector(".weather-input-search");
const elBootstapToast = document.querySelector(".toast");
const elWeatherTileFive = document.querySelector(".weather-five-days-top-title");
const elDayTitle = document.querySelector(".hero-weather-five-days-title")

const API_KEY = `66cfe8494927f5731a6ab7b89bc07474`;
const URL = `https://api.openweathermap.org/data/2.5/weather?q=toshkent&units=metric&appid=`;
const URL_DAY = `https://api.openweathermap.org/data/2.5/forecast?q=toshkent&units=metric&appid=`

async function weatherFunc(url, api){
    try {
        const res = await fetch(`${url}${api}`)
        
        const data = await res.json();
        if(data.message == "city not found"){
            elBootstapToast.classList.add("show");
            elWeatherTileFive.classList.add("d-none")
            elDayTitle.classList.add("d-none")
            setTimeout(() => {
                elBootstapToast.classList.remove("show");
            }, 5000);
        }else{
            elWeatherTileFive.classList.remove("d-none")
            elDayTitle.classList.remove("d-none")
        }
        console.log(data);
        renderFunc(data)
    } catch (error) {
        console.log(error);
    }
}
weatherFunc(URL, API_KEY);

let newdata = new Date();
let moths = ["Yanvar", "Fevral","Mart", "April", "May", "Iyun", "Iyul", "Avgust", "Sentabr ", "Oktabr", "Noyabr", "Dekabr"];
let days = ["Yakshanba","Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
let day = days[newdata.getDay() ];
let data = newdata.getDate();
let moth = moths[newdata.getMonth()];
let year = newdata.getFullYear();
let mon = newdata.getMonth()
data = data < 10 ? "0" + data : data;

// function formatTime(time) {
//     return time < 10 ? "0" + time : time;
// }

function dateFunc(date){
    let nwDate = new Date(date * 1000);
    let nwHour = nwDate.getHours().toString().padStart(2,0)
    let nwMinut = nwDate.getMinutes().toString().padStart(2,0)
    return `${nwHour} : ${nwMinut}`
}

function renderFunc(arr){
    elList.innerHTML = "";
    const temClone = elTemplateSearch.cloneNode(true);
    temClone.querySelector(".weather-cite").textContent = arr.name;
    temClone.querySelector(".weather-time").textContent = `${data} ${moth} ${year}  yil`
    temClone.querySelector(".weather-temp").textContent = Math.round(arr.main.temp) + "°C";
    temClone.querySelector(".weather-feels_like").textContent = "His qilinishi :" + " " +  Math.round(arr.main.feels_like) +" "+ "°C";
    
    temClone.querySelector(".weather-wind").textContent = `Shamol tezligi : ${arr.wind.speed} km/s`;
    temClone.querySelector(".weather-img-wind").src = "../images/windsock.svg";
    
    temClone.querySelector(".weather-humidity").textContent = `Namlik : ${arr.main.humidity} %`;
    temClone.querySelector(".weather-img-humidity").src = "../images/humidity.svg"
    
    temClone.querySelector(".weather-pressure").textContent = `Bosim : ${arr.main.pressure} PS`;
    temClone.querySelector(".weather-img-pressure").src = "../images/raindrop-measure.svg"
    let sunrise = arr.sys.sunrise;
    let sunset = arr.sys.sunset;
    temClone.querySelector(".weather-sunrise-img").src = "../images/sunrise.svg";
    temClone.querySelector(".weather-sunrise").textContent = `Quyosh chiqishi ${dateFunc(sunrise)}`
    temClone.querySelector(".weather-sunset-img").src = "../images/sunset.svg";
    temClone.querySelector(".weather-sunset").textContent = `Kun botishi ${dateFunc(sunset)}`
    // temClone.querySelector(".weather-text").textContent = arr.weather[0].main;
    
    if(arr.weather[0].main == "Thunderstorm"){
        temClone.querySelector(".weather-big-img").src = "../images/thunderstorms.svg";
        temClone.querySelector(".weather-text").textContent = "Momaqaldiroq";
    }
    
    if(arr.weather[0].main == "Drizzle"){
        temClone.querySelector(".weather-big-img").src = "../images/drizzle.svg";
        temClone.querySelector(".weather-text").textContent = "Yog'ingarchilik";
    }
    
    if(arr.weather[0].main == "Rain"){
        temClone.querySelector(".weather-big-img").src = "../images/rain.svg";
        temClone.querySelector(".weather-text").textContent = "Yomg'ir";
    }
    
    if(arr.weather[0].main == "Snow"){
        temClone.querySelector(".weather-big-img").src = "../images/snow.svg";
        temClone.querySelector(".weather-text").textContent = "Qor";
    }
    
    if(arr.weather[0].id >= 701 && arr.weather[0].id <= 781){
        temClone.querySelector(".weather-big-img").src = "../images/fog.svg";
        temClone.querySelector(".weather-text").textContent = "Tuman";
    }
    
    if(arr.weather[0].main == "Clear"){
        temClone.querySelector(".weather-big-img").src = "../images/clear-day.svg";
        temClone.querySelector(".weather-text").textContent = "Quyosh";
    }
    
    if(arr.weather[0].main == "Clouds"){
        temClone.querySelector(".weather-big-img").src = "../images/cloudy.svg";
        temClone.querySelector(".weather-text").textContent = "Bulutli";
    }
    
    weatherFragment.appendChild(temClone);
    elList.appendChild(weatherFragment)
}

async function weatherDayFunc(url, api){
    try {
        const res = await fetch(`${url}${api}`)
        const data = await res.json();
        console.log(data); 
        renderDayFunc(data)
    } catch (error) {
        console.log(error);
    }
}

weatherDayFunc(URL_DAY, API_KEY)

function renderDayFunc(arr){
    elListDay.innerHTML = "";
    arr.list.forEach(el =>{
        const temClone = elTemplateSearchDay.cloneNode(true);
        elDayTitle.textContent = arr.city.name;
        if(el.weather[0].main == "Thunderstorm"){
            temClone.querySelector(".weather-five-days-icon").src = "../images/thunderstorms.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Momaqaldiroq";
        }
        
        if(el.weather[0].main == "Drizzle"){
            temClone.querySelector(".weather-five-days-icon").src = "../images/drizzle.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Yog'ingarchilik";
        }
        
        if(el.weather[0].main == "Rain"){
            temClone.querySelector(".weather-five-days-icon").src = "../images/rain.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Yomg'ir";
        }
        
        if(el.weather[0].main == "Snow"){
            temClone.querySelector(".weather-five-days-icon").src = "../images/snow.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Qor";
        }
        
        if(el.weather[0].id >= 701 && el.weather[0].id <= 781){
            temClone.querySelector(".weather-five-days-icon").src = "../images/fog.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Tuman";
        }
        
        if(el.weather[0].main == "Clear"){
            temClone.querySelector(".weather-five-days-icon").src = "../images/clear-day.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Quyosh";
        }
        
        if(el.weather[0].main == "Clouds"){
            temClone.querySelector(".weather-five-days-icon").src = "../images/cloudy.svg";
            temClone.querySelector(".weather-five-days-text").textContent = "Bulutli";
        }
    
        temClone.querySelector(".weather-five-days-temp").textContent = Math.round(el.main.temp) + "°C";
        temClone.querySelector(".weather-five-days-time").textContent = el.dt_txt.slice(0, 16);
        weatherFragment.appendChild(temClone);
    })
    elListDay.appendChild(weatherFragment)
}

elForm.addEventListener("submit", evt =>{
    evt.preventDefault();
    const elInputVal = elInput.value;
    if(elInputVal == ""){
        weatherFunc(URL, API_KEY)
        weatherDayFunc(URL_DAY, API_KEY)
    }else{
        weatherFunc(`https://api.openweathermap.org/data/2.5/weather?q=${elInputVal}&units=metric&appid=`, API_KEY)
        weatherDayFunc(`https://api.openweathermap.org/data/2.5/forecast?q=${elInputVal}&units=metric&appid=`, API_KEY)
    }
})

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)
        
        toast.show()
    })
}