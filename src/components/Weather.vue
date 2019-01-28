<template>
  <v-app>
    <div class="page-content">
      <v-parallax img :src="require('../assets/blur.jpg')">
          <div class="hello">
            <h3 v-if="freezings">{{ lowerThenZero }}</h3>
            <h3 v-else>{{ higherThenZero }}</h3>
            The temperature in <h1 v-if="data.name">{{data.name}}</h1> is
            <h1 v-if="data.main">{{(data.main.temp - 273.15).toFixed(1)}} </h1> degrees celsius at the
            moment, <h1 v-if="data.weather"> {{data.weather[0].description}}.</h1>
        </div>
      </v-parallax>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios';

const url = "http://localhost:4000/weather"

export default {
  data: function () {
    return {
      lowerThenZero: 'Wheather is bad in Sweden you know...',
      higherThenZero: 'I believe the spring is coming!',
      data: [],
      errors: [],
      freezings: false
    }
  },
  mounted() {
      axios.get(url)
      .then(response => {
          this.data = response.data
          this.freezing()
      })
      .catch(e => {
          this.errors.push(e)
      })      
  },
  methods: {
    freezing () {
      if(this.data.main) {
         if((this.data.main.temp - 273.15).toFixed(1) < 0) {
           this.freezings = true
         }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color: grey;
}

h3 {
  padding: 3px;
}
</style>
