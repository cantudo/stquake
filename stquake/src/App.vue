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

const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
window.addEventListener('resize', appHeight)
appHeight()

</script>
<style>
.mapboxgl-canvas {
  position: absolute;
  height: var(--app-height);

 }
</style>

<style>
html, body {margin: 0;   height: var(--app-height); overflow: hidden}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 0px;
}
#map {
  height: var(--app-height);
}
.mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib{
  height: 0px !important;
  visibility: hidden !important;
}
.v-navigation-drawer__content {
   overflow-y: hidden;
}

/* .v-navigation-drawer::-webkit-scrollbar {
  display: none !important;
} */
/* .v-virtual-scroll {
  overflow-y: hidden;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
.v-virtual-scroll::-webkit-scrollbar {
  display: none !important;
}*/
.v-virtual-scroll {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
.v-virtual-scroll::-webkit-scrollbar {
  display: none !important;
  
}
.v-list-item__title{
  justify-content: left;
  text-align: left;
  display: grid;
}
* {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important; 
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important; 
    outline: none !important;
} 
</style>