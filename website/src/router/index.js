import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/powder',
    name: 'PowderCalculator',
    // route level code-splitting
    // this generates a separate chunk (powder.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "powder" */ '../views/PowderCalculator.vue')
  },
  {
    path: '/mantra',
    name: 'MantraCalculator',
    component: () => import(/* webpackChunkName: "mantra" */ '../views/MantraCalculator.vue')
  },
  {
    path: '/stats',
    name: 'StatsCalculator',
    component: () => import(/* webpackChunkName: "stats" */ '../views/StatsCalculator.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
