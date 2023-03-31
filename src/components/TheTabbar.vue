<template>
  <van-tabbar v-model="active" @change="handleChange">
    <van-tabbar-item icon="home-o">工作台</van-tabbar-item>
    <van-tabbar-item icon="chart-trending-o">统计</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouteName } from '@/router'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const active = ref(route.name === RouteName.WORKBENCH ? 0 : 1)

const handleChange = (index: number) => {
  if (index === 0) {
    router.replace({ name: RouteName.WORKBENCH })
  } else {
    router.replace({ name: RouteName.STATISTICS })
  }
}
</script>

<style scoped></style>
