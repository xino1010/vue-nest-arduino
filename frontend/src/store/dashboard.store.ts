import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {DashboardState} from '@/interfaces/dashboard.state';
import {DashboardTypes} from '@/types/dashboard.types';
import {IndoorData} from '@/classes/indoor-data';
import {RootState} from '@/interfaces/root.state';
import $socket from '../socket-instance'; //

const dashboardState: DashboardState = {
  indoorData: new IndoorData(),
};

const dashboardGetters: GetterTree<DashboardState, RootState> = {
  [DashboardTypes.Humidity](state: DashboardState): number {
    return state.indoorData.humidity;
  },
  [DashboardTypes.Light](state: DashboardState): boolean {
    return state.indoorData.light;
  },
  [DashboardTypes.Temperature](state: DashboardState): number {
    return state.indoorData.temperature;
  },
  [DashboardTypes.Higrometer](state: DashboardState): number {
    return state.indoorData.higrometer;
  },
};

const dashboardMutations: MutationTree<DashboardState> = {
  [DashboardTypes.SOCKET_INDOOR_DATA]: (state: DashboardState, indoorData: IndoorData) => {
    state.indoorData = indoorData;
  },
};

const dashboardActions: ActionTree<DashboardState, RootState> = {
  [DashboardTypes.Light]: () => {
    $socket.emit(DashboardTypes.SOCKET_INDOOR_TOGGLE_LIGHT);
  },
};

export const DashboardStore: Module<DashboardState, RootState> = {
  actions: dashboardActions,
  getters: dashboardGetters,
  mutations: dashboardMutations,
  namespaced: true,
  state: dashboardState,
};
