import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import vuetify from './plugins/vuetify';

import App from './App.vue';

Vue.config.productionTip = false

import { router } from './routes';

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
