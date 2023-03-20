<template>
  <div class="container">
    <div>
      <div class="chart-title">工单状态</div>
      <div class="date-field" @click="handleShowCalendar('order')">
        <van-field
          v-model="orderStatusDateText"
          :readonly="true"
          left-icon="calendar-o"
        />
      </div>
      <div>
        <div ref="pieRef" class="pie-ref"></div>
      </div>
    </div>

    <div class="service-chart">
      <div class="chart-title">各服务工单数目<span>TOP5</span></div>
      <div class="date-field" @click="handleShowCalendar('service')">
        <van-field
          v-model="servicesDateText"
          :readonly="true"
          left-icon="calendar-o"
        />
      </div>
      <div ref="barRef" class="bar-ref"></div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      @confirm="onConfirmDate"
      :default-date="defaultDate"
      :min-date="minDate"
      title="选择时间"
      type="range"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, watch, reactive } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart, BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts } from 'echarts/core';
import {
  getOrderStatistics,
  getServiceStatistics,
} from '@/services/statistics';
import dayjs from 'dayjs';
import type {
  OrderStatisticsData,
  ServiceStatisticsData,
} from '@/services/model/statisticsModel';

echarts.use([PieChart, BarChart, CanvasRenderer, LabelLayout, GridComponent]);

let defaultDate = reactive([
  dayjs().subtract(1, 'month').toDate(),
  dayjs().toDate(),
]);
const minDate = dayjs().subtract(2, 'year').toDate();
const showCalendar = ref(false);
const calendarTarget = ref('');
const onConfirmDate = (dates: Date[]) => {
  showCalendar.value = false;
  if (calendarTarget.value === 'order') {
    orderSelectedDate.value = dates;
    fetchOrderData();
  } else {
    serviceSelectedDate.value = dates;
    fetchServiceData();
  }
};

const handleShowCalendar = (type: string) => {
  showCalendar.value = true;
  calendarTarget.value = type;
};

const orderSelectedDate = ref([...defaultDate]);
const serviceSelectedDate = ref([...defaultDate]);

const orderParams = computed(() => {
  const v = orderSelectedDate.value;
  return {
    startDate: dayjs(v[0]).format('YYYY-MM-DD'),
    endDate: dayjs(v[1]).format('YYYY-MM-DD'),
  };
});

const serviceParams = computed(() => {
  const v = serviceSelectedDate.value;
  return {
    startDate: dayjs(v[0]).format('YYYY-MM-DD'),
    endDate: dayjs(v[1]).format('YYYY-MM-DD'),
  };
});

const orderStatusDateText = computed(
  () => `${orderParams.value.startDate} 至 ${orderParams.value.endDate}`
);

const servicesDateText = computed(
  () => `${serviceParams.value.startDate} 至 ${serviceParams.value.endDate}`
);

watch(calendarTarget, () => {
  if (calendarTarget.value === 'order') {
    defaultDate = orderSelectedDate.value;
  } else {
    defaultDate = serviceSelectedDate.value;
  }
});

const pieRef = ref<HTMLDivElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);
let pieChart: ECharts | null = null;
let barChart: ECharts | null = null;

const orderData = ref<OrderStatisticsData | null>(null);
const serviceData = ref<ServiceStatisticsData>();
const fetchOrderData = async () => {
  orderData.value = (await getOrderStatistics(orderParams.value)).data[0];
  renderOrderChart();
};
const fetchServiceData = async () => {
  serviceData.value = (await getServiceStatistics(serviceParams.value)).data;
  renderServiceChart();
};

const renderOrderChart = () => {
  const orderMap = {
    finishNum: '已完成',
    procNum: '处理中',
    revNum: '已撤销',
  };
  const color = ['#38c082', '#4b6eef', '#ffaa18'];
  const chartData = orderData.value as OrderStatisticsData;
  if (pieRef.value) {
    if (!pieChart) {
      pieChart = echarts.init(pieRef.value);
    }
    const option = {
      series: [
        {
          name: '工单状态统计',
          type: 'pie',
          radius: ['30%', '70%'],
          color,
          data: Object.keys(chartData).map((v: string) => ({
            value: chartData[v as keyof OrderStatisticsData],
            name: orderMap[v as keyof OrderStatisticsData],
            label: {
              formatter: `{${v}|{b} {c} \n({d}%)}`,
              rich: {
                finishNum: { color: color[0] },
                procNum: { color: color[1] },
                revNum: { color: color[2] },
              },
            },
          })),
        },
      ],
    };
    pieChart.setOption(option);
  }
};

const renderServiceChart = () => {
  const chartData = serviceData.value as ServiceStatisticsData;

  if (barRef.value) {
    if (!barChart) {
      barChart = echarts.init(barRef.value);
    }

    const option: echarts.EChartsCoreOption = {
      xAxis: [
        {
          type: 'category',
          data: chartData.map((item) => item.NAME_),
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
            width: 90,
            overflow: 'truncate',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      grid: [
        {
          height: '95%',
          bottom: '0%',
          containLabel: true,
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '50%',
          data: chartData.map((item) => item.NUM_),
        },
      ],
    };
    barChart.setOption(option);
  }
};

onMounted(() => {
  fetchOrderData();
  fetchServiceData();
  // watchEffect(() => {
  //   orderData.value && renderOrderChart();
  //   serviceData.value && renderServiceChart();
  // });
});
</script>
<script lang="ts">
export default { name: 'StatisticsView' };
</script>
<style scoped lang="scss">
@import '@/styles/variables.scss';
.container {
  height: calc(100vh - 50px);
  background-color: #fff;
  overflow: auto;
  .van-cell {
    padding: 5px 10px;
  }
  .van-field {
    background-color: #eee;
    border-radius: 4px;
    // height: 35px;
  }
}
.chart-title {
  height: 50px;
  line-height: 50px;
  margin: 0 7px;
  text-indent: 8px;
  border-bottom: 1px solid var(--app-border-bottom-color);
}
.date-field {
  margin: 10px;
}
.pie-ref {
  width: 100%;
  height: 200px;
}
.service-chart {
  .bar-ref {
    height: 200px;
  }
}
</style>
