import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import '@/assets/styles/typography.scss'
import '@/assets/styles/main.scss'
import { createPinia } from 'pinia'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Vue3ColorPicker)

app.mount('#app')
