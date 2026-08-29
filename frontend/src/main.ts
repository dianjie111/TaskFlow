import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import '../public/style.css'

let app=createApp(App)
app.use(router)
app.mount('#app')
