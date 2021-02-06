<template>
  <v-app>
    <MonMap>
    </MonMap>
  </v-app>

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

.mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib-inner {
  height: 0px !important;
}
.v-navigation-drawer {

  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  display: none !important;
}

.v-list-item__title{
  justify-content: left;
  text-align: left;
  display: grid;
}

</style>