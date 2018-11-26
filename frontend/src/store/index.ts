import {DashboardStore} from '@/store/dashboard.store';
import {RootState} from '@/interfaces/root.state';
import Vue from 'vue';
import Vuex, {ActionTree, GetterTree, MutationTree} from 'vuex';

Vue.use(Vuex);

const rootState: RootState = {
  connected: false,
  socket: null,
};

const rootGetters: GetterTree<RootState, RootState> = {};

const rootMutations: MutationTree<RootState> = {
  SOCKET_CONNECT: (state: RootState) => {
    console.log(`Socket connected`);
    state.connected = true;
  },
  SOCKET_DISCONNECTED: (state: RootState) => {
    console.log(`Socket disconnected`);
    state.connected = false;
  },
};

const rootActions: ActionTree<RootState, RootState> = {};

export default new Vuex.Store({
  actions: rootActions,
  getters: rootGetters,
  mutations: rootMutations,
  state: rootState,
  modules: {
    DashboardStore,
  },
});
