<template>
  <div>
    <h1>hlello</h1>
    <canvas id="container" class="container"></canvas>
  </div>
</template>
<script setup lang="jsx">
import { onMounted } from 'vue';
import { Canvas, Chart, Axis, Tooltip, ScrollBar, Interval } from '@antv/f2';

onMounted(() => {
  init();
});

function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );
}

const init = () => {
  fetch('https://gw.alipayobjects.com/os/antfincdn/ZpWsTPpY6%26/steps.json')
    .then((res) => res.json())
    .then((data) => {
      const context = document.getElementById('container').getContext('2d');
      const { props } = (
        <Canvas context={context} pixelRatio={window.devicePixelRatio}>
          <Chart data={data}>
            <Axis field="date" type="timeCat" tickCount={5} />
            <Axis field="steps" formatter={formatNumber} />
            <Interval x="date" y="steps" />
            <ScrollBar mode="x" range={[0.1, 0.3]} />
            <Tooltip />
          </Chart>
        </Canvas>
      );
      console.time('render');
      const chart = new Canvas(props);
      console.log('chart', chart);
      chart.render();
      console.timeEnd('render');
    });
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 300px;
}
</style>
