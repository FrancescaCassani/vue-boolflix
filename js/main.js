
const spotify = new Vue ({
  el: "#spotify",
    data: {

  },
  created(){  
      //Call API
      axios.get('')
      .then( result => {
        console.log(result.data);

      })
      .catch( error => {
        console.log(error);
      });
  },
  methods: {

    }
  }
});
