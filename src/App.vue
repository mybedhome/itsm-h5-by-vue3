<script setup lang="ts">
import type { CustomRouteMeta } from './router';
</script>

<template>
  <div id="root">
    <router-view v-slot="{ Component, route }">
      <transition :name="(route.meta as CustomRouteMeta).transitionName">
        <component :is="Component" ::key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
#root {
  width: 100%;
  height: 100vh;
  background-color: #ecedee;
}
</style>
