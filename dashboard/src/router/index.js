import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import userRouter from './user'
import adminRouter from './admin'
import teacherRouter from './teacher'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
      meta: { login: true }
    },
    userRouter,
    adminRouter,
    teacherRouter
  ],
  linkExactActiveClass: 'nav-item active'
})
/*
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
      meta: { login: true }
    },
    {
      path: '/dashboard',
      component: Home,
      children: [
        {
          path: '/user',
          meta: { user: true },
          children: [
            {
              path: "/course",
              component: UserCourse
            },
            {
              path: "/userinvite",
              component: UserReferal
            },
            {
              path: "/usergallery",
              component: UserGallery
            },
            {
              path: "/useralerts",
              component: UserAlerts
            },
            {
              path: "/userprofile",
              component: UserProfile
            },
            {
              path: "/userreviews",
              component: UserReviews
            }
          ]
        },
        {
          path: '/teacher',
          meta: { teacher: true },
          children: [
            {
              path: "/attendance",
              component: TeacherAttendance
            },
            {
              path: "/photouploads",
              component: TeacherPhotouploads
            },
            {
              path: "/alerts",
              component: TeacherAlerts
            },
            {
              path: "/сourses",
              component: TeacherCourses
            }
          ]
        },
        {
          path: '/admin',
          meta: { admin: true },
          children: [
            {
              path: "/alerts",
              component: AdminAlerts
            },
            {
              path: "/gallery",
              component: AdminGallery
            },
            {
              path: "/landing",
              component: AdminLanding
            },
            {
              path: "/timetable",
              component: AdminTimetable
            },
            {
              path: "/courses",
              component: AdminCourses
            },
            {
              path: "/trial",
              component: AdminTrial
            },
            {
              path: "/users",
              component: AdminUsers
            },
            {
              path: "/filial",
              component: AdminFilial
            },
            {
              path: "/mining",
              component: AdminMining
            },
            {
              path: "/statistics",
              component: AdminStatistics
            }
          ]
        }
      ]
    }/*,
    {
      path: '/login',
      component: Login,
      meta: { login: true }
    }*/
  /*],
  linkExactActiveClass: "nav-item active"
})*/

/*store.watch(() => {
    //console.log('isUser ' + !!store.getters.isUser)
    //console.log('isTeacher ' + !!store.getters.isTeacher)
    //console.log('isAdmin ' + !!store.getters.isAdmin)
})*/
//guard clause
/*let isAuthCheck = false
router.beforeEach(async (to, from, next) => {
  next()
})*/
/*router.beforeEach(async (to, from, next) => {
  //console.log(localStorage.getItem('user-token'))
  console.log('beforeEach')
  if(localStorage.getItem('user-token') == undefined) localStorage.setItem('user-token', null)
  try {
    if (!store.getters.isAuthenticated && !to.matched.some(record => record.meta.landing)) {
      // Если мы не авторизированы идем авторизироваться
      console.log('login#1')
      let token = localStorage.getItem('user-token')
      if (token != 'null') {
        console.log('YES token! ', token)
        store.dispatch('authUser', {token: token})
        return
      } else  {
        //next()
        //next('/#/')
        console.log('NO token! ', token)
      }
      if(!to.matched.some(record => record.meta.login))
      {
        console.log('login#2')
        next('/#/')
      } else {
        console.log('login#3')
        next()
      }
    } else if (to.matched.some(record => record.meta.landing)) {
      console.log('landing')
      next()
    } else {
      if (store.getters.isUser && (to.matched.some(record => record.meta.admin) || to.matched.some(record => record.meta.teacher)))
      {
        console.log('isUser')
        next('usercourse')
      } else if (store.getters.isTeacher && (to.matched.some(record => record.meta.admin) || to.matched.some(record => record.meta.user))) {
        console.log('isTeacher')
        next('teacherattendance')
      } else if (store.getters.isAdmin && (to.matched.some(record => record.meta.teacher) || to.matched.some(record => record.meta.user))) {
        console.log('isAdmin')
        next('admintimetable')
      } else {
        console.log('next')
      }
        next()
      console.log('isUser ' + !!store.getters.isUser)
      console.log('isTeacher ' + !!store.getters.isTeacher)
      console.log('isAdmin ' + !!store.getters.isAdmin)
      }
    } catch (err) {
      throw new Error(`Problem handling something: ${err}.`);    
  }
})*/
/*import userRouter from './user'
export default userRouter*/
export default router