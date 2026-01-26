import PieChart from '@/views/pie-chart.vue'
import ProgressPage from '@/views/progress-page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Progress', component: ProgressPage },
  { path: '/pie-chart', name: 'PieChart', component: PieChart }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
