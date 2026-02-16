import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('./+page.vue'),
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // which is lazy-loaded when the route is visited.
        component: () => import('./about/+page.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
