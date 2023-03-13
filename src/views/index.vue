<template>
  <div>
    <keep-alive><component :is="activeView"></component></keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">工作台</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o">统计</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Workbench from './workbench/index.vue';
import Statistics from './statistics/index.vue';
import Cookies from 'js-cookie';
const active = ref(0);
const activeView = computed(() => {
  return active.value === 0 ? Workbench : Statistics;
});

onMounted(() => {
  Cookies.set('f#多少oo', 'bar电视剧&$#@');
  const r = Cookies.get('f#多少oo');
  console.log('test', r === decodeURI('bar电视剧&$#@'));
  console.log('cs==', Cookies.get('cs'));
  console.log('test2', r);
});
</script>
<script lang="ts">
export default { name: 'HomeView' };
</script>
<style scoped></style>
