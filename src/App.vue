<script setup lang="ts">
import { themeVars } from './constants/theme-vars'
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.path" />
    </router-view>
  </van-config-provider>
</template>

<style scoped></style>
