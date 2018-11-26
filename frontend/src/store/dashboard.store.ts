import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {DashboardState} from '@/interfaces/dashboard.state';
import {DashboardTypes} from '@/types/dashboard.types';
import {IndoorData} from '@/classes/indoor-data';
import {RootState} from '@/interfaces/root.state';
import {observableAction} from 'vuex-observable';

const dashboardState: DashboardState = {
  indoorData: new IndoorData(),
};

const dashboardGetters: GetterTree<DashboardState, RootState> = {
  [DashboardTypes.Humidity](state: DashboardState): number {
    return state.indoorData.dht22Data.humidity;
  },
  [DashboardTypes.Light](state: DashboardState): boolean {
    return state.indoorData.light;
  },
  [DashboardTypes.Temperature](state: DashboardState): number {
    return state.indoorData.dht22Data.temperature;
  },
  [DashboardTypes.Wet](state: DashboardState): boolean {
    return state.indoorData.wet;
  },
};

const dashboardMutations: MutationTree<DashboardState> = {
  [DashboardTypes.SOCKET_INDOOR_DATA]: (state: DashboardState, indoorData: IndoorData) => {
    state.indoorData = indoorData;
  },
};

const dashboardActions: ActionTree<DashboardState, RootState> = {
};

export const DashboardStore: Module<DashboardState, RootState> = {
  actions: dashboardActions,
  getters: dashboardGetters,
  mutations: dashboardMutations,
  namespaced: true,
  state: dashboardState,
};
