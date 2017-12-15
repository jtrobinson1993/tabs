let backgroundImage = new Vue({
	el: '#page-background',
	data: {
		photo: ''
	},
	methods: {
		getRedditImage(subreddit) {
			axios.get(`//www.reddit.com/r/${subreddit}/top/.json?sort=top&t=month`)
				 .then(function (response) {
					 console.log(response);
					 const listing = response.data.data.children;
					 const listingLength = listing.length;
					 
					 const randomPost = listing[Math.round(Math.random() * 25)];
					 const randomImage = randomPost.data.url;
					 
					 self.photo = randomImage;
					 console.log(listing);
					 console.log(listingLength);
				 })
				 .catch(function (error) {
					 console.log(error);
				 });
		}
	},
	mounted() {
		const subreddit = 'EarthPorn';
		this.getRedditImage(subreddit);
	}
});


