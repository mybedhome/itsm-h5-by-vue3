import { usePermissionsStore } from '@/stores/permissions';
import { useRequestStore } from '@/stores/request';
import { createRouter, createWebHashHistory, type RouteMeta } from 'vue-router';

// 路由名称与权限名称必须一致
export enum RouteName {
  HOME = 'home',
  BES = 'bes',
  WORKBENCH = 'itsm-workbench-orderManage',
  STATISTICS = 'statistics',
  ORDERS = 'orders',
  ORDERSADD = 'itsm-workbench-orderManage-all-create',
  ORDERSDETAIL = 'orders-detail',
  ORDERTODO = 'orders-todo',
  ORDERDRAFT = 'orders-draft',
  NOTFOUND = 'not-found',
  NOPERMISSIONS = 'no-permissions',
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
          component: () => import('@/views/index.vue'),
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
            {
              path: 'todo',
              name: RouteName.ORDERTODO,
              component: () => import('@/views/workbench/index.vue'),
              props: { isTodoRoute: true },
            },
            {
              path: 'draft',
              name: RouteName.ORDERDRAFT,
              component: () => import('@/views/workbench/index.vue'),
              props: { isDraftRoute: true },
            },
          ],
        },
      ],
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/index.vue'),
    },
    {
      path: '/no-permissions',
      name: RouteName.NOPERMISSIONS,
      component: () => import('@/views/error/NoPermissions.vue'),
    },
    {
      path: '/:pathMatch*',
      name: RouteName.NOTFOUND,
      component: () => import('@/views/error/NotFound.vue'),
    },
  ],
});

router.beforeEach((to) => {
  useRequestStore().clearPendingRequest();
  const { permissions } = usePermissionsStore();
  const name = to.name as string;

  if (
    name !== RouteName.NOPERMISSIONS &&
    name !== RouteName.NOTFOUND &&
    !permissions.includes(name)
  ) {
    return { name: RouteName.NOPERMISSIONS };
  }
});

export default router;
