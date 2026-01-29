import { createApp } from 'vue'
import App from './App.vue'
import clickOutside from './plugins/outsideClick.js'
import router from './router/index.js'
import store from './store'

const app = createApp(App)

app.directive('click-outside', clickOutside)
app.use(router)
app.use(store)
app.mount('#app')

