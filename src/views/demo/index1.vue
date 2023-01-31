<template>
  <div>
    <Canvas :pixelRatio="pixelRatio">
      <Chart :data="f2Data">
        <Axis field="date" type="timeCat" tickCount="{5}" />
        <Axis field="steps" :formatter="formatNumber" />
        <Interval x="date" y="steps" />
        <ScrollBar mode="x" range="{[0.1," 0.3]} />
        <Tooltip />
      </Chart>
    </Canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import Canvas from '@antv/f2-vue';
/** @jsx jsx */
import {
  jsx,
  Chart,
  // Canvas,
  Line,
  Point,
  Axis,
  Tooltip,
  ScrollBar,
  Interval,
} from '@antv/f2';

onMounted(() => {
  init();
});

const f2chartRef = ref();

const f2Data = ref([]);
const pixelRatio = ref(window.devicePixelRatio);

function formatNumber(n: number) {
  return String(Math.floor(n * 100) / 100).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );
}

const init = () => {
  const context = f2chartRef.value.getContext('2d');

  fetch('https://gw.alipayobjects.com/os/antfincdn/ZpWsTPpY6%26/steps.json')
    .then((res) => res.json())
    .then((data) => {
      f2Data.value = toRaw(data);
    });
};
</script>

<style scoped></style>
