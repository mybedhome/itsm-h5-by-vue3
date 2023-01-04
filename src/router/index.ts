import { useRequestStore } from '@/stores/request';
import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/bes',
    },
    {
      path: '/bes',
      name: 'bes',
      redirect: { name: 'Workbench' },
      children: [
        {
          path: 'workbench',
          name: 'Workbench',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'orderManage',
          name: 'OrderManage',
          children: [
            {
              path: 'create',
              name: 'CreateOrder',
              component: () => import('@/views/orderManage/CreateOrder.vue'),
            },
            {
              path: 'detail',
              name: 'OrderDetail',
              component: () => import('@/views/orderManage/OrderDetail.vue'),
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

export default router;
