import Vue from 'vue';
import Router from 'vue-router';
import AppDashboard from './views/app-dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AppDashboard,
    },
  ],
});
