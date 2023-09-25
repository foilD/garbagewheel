import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import virtualList from '../views/virtualList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home/'
  },
  {
    path: '/home/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: 'component/vitural-list',
        name: 'virtual-list',
        component: virtualList
      },
      {
        path: 'component/virtual-tree',
        name:'virtual-tree',
        component:()=>import('../views/virtualTree.vue')
      }
    ]
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
