import PieChart from '@/views/pie-chart.vue'
import ProgressPage from '@/views/progress-page.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Progress', component: ProgressPage },
  { path: '/pie-chart', name: 'PieChart', component: PieChart },
]
const router = createRouter({
  history: createWebHashHistory(), 
  routes,
})

export default router
