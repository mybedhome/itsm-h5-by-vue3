<template>
  <van-tabbar v-model="active" @change="handleChange">
    <van-tabbar-item icon="home-o">工作台</van-tabbar-item>
    <van-tabbar-item icon="setting-o">统计</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const active = ref(0);
const router = useRouter();
const handleChange = (index: number) => {
  if (index === 0) {
    router.replace({ name: RouteName.WORKBENCH });
  } else {
    router.replace({ name: RouteName.STATISTICS });
  }
};
</script>

<style scoped></style>
