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
  [DashboardTypes.Temperature](state: DashboardState): number {
    return state.indoorData.temperature;
  },
  [DashboardTypes.Higrometer](state: DashboardState): number {
    return state.indoorData.higrometer;
  },
  [DashboardTypes.WaterLevel](state: DashboardState): number {
    return state.indoorData.waterLevel;
  },
  // TODO: Añadir el getter para el atributo "light"
};

const dashboardMutations: MutationTree<DashboardState> = {
  [DashboardTypes.SOCKET_INDOOR_DATA]: (state: DashboardState, indoorData: IndoorData) => {
    state.indoorData = indoorData;
  },
  [DashboardTypes.ClearData]: (state: DashboardState) => {
    state.indoorData = new IndoorData();
  },
};

const dashboardActions: ActionTree<DashboardState, RootState> = {
  [DashboardTypes.ClearData]: ({commit}) => {
    commit(DashboardTypes.ClearData);
  },
  // TODO: Añadir la acción para cambiar el estado de la "light"
  // TODO: Emitir el evento "DashboardTypes.SOCKET_INDOOR_TOGGLE_LIGHT" mediante $socket
};

export const DashboardStore: Module<DashboardState, RootState> = {
  actions: dashboardActions,
  getters: dashboardGetters,
  mutations: dashboardMutations,
  namespaced: true,
  state: dashboardState,
};
