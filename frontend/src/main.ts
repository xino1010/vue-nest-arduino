import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './assets/css/animate.min.css';
import './assets/css/paper-dashboard.css';
import './assets/css/demo.css';
import './assets/css/themify-icons.css';
import '../node_modules/weather-icons/css/weather-icons.min.css';

// https://demos.creative-tim.com/bs3/paper-dashboard/dashboard.html

Vue.config.productionTip = false;
Vue.use(VueSocketio, io('http://localhost:3001'), {store});
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
