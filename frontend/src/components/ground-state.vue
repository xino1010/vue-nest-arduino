<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <div v-bind:class="['icon-big', higrometer > 40 ? 'icon-info' : 'custom-icon', 'text-center']">
            <i class="fas fa-tint"></i>
          </div>
        </div>
        <div class="col-xs-7">
          <div class="numbers">
            <p>Soil moisture</p>
            {{ higrometer }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {DashboardTypes} from '../types/dashboard.types';
  import {Getter} from 'vuex-class';

  @Component({
    name: 'ground-state',
  })
  export default class GroundState extends Vue {

    @Getter(DashboardTypes.Higrometer, {namespace: DashboardTypes.Store}) public higrometer!: number;

  }
</script>

<style scoped>

  .custom-icon {
    color: #cbd6d8;
  }

</style>