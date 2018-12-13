// store.ts
export default new Vuex.Store({
  actions: {},
  getters: {},
  mutations: {},
  state: {}
  modules: {},
});

// main.ts
import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');



import {TodosStore} from '@/store/todos.store';

export default new Vuex.Store({
  actions: {},
  getters: {},
  mutations: {},
  state: {}
  modules: {
    TodosStore,
  },
});
