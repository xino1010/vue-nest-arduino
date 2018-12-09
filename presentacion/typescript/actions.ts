// En store
import {ActionTree} from 'vuex';
import Api from '../services/api';

export class StoreTypes {
  public static GetTodos: string = 'getTodos';
  public static RemoveTodo: string = 'removeTodo';
  public static UpdateTodos: string = 'updateTodos';
}

const todosActions: ActionTree<TodoState, any> = {
  [StoreTypes.GetTodos]: (context) => {
    Api.getAllTodos().then(response => {
      const todos: Todo[] = response.data;
      context.commit(StoreTypes.UpdateTodos, todos);
    });
  },
  [StoreTypes.RemoveTodo]: (context, todo: Todo) => {
    Api.removeTodo(todo).then(response => {
      const todo: Todo = response.data;
      context.commit(StoreTypes.RemoveTodo, todo);
    });
  },
};

// En componente
<template>
  <div id="MyComp">
    <div v-for="todo in todos">
      <label>{{ todo.text }}</label>
      <i v-bind:class="[todo.done ? 'fas fa-check' : 'fas fa-times']"></i>
      <button @click="removeTodo(todo)" title="Remove todo">
        <i class="fa fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, State} from 'vuex-class'

  @Component({
    name: 'my-comp',
  })
  export const MyComp extends Vue {
    @State('todos') todos: Todo[];
    @Action(StoreTypes.GetTodos) public getTodos!: () => void;
    @Action(StoreTypes.RemoveTodo) public removeTodo!: (todo: Todo) => void;

    mounted() {
      this.getTodos();
    }

  }
</script>
