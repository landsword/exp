var locList = ["Seoul", "Daejeon", "daegu", "Busan", "Gwangju", "Jeju"];
var loc = document.getElementById("location");
locList.forEach(function(el) {
    let option = document.createElement("option");
    option.value = el;
    option.innerHTML = el;
    loc.append(option);
});

var weather_now = document.getElementById("weather_now"); // weather_now
var table_5Days = document.getElementById("weather_5Days"); // weather_5Days

var locData = {};
var locData5Days = {};
var table_now = function() {
    let count = 0;
    let table = document.createElement("table");
    {
        let tr1 = document.createElement("tr");

        let td1 = document.createElement("td");     // location
            td1.rowspan = "4";
            td1.innerHTML = loc.value;
        let td3 = document.createElement("td");     // date time
            td3.rowspan = "2";
        for (count = 0; count < locData5Days.length; count++) {
            if (locData5Days[count].dt < (Date.now() / 1000)) {
                continue;
            }
            else {
                console.log(count);
                td3.innerHTML = locData5Days[count].dt_txt.slice(-8);
                break;
            }
        }
        let td2 = document.createElement("td");     // sky
            td2.rowspan = "4";
        let img = document.createElement("img");    // weather
            img.src = `http://openweathermap.org/img/w/${locData5Days[count].weather[0].icon}.png`;
            td2.append(img);
        let td4 = document.createElement("td");     // temp
            td4.rowspan = "2";
            td4.innerHTML = (locData5Days[count].main.temp - 273.15).toFixed(2) + " º";
        let td5 = document.createElement("td");     // temp_min
            td5.colspan = "2";
            td5.innerHTML = (locData5Days[count].main.temp_min - 273.15).toFixed(2) + " º";
    
        tr1.append(td1);
        tr1.append(td2);
        tr1.append(td3);
        tr1.append(td4);
        tr1.append(td5);
        table.append(tr1);
    }
    {
        let tr2 = document.createElement("tr");
        let td1 = document.createElement("td");
            td1.colspan = "2";
            td1.innerHTML = (locData5Days[count].main.temp_max - 273.15).toFixed(2); // temp_max
        
        tr2.append(td1);
        table.append(tr2);
    }
    {
        let tr3 = document.createElement("tr");
        let td1 = document.createElement("td");
            td1.innerHTML = locData5Days[count].wind.speed + " m/s";
        let td2 = document.createElement("td");
            td2.innerHTML = locData5Days[count].main.humidity + " %";
        let td3 = document.createElement("td");
            td3.innerHTML = locData.coord.lat + " º";
        let td4 = document.createElement("td");
            td4.innerHTML = locData.coord.lon + " º";

        tr3.append(td1);
        tr3.append(td2);
        tr3.append(td3);
        tr3.append(td4);
        table.append(tr3);
    }
    weather_now.append(table);
}
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc.value},kr&appid=f6298de834feb1d272496c63e81b3598`)
.then(function(resp) {
    return resp.json();
})
.then(function(json) {
    locData = json.city;
    locData5Days = json.list;
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