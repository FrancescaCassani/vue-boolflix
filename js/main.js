const app = new Vue({
  el: '#app',
  data: {
    movies: [],
    series: [],
    all: [],
    searchBar: '',
    activeGenre: 'all'
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
        this.movies.forEach((movie) => {
           
          if(movie.poster_path !== '')
          this.all.push({
            title: movie.title,
            orig_title: movie.original_title,
            rating: movie.vote_average,
            language: movie.original_language,
            imgUrl: `https://image.tmdb.org/t/p/w342/${movie.poster_path}`,
            genre: movie.genre_ids
            // backdrop: `https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`,
            // description: `https://image.tmdb.org/t/p/w342/${movie.overview}`
          });
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
        this.series.forEach((serie) => {
          
          this.all.push({
            title: serie.name,
            orig_title: serie.original_title,
            rating: serie.vote_average,
            language: serie.original_language,
            imgUrl: `https://image.tmdb.org/t/p/w342/${serie.poster_path}`,
            genre: serie.genre_ids,
            // backdrop: `https://image.tmdb.org/t/p/w342/${serie.backdrop_path}`,
            // description: `https://image.tmdb.org/t/p/w342/${serie.overview}`
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
    },
    // getGenres(){
    //   axios.get('https://api.themoviedb.org/3/genre/movie/list', {
    //       params: {
    //           api_key: 'c59940771aef20931e51d0c89086e5a5',
    //           language: 'it-IT',
    //       }
    //   })
    //   .then(response => {
    //       let list = response.data.genres;

    //       if(this.activeGenre !== 'all') {
    //         list = list.filter( (element) => {
    //           return element.genres.toLowerCase() === this.activeGenre
    //         });
    //       }

    //       this.list = all;
    //   })
    //   .catch(error =>{
    //       console.log(error);
    //   })
    // }
  }
});






