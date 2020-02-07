const locList = ["Busan", "Seoul", "Daejeon", "daegu", "Gwangju", "Jeju"];
const loc = document.getElementById("location");

locList.forEach(function(el) {
    let option = document.createElement("option");
    option.value = el;
    option.innerHTML = el;
    loc.append(option);
});

const weather_now_view = document.getElementsByClassName("weather_now_view");
const weather_3hours_view = document.getElementsByClassName("weather_3hours_view");

Date.prototype.format = function() {
    let date = new Date;
    let getyear = date.getFullYear();
    let getmonth = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let getdate = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
    let gethours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
    let getminutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    
    let format = `${getyear}-${getmonth}-${getdate} ${gethours}:${getminutes}`;
    
    return format;
}

const data_now = function(data) {
    let img = document.getElementById("weather_img");
    img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weather_now_view[0].innerHTML = data.main.humidity + "% " + data.wind.speed + "m/s";
    weather_now_view[1].innerHTML = (data.main.temp - 273.15).toFixed(1) + " °C";
    weather_now_view[2].innerHTML = "min " + (data.main.temp_min - 273.15).toFixed(1) + " °C " +
                                    " / max " + (data.main.temp_max - 273.15).toFixed(1) + " °C ";
    let standard_time = document.getElementById("standard_time");
    standard_time.innerHTML = (new Date).format();
}

const weather_check = function() {    // If select.value is change, call weather data.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc.value},kr&appid=f6298de834feb1d272496c63e81b3598`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(json) {
        data_now(json);
    })
}
weather_check();

const date_3hours_format = function(date) {
    let month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let format = `${month}-${day} ${hours}:00`;

    return format;
}

const data_3hours = function(data) {
    for (let i = 0; i <= 20; i++) {
        let hours3_view = document.getElementsByClassName("3hours_view");
        hours3_view[i++].innerHTML = date_3hours_format(new Date(data.list[parseInt(i / 3)].dt * 1000));
        let img = document.getElementById(`weather_3hours_img_${parseInt(i / 3)}`);
        img.src = `https://openweathermap.org/img/w/${data.list[parseInt(i / 3)].weather[0].icon}.png`;
        hours3_view[i++].innerHTML = (data.list[parseInt(i / 3)].main.temp - 273.15).toFixed(1) + " °C";
        hours3_view[i].innerHTML = data.list[parseInt(i / 3)].main.humidity + " %";
    }
}

const weather_check_3hours = function() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc.value},kr&appid=f6298de834feb1d272496c63e81b3598`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(json) {
        data_3hours(json);
    })
}
weather_check_3hours();
