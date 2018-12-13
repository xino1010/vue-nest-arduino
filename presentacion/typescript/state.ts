// En store
export class TodoStoreTypes {
  public static Store: string = 'TodoStore';
  public static Todos: string = 'todos';
}

export class Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  todos: Todo[];
}

const todosState: TodosState = {
  todos: [],
};

// En componente
<template>
  <div id="MyComp">
    <div v-for="todo in todos">
      <label>{{ todo.text }}</label>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State} from 'vuex-class'

  @Component({
    name: 'my-comp',
  })
  export const MyComp extends Vue {
    @State(
      TodoStoreTypes.Todos,
      {namespaced: TodoStoreTypes.Store}
    ) todos: Todo[];
  }
</script>
