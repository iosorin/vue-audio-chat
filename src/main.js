import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { firestorePlugin } from 'vuefire';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueRouter);
Vue.use(firestorePlugin);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

import Home from './components/Home';

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
