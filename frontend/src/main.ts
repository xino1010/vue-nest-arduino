import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import $socket from './socket-instance';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './assets/css/animate.min.css';
import './assets/css/paper-dashboard.css';
import './assets/css/demo.css';
import './assets/css/themify-icons.css';
import '../node_modules/weather-icons/css/weather-icons.min.css';
import '../node_modules/vuex-toast/dist/vuex-toast.css';

Vue.config.productionTip = false;
Vue.use(VueSocketio, $socket, {store});
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
