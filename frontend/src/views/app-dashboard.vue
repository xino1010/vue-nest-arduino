<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <ground-state></ground-state>
      </div>
      <div class="col-lg-3 col-sm-6">
        <water-level></water-level>
      </div>
      <div class="col-lg-3 col-sm-6">
        <light-state></light-state>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <temperature-humidity-chart></temperature-humidity-chart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import GroundState from '@/components/ground-state.vue';
  import LightState from '@/components/light-state.vue';
  import TemperatureHumidityChart from '@/components/temperature-humidity-chart.vue';
  import WaterLevel from '@/components/water-level.vue';

  @Component({
    name: 'app-dashboard',
    components: {
      GroundState,
      LightState,
      TemperatureHumidityChart,
      WaterLevel,
    },
  })
  export default class AppDashboard extends Vue {

  }
</script>

<style scoped>

</style>