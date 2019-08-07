var locList = ["Seoul", "Daejeon", "daegu", "Busan", "Gwangju", "Jeju"];
var loc = document.getElementById("location");
locList.forEach(function(el) {
    let option = document.createElement("option");
    option.value = el;
    option.innerHTML = el;
    loc.append(option);
});

var weather_now = document.getElementById("weather_now");
var table_5Days = document.getElementById("weather_5Days");
var weather_now_view = document.getElementsByClassName("weather_now_view");
var date = new Date;
var date_standard = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:00:00`;


var locData = {};   // city main data
var locData5Days = {};  // 5days weather json data
var table_now = function() {
    for (var count = 0; count < locData5Days.length; count++) {     // find stadard date = count
        let condition = parseInt(locData5Days[count].dt_txt.slice(-8, -6)) - parseInt(date_standard.slice(-8, -6))
        if (condition <= 0 && condition >= -3) {
            break;
        }
    }
    weather_now_view[0].innerHTML = loc.value;
    let img = document.getElementById("weather_img");
    img.src = `http://openweathermap.org/img/w/${locData5Days[count].weather[0].icon}.png`;
    weather_now_view[2].innerHTML = locData5Days[count].dt_txt.slice(5, 13) + " 시 기준";
    weather_now_view[3].innerHTML = (locData5Days[count].main.temp - 273.15).toFixed(1) + " º";
    weather_now_view[4].innerHTML = (locData5Days[count].main.temp_min - 273.15).toFixed(1) + " º";
    weather_now_view[5].innerHTML = (locData5Days[count].main.temp_max - 273.15).toFixed(1) + " º";
    weather_now_view[6].innerHTML = locData5Days[count].wind.speed + " m/s";
    weather_now_view[7].innerHTML = locData5Days[count].main.humidity + " %";
    weather_now_view[8].innerHTML = `경도: ${(locData.coord.lat).toFixed(2)} 위도: ${(locData.coord.lon).toFixed(2)}`;
}
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc.value},kr&appid=f6298de834feb1d272496c63e81b3598`)
.then(function(resp) {
    return resp.json();
})
.then(function(json) {
    locData = json.city;
    locData5Days = json.list;
    console.log(locData);
    console.log(locData5Days);
    table_now();
})


var weather_check = function() {    // If select.value is change, call weather data.
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc.value},kr&appid=f6298de834feb1d272496c63e81b3598`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(json) {
        locData = json.city;
        locData5Days = json.list;
        table_now();
    })
}