import Vue from 'vue';
import Vuetify, {
    VNavigationDrawer,
    VList,
    VListItem,
    VRow,
    VCol,
    VVirtualScroll,
    VAppBarNavIcon,
    VBtn,
    VIcon,
  } from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify, {
    components: {
        VNavigationDrawer,
        VList,
        VListItem,
        VRow,
        VCol,
        VVirtualScroll,
        VAppBarNavIcon,
        VBtn,
        VIcon,
     },
    directives: {
        Ripple,
    },
});

export default new Vuetify({
    theme: {
        themes: {
          dark: {
            primary: '#ffffff',
          },
          light: {
            primary: colors.grey.darken3,
            secondary: colors.grey.lighten4,
            accent: '#82ff84'
          }
        }
      }
});
