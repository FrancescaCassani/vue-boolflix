const app = new Vue({
  el: '#app',
  data: {
    movies: [],
    series: [],
    all: [],
    searchBar: ''
  },
  created(){

  },
  methods: {
    getFilter() {
      //Call API MOVIES
      axios.get('http://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'c59940771aef20931e51d0c89086e5a5',
            query: this.searchBar,
            language: 'it-IT'
         }
      })
      .then( response => {
        //Log di verifica
        console.log(response.data.results);

        //Ragionamento ricerca
        if(this.searchBar !== '') {
          this.movies = response.data.results;
        }

        //Contenitore ALL movies + series
        this.movies.forEach((movies) => {

          if(movie.poster_path != ''){
            this.all.push({
              title: movies.title,
              orig_title: movies.original_title,
              rating: movies.vote_average,
              language: movies.original_language,
              imgUrl: `https://image.tmdb.org/t/p/w342/${movies.poster_path}`,
              backdrop: `https://image.tmdb.org/t/p/w342/${movies.backdrop_path}`,
              overview: `https://image.tmdb.org/t/p/w342/${movies.overview}`
            });
          } else {
            this.all.push({
              title: movies.title,
              orig_title: movies.original_title,
              rating: movies.vote_average,
              language: movies.original_language,
              imgUrl: '../img/not-found-.jpg',
              backdrop: `https://image.tmdb.org/t/p/w342/${movies.backdrop_path}`,
              overview: `https://image.tmdb.org/t/p/w342/${movies.overview}`
            });
          }
        });
      })
      .catch(error => {
        console.log('Movie not found', error);
      });  

      //Call API TV SHOWS
      axios.get('http://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: 'c59940771aef20931e51d0c89086e5a5',
            query: this.searchBar,
            language: 'it-IT'
         }
      })
      .then( response => {
        //Log di verifica
        console.log(response.data.results);

        //Ragionamento ricerca
        if(this.searchBar !== '') {
          this.series = response.data.results;
        }

        //Contenitore ALL movies + series
        this.series.forEach((series) => {
          this.all.push({
            title: series.name,
            orig_title: series.original_title,
            rating: series.vote_average,
            language: series.original_language,
            imgUrl: `https://image.tmdb.org/t/p/w342/${series.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w342/${series.backdrop_path}`,
            overview: `https://image.tmdb.org/t/p/w342/${series.overview}`
          });
        });
      })
      .catch(error => {
        console.log('Serie not found', error);
      })
      
      //Pulizia 
      this.searchBar = [];
      this.movies = [];
      this.series = [];
      this.all = [];
    },
    getStar(vote) {
      return Math.ceil(vote / 2);
    }
  }
});






