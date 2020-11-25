const app = new Vue({
  el: '#app',
  data: {
    movies: [],
    searchMovie: '',
  },
  created(){

  },
  methods: {
    getFilter() {
      //Call API
      axios.get('http://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'c59940771aef20931e51d0c89086e5a5',
            query: this.searchMovie,
            language: 'it-IT'
         }
      })
      .then( response => {
        //Log di verifica
        console.log(response.data.results);

        //Ragionamento ricerca
        if(this.searchMovie !== '') {
          this.movies = response.data.results;
        }
      })
      .catch(error => {
        console.log('Movie not found', error);
      })
    },
    getVote(vote) {
      return vote / 2;
    }
  }
});



