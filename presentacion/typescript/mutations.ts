// En store
import {MutationTree} from 'vuex';

export class StoreTypes {
  public static AddTodo: string = 'addTodo';
  public static RemoveTodo: string = 'removeTodo';
  public static UpdateTodos: string = 'updateTodos';
}

const todosMutations: MutationTree<TodosState> = {
  [StoreTypes.AddTodo]:
    (state: TodosState, todo: Todo) => {
      state.todos.push(todo);
    },
  [StoreTypes.RemoveTodo]:
    (state: TodosState, todo: Todo) => {
      const index: number =
        state.todos.findIndex(t => t.id === todo.id);
      if (index > -1) {
        state.todos.splice(index, 1);
      }
    },
  [StoreTypes.UpdateTodos]:
    (state: TodosState, _todos: Todos) => {
      Vue.set(state, 'todos', _todos);
    },
};
