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
              :source="geoJsonLabelsSource"
              layerId="earthquake-labels"
              :layer="quakeTextLayer"
      />
          
    </MglMap>

      <div class="outer">
        <div class="middle">
          <div class="inner">
            <v-progress-circular
              indeterminate
              color="primary"
              size="50"
              v-show="isLoading"
              >
            </v-progress-circular>
          </div>
        </div>
      </div>
      <v-btn icon v-on:click="toggle_dark_mode" style="position: fixed; bottom:1%; left:1%;">
        <v-icon>{{ icons.mdiThemeLightDark }}</v-icon>
      </v-btn>
      <v-dialog max-width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" style="position: fixed; top:1%; right:1%;">
            <v-icon>{{ icons.mdiCog }}</v-icon>
          </v-btn>
        </template>
        <template>
          <v-card style="min-height:100px; overflow: hidden;">
            <v-subheader>Magnitude filter</v-subheader>

            <div  class="mx-auto">

                <v-row>
                  <v-col class="px-4">
                    <v-range-slider
                      v-model="filterMag"
                      step="0.1"
                      :max="11"
                      :min="0"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="filterMag[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 30px"
                          @change="$set(filterMag, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="filterMag[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 30px"
                          @change="$set(filterMag, 1, $event)"
                        ></v-text-field>
                      </template>`
                    </v-range-slider>
                  </v-col>
                </v-row>
            </div>
              
              <!-- <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions> -->
          </v-card>
        </template>
      </v-dialog>


      <v-btn icon style="position: fixed; top:1%; left:1%;" @click.stop="drawer = !drawer">
        <v-icon>
          {{ icons.mdiMenu }}
        </v-icon>
      </v-btn>
      <v-navigation-drawer color="secondary" v-model="drawer" absolute bottom temporary app ref="quake_bar" :width="drawer_width">
        
        <v-list dense>
            <v-list-item style="margin-bottom: 5px; margin-top: -2px;" >
            <v-list-item-content>
              <v-row>
                <v-col cols="1">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="3">
                    <a class="text-body-2 " > Mag.</a>
                </v-col>
                
                <v-col cols="5" style="margin-top: 5px;">
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
                :items="geoJsonSource.data.features"
                :height="quake_bar_height"
                :item-height="60"
              >
              <template v-slot:default="{ item }">
                <v-list-item ripple link v-on:click="goToQuake(item.properties.id)" two-line>
                  <v-list-item-content>
                    
                      <v-row>
                        <v-col tile cols="1">
                            <v-icon :color="item.properties.color">{{ icons.mdiCircle }}</v-icon>
                        </v-col>

                        <v-col tile cols="3">
                            <a class="text-body-2 " >{{ item.properties.mag }} {{ item.properties.magtype }}</a>
                        </v-col>
                        
                        <v-col tile cols="5"  style="margin-top: 5px; margin-bottom: 5px;">
                          <v-row>
                            <a class="text-body-2  font-weight-bold">{{ item.properties.loc }}</a>
                          </v-row>
                          <v-row >
                            <a class="text-caption ">{{ item.properties.fechalocal }}</a>
                          </v-row>
                        </v-col>

                        <v-col tile cols="3" justify="end">
                          <a class="text-caption ">{{ item.properties.depth ? item.properties.depth.concat(" km") : "" }}</a>
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
//import Mapbox from "mapbox-gl";
import { MglMap, MglGeojsonLayer } from "vue-mapbox";
import { mdiThemeLightDark, mdiCog, mdiCircle, mdiMenu  } from "@mdi/js";
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
      icons: {
        mdiThemeLightDark,
        mdiCog,
        mdiCircle,
        mdiMenu
      },
      isLoading: true,
      filterMag: [0,5],
      isdark:false,
      isActive : false,
      drawer: false,
      drawer_width: 450,
      benched: 0,
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
      geoJsonLabelsSource: {
        type: 'geojson',
        generateId: true,
        data: {
          id: "earthquakes-labels-source",
          type: "FeatureCollection",
          features: []
        }
      },
      geoJsonLayer: {
        id: "earthquakes-viz",
        source: "earthquakes",
        type: "circle",
        layout: {
          'circle-sort-key': ['to-number', ['get', 'mag']]
        },
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
          'circle-stroke-opacity': 0.2,
          'circle-opacity': 1
          },
      },
      quakeTextLayer: {
        'id': 'earthquake-labels',
        'type': 'symbol',
        // 'source': 'earthquakes-labels-source',
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
          'text-allow-overlap': true,
          'visibility':  'visible'
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
    import('mapbox-gl').then((module) => {
      this.mapbox = module.Mapbox; 
    });    this.map = null;
    this.getData().then((res) => {
      for (let i = 0; i < res.dias30.features.length; i++) {
        // res.dias30.features[i].properties.hover = false;
        // res.dias30.features[i].properties.display = true;
        res.dias30.features[i].properties.mag = parseFloat(res.dias30.features[i].properties.mag);
      }
      for (let i = 0; i < res.dias10.features.length; i++) {
        // res.dias10.features[i].properties.hover = true;
        // res.dias10.features[i].properties.display = true;
        res.dias10.features[i].properties.mag = parseFloat(res.dias10.features[i].properties.mag);
      }
      for (let i = 0; i < res.dias3.features.length; i++) {
        // res.dias3.features[i].properties.hover = false;
        // res.dias3.features[i].properties.display = true;
        res.dias3.features[i].properties.mag = parseFloat(res.dias3.features[i].properties.mag);
      }
      this.all_features = res.dias10.features;
      this.geoJsonSource.data.features = res.dias10.features;
      for (let i = 0; i < this.geoJsonSource.data.features.length; i++) {
        this.geoJsonSource.data.features[i].properties.id = i;
        this.geoJsonSource.data.features[i].properties.color = this.interpolate_colors(this.geoJsonSource.data.features[i].properties.mag);
      }
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
    },
    filterMag: {
      handler: function () {
        try {
          let aux_feat = this.all_features.filter(feature => feature.properties.mag >= this.filterMag[0]
                                                              && feature.properties.mag <= this.filterMag[1]); 
          this.geoJsonSource.data.features = aux_feat;
          // console.log(this.geoJsonSource.data.features);
          // this.map.getSource('earthquakes').setData(this.geoJsonSource.data);
        } catch(e) {console.log(e);}
      }
    },
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
        this.quakeID = null;
        this.map.on('mousemove', 'earthquakes-viz', (e) => {
          this.map.getCanvas().style.cursor = 'pointer';

          if (e.features.length > 0) {

            if (this.quakeID != null) {
              this.map.removeFeatureState({
                source: "earthquakes",
                id: this.quakeID
              });
            }
            // console.log(e.features)
            this.quakeID = e.features[0].id;
            // console.log(this.map.querySourceFeatures('earthquakes', {
            //   sourceLayer: 'earthquakes-viz'})
            // );
            // When the mouse moves over the earthquakes-viz layer, update the
            // feature state for the feature under the mouse
            this.map.setFeatureState({
              source: 'earthquakes',
              id: this.quakeID,
            }, {
              hover: true
            });
            this.geoJsonLabelsSource.data.features[0] = this.all_features[this.quake_id];

          }
        });
        this.isLoading = false;

        this.map.on("mouseleave", "earthquakes-viz", () => {
          if (this.quakeID != null) {
            this.map.setFeatureState({
              source: 'earthquakes',
              id: this.quakeID
            }, {
              hover: false
            });
            this.geoJsonLabelsSource.data.features[0] = null;
          }

          this.quakeID = null;
        });
        this.map.on("style.load", () => {
          console.log('hey');
          try {

              this.map.addSource('earthquakes', {
                type:'geojson',
                generateId: true,
                data: this.geoJsonSource.data});
              this.map.addLayer(this.geoJsonLayer);
              this.map.addLayer(this.quakeTextLayer);
            } catch (e) {
              console.log(e)
            }
          
        });

        // async wait till geoJson gathered
        // (async() => {
        //     // waiting for geoJson
        //     while(typeof this.geoJsonSource.data.features[0] == 'undefined') 
        //         await new Promise(resolve => setTimeout(resolve, 100));
        //     // geoJson loaded

        //     // let mon_component;
        //     for (let i = 0; i < this.geoJsonSource.data.features.length; i++) {
              
        //       // if (this.geoJsonSource.data.features[i].properties.mag > 4) {
        //       //   mon_component = {"x-small": false};
        //       // } else {
        //       //   mon_component = {"x-small": true};
        //       // }
        //       this.geoJsonSource.data.features[i].properties.id = i;
        //       this.geoJsonSource.data.features[i].properties.color = this.interpolate_colors(this.geoJsonSource.data.features[i].properties.mag);
        //                                   // props: mon_component,
        //                                   // location: .loc,
        //                                   // mag: this.geoJsonSource.data.features[i].properties.mag,
        //                                   // mag_unit: this.geoJsonSource.data.features[i].properties.magtype,
        //                                   // time: this.geoJsonSource.data.features[i].properties.fechalocal,
        //                                   // depth: (this.geoJsonSource.data.features[i].properties.depth ? this.geoJsonSource.data.features[i].properties.depth.concat(" km") : ""),
        //                                   // color: this.interpolate_colors(parseFloat(this.geoJsonSource.data.features[i].properties.mag))
        //                                   // });
              
        //     }
        // })();
        
      },
      
      goToQuake: function (quake_id) {
        this.map.removeFeatureState({
              source: 'earthquakes',
              id: this.quakeID
          });
        this.quakeID = this.geoJsonSource.data.features.indexOf(this.all_features[quake_id]);
        this.map.setFeatureState({
              source: 'earthquakes',
              id: this.quakeID
            }, {
              hover: true
        });
        this.geoJsonLabelsSource.data.features[0] = this.all_features[this.quake_id];
        
        this.map.flyTo({
          center: this.all_features[quake_id].geometry.coordinates,
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
