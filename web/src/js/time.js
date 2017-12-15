let time = new Vue({
	el: '#time-widget',
	data: {
		hours: '00',
		minutes: '00',
		seconds: '00'
	},
	methods: {
		time() {
			const currTime = moment();
			
			this.hours = currTime.format('hh');
			this.minutes = currTime.format('mm');
			this.seconds = currTime.format('ss');
		}
	},
	mounted() {
		this.interval = setInterval(this.time, 1000)
	},
	beforeDestroy() {
		clearInterval(this.interval);
	}
});

