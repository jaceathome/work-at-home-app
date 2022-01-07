import Vue from 'vue'
import VueRouter from 'vue-router'
import middlewares from '../middlewares'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter: () => location.replace('/login')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      middlewares: [middlewares.guest]
    },
    component: () => import('../views/Login.vue')
  },

  {
    path: '/home',
    name: 'home',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Users.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/issue',
    name: 'issue',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Issue.vue')
  },
  {
    path: '/issue_view/:id',
    name: 'issue_view',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/IssueView.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile_view',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Tasks.vue')
  },
  {
    path: '/tasks/:id',
    name: 'task-view',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/TaskView.vue')
  },
  {
    path: '/viewer/:path',
    name: 'viewer',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/DocViewer.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/roles',
    name: 'roles',
    meta: {
      middlewares: [middlewares.auth, middlewares.admin]
    },
    component: () => import('../views/admin/Roles.vue')
  },
  {
    path: '/work-positions',
    name: 'work-positions',
    meta: {
      middlewares: [middlewares.auth, middlewares.admin]
    },
    component: () => import('../views/admin/WorkPositions.vue')
  },
  {
    path: '/departments',
    name: 'departments',
    meta: {
      middlewares: [middlewares.auth, middlewares.adminManager]
    },
    component: () => import('../views/Department.vue')
  },
  {
    path: '/call',
    name: 'call',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/VideoCall.vue')
  },
  {
    path: '/meeting',
    name: 'Meeting',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Meeting.vue')
  },
  /* {
    path: '/assistance',
    name: 'assistance',
    meta: {
      middlewares: [middlewares.auth]
    },
    component: () => import('../views/Assistance.vue')
  }, */
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/Welcome.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function nextCheck(context, middlewares, index) {
  const nextMiddleware = middlewares[index]

  if (!nextMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMidd = nextCheck(context, middlewares, index + 1)

    nextMiddleware({ ...context, next: nextMidd })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middlewares) {
    const middlewares = to.meta.middlewares

    const context = { to, from, next, router }

    const nextMiddleware = nextCheck(context, middlewares, 1)

    return middlewares[0]({ ...context, next: nextMiddleware })
  }

  return next()
})
export default router
