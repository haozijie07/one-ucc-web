import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VxeUIAll from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/theme/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)
app.use(VxeUITable)
app.use(VxeUIAll)

app.mount('#app')
