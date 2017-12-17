let backgroundImage = new Vue({
  el: '#page-background',
  data: { photo: '' },
  methods: {
    getRedditImage(subreddit) {
      axios
        .get(`https://www.reddit.com/r/${subreddit}/top/.json?sort=top&t=month`)
        .then(response => {
          console.log(response);
          const listing = response.data.data.children;
          const listingLength = listing.length;

          const randomPost = listing[Math.round(Math.random() * 25)];
          const randomImage = randomPost.data.url;

          this.photo = randomImage;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    const subreddit = 'EarthPorn';
    this.getRedditImage(subreddit);
  }
});
