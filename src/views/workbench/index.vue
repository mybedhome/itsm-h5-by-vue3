<template>
  <div>
    <div>
      <div class="container">
        <RouterLink :to="{ name: RouteName.ORDERSDETAIL }"
          >go order detail</RouterLink
        >
      </div>
      <div style="height: 40px; border: 1px solid">kkkk</div>
    </div>
    <TheTabbar />
  </div>
</template>

<script setup lang="ts">
// import TheTabbar from '@/components/TheTabbar.vue';
import { RouteName } from '@/router/index';
import { ref } from 'vue';
const active = ref(0);
</script>
<script lang="ts">
export default { name: 'WorkbenchView' };
</script>
<style scoped>
.container {
  height: 800px;
  background-color: orange;
}
</style>
