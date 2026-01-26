import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import '@/assets/styles/typography.scss'
import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
