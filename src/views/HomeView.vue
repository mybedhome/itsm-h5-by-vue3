<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import { http } from '@/utils/request';
import { utils } from '@/utils/';
const fetchData = async () => {
  const url = '/orders/_query?id=11&name=rose';
  const res = await http.get(url);
  console.log('res', res);
};
fetchData();
setTimeout(() => {
  fetchData();
}, 2000);
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
