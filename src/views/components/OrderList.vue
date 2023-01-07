<template>
  <ul class="order-block">
    <li class="order-item" v-for="n in 10" :key="n">
      <div class="order-avatar">in</div>
      <div class="order-info">
        <div class="order-info-title">
          <span class="order-info-name">admin提交的告警工单流程</span>
          <span :class="['order-info-status', getOrderStatusClass(n % 3)]"
            >已完成</span
          >
        </div>
        <div class="order-info-date">2020-11-28 17:23:15</div>
        <div class="order-info-desc">这是工单标题这是工单标题这是</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const getOrderStatusClass = (status: number) => {
  switch (status) {
    case 1:
      return 'order-info-status-processing';
    case 2:
      return 'order-info-status-finished';
    default:
      return 'order-info-status-revoked';
  }
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
      width: 44px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background-color: #0097ff;
      color: #fff;
      border-radius: 4px;
      font-size: 17px;
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
