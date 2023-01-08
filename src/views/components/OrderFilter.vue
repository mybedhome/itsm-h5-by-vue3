<template>
  <div>
    <van-action-sheet v-model:show="isShow" title="筛选">
      <div class="content">
        <van-form>
          <div class="form-item" v-for="col in columns" :key="col.key">
            <div class="label">{{ col.label }}</div>
            <van-field
              v-model="model[col.key as OrderFilterKey]"
              is-link
              readonly
              :placeholder="`点击选择${col.label}`"
              :right-icon="model[col.key as OrderFilterKey] && col.key != OrderFilterKey.CREATE_TIME ? 'close' : ''"
              @click="onFieldClick(col.key, col.data, col.label)"
              @click-right-icon.stop="onFieldClear(col.key, col.label)"
            />
          </div>
          <!-- <div class="form-item">
            <div class="label">状态</div>
            <van-field
              v-model="status"
              is-link
              readonly
              placeholder="点击选择状态"
              :right-icon="status ? 'close' : ''"
              @click="onFieldClick('status')"
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
              @click="onFieldClick('creator')"
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
              @click="onFieldClick('createTime')"
              @click-right-icon.stop="handleClearField"
            />
          </div> -->
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="pickerData"
              :columns-field-names="customFieldName"
              :title="activeLabel"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-calendar
            v-model:show="showCalendar"
            @confirm="onConfirmDate"
            :default-date="defaultDate"
            :min-date="minDate"
            type="range"
          />
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { PickerConfirmEventParams, PickerOption } from 'vant';
import { OrderFilterKey, type Column } from '@/types/common';
import { utils } from '@/utils';
import dayjs from 'dayjs';
type SelectFilterItem = {
  label: string;
  name: string;
  value: string | Date[];
};

const props = defineProps<{
  show: boolean;
  columns: Column[];
}>();

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
const status = ref('');
const creator = ref('');
const createTime = ref('');
const defaultDate = ref([dayjs().subtract(1, 'month').toDate(), new Date()]);
const minDate = dayjs().subtract(2, 'year').toDate();
const model = ref({
  service: '',
  status: '',
  creator: '',
  createTime: '',
});

type modelKey = keyof typeof model.value;

const activeKey = ref<modelKey>('' as modelKey);
const activeLabel = ref('');

// 确认选中的过滤条件
const selected = ref<SelectFilterItem[]>([]);

const customFieldName = computed(() => {
  switch (activeKey.value) {
    case OrderFilterKey.SERVICE:
      return { text: 'serviceName', value: 'serviceId' };
    case OrderFilterKey.CREATOR:
      return { text: 'firstName', value: 'id' };
    default:
      return { text: 'text', value: 'value' };
  }
});
const pickerData = ref([]);

const showCalendar = ref(false);
const showPicker = ref(false);

const onFieldClick = (field: modelKey, data: any, label: string) => {
  activeKey.value = field;
  activeLabel.value = label;
  if (field === OrderFilterKey.CREATE_TIME) {
    showCalendar.value = true;
  } else {
    pickerData.value = data;
    showPicker.value = true;
  }
};

const findIndex = (label: string) => {
  return selected.value.findIndex((item) => item.label === label);
};

const onConfirm = (params: PickerConfirmEventParams) => {
  const selectedOptions = params.selectedOptions as Array<
    Record<string, string>
  >;

  const text = customFieldName.value.text;
  const id = customFieldName.value.value;
  const name = selectedOptions[0][text] as modelKey;
  const value = selectedOptions[0][id];

  model.value[activeKey.value] = name;

  const index = findIndex(activeLabel.value);
  const item = { name, value, label: activeLabel.value };
  if (index === -1) {
    selected.value.push(item);
  } else {
    selected.value.splice(index, 1, item);
  }

  showPicker.value = false;
};

const onConfirmDate = ([beigin, end]: Date[]) => {
  const mode = 'YYYY/MM/DD';
  model.value.createTime = `${dayjs(beigin).format(mode)} - ${dayjs(end).format(
    mode
  )}`;
  const index = findIndex(activeLabel.value);
  const item = {
    name: model.value.createTime,
    value: [beigin.getTime(), end.getTime()],
    label: activeLabel.value,
  };
  if (index === -1) {
    selected.value.push(item);
  } else {
    selected.value.splice(index, 1, item);
  }
  showCalendar.value = false;
};

const onFieldClear = (key: modelKey, label: string) => {
  model.value[key] = '';
  const index = findIndex(label);
  selected.value.splice(index, 1);
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
