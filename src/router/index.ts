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
      ],
    },
  ],
});

router.beforeEach(() => {
  const { clearPendingRequest } = useRequestStore();
  clearPendingRequest();
});

export default router;
