const timezone = localStorage.getItem('timezone');

let time = new Vue({
  el: '#time-widget',
  data: { 
    hours: '00', 
    minutes: '00', 
    seconds: '00',
    selected: timezone ? timezone : moment.tz.guess(),
    options: moment.tz.names()
  },
  methods: {
    time() {
      // Use computed properties instead?
      const currTime = moment.tz(this.selected);

      this.hours = currTime.format('hh');
      this.minutes = currTime.format('mm');
      this.seconds = currTime.format('ss');
    }
  },
  watch: {
    selected: (option) => {
      localStorage.setItem('timezone', option);
    }
  },
  mounted() {
    this.interval = setInterval(this.time, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
});