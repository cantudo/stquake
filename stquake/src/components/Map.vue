<template>
  <div id="map">
    <MglMap :accessToken="accessToken" :mapStyle.sync="mapStyle" @load="onMapLoaded" :center="coordinates" :zoom="defZoom">
      <MglGeojsonLayer
              :sourceId="geoJsonSource.data.id"
              :source="geoJsonSource"
              layerId="earthquakes-viz"
              :layer="geoJsonLayer"
      />
    </MglMap>
    <!-- <v-btn rounded color="primary" dark v-on:click="isShow = !isShow" style="position: fixed; top: 5px; left:5px;z-index:1;">
      <v-icon dark>
        mdi-format-list-bulleted-square
      </v-icon>
    </v-btn>-->
    <!-- <div id="tl" class="mx-auto"> -->

      <v-app-bar-nav-icon style="position: absolute; top:1vh; left:1vh;" dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
        dark

      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
          <v-list-item v-for="item in timeline_items" v-bind:key="item.id" >

          <!-- <template v-slot:icon>
                    <v-btn class="mx-2" fab dark v-bind="item.props" color="blue"></v-btn>
          </template> -->
          <a class="white--text">{{ item.location }}</a>

          </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglGeojsonLayer } from "vue-mapbox";
const https = require('https');
const vm = require('vm');
// const concat = require('concat-stream');

export default {
  components: {
    MglMap,
    MglGeojsonLayer
  },
  data() {
    return {
      isShow : false,
      drawer: false,
      accessToken: "pk.eyJ1IjoiY2FhYW50dSIsImEiOiJja2twbXhlb2UwZWc5Mm5zMTIyejNsc2g5In0.MCaZ1fA3fCJ9_YXEcFUXJQ", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/dark-v10", // your map style
      coordinates: [-3.703790, 40.416775],
      defZoom: 5,
      geoJsonSource: {
        type: 'geojson',
        generateId: true,
        data: {
          id: "earthquakes",
          type: "FeatureCollection",
          features: []
        }
      },
      geoJsonLayer: {
        id: "earthquakes-viz",
        source: "earthquakes",
        type: "circle",
        paint: {
          'circle-color': [
            'case',
              ['boolean',
                true
              ],
              [
                'interpolate', ['linear'],
                ['get', 'mag'],
                1, '#fff7ec',
                1.5, '#fee8c8',
                2, '#fdd49e',
                2.5, '#fdbb84',
                3, '#fc8d59',
                3.5, '#ef6548',
                4.5, '#d7301f',
                6.5, '#b30000',
                8.5, '#7f0000',
                10.5, '#000'
              ],
              '#000'
          ],
          'circle-radius': [
            'case',
            ['boolean',
              ['feature-state', 'hover'],
              false
            ],
            [
              'interpolate', ['linear'],
              ['get', 'mag'],
              1, 8,
              1.5, 10,
              2, 12,
              2.5, 14,
              3, 16,
              3.5, 18,
              4.5, 20,
              6.5, 22,
              8.5, 24,
              10.5, 26
            ],
            5
          ]
        }
      },
      timeline_items: []
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
    this.map = null;
    this.getData().then((res) => {
      for (let i = 0; i < res.dias30.features.length; i++) {
        res.dias30.features[i].properties.hover = false;
        res.dias30.features[i].properties.mag = parseFloat(res.dias30.features[i].properties.mag);

      }
      for (let i = 0; i < res.dias10.features.length; i++) {
        res.dias10.features[i].properties.hover = false;
        res.dias10.features[i].properties.mag = parseFloat(res.dias10.features[i].properties.mag);

      }
      for (let i = 0; i < res.dias3.features.length; i++) {
        res.dias3.features[i].properties.hover = false;
        res.dias3.features[i].properties.mag = parseFloat(res.dias3.features[i].properties.mag);
      }
      this.geoJsonSource.data.features = res.dias3.features;


    });

  },

  methods: {
      getData: function () {
        return new Promise((resolve, reject) => {
          https.get( 'https://www.ign.es/web/resources/sismologia/tproximos/terremotos.js', function( res ){
            let context = {};
            let output = '';
            res.setEncoding('ascii');
            res.on('data', (chunk) => {
              output += chunk;
            });
            // res.pipe(concat({ encoding: 'string' }, function(remoteSrc) {

            //   // mon_context = context;
            // }));
            res.on('end', () => {
              const script = new vm.Script(output);
              script.runInNewContext(context);
              try {
                resolve(context);
              } catch (e) {
                reject(e.message);
              }
            });
          });
        });
        // console.log(mon_context.dias3);
        // return mon_context.dias3.features;
      },
      onMapLoaded(event) {
        // in component
        this.map = event.map;

        let quakeID = null;
        this.map.on('mousemove', 'earthquakes-viz', (e) => {
          this.map.getCanvas().style.cursor = 'pointer';

          if (e.features.length > 0) {

            if (quakeID) {
              this.map.removeFeatureState({
                source: "earthquakes",
                id: quakeID
              });
            }

            quakeID = e.features[0].id;

            // When the mouse moves over the earthquakes-viz layer, update the
            // feature state for the feature under the mouse
            this.map.setFeatureState({
              source: 'earthquakes',
              id: quakeID,
            }, {
              hover: true
            });

          }
        });

        this.map.on("mouseleave", "earthquakes-viz", () => {
          if (quakeID) {
            this.map.setFeatureState({
              source: 'earthquakes',
              id: quakeID
            }, {
              hover: false
            });
          }

          quakeID = null;
        });

        // console.log(this.map.getRenderedFeatures);
        let interval = setInterval(() => {
            if (typeof this.geoJsonSource.data.features[0] == 'undefined') return;
            clearInterval(interval);

            for (let i = 0; i < this.geoJsonSource.data.features.length; i++) {
              let mon_component;
              if (this.geoJsonSource.data.features[i].properties.mag > 4) {
                mon_component = {"x-small": false};
              } else {
                mon_component = {"x-small": true};
              }
              this.timeline_items.push({ id: i+1,
                                          props: mon_component,
                                          location: this.geoJsonSource.data.features[i].properties.loc });
            }
        }, 10);

      }
    }
};



</script>