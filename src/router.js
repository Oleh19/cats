import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import Facts from './views/Facts.vue'
import Fact from './views/Fact.vue'
import { isAuthenticated } from './utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/facts',
    name: 'Facts',
    component: Facts,
  },
  {
    path: '/fact/:id',
    name: 'Fact',
    component: Fact,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

router.beforeEach((to, from, next) => {
  const authRequired = to.path === '/facts' || to.path.startsWith('/fact/')
  const userIsAuthenticated = isAuthenticated()

  if (authRequired && !userIsAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && userIsAuthenticated) {
    next('/facts')
  } else {
    next()
  }
})

export default router
