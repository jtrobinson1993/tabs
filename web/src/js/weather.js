var temperature = new Vue({
	el: '#temperature',
	data: {
		temp: '0',
		message: 'Loading...',
		unit: 'c'
	}
});

function toggleTemp() {
	if (temperature.unit === 'c') {
		temperature.message = Math.round(convertKelvin('f')) + 'fahrenheit';
		temperature.unit = 'f';
	} else if (temperature.unit === 'f') {
		temperature.message = Math.round(temperature.temp) + 'kelvin';
		temperature.unit = 'k'
	} else {
		temperature.message = Math.round(convertKelvin('c')) + 'celsius';
		temperature.unit = 'c';
	}
}

function convertKelvin(unit) {
	return unit === 'c' ? temperature.temp - 273.15 : temperature.temp * 1.8 - 459.67;
}

function getWeather(location) {
	axios.get('//api.openweathermap.org/data/2.5/weather?q=' + location + '&units=kelvin&APPID=467b7f9da56b5b4d8c144ff534ebef09')
		 .then(function (response) {
			 const kelvin = response.data.main.temp;
			 const fahrenheit = kelvin * (9/5) - 459.67;
			 const celsius = (fahrenheit - 32) / 1.8;
			 const temp = Math.round(fahrenheit) + ' / ' + Math.round(celsius);
			 temperature.temp = kelvin;
			 temperature.message = temp;
		 })
		 .catch(function (error) {
			 console.log(error);
		 });
}

function init() {
	const location = 'Lincoln';
	getWeather(location);
	setInterval(() => {
		getWeather(location);
	}, 600000);
}

init();