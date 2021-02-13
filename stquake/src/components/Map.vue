<template>
  <div id="map">
    <MglMap container="map" :accessToken="accessToken" :mapStyle.sync="mapStyle" @load="onMapLoaded" :center="coordinates" :zoom="defZoom" :maxBounds="bounds">
      <MglGeojsonLayer
              :sourceId="geoJsonSource.data.id"
              :source="geoJsonSource"
              layerId="earthquakes-viz"
              :layer="geoJsonLayer"
      />
      <MglGeojsonLayer
              :sourceId="geoJsonSource.data.id"
              :source="geoJsonSource"
              layerId="earthquake-labels"
              :layer="quakeTextLayer"
      />
    </MglMap>
      <v-btn icon v-on:click="toggle_dark_mode" style="position: fixed; bottom:1%; left:1%;">
        <v-icon  dark>mdi-theme-light-dark</v-icon>
       </v-btn>
      <v-app-bar-nav-icon style="position: absolute; top:1%; left:1%;" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-navigation-drawer color="secondary" v-model="drawer" absolute bottom temporary app ref="quake_bar" :width="drawer_width">
        
        <v-list dense>
            <v-list-item style="margin-bottom: 5px; margin-top: -2px;" >
            <v-list-item-content>
              <v-row>
                <v-col cols="1">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="2">
                    <a class="text-body-2 " > Mag.</a>
                </v-col>
                
                <v-col cols="6" style="margin-top: 5px;">
                  <v-row>
                    <a class="text-body-2  font-weight-bold">Location</a>
                  </v-row>
                  <v-row >
                    <a class="text-caption ">Time</a>
                  </v-row>
                </v-col>

                <v-col cols="3" justify="center">
                  <a class="text-caption">Depth.</a>
                </v-col>

              </v-row>
            </v-list-item-content>
            </v-list-item >
            <v-divider style="border-width:5px;"></v-divider>

            <v-virtual-scroll
                :bench="benched"
                :items="timeline_items"
                :height="quake_bar_height"
                :item-height="60"
              >
              <template v-slot:default="{ item }">
                <v-list-item ripple link v-on:click="goToQuake(item.id)" two-line>
                  <v-list-item-content>
                    
                      <v-row>
                        <v-col tile cols="1">
                            <v-icon :color="item.color">mdi-circle</v-icon>
                        </v-col>

                        <v-col tile cols="3">
                            <a class="text-body-2 " >{{ item.mag }} {{ item.mag_unit }}</a>
                        </v-col>
                        
                        <v-col tile cols="5"  style="margin-top: 5px; margin-bottom: 5px;">
                          <v-row>
                            <a class="text-body-2  font-weight-bold">{{ item.location }}</a>
                          </v-row>
                          <v-row >
                            <a class="text-caption ">{{ item.time }}</a>
                          </v-row>
                        </v-col>

                        <v-col tile cols="3" justify="end">
                          <a class="text-caption ">{{ item.depth }}</a>
                        </v-col>

                      </v-row>                    

                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

              </template>
            </v-virtual-scroll>
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
    MglGeojsonLayer,
  },
  data() {
    return {
      isdark:false,
      isActive : false,
      drawer: false,
      drawer_width: 450,
      benched: 2,
      quake_bar_height: 0,
      accessToken: "pk.eyJ1IjoiY2FhYW50dSIsImEiOiJja2twbXhlb2UwZWc5Mm5zMTIyejNsc2g5In0.MCaZ1fA3fCJ9_YXEcFUXJQ", // your access token. Needed if you using Mapbox maps
      // mapStyle: "", // your map style
      coordinates: [-3.703790, 40.416775],
      defZoom: 5,
      bounds: [
        [-35.32, 20.70],
        [18.41, 50.05]
      ],
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
                ['to-number', ['get', 'mag']],
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
            30,
            [
              'interpolate', ['linear'],
              ['to-number', ['get', 'mag']],
              1, 4,
              1.5, 5,
              2, 6,
              2.5, 7,
              3, 8,
              3.5, 9,
              4.5, 10,
              6.5, 11,
              8.5, 12,
              10.5, 13
            ],            
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000',
          'circle-stroke-opacity': 0.2
          },
      },
      quakeTextLayer: {
        'id': 'earthquake-labels',
        'type': 'symbol',
        'source': 'earthquakes',
        // 'minzoom': 5,
        'layout': {
          'text-field': [
            'concat',
            ['to-string', ['get', 'mag']],
              'm'
          ],
          'text-font': [
            'Open Sans Bold',
            'Arial Unicode MS Bold'
            ],
          'text-size': 20,
          'text-allow-overlap': true
        },
        // 'text-anchor': 'top',
        'paint': {
          'text-color': [
            'case',
            ['boolean',
              ['feature-state', 'hover'],
              false
            ],
            'rgba(0,0,0,1)',
            'rgba(0,0,0,0)'
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
        // res.dias30.features[i].properties.hover = false;
        res.dias30.features[i].properties.mag = parseFloat(res.dias30.features[i].properties.mag);
      }
      for (let i = 0; i < res.dias10.features.length; i++) {
        // res.dias10.features[i].properties.hover = false;
        res.dias10.features[i].properties.mag = parseFloat(res.dias10.features[i].properties.mag);
      }
      for (let i = 0; i < res.dias3.features.length; i++) {
        // res.dias3.features[i].properties.hover = false;
        res.dias3.features[i].properties.mag = parseFloat(res.dias3.features[i].properties.mag);
      }
      this.geoJsonSource.data.features = res.dias10.features;
    });

  },
  // destroyed () {
  //   // window.addEventListener("resize", this.handle_navbar_scroller);
  // },

  watch: {
    drawer: {
      immediate: true,
      handler: function () {
        let padding;
        if (this.drawer) {
          if(this.$refs.quake_bar.$el.classList[4] == "v-navigation-drawer--is-mobile") {
            padding = {bottom: this.$refs.quake_bar.$el.clientHeight, left:0};
          } else {
            padding = {bottom: 0, left:this.drawer_width};
          }
        } else {
          padding = {bottom: 0, left: 0};
        }
        (async() => {
            // waiting for geoJson
            while( this.map == null ) 
                await new Promise(resolve => setTimeout(resolve, 100));
            this.map.easeTo({
              padding: padding,
              duration: 400 // In ms, CSS transition duration property for the sidebar matches this value
            });
        })();
      }
    },
    mapStyle:{
      immediate: true,
      handler: function (selectedStyle) {
                this.$vuetify.theme.dark = (selectedStyle == "mapbox://styles/mapbox/dark-v10");
              }
    }
  },


  methods: {
      setStyle: function (dark) {
        (async() => {
            // waiting for geoJson
            while( this.map == null ) 
                await new Promise(resolve => setTimeout(resolve, 100));
              if (dark) {
                this.map.setStyle("mapbox://styles/mapbox/dark-v10")
              } else{
                this.map.setStyle("mapbox://styles/mapbox/light-v10")
              }
              this.$vuetify.theme.dark = dark;
                localStorage.setItem(
                "dark_theme",
                this.$vuetify.theme.dark.toString()
              );
        })();
      },
      toggle_dark_mode: function () {
        this.$vuetify.theme.dark = ! this.$vuetify.theme.dark;
        this.setStyle(this.$vuetify.theme.dark);
        return;
      },
      handle_navbar_scroller: function () {
        try {
          this.quake_bar_height = this.$refs.quake_bar.$el.clientHeight-10;
        } catch (e) {
          // console.log(e.message);
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
        // console.log(this.map);
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
            // console.log(e.features)
            quakeID = e.features[0].id;
            // console.log(this.map.querySourceFeatures('earthquakes', {
            //   sourceLayer: 'earthquakes-viz'})
            // );
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

        this.map.on("styledata", () => {
          try {
            this.map.addSource('earthquakes', {
              type:'geojson',
              generateId: true,
              data: this.geoJsonSource.data});
            this.map.addLayer(this.geoJsonLayer);
            this.map.addLayer(this.quakeTextLayer);
          } catch (e) {
            console.log('')
          }
        });

        // async wait till geoJson gathered
        (async() => {
            // waiting for geoJson
            while(typeof this.geoJsonSource.data.features[0] == 'undefined') 
                await new Promise(resolve => setTimeout(resolve, 100));
            // geoJson loaded

            let mon_component;
            for (let i = 0; i < this.geoJsonSource.data.features.length; i++) {
              
              if (this.geoJsonSource.data.features[i].properties.mag > 4) {
                mon_component = {"x-small": false};
              } else {
                mon_component = {"x-small": true};
              }
              this.timeline_items.push({ id: i,
                                          props: mon_component,
                                          location: this.geoJsonSource.data.features[i].properties.loc,
                                          mag: this.geoJsonSource.data.features[i].properties.mag,
                                          mag_unit: this.geoJsonSource.data.features[i].properties.magtype,
                                          time: this.geoJsonSource.data.features[i].properties.fechalocal,
                                          depth: (this.geoJsonSource.data.features[i].properties.depth ? this.geoJsonSource.data.features[i].properties.depth.concat(" km") : ""),
                                          color: this.interpolate_colors(parseFloat(this.geoJsonSource.data.features[i].properties.mag))
                                          });
            }
        })();

      },
      
      goToQuake: function (quake_id) {
        if (this.previous_selected != null) {
          this.map.removeFeatureState({
              source: 'earthquakes',
              id: this.previous_selected
          });
        }
        this.previous_selected = quake_id;
        this.map.setFeatureState({
              source: 'earthquakes',
              id: quake_id
            }, {
              hover: true
        });
        
        this.map.flyTo({
          center: this.geoJsonSource.data.features[quake_id].geometry.coordinates,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion,
          zoom: 13
        });
      },
      interpolate_colors: function (mag) {
        function interpolate_number(a, b, t) {
          return (a * (1 - t)) + (b * t);
        }
        let colors = {
          1: '#fff7ec',
          1.5: '#fee8c8',
          2: '#fdd49e',
          2.5: '#fdbb84',
          3: '#fc8d59',
          3.5: '#ef6548',
          4.5: '#d7301f',
          6.5: '#b30000',
          8.5: '#7f0000',
          10.5: '#000000'
        }
        let keys = Object.keys(colors);
        let index = null;
        for(let i = 0; i < keys.length; i++){
          if (keys[i] > mag) {
            index = i;
            break;
          }
        }
        // console.log(mag)
        if (index == 0) return "#fff7ec";
        let from = colors[keys[index - 1]];
        let to = colors[keys[index]];
        let percent = (mag-keys[index-1])/(keys[index]-keys[index-1]);
        let red = interpolate_number(parseInt('0x' + (from.slice(1,3))), parseInt('0x' + (to.slice(1,3))), percent);
        let blue = interpolate_number(parseInt('0x' + (from.slice(3,5))), parseInt('0x' + (to.slice(3,5))), percent);
        let green = interpolate_number(parseInt('0x' + (from.slice(5,7))), parseInt('0x' + (to.slice(5,7))), percent);
        return  '#' + Math.floor(red).toString(16) + Math.floor(blue).toString(16) + Math.floor(green).toString(16);

      }
    },

    mounted () {
      try {
        this.quake_bar_height = this.$refs.quake_bar.$el.clientHeight;
      } catch (e) {
        console.log(e.message);
      }
    },

    computed: {
      mapStyle: function () {
        const theme = localStorage.getItem("dark_theme");

        let dark_theme;
        let mapStyle;
        if (theme) {
            dark_theme = (theme === "true");
        } else{
            dark_theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        if (dark_theme) {
          mapStyle = "mapbox://styles/mapbox/dark-v10";
        } else{
          mapStyle = "mapbox://styles/mapbox/light-v10";
        }
        return mapStyle;
      },
    } 
};



</script>