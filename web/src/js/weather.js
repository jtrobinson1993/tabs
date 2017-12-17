var temperature = new Vue({
  el: '#temperature',
  data: { temp: '0', message: 'Loading...', unit: 'c' },
  methods: {
    getWeather(location) {
      axios
        .get(
          'https://api.openweathermap.org/data/2.5/weather?q=' + location +
            '&units=kelvin&APPID=467b7f9da56b5b4d8c144ff534ebef09'
        )
        .then(response => {
          const kelvin = response.data.main.temp;
          const fahrenheit = kelvin * (9 / 5) - 459.67;
          const celsius = (fahrenheit - 32) / 1.8;
          const temp = Math.round(fahrenheit) + ' / ' + Math.round(celsius);
          this.temp = kelvin;
          this.message = temp;
        })
        .catch(error => {
          console.log(error);
        });
    },
    convertKelvin(unit) {
      return unit === 'c' ? this.temp - 273.15 : this.temp * 1.8 - 459.67;
    },
    toggleTemp() {
      if (this.unit === 'c') {
        this.message = Math.round(this.convertKelvin('f')) + 'fahrenheit';
        this.unit = 'f';
      } else if (this.unit === 'f') {
        this.message = Math.round(this.temp) + 'kelvin';
        this.unit = 'k';
      } else {
        this.message = Math.round(this.convertKelvin('c')) + 'celsius';
        this.unit = 'c';
      }
    }
  },
  mounted() {
    const location = 'Lincoln';
    this.getWeather(location);
    setInterval(
      () => {
        this.getWeather(location);
      },
      600000
    );
  }
});
