// En store
import {GetterTree} from 'vuex';

export class TodoStoreTypes {
  public static Store: string = 'TodoStore';
  public static Todos: string = 'todos';
  public static FinishedTodos: string = 'finishedTodos';
}

const todosGetters: GetterTree<TodosState, any> = {
  [TodoStoreTypes.FinishedTodos](state: TodosState): Todo[] {
    return state.todos.filter(f => f.done);
  },
};

// En componente
<template>
  <div id="MyComp">
    <h1>Finished</h1>
    <div v-for="todo in finishedTodos">
      <label>{{ todo.text }}</label>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class'

  @Component({
    name: 'my-comp',
  })
  export const MyComp extends Vue {
    @Getter(
      StoreTypes.FinishedTodos,
      {namespace: TodoStoreTypes.Store}
    ) finishedTodos: Todo[];
  }
</script>
