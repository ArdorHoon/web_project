const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = "7029ed547029c074dbbc18b9a4af5610";


function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){

        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${place} @ ${Math.round(temperature)}°C`;

    });

    //기본적으로 함수를 호출하지만 then은 데이터가 완전히 넘어왔을 때 실행하게 한다.

}

function saveCoords(coordsObj){

    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucess(position){

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {

        latitude,
        longitude 
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){

    console.log ('Cant access geo loc');
    
}

function askForCoords(){

    navigator.geolocation.getCurrentPosition(handleGeoSucess ,handleGeoError);
}

function loadCords() {

    const loadedCords = localStorage.getItem(COORDS);

    if(loadedCords ===null){

        askForCoords();
    } else {

        //getWeather
        const parseCoords = JSON.parse(loadedCords);
        console.log(parseCoords);

        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}




function init() {
   loadCords();
}

init();