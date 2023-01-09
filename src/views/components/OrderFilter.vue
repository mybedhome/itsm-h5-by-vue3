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
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="pickerColumns"
              :columns-field-names="customFieldName"
              :title="activeLabel"
              v-model="pickerSelected"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              v-if="showPicker"
            />
          </van-popup>
          <van-calendar
            v-model:show="showCalendar"
            @confirm="onConfirmDate"
            :default-date="defaultDate"
            :min-date="minDate"
            title="选择时间"
            type="range"
          />
        </van-form>
        <div class="footer-button">
          <van-button @click="resetForm" class="action-button">重置</van-button>
          <van-button @click="submitForm" type="primary" class="action-button"
            >确定</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { PickerConfirmEventParams } from 'vant';
import { OrderFilterKey, type Column } from '@/types/common';
import dayjs from 'dayjs';
type SelectFilterItemValue = string | Date[] | number[];
type SelectFilterItem = {
  label: string;
  name: string;
  value: SelectFilterItemValue;
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

const createTimeColumn = computed(() =>
  props.columns.find((col) => col.key === OrderFilterKey.CREATE_TIME)
);

const initDefaultDate = () => [
  dayjs().subtract(1, 'month').toDate(),
  new Date(),
];
const defaultDate = ref(initDefaultDate());
const minDate = dayjs().subtract(2, 'year').toDate();

const formatDate = ([start, end]: Date[]) => {
  const mode = 'YYYY/MM/DD';
  return `${dayjs(start).format(mode)} - ${dayjs(end).format(mode)}`;
};

const initModelValue = {
  service: '',
  status: '',
  creator: '',
  createTime: formatDate(defaultDate.value),
};
const model = ref({ ...initModelValue });

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

const pickerColumns = ref([]);
const pickerSelected = ref<any[]>([]);
const showCalendar = ref(false);
const showPicker = ref(false);

watch(activeLabel, () => {
  const activeItem = selected.value.find(
    (item) => item.label === activeLabel.value
  );

  if (activeItem) {
    pickerSelected.value[0] = activeItem.value;
  }
});

const onFieldClick = (field: modelKey, data: any, label: string) => {
  activeKey.value = field;
  activeLabel.value = label;
  if (field === OrderFilterKey.CREATE_TIME) {
    showCalendar.value = true;
  } else {
    pickerColumns.value = data;
    showPicker.value = true;
  }
};

const onFieldClear = (key: modelKey, label: string) => {
  model.value[key] = '';
  pickerSelected.value = [];
  const index = findIndex(label);
  selected.value.splice(index, 1);
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

const onConfirmDate = ([start, end]: Date[]) => {
  model.value.createTime = formatDate([start, end]);
  const index = findIndex(activeLabel.value);
  const item = {
    name: model.value.createTime,
    value: [start.getTime(), end.getTime()],
    label: activeLabel.value,
  };
  if (index === -1) {
    selected.value.push(item);
  } else {
    selected.value.splice(index, 1, item);
  }
  showCalendar.value = false;
};

const resetForm = () => {
  model.value = { ...initModelValue };
  pickerSelected.value = [];
  defaultDate.value = initDefaultDate();
  selected.value = [
    {
      name: model.value.createTime,
      label: createTimeColumn.value?.label as string,
      value: [defaultDate.value[0].getTime(), defaultDate.value[1].getTime()],
    },
  ];
};

const submitForm = () => {
  isShow.value = false;
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.content {
  position: relative;
  min-height: calc(90vh - var(--van-action-sheet-header-height));
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
.footer-button {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 11px;
  border-top: 1px solid var(--van-cell-border-color);
  .action-button {
    flex: 1;
    margin: 0 6px;
  }
  .action-button:first-child {
    color: $secondaryTextColor;
  }
}
</style>
