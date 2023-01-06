<script setup lang="ts">
import { themeVars } from './constants/theme-vars';
import type { CustomRouteMeta } from './router';
</script>

<template>
  <div id="root">
    <van-config-provider :theme-vars="themeVars">
      <router-view v-slot="{ Component, route }">
        <transition :name="(route.meta as CustomRouteMeta).transitionName">
          <component :is="Component" :key="$route.path" />
        </transition>
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
