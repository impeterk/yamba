import { createRouter, createWebHashHistory } from 'vue-router'

import IndexRoute from './+page.vue'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'index',
        component: IndexRoute,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
