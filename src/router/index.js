import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addprojects',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddProjectsView.vue')
    },
    {
    path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/navguard',
      name: 'navguard',
      component: () => import('../views/NavGuardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/projectdetailview/:id',
      name: 'projectdetailview',
      component: () => import('../views/ProjectDetailView.vue')
    }
  ]
})


router.beforeEach(async(to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    }
    else {
      next({ path: '/login' })
    }
  }
  else {
    next()
  }
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    console.log("test currentUser", getCurrentUser)
    const removeListener = onAuthStateChanged(
      getAuth(),
      user => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}



export default router
