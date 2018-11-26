<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <div v-bind:class="['icon-big', wet ? 'icon-info' : 'icon-warning', 'text-center']">
            <i v-bind:class="{'fas fa-tint': wet, 'fas fa-fire': !wet}"></i>
          </div>
        </div>
        <div class="col-xs-7">
          <div class="numbers">
            <p>Ground status</p>
            {{ wet ? 'Wet' : 'Dry' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import {DashboardTypes} from '../types/dashboard.types';

  @Component({
    name: 'ground-state',
  })
  export default class GroundState extends Vue {

    @Getter(DashboardTypes.Wet, {namespace: DashboardTypes.Store}) public wet!: boolean;

  }
</script>

<style scoped>

</style>