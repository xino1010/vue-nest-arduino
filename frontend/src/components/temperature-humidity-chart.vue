<template>
  <div id="containerTHC" class="card">
    <div class="header">
      <h4 class="title">
        <span class="span-temperature">Temperature</span> - <span class="span-humidity">Humidity</span>
      </h4>
      <p class="category">Since connection</p>
    </div>
    <div class="content">
      <canvas height="500" ref="chart"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
  import Chart from 'chart.js';
  import {Component, Vue} from 'vue-property-decorator';
  import {DashboardTypes} from '@/types/dashboard.types';

  const moment = require('moment');

  @Component({
    name: 'temperature-humidity-chart',
  })
  export default class TemperatureHumidityChart extends Vue {

    private myChart: any = null;

    public created() {
      this.$store.subscribe((mutation) => {
        const type = `${DashboardTypes.Store}/${DashboardTypes.SOCKET_INDOOR_DATA}`;
        if (mutation.type === type && this.myChart != null) {
          const currentTime: string = moment().format('HH:MM:ss DD-MM-YYYY');
          this.myChart.data.labels.push(currentTime);
          this.myChart.data.datasets[0].data.push(mutation.payload.temperature);
          this.myChart.data.datasets[1].data.push(mutation.payload.humidity);
          this.myChart.update();
        }
      });
    }

    public mounted(): void {
      const htmlChart: HTMLCanvasElement = this.$refs.chart as HTMLCanvasElement;
      const ctx: any = htmlChart.getContext('2d');
      if (ctx == null) {
        return;
      }
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Temperature',
              data: [],
              borderColor: '#B33C12',
              backgroundColor: '#B33C12',
              fill: false,
            },
            {
              label: 'Humidity',
              data: [],
              borderColor: '#68B3C8',
              backgroundColor: '#68B3C8',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
        },
      });
    }

  }
</script>

<style scoped>

  .span-temperature {
    color: #B33C12;
  }

  .span-humidity {
    color: #68B3C8;
  }

</style>