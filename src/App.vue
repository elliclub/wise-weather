<template>
  <div id="app">
    <Greeting />
    <Weather />
    {{ info }}
  </div>
</template>

<script>
import Greeting from './components/Greeting.vue'
import Weather from './components/Weather.vue'


export default {
  name: 'app',
  components: {
    Greeting,
    Weather
  },
  data: function () {
    return {
      info: null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
