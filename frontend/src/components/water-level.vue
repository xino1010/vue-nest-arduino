<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <div class="icon-big icon-info text-center">
            <i class="ti-pulse"></i>
          </div>
        </div>
        <div class="col-xs-7">
          <div class="numbers">
            <p>Water level</p>
            {{ waterLevel }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {DashboardTypes} from '../types/dashboard.types';
  import {Getter} from 'vuex-class';
  import {Vue, Component} from 'vue-property-decorator';

  @Component({
    name: 'water-level',
  })
  export default class WaterLevelComponent extends Vue {

    @Getter(DashboardTypes.WaterLevel, {namespace: DashboardTypes.Store}) public waterLevel!: boolean;

  }
</script>

<style scoped>

</style>