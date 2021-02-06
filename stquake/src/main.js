import Vue from 'vue'
import Vuetify from 'vuetify';
import App from './App.vue'
// import store from './store'

// import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
