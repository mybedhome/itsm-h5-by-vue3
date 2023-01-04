const orderManageRoutes = {
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
};

export default orderManageRoutes;
