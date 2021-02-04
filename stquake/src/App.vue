<template>
  
  <div id="map">
    <MonMap/>
  </div>

</template>

<script>
import MonMap from './components/Map'

export default {
  name: 'App',

  components: {
    MonMap,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
.mapboxgl-canvas {
  position: absolute;
  width: 600px; 
  height: 300px;
 }
</style>

<style>
html, body {margin: 0; height: 100%; overflow: hidden}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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