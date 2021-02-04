<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle">
    <MglGeojsonLayer
            :sourceId="geoJsonSource.data.id"
            :source="geoJsonSource"
            layerId="somethingSomething"
            :layer="geoJsonLayer"
    />
  </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglGeojsonLayer } from "vue-mapbox";
const https = require('https');
const vm = require('vm');
const concat = require('concat-stream');

export default {
  components: {
    MglMap,
    MglGeojsonLayer
  },
  data() {
    return {
      accessToken: "pk.eyJ1IjoiY2FhYW50dSIsImEiOiJja2twbXhlb2UwZWc5Mm5zMTIyejNsc2g5In0.MCaZ1fA3fCJ9_YXEcFUXJQ", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/dark-v10", // your map style
      geoJsonSource: {
        type: 'geojson',
        data: {
          id: "thisIsMySource",
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [0, 0]
              },
              properties: {
                id: "value0"
              }
            }
          ]
        }
      },
      geoJsonLayer: {
        type: "circle",
        paint: {
          "circle-color": "red"
        }
      }
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
    this.getData().then((res) => {
      console.log(res);
      this.geoJsonSource.data.features = res.dias30.features;
    });
  },

  methods: {
      getData: function () {
        return new Promise((resolve, reject) => {
          https.get( 'https://www.ign.es/web/resources/sismologia/tproximos/terremotos.js', function( res ){
            let context = {};
            res.setEncoding('utf8');
            res.pipe(concat({ encoding: 'string' }, function(remoteSrc) {
              const script = new vm.Script(remoteSrc);
              script.runInNewContext(context);
              // mon_context = context;
            }));
            res.on('end', () => {
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
      }
    }
};
</script>