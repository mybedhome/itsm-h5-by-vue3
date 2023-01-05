import { useRequestStore } from '@/stores/request';
import { createRouter, createWebHashHistory, type RouteMeta } from 'vue-router';

export enum RouteName {
  HOME = 'home',
  BES = 'bes',
  WORKBENCH = 'workbentch',
  STATISTICS = 'statistics',
  ORDERS = 'orders',
  ORDERSADD = 'orders-add',
  ORDERSDETAIL = 'orders-detail',
}
export type CustomRouteMeta = RouteMeta & {
  transitionName: string;
};
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.HOME,
      redirect: '/bes',
    },
    {
      path: '/bes',
      name: RouteName.BES,
      redirect: { name: RouteName.WORKBENCH },
      children: [
        {
          path: 'workbench',
          name: RouteName.WORKBENCH,
          component: () => import('@/views/workbench/index.vue'),
        },
        {
          path: 'statistics',
          name: RouteName.STATISTICS,
          component: () => import('@/views/statistics/index.vue'),
        },
        {
          path: 'orders',
          name: RouteName.ORDERS,
          children: [
            {
              path: 'add',
              name: RouteName.ORDERSADD,
              component: () => import('@/views/orders/OrderAdd.vue'),
            },
            {
              path: 'detail',
              name: RouteName.ORDERSDETAIL,
              component: () => import('@/views/orders/OrderDetail.vue'),
            },
          ],
        },
      ],
    },
  ],
});

// 路由跳转前取消所有未完成的请求
router.beforeEach(() => {
  const { clearPendingRequest } = useRequestStore();
  clearPendingRequest();
});

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  to.meta.transitionName =
    toDepth < fromDepth ? 'van-slide-right' : 'van-slide-left';
});

export default router;
