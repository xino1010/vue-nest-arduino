
export const TodosStore: Module<TodoState, any> = {
  actions: todosActions,
  getters: todosGetters,
  mutations: todosMutations,
  namespaced: true,
  state: todosState,
};
