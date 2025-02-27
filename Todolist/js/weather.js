const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "cc1d075e368da2fed566cc980a415773";

// 위도와 경도를 이용 -> 정확한 행정구역을 가져오는 함수
// OpenWeatherMAp의 Reverse Geocoding API를 통해 좌표를 기반으로 도시 이름을 조회함.
function getCityName(lat, lon) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

    return fetch(geoUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                return data[0].local_names?.ko || data[0].name; // 한국어 도시명(local_name? .ko) ? 한글 이름 반환 : 기본 영어 이름 반환
            }
            return "Unknown Location";
        })
        .catch(() => "Unknown Location");
}

// 사용자의 현재 위치(위도, 경도) -> 날씨 정보를 조회하는 함수
function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(weatherUrl)
        .then((response) => response.json())
        .then(async (data) => {
            const locationName = await getCityName(lat, lon); // 도시 이름 가져오기
            city.innerText = locationName;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;
        })
        .catch((error) => console.error("Error fetching weather data:", error));
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);


/* 
        실행흐름 
    1. 사용자가 위치 정보 사용을 허용한다
    2. 현재 위치 좌표를 가져와 onGeoOk함수 실행
    3. onGeoOk 에서 날씨 API를 호출하여 날씨 정보를 전달받음
    4. 동시에 getCityName함수를 실행하여 좌표에 맞는 지역명(한국어)를 가져옴
    5. UI에 날씨와 지역명을 표시한다.
*/
