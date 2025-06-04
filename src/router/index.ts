import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'haoziLayoutColumn',
      component: () => import('@/layout/column/index.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: '/system/user',
          name: 'user',
          component: () => import('@/views/system/user/index.vue'),
        },
        {
          path: '/system/role',
          name: 'role',
          component: () => import('@/views/system/role/index.vue'),
        },
        {
          path: '/system/dict',
          name: 'dict',
          component: () => import('@/views/system/dict/index.vue'),
        },
        {
          path: '/system/department',
          name: 'department',
          component: () => import('@/views/system/department/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})

export default router
