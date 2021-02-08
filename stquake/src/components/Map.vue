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

      <v-app-bar-nav-icon style="position: absolute; top:1vh; left:1vh;" dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary dark app ref="quake_bar">
        <v-list dense >
            <div  style="height: 100%">
            <v-virtual-scroll
                :bench="benched"
                :items="timeline_items"
                :height="quake_bar_height"
                :item-height="40"
              >
              <template v-slot:default="{ item }">
                <v-list-item ripple link v-on:click="goToQuake(item.id)" >
                  <v-list-item-content>

                    <v-list-item-title>{{ item.mag }}  {{ item.location }}</v-list-item-title>
                    
                    <v-divider></v-divider>

                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
            </div>
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
      isActive : false,
      drawer: false,
      benched: 0,
      quake_bar_height: 0,
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
    window.addEventListener("resize", this.handle_navbar_scroller);
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
      this.geoJsonSource.data.features = res.dias30.features;


    });

  },
  destroyed () {
    window.addEventListener("resize", this.handle_navbar_scroller);
  },

  methods: {
      handle_navbar_scroller: function () {
        try {
          this.quake_bar_height = this.$refs.quake_bar.$el.clientHeight-10;
        } catch (e) {
          console.log(e.message);
        }
        return
      },
      getData: function () {
        return new Promise((resolve, reject) => {
          https.get( 'https://www.ign.es/web/resources/sismologia/tproximos/terremotos.js', function( res ){
            let context = {};
            let output = '';
            res.setEncoding('ascii');
            res.on('data', (chunk) => {
              output += chunk;
            });


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

        // async wait till geoJson gathered
        (async() => {
            // waiting for geoJson
            while(typeof this.geoJsonSource.data.features[0] == 'undefined') 
                await new Promise(resolve => setTimeout(resolve, 1000));
            // geoJson loaded
            for (let i = 0; i < this.geoJsonSource.data.features.length; i++) {
              let mon_component;
              if (this.geoJsonSource.data.features[i].properties.mag > 4) {
                mon_component = {"x-small": false};
              } else {
                mon_component = {"x-small": true};
              }
              this.timeline_items.push({ id: i,
                                          props: mon_component,
                                          location: this.geoJsonSource.data.features[i].properties.loc,
                                          mag: this.geoJsonSource.data.features[i].properties.mag,
                                           });
            }
        })();
 
      },
      
      goToQuake: function (quake_id) {
        console.log(quake_id);
        this.map.flyTo({
          center: this.geoJsonSource.data.features[quake_id].geometry.coordinates,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion,
          zoom: 15
        });
      },
    },

    mounted () {
      try {
        this.quake_bar_height = this.$refs.quake_bar.$el.clientHeight;
      } catch (e) {
        console.log(e.message);
      }
    }
};



</script>