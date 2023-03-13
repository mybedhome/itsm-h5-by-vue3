<template>
  <ul class="order-block">
    <li
      class="order-item"
      v-for="order in props.data"
      :key="order.id"
      @click="handleJump"
    >
      <div class="order-avatar">
        {{ displayAvatarText(order.createUser.userName) }}
      </div>
      <div class="order-info">
        <div class="order-info-title">
          <span class="order-info-name">{{
            `${order.createUser.userName}提交的${order.flowName}`
          }}</span>
          <span
            :class="[
              'order-info-status',
              getOrderStatusMap(order.orderStatus).className,
            ]"
            >{{ getOrderStatusMap(order.orderStatus).text }}</span
          >
        </div>
        <div class="order-info-date">{{ formatDate(order.createTime) }}</div>
        <div class="order-info-desc">{{ order.orderTitle }}</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { OrderListData } from '@/services/model/orderModel';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps<{ data: OrderListData }>();

const getOrderStatusMap = (status: number) => {
  switch (status) {
    case 1:
      return { text: '处理中', className: 'order-info-status-processing' };
    case 2:
      return { text: '已完成', className: 'order-info-status-finished' };
    default:
      return { text: '已撤销', className: 'order-info-status-revoked' };
  }
};
const formatDate = (d: number) => dayjs(d).format('YYYY-MM-DD HH:mm:ss');

const displayAvatarText = (name: string) => {
  return /^\w/.test(name) ? name.slice(0, 1) : name.slice(-2);
};

const handleJump = () => {
  router.push({ name: 'demo' });
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.order-block {
  .order-item {
    display: flex;
    margin-top: 10px;
    padding: 10px 0 10px 15px;
    background-color: #fff;

    .order-avatar {
      width: 45px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background-color: #0097ff;
      color: #fff;
      border-radius: 4px;
      font-size: 16.5px;
      font-weight: 500;
      margin-right: 13px;
    }
    .order-info {
      flex: 1;
      color: $genericTextColor;
      font-size: 12px;
      overflow: hidden;
      &-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $primaryTextColor;
        font-size: 15px;
      }
      &-name {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &-status {
        margin: 0 7px;
        font-size: 12px;
        &-processing {
          color: #ffaa18;
        }
        &-finished {
          color: $primaryColor;
        }
        &-revoked {
          color: #b9bec9;
        }
      }
      &-desc {
        width: 85%;
      }
    }
  }
}
</style>
