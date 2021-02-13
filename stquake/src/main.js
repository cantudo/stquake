import Vue from 'vue'
import Vuetify from 'vuetify/lib';
// import 'vuetify/src/stylus/app.styl'
import App from './App.vue'

// import vuetify from './plugins/vuetify';
import colors from 'vuetify/lib/util/colors'


// Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify({
    theme: {
      themes: {
        dark: {
          primary: '#ffffff'
        },
        light: {
          primary: colors.grey.darken3,
          secondary: colors.grey.lighten1
        }
      }
    }
  }),
  render: h => h(App)
}).$mount('#app')
