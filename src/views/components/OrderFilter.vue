<template>
  <div>
    <van-action-sheet v-model:show="isShow" title="筛选">
      <div class="content">
        <van-form>
          <div class="form-item">
            <div class="label">服务</div>
            <van-field
              v-model="service"
              is-link
              readonly
              placeholder="点击选择服务"
              :right-icon="service ? 'close' : ''"
              @click="showPicker = true"
              @click-right-icon.stop="service = ''"
            />
          </div>
          <div class="form-item">
            <div class="label">状态</div>
            <van-field
              v-model="status"
              is-link
              readonly
              placeholder="点击选择状态"
              :right-icon="status ? 'close' : ''"
              @click="showPicker = true"
              @click-right-icon.stop="status = 0"
            />
          </div>
          <div class="form-item">
            <div class="label">发起人</div>
            <van-field
              v-model="creator"
              is-link
              readonly
              placeholder="点击选择发起人"
              :right-icon="creator ? 'close' : ''"
              @click="showPicker = true"
              @click-right-icon.stop="creator = ''"
            />
          </div>
          <div class="form-item">
            <div class="label">发起时间</div>
            <van-field
              v-model="createTime"
              is-link
              readonly
              placeholder="点击选择发起时间"
              :right-icon="createTime ? 'close' : ''"
              @click="showCalendar = true"
              @click-right-icon.stop="handleClearField"
            />
          </div>
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue';
import type { PickerConfirmEventParams, PickerOption } from 'vant';
const props = defineProps(['show']);
const emit = defineEmits(['update:show']);
const isShow = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit('update:show', value);
  },
});

const service = ref('');
const status = ref(1);
const creator = ref('');
const createTime = ref('');

const showCalendar = ref(false);
const showPicker = ref(false);
const columns: PickerOption[] = [
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
];
const onConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
  service.value = selectedOptions ? (selectedOptions[0]?.text as string) : '';
  showPicker.value = false;
};

const handleClearField = (event: MouseEvent) => {
  event.stopPropagation();
  service.value = '';
};
</script>

<style scoped lang="scss">
.content {
  min-height: 450px;
}
.form-item {
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: var(--van-padding-md);
    bottom: 0;
    left: var(--van-padding-md);
    border-bottom: 1px solid var(--van-cell-border-color);
    transform: scaleY(0.5);
  }
}
.label {
  padding-left: var(--van-cell-horizontal-padding);
  padding-top: var(--van-cell-vertical-padding);
}
</style>
