import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sta from './views/Sta.vue'
import Me from './views/Me.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
  	{
      path: '/',
      name:"/",
      component: Login
    },
  	{
      path: '/login',
      name:"login",
      component: Login
    },
    {
      path: '/register',
      name:"register",
      component: Register
    },
    {
      path: '/homepage',
      name:"homepage",
      component: Home
    },
    {
      path: '/statistics',
      name:"statistics",
      component: Sta
    },
    {
      path: '/me',
      name:"me",
      component: Me
    }
  ]
})
