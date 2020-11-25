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
      });  

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
      
      this.search = '';
    },

    getStar(vote) {
      return Math.ceil(vote / 2);
    }
  }
});






