import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import api from './services/api'
import router from './router'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.config.globalProperties.$axios = { ...api }

app.use(router).use(createPinia()).use(vuetify).mount('#app')
