import { createRouter, createWebHistory } from 'vue-router'
import WaterSource from '../views/WaterSource.vue'
import Food from '../views/Food.vue'
import Air from '../views/Air.vue'
import DailyItems from '../views/DailyItems.vue'
import Clothing from '../views/Clothing.vue'
import LivingArea from '../views/LivingArea.vue'
import Diet from '../views/Diet.vue'
import Result from '../views/Result.vue'

const routes = [
  {
    path: '/',
    redirect: '/water-source'
  },
  {
    path: '/water-source',
    name: 'WaterSource',
    component: WaterSource
  },
  {
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/air',
    name: 'Air',
    component: Air
  },
  {
    path: '/daily-items',
    name: 'DailyItems',
    component: DailyItems
  },
  {
    path: '/clothing',
    name: 'Clothing',
    component: Clothing
  },
  {
    path: '/living-area',
    name: 'LivingArea',
    component: LivingArea
  },
  {
    path: '/diet',
    name: 'Diet',
    component: Diet
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 