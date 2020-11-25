const app = new Vue({
  el: '#app',
  data: {
    movies: [],
    series: [],
    searchBar: ''
  },
  created(){

  },
  methods: {
    getFilter() {
      this.getFilterMovie();
      this.getFilterSeries();

      this.search = '';
    },
    getFilterMovie() {
      //Call API
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
      })
      .catch(error => {
        console.log('Movie not found', error);
      })
    },
    getFilterSeries() {
      //Call API
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
      })
      .catch(error => {
        console.log('Serie not found', error);
      })
    },
    getStar(vote) {
      return Math.ceil(vote / 2);
    }
  }
});

/* <span v-if="movie.original_language === 'en'">
<img src="./img/en.png" alt="en">
</span>

<span v-else-if="movie.original_language === 'it'">
<img src="./img/it.png" alt="it">
</span>

<span v-else>
<p>{{movie.original_language}}</p>
</span> */




