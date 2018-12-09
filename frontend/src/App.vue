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
    <toast position="ne"></toast>
  </div>
</template>

<script lang="ts">
  import {Action} from 'vuex-class';
  import {ADD_TOAST_MESSAGE} from 'vuex-toast';
  import AppSidebar from '@/components/app-sidebar.vue';
  import AppHeader from '@/components/app-header.vue';
  import AppFooter from '@/components/app-footer.vue';
  import {Component, Vue} from 'vue-property-decorator';
  import {DashboardTypes} from '@/types/dashboard.types';
  import {EventBus} from '@/event-bus';
  import {ToastData} from '@/types/toast-data';
  import {ToastType} from '@/enums/toast-type';

  const vuexToast = require('vuex-toast');

  @Component({
    name: 'app',
    components: {
      AppFooter,
      AppHeader,
      AppSidebar,
      toast: vuexToast.Toast,
    },
  })
  export default class App extends Vue {

    @Action(DashboardTypes.ClearData, {namespace: DashboardTypes.Store}) private clearDashboardData!: () => void;

    public mounted() {
      this.$options['sockets'].connect = () => {
        const toastData: ToastData = {
          dismissAfter: 5000,
          text: 'Socket connected',
          type: ToastType.Info,
        };
        this.$store.dispatch(ADD_TOAST_MESSAGE, toastData);
      };
      this.$options['sockets'].disconnect = () => {
        const toastData: ToastData = {
          dismissAfter: 5000,
          text: 'Socket disconnected',
          type: ToastType.Danger,
        };
        this.$store.dispatch(ADD_TOAST_MESSAGE, toastData);
        this.clearDashboardData();
        EventBus.$emit(DashboardTypes.ClearData);
      };
    }

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
