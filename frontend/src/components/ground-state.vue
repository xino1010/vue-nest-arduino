<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <div v-bind:class="['icon-big', higrometer > 40 ? 'icon-info' : 'icon-warning', 'text-center']">
            <i v-bind:class="[higrometer > 40 ? 'fas fa-tint' : 'fas fa-fire']"></i>
          </div>
        </div>
        <div class="col-xs-7">
          <div class="numbers">
            <p>Ground status</p>
            {{ higrometer }}%
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

    @Getter(DashboardTypes.Higrometer, {namespace: DashboardTypes.Store}) public higrometer!: number;

  }
</script>

<style scoped>

</style>