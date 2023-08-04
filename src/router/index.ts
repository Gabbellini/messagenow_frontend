import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/rooms/:roomID?',
    name: 'rooms',
    props: true,
    component: () => import('../views/HomeView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
