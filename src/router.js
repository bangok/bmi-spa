import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
  	{
      path: '/',
      name:"/",
      component: (resolve) => require(['./views/Home.vue'],resolve)
    },
  	{
      path: '/login',
      name:"login",
      component: (resolve) => require(['./views/Login.vue'],resolve)
    },
    {
      path: '/register',
      name:"register",
      component: (resolve) => require(['./views/Register.vue'],resolve)
    },
    {
      path: '/homepage',
      name:"homepage",
      component: (resolve) => require(['./views/Home.vue'],resolve)
    },
    {
      path: '/statistics',
      name:"statistics",
      component: (resolve) => require(['./views/Sta.vue'],resolve)
    },
    {
      path: '/me',
      name:"me",
      component: (resolve) => require(['./views/Me.vue'],resolve)
    }
  ]
})
