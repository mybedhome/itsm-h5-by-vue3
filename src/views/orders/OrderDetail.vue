<template>
  <div>
    <h1>Order Detail</h1>
    <VanButton>
      <RouterLink :to="{ name: RouteName.HOME }">go home</RouterLink>
    </VanButton>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
</script>
