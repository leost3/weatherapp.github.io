
//http://api.openweathermap.org/data/2.5/weather?q=fortaleza&APPID=3cdf9754dd15cb5b3da132ffe910b4a3&units=metric
cityInfo = document.querySelector(".cityInfo");
sky = document.querySelector(".sky");
wind = document.querySelector(".wind");
span = document.querySelector("#temperature");
celsius = document.querySelector("#celsius");
farenh = document.querySelector("#fahr");
input = document.querySelector("#city");
icon = document.querySelector("#icon");
cityData = document.querySelector("#cityData");

var url = "https://fcc-weather-api.glitch.me/api/current?";
var metric = "celsius";


function initialize() {
 	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = "lat=" + position.coords.latitude;
			console.log(lat);
			var lon = "lon=" + position.coords.longitude;
			getLocalWeather(lat, lon);
		});
	}else {
		span.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function getLocalWeather(lat, lon) {
	var urlStr = url + lat + "&" + lon;
	console.log(urlStr);
	var newRequest = new XMLHttpRequest();
	newRequest.open("GET", urlStr);
	newRequest.onload = function() {
		var newDatabase = JSON.parse(newRequest.responseText);
		console.log(newDatabase);
		temperatureC(newDatabase);
		weather(newDatabase);
	};
	newRequest.send();
}
	
function apiRequest() {
	var city = input.value;
	var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var apiKey = '&APPID=3cdf9754dd15cb5b3da132ffe910b4a3&units=metric';
	var myResquest = new XMLHttpRequest();
	myResquest.open('GET', api + city + apiKey);
	myResquest.onload = function() {
	var myDatabase = JSON.parse(myResquest.responseText);
	if (metric === "celsius") {
		temperatureC(myDatabase);
	}else if (metric === "farenh") {
		temperatureF(myDatabase);
	}
	weather(myDatabase);
	input.value = "";
};
myResquest.send();
}

function temperatureC(data) {
	var tempC = data.main.temp;
	var city = data.name;
	var country = data.sys.country;
	
	span.innerHTML = tempC + " &#8451;";
	cityInfo.innerHTML = city + " , " + country;
	sky.innerHTML = "Sky:   " + data.weather[0].main;
	wind.innerHTML = "WS:   " + data.wind.speed + " knots";

}

function temperatureF(data) {
	var tempC = data.main.temp;
	var city = data.name;
	var tempF = (tempC * 1.8)+ 32;
	var country = data.sys.country;
	span.innerHTML = tempF + " &#176;F";
	cityInfo.innerHTML = city + " , " + country;
	sky.innerHTML = "Sky:   " + data.weather[0].main;
	wind.innerHTML = "WS:   " + data.wind.speed + " knots";
}	

function onCelsius() {
	metric = "celsius";
	if (input.value !== "") {
		farenh.classList.remove("selected");
		celsius.classList.add("selected");
	}
	timeoutC();
	apiRequest();
}

function onFarenh() {
	metric = "farenh";
	if (input.value !== "") {
		celsius.classList.remove("selected");
		farenh.classList.add("selected");
	}
	timeoutF();
	apiRequest();
}


function timeoutF() {
	setTimeout(function() {
		farenh.classList.remove("selected");
	}, 4000);
}

function timeoutC() {
	setTimeout(function() {
		celsius.classList.remove("selected");
	}, 4000);
}





function weather(data){
	var weat = data.weather[0].main;
	console.log("weat:", weat);
	switch(weat) {
		case "Thunderstorm":
			icon.className = "wi ";
			icon.classList.add("wi-day-thunderstorm");
			document.body.style.backgroundImage = "url('imgs/thunderstorm.jpg')";					break;
		case "Drizzle":
			icon.className = "wi ";
			icon.classList.add("wi-night-fog");
			document.body.style.backgroundImage = "url('imgs/drizzle.jpg')";						break;
		case "Rain":
			icon.className = "wi ";
			icon.classList.add("wi-rain");
			document.body.style.backgroundImage = "url('imgs/rainy.jpg')";					break;
		case "Snow":
			icon.className = "wi ";
			icon.classList.add("wi-snow");
			document.body.style.backgroundImage = "url('imgs/wnow.jpg')";
			break;
		case "Clear":
			icon.className = "wi ";
			icon.classList.add("wi-day-sunny");
			document.body.style.backgroundImage = "url('imgs/clear.jpg')";
			break;
		case "Clouds":
			icon.className = "wi ";
			icon.classList.add("wi-cloud");
			document.body.style.backgroundImage = "url('imgs/cloudy.jpg')";
			break;
		case "Mist":
			icon.className = "wi ";
			icon.classList.add("wi-fog");
			document.body.style.backgroundImage = "url('imgs/mist.jpg')";
			break;
		case "Smoke":
			icon.className = "wi ";
			icon.classList.add("wi-smoke");
			document.body.style.backgroundImage = "url('imgs/smoke.jpg')";
			break;
		case "Haze":
			icon.className = "wi ";
			icon.classList.add("wi-day-haze");
			document.body.style.backgroundImage = "url('imgs/haze.jpg')";
			break;
		case "Sand, dust whirls":
			icon.className = "wi ";
			icon.classList.add("wi-dust");
			document.body.style.backgroundImage = "url('imgs/sand.jpg')";
			break;
		case "Fog":
			icon.className = "wi ";
			icon.classList.add("wi-fog");
			document.body.style.backgroundImage = "url('imgs/foggy.jpg')";
			break;
		case "Sand":
			icon.className = "wi ";
			icon.classList.add("wi-sandstorm");
			document.body.style.backgroundImage = "url('imgs/sand.jpg')";
			break;
		case "Dust":
			icon.className = "wi ";
			icon.classList.add("wi-dust");
			document.body.style.backgroundImage = "url('imgs/dust.jpg')";
			break;
		case "Volcanic ash":
			icon.className = "wi ";
			icon.classList.add("wi-volcano");	
			document.body.style.backgroundImage = "url('imgs/volcanic.jpg')";
			break;
		case "Squalls":
			icon.className = "wi ";
			icon.classList.add("wi-fog");
			document.body.style.backgroundImage = "url('imgs/squall.jpg')";	
			break;
		case "Tornado":
			icon.className = "wi ";
			icon.classList.add("wi-tornado");
			document.body.style.backgroundImage = "url('imgs/tornado.jpg')";	
			break;
	}
}

initialize();

celsius.addEventListener("click", onCelsius); 

farenh.addEventListener("click", onFarenh);

