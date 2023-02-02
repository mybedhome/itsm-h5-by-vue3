<template>
  <div id="main"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  type TooltipComponentOption,
  GridComponent,
  type GridComponentOption,
  DataZoomComponent,
  type DataZoomComponentOption,
} from 'echarts/components';
import { BarChart, type BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

const props = defineProps(['data']);

echarts.use([
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
  | BarSeriesOption
>;

onMounted(() => {
  setTimeout(() => {
    init();
  }, 1000);
});

const init = () => {
  const chartDom = document.getElementById('main')!;
  const myChart = echarts.init(chartDom);
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: [
      {
        height: '75%',
        bottom: '20%',
        left: '5%',
        containLabel: true,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
      },
    ],
    xAxis: {
      data: props.data.map((item: any) => item.date),
      silent: false,
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        type: 'bar',
        data: props.data.map((item: any) => item.steps),
        // Set `large` for large data amount
        large: true,
      },
    ],
  };
  const start = Date.now();
  myChart.on('finished', () => {
    console.log('finsihed', Date.now() - start);
    myChart.off('finished');
  });

  myChart.setOption(option);
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>
