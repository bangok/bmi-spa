import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sta from './views/Sta.vue'
import Me from './views/Me.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/homepage',
      component: Home
    },
    {
      path: '/statistics',
      component: Sta
    },
    {
      path: '/me',
      component: Me
    }
  ]
})
