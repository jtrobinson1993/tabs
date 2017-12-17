let backgroundImage = new Vue({
  el: '#page-background',
  data: { photo: '' },
  methods: {
    checkIfImage(url) {
      const extension = url.split('.').pop();
      const acceptableExtensions = [
        'jpg',
        'jpeg',
        'png'
      ]
      return acceptableExtensions.indexOf(extension) !== -1;
    },
    getRedditImage(subreddit) {
      axios
        .get(`https://www.reddit.com/r/${subreddit}/top/.json?sort=top&t=month`)
        .then(response => {
          const listing = response.data.data.children;
          const listingLength = listing.length;
          console.log(listing);
          let isImage = false;

          while (isImage === false) {
            const randomPost = listing[Math.floor(Math.random() * listingLength)];
            const randomImage = randomPost.data.url;

            isImage = this.checkIfImage(randomImage);

            if (isImage) {
              this.photo = randomImage;
            }
          }
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
