import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppVue from './App.vue'
import './style.css'

const app = createApp(AppVue)

const routes = [
  { path: '/', component: () => import('./components/HelloWorld.vue')},
  { path: '/r1', component: () => import('./components/Robot1.vue')},
  { path: '/r2', component: () => import('./components/Robot2.vue')},
  { path: '/r3', component: () => import('./components/Robot3.vue')},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

app.use(router)
app.mount('#app')
