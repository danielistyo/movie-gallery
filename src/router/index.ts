import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '../views/List';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'List',
    component: List,
  },
  {
    path: '/movie/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
