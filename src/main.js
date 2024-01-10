import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import api from './services/api'


const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.config.globalProperties.$axios = { ...api }

app.use(vuetify).mount('#app')
