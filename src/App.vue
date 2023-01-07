<script setup lang="ts">
import { themeVars } from './constants/theme-vars';
</script>

<template>
  <div id="root">
    <van-config-provider :theme-vars="themeVars">
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.path" />
      </router-view>
    </van-config-provider>
  </div>
</template>

<style scoped>
#root {
  width: 100%;
  height: 100vh;
  background-color: #ecedee;
}
</style>
