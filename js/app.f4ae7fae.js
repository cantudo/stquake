(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],u=0,p=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(p.length)p.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var c=a[i];0!==o[c]&&(r=!1)}r&&(n.splice(t--,1),e=s(s.s=a[0]))}return e}var r={},o={app:0},n=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-2d22497b":"92c37e5b"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a=o[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,r){a=o[e]=[t,r]}));t.push(a[2]=r);var n,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(e);var l=new Error;n=function(t){c.onerror=c.onload=null,clearTimeout(u);var a=o[e];if(0!==a){if(a){var r=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+n+")",l.name="ChunkLoadError",l.type=r,l.request=n,a[1](l)}o[e]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:c})}),12e4);c.onerror=c.onload=n,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/stquake/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var d=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},1:function(e,t){},2:function(e,t){},"452c":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("MonMap")],1)},n=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"map"}},[a("MglMap",{attrs:{container:"map",accessToken:e.accessToken,mapStyle:e.mapStyle,center:e.coordinates,zoom:e.defZoom,maxBounds:e.bounds},on:{"update:mapStyle":function(t){e.mapStyle=t},"update:map-style":function(t){e.mapStyle=t},load:e.onMapLoaded}},[a("MglGeojsonLayer",{attrs:{sourceId:e.geoJsonSource.data.id,source:e.geoJsonSource,layerId:"earthquakes-viz",layer:e.geoJsonLayer}}),a("MglGeojsonLayer",{attrs:{sourceId:e.geoJsonSource.data.id,source:e.geoJsonLabelsSource,layerId:"earthquake-labels",layer:e.quakeTextLayer}})],1),a("div",{staticClass:"outer"},[a("div",{staticClass:"middle"},[a("div",{staticClass:"inner"},[a("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],attrs:{indeterminate:"",color:"primary",size:"50"}})],1)])]),a("v-btn",{staticStyle:{position:"fixed",bottom:"1%",left:"1%"},attrs:{icon:""},on:{click:e.toggle_dark_mode}},[a("v-icon",[e._v(e._s(e.icons.mdiThemeLightDark))])],1),a("v-dialog",{attrs:{"max-width":"800"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[a("v-btn",e._g(e._b({staticStyle:{position:"fixed",top:"1%",right:"1%"},attrs:{icon:""}},"v-btn",o,!1),r),[a("v-icon",[e._v(e._s(e.icons.mdiCog))])],1)]}}])},[[a("v-card",{staticStyle:{"min-height":"100px",overflow:"hidden"}},[a("v-subheader",[e._v("Magnitude filter")]),a("div",{staticClass:"mx-auto"},[a("v-row",[a("v-col",{staticClass:"px-4"},[a("v-range-slider",{staticClass:"align-center",attrs:{step:"0.1",max:11,min:0,"hide-details":""},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"30px"},attrs:{value:e.filterMag[0],"hide-details":"","single-line":"",type:"number"},on:{change:function(t){return e.$set(e.filterMag,0,t)}}})]},proxy:!0},{key:"append",fn:function(){return[a("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"30px"},attrs:{value:e.filterMag[1],"hide-details":"","single-line":"",type:"number"},on:{change:function(t){return e.$set(e.filterMag,1,t)}}})]},proxy:!0}]),model:{value:e.filterMag,callback:function(t){e.filterMag=t},expression:"filterMag"}},[e._v("` ")])],1)],1)],1)],1)]],2),a("v-btn",{staticStyle:{position:"fixed",top:"1%",left:"1%"},attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}},[a("v-icon",[e._v(" "+e._s(e.icons.mdiMenu)+" ")])],1),a("v-navigation-drawer",{ref:"quake_bar",attrs:{color:"secondary",absolute:"",bottom:"",temporary:"",app:"",width:e.drawer_width},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{staticStyle:{"margin-bottom":"5px","margin-top":"-2px"}},[a("v-list-item-content",[a("v-row",[a("v-col",{attrs:{cols:"1"}},[a("v-spacer")],1),a("v-col",{attrs:{cols:"3"}},[a("a",{staticClass:"text-body-2 "},[e._v(" Mag.")])]),a("v-col",{staticStyle:{"margin-top":"5px"},attrs:{cols:"5"}},[a("v-row",[a("a",{staticClass:"text-body-2  font-weight-bold"},[e._v("Location")])]),a("v-row",[a("a",{staticClass:"text-caption "},[e._v("Time")])])],1),a("v-col",{attrs:{cols:"3",justify:"center"}},[a("a",{staticClass:"text-caption"},[e._v("Depth.")])])],1)],1)],1),a("v-divider",{staticStyle:{"border-width":"5px"}}),a("v-virtual-scroll",{attrs:{bench:e.benched,items:e.geoJsonSource.data.features,height:e.quake_bar_height,"item-height":60},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.item;return[a("v-list-item",{attrs:{ripple:"",link:"","two-line":""},on:{click:function(t){return e.goToQuake(r.properties.id)}}},[a("v-list-item-content",[a("v-row",[a("v-col",{attrs:{tile:"",cols:"1"}},[a("v-icon",{attrs:{color:r.properties.color}},[e._v(e._s(e.icons.mdiCircle))])],1),a("v-col",{attrs:{tile:"",cols:"3"}},[a("a",{staticClass:"text-body-2 "},[e._v(e._s(r.properties.mag)+" "+e._s(r.properties.magtype))])]),a("v-col",{staticStyle:{"margin-top":"5px","margin-bottom":"5px"},attrs:{tile:"",cols:"5"}},[a("v-row",[a("a",{staticClass:"text-body-2  font-weight-bold"},[e._v(e._s(r.properties.loc))])]),a("v-row",[a("a",{staticClass:"text-caption "},[e._v(e._s(r.properties.fechalocal))])])],1),a("v-col",{attrs:{tile:"",cols:"3",justify:"end"}},[a("a",{staticClass:"text-caption "},[e._v(e._s(r.properties.depth?r.properties.depth.concat(" km"):""))])])],1)],1)],1),a("v-divider")]}}])})],1)],1)],1)},s=[],c=(a("4de4"),a("c975"),a("d81d"),a("fb6a"),a("b64b"),a("d3b7"),a("25f0"),a("96cf"),a("1da1")),l=a("3f3d"),u=a("94ed"),d=a("24f8"),p=a("0706"),f={components:{MglMap:l["b"],MglGeojsonLayer:l["a"]},data:function(){return{icons:{mdiThemeLightDark:u["d"],mdiCog:u["b"],mdiCircle:u["a"],mdiMenu:u["c"]},isLoading:!0,filterMag:[0,5],isdark:!1,isActive:!1,drawer:!1,drawer_width:450,benched:0,quake_bar_height:0,accessToken:"pk.eyJ1IjoiY2FhYW50dSIsImEiOiJja2twbXhlb2UwZWc5Mm5zMTIyejNsc2g5In0.MCaZ1fA3fCJ9_YXEcFUXJQ",coordinates:[-3.70379,40.416775],defZoom:5,bounds:[[-35.32,20.7],[18.41,50.05]],geoJsonSource:{type:"geojson",generateId:!0,data:{id:"earthquakes",type:"FeatureCollection",features:[]}},geoJsonLabelsSource:{type:"geojson",generateId:!0,data:{id:"earthquakes-labels-source",type:"FeatureCollection",features:[]}},geoJsonLayer:{id:"earthquakes-viz",source:"earthquakes",type:"circle",layout:{"circle-sort-key":["to-number",["get","mag"]]},paint:{"circle-color":["case",["boolean",!0],["interpolate",["linear"],["to-number",["get","mag"]],1,"#fff7ec",1.5,"#fee8c8",2,"#fdd49e",2.5,"#fdbb84",3,"#fc8d59",3.5,"#ef6548",4.5,"#d7301f",6.5,"#b30000",8.5,"#7f0000",10.5,"#000"],"#000"],"circle-radius":["case",["boolean",["feature-state","hover"],!1],30,["interpolate",["linear"],["to-number",["get","mag"]],1,4,1.5,5,2,6,2.5,7,3,8,3.5,9,4.5,10,6.5,11,8.5,12,10.5,13]],"circle-stroke-width":2,"circle-stroke-color":"#000","circle-stroke-opacity":.2,"circle-opacity":1}},quakeTextLayer:{id:"earthquake-labels",type:"symbol",layout:{"text-field":["concat",["to-string",["get","mag"]],"m"],"text-font":["Open Sans Bold","Arial Unicode MS Bold"],"text-size":20,"text-allow-overlap":!0,visibility:"visible"},paint:{"text-color":["case",["boolean",["feature-state","hover"],!1],"rgba(0,0,0,1)","rgba(0,0,0,0)"]}},timeline_items:[]}},created:function(){var e=this;window.addEventListener("resize",this.handle_navbar_scroller),a.e("chunk-2d22497b").then(a.t.bind(null,"e192",7)).then((function(t){e.mapbox=t.Mapbox})),this.map=null,this.getData().then((function(t){for(var a=0;a<t.dias30.features.length;a++)t.dias30.features[a].properties.mag=parseFloat(t.dias30.features[a].properties.mag);for(var r=0;r<t.dias10.features.length;r++)t.dias10.features[r].properties.mag=parseFloat(t.dias10.features[r].properties.mag);for(var o=0;o<t.dias3.features.length;o++)t.dias3.features[o].properties.mag=parseFloat(t.dias3.features[o].properties.mag);e.all_features=t.dias10.features,e.geoJsonSource.data.features=t.dias10.features;for(var n=0;n<e.geoJsonSource.data.features.length;n++)e.geoJsonSource.data.features[n].properties.id=n,e.geoJsonSource.data.features[n].properties.color=e.interpolate_colors(e.geoJsonSource.data.features[n].properties.mag)}))},watch:{drawer:{immediate:!0,handler:function(){var e,t=this;e=this.drawer?"v-navigation-drawer--is-mobile"==this.$refs.quake_bar.$el.classList[4]?{bottom:this.$refs.quake_bar.$el.clientHeight,left:0}:{bottom:0,left:this.drawer_width}:{bottom:0,left:0},Object(c["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(null!=t.map){a.next=5;break}return a.next=3,new Promise((function(e){return setTimeout(e,100)}));case 3:a.next=0;break;case 5:t.map.easeTo({padding:e,duration:400});case 6:case"end":return a.stop()}}),a)})))()}},mapStyle:{immediate:!0,handler:function(e){this.$vuetify.theme.dark="mapbox://styles/mapbox/dark-v10"==e}},filterMag:{handler:function(){var e=this;try{var t=this.all_features.filter((function(t){return t.properties.mag>=e.filterMag[0]&&t.properties.mag<=e.filterMag[1]}));this.geoJsonSource.data.features=t}catch(a){console.log(a)}}}},methods:{setStyle:function(e){var t=this;Object(c["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(null!=t.map){a.next=5;break}return a.next=3,new Promise((function(e){return setTimeout(e,100)}));case 3:a.next=0;break;case 5:e?t.map.setStyle("mapbox://styles/mapbox/dark-v10"):t.map.setStyle("mapbox://styles/mapbox/light-v10"),t.$vuetify.theme.dark=e,localStorage.setItem("dark_theme",t.$vuetify.theme.dark.toString());case 8:case"end":return a.stop()}}),a)})))()},toggle_dark_mode:function(){this.$vuetify.theme.dark=!this.$vuetify.theme.dark,this.setStyle(this.$vuetify.theme.dark)},handle_navbar_scroller:function(){try{this.quake_bar_height=this.$refs.quake_bar.$el.clientHeight-10}catch(e){}},getData:function(){return new Promise((resolve, reject) => {


    async function fetchTerremotos() {
        let response = await fetch('https://www.ign.es/web/resources/sismologia/tproximos/terremotos.js');
        let responseText = await response.text();
        return responseText;
    }

    fetchTerremotos().then((responseText) => {
        const script = new p.Script(output);
        script.runInNewContext(context);
        try {
          resolve(context);
        } catch (e) {
          reject(e.message);
        }
    })
})},onMapLoaded:function(e){var t=this;this.map=e.map,this.quakeID=null,this.map.on("mousemove","earthquakes-viz",(function(e){t.map.getCanvas().style.cursor="pointer",e.features.length>0&&(null!=t.quakeID&&t.map.removeFeatureState({source:"earthquakes",id:t.quakeID}),t.quakeID=e.features[0].id,t.map.setFeatureState({source:"earthquakes",id:t.quakeID},{hover:!0}),t.geoJsonLabelsSource.data.features[0]=t.all_features[t.quake_id])})),this.isLoading=!1,this.map.on("mouseleave","earthquakes-viz",(function(){null!=t.quakeID&&(t.map.setFeatureState({source:"earthquakes",id:t.quakeID},{hover:!1}),t.geoJsonLabelsSource.data.features[0]=null),t.quakeID=null})),this.map.on("style.load",(function(){console.log("hey");try{t.map.addSource("earthquakes",{type:"geojson",generateId:!0,data:t.geoJsonSource.data}),t.map.addLayer(t.geoJsonLayer),t.map.addLayer(t.quakeTextLayer)}catch(e){console.log(e)}}))},goToQuake:function(e){this.map.removeFeatureState({source:"earthquakes",id:this.quakeID}),this.quakeID=this.geoJsonSource.data.features.indexOf(this.all_features[e]),this.map.setFeatureState({source:"earthquakes",id:this.quakeID},{hover:!0}),this.geoJsonLabelsSource.data.features[0]=this.all_features[this.quake_id],this.map.flyTo({center:this.all_features[e].geometry.coordinates,essential:!0,zoom:13})},interpolate_colors:function(e){function t(e,t,a){return e*(1-a)+t*a}for(var a={1:"#fff7ec",1.5:"#fee8c8",2:"#fdd49e",2.5:"#fdbb84",3:"#fc8d59",3.5:"#ef6548",4.5:"#d7301f",6.5:"#b30000",8.5:"#7f0000",10.5:"#000000"},r=Object.keys(a),o=null,n=0;n<r.length;n++)if(r[n]>e){o=n;break}if(0==o)return"#fff7ec";var i=a[r[o-1]],s=a[r[o]],c=(e-r[o-1])/(r[o]-r[o-1]),l=t(parseInt("0x"+i.slice(1,3)),parseInt("0x"+s.slice(1,3)),c),u=t(parseInt("0x"+i.slice(3,5)),parseInt("0x"+s.slice(3,5)),c),d=t(parseInt("0x"+i.slice(5,7)),parseInt("0x"+s.slice(5,7)),c);return"#"+Math.floor(l).toString(16)+Math.floor(u).toString(16)+Math.floor(d).toString(16)}},mounted:function(){try{this.quake_bar_height=this.$refs.quake_bar.$el.clientHeight}catch(e){console.log(e.message)}},computed:{mapStyle:function(){var e,t,a=localStorage.getItem("dark_theme");return e=a?"true"===a:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=e?"mapbox://styles/mapbox/dark-v10":"mapbox://styles/mapbox/light-v10",t}}},m=f,h=a("2877"),g=a("6544"),v=a.n(g),b=a("8336"),y=a("b0af"),k=a("62ad"),w=a("169a"),x=a("ce7e"),_=a("132d"),S=a("8860"),q=a("da13"),M=a("5d23"),I=a("f774"),L=a("490a"),C=a("5963"),V=a("0fd9"),j=a("2fa4"),J=a("e0c7"),T=a("8654"),D=a("0de5"),O=Object(h["a"])(m,i,s,!1,null,null,null),$=O.exports;v()(O,{VBtn:b["a"],VCard:y["a"],VCol:k["a"],VDialog:w["a"],VDivider:x["a"],VIcon:_["a"],VList:S["a"],VListItem:q["a"],VListItemContent:M["a"],VNavigationDrawer:I["a"],VProgressCircular:L["a"],VRangeSlider:C["a"],VRow:V["a"],VSpacer:j["a"],VSubheader:J["a"],VTextField:T["a"],VVirtualScroll:D["a"]});var P={name:"App",components:{MonMap:$},data:function(){return{}}},F=function(){return document.documentElement.style.setProperty("--app-height","".concat(window.innerHeight,"px"))};window.addEventListener("resize",F),F();var z=P,E=(a("034f"),a("b0a0"),a("7496")),R=Object(h["a"])(z,o,n,!1,null,null,null),A=R.exports;v()(R,{VApp:E["a"]});var B=a("f309"),N=a("5bc1"),H=a("5607"),Z=a("fcf4");r["a"].use(B["a"],{components:{VNavigationDrawer:I["a"],VList:S["a"],VListItem:q["a"],VRow:V["a"],VCol:k["a"],VVirtualScroll:D["a"],VAppBarNavIcon:N["a"],VBtn:b["a"],VIcon:_["a"]},directives:{Ripple:H["a"]}});var G=new B["a"]({theme:{themes:{dark:{primary:"#ffffff"},light:{primary:Z["a"].grey.darken3,secondary:Z["a"].grey.lighten4,accent:"#82ff84"}}}});r["a"].config.productionTip=!1,new r["a"]({vuetify:G,render:function(e){return e(A)}}).$mount("#app")},"85ec":function(e,t,a){},b0a0:function(e,t,a){"use strict";a("452c")}});
//# sourceMappingURL=app.f4ae7fae.js.map
