<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';

import { utils } from '@/utils/';
import { getOrders } from '@/services/orders';
import { useRequest } from '@/composables/useRequest';
import { ref, reactive } from 'vue';
const id = ref(1);
const payload = ref({
  id: id.value,
  name: 'rose',
});
const user = reactive({
  id: 2,
  nickName: 'jack',
});
const setId = () => {
  id.value = parseInt((Math.random() * 1000).toString(), 10);
  payload.value.id = id.value;
  user.id = id.value;
  // payload.value = { ...payload.value, id: id.value };
};
console.log('id', id);
const { data, isLoading, error } = useRequest(getOrders, user, {
  refetch: true,
});

console.log('error', error);
</script>

<template>
  <div v-if="isLoading">is loading...</div>
  <div v-if="error">接口错误: {{ error.message }}</div>
  <main v-else>
    <h3>id: {{ id }}</h3>
    <h3>data: {{ data }}</h3>
    <button @click="setId">更新id</button>
    <!-- <TheWelcome /> -->
  </main>
</template>
