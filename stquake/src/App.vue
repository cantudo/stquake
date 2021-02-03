<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="map">
    <MglMap/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MglMap from './components/Map.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MglMap
  }
}
</script>

<style>
html, body {margin: 0; height: 100%; overflow: hidden}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 0px;
}
#map {
  height: 100vh;
}
</style>
