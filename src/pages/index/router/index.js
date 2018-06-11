import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

import Index from '../modules/index'
import User from '../modules/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
