<template>
  <div class="container">
    <div class="chart-box">
      <div class="chart-title">工单统计</div>
      <div class="date-field">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts } from 'echarts/core';
import { getOrderStatistics } from '@/services/statistics';
import dayjs from 'dayjs';
import type { OrderStatisticsData } from '@/services/model/statisticsModel';

echarts.use([PieChart, CanvasRenderer, LabelLayout]);

const defaultDate = {
  startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
};
const orderParams = ref({ ...defaultDate });

const orderStatusDateText = computed(
  () => `${orderParams.value.startDate} 至 ${orderParams.value.endDate}`
);

const serviceParams = ref({ ...defaultDate });

const servicesDateText = computed(
  () => `${serviceParams.value.startDate} 至 ${serviceParams.value.endDate}`
);

const pieRef = ref<HTMLDivElement | null>(null);

let pieChart: ECharts | null = null;

const orderData = ref<OrderStatisticsData | null>(null);
const fetchData = async () => {
  orderData.value = (await getOrderStatistics(orderParams.value))[0];
};
fetchData();

const renderOrderChart = () => {
  const orderMap = {
    finishNum: '已完成',
    procNum: '处理中',
    revNum: '已撤销',
  };
  const color = ['#38c082', '#4b6eef', '#ffaa18'];
  const chartData = orderData.value as OrderStatisticsData;
  if (pieRef.value && chartData) {
    pieChart = echarts.init(pieRef.value);
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

onMounted(() => {
  watchEffect(() => {
    orderData.value && renderOrderChart();
  });
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
</style>
