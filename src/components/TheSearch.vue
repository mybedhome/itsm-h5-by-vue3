<template>
  <div class="search-box">
    <van-search
      v-model="value"
      v-bind="$attrs"
      :show-action="true"
      clear-trigger="always"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      @update:model-value="onChange"
    >
      <template #action>
        <van-button
          type="primary"
          @click="handleAction"
          size="small"
          class="action-button"
          >{{ buttonText }}</van-button
        >
      </template>
    </van-search>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(['modelValue']);
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'action', value: string): void;
}>();
const value = ref(props.modelValue);
const buttonText = ref('筛选');

const onChange = (value: string) => {
  emit('update:modelValue', value);
};
const onClear = () => console.log('cleard');
const onFocus = () => {
  console.log('on focus');
  buttonText.value = '取消';
};

const onBlur = () => {};

const handleAction = () => {
  emit('action', buttonText.value);
  if (buttonText.value === '取消') {
    buttonText.value = '筛选';
  }
};
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.search-box {
  width: 100%;
}
.action-button {
  width: 60px;
  vertical-align: middle;
}
</style>
