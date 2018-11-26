<template>
  <div id="app" class="wrapper">
    <app-sidebar></app-sidebar>
    <div class="main-panel">
      <app-header></app-header>
      <div class="content">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AppSidebar from '@/components/app-sidebar.vue';
  import AppHeader from '@/components/app-header.vue';
  import AppFooter from '@/components/app-footer.vue';

  @Component({
    name: 'app',
    components: {
      AppFooter,
      AppHeader,
      AppSidebar,
    },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
