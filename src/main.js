import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/reset.css'
import '@/assets/icon/iconfont.css'
import '@/components'

const app = createApp(App)
app.use(ElementPlus)

app.use(store).use(router).mount('#app')
