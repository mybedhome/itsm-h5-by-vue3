<template>
  <div>
    <div>
      <div class="container">
        <RouterLink :to="{ name: RouteName.ORDERSDETAIL }"
          >go order detail</RouterLink
        >
        <VanButton>test{{ RouteName.ORDERSDETAIL }}</VanButton>
      </div>
      <div style="height: 40px; border: 1px solid">kkkk</div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">工作台</van-tabbar-item>
      <van-tabbar-item icon="setting-o">统计</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
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
