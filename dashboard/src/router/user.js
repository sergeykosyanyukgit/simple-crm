import Home from '../pages/Home'

import UserReferal from '../pages/Dashboards/user/UserReferal'
import UserAlerts from '../pages/Dashboards/user/UserAlerts'
import UserCourse from '../pages/Dashboards/user/UserCourse'
import UserGallery from '../pages/Dashboards/user/UserGallery'
import UserProfile from '../pages/Dashboards/user/UserProfile'
import UserReviews from '../pages/Dashboards/user/UserReviews'

const router = {
  path: '/user',
  component: Home,
  meta: { user: true },
  children: [
    {
      path: 'course',
      component: UserCourse
    },
    {
      path: 'invite',
      component: UserReferal
    },
    {
      path: 'gallery',
      component: UserGallery
    },
    {
      path: 'alerts',
      component: UserAlerts
    },
    {
      path: 'profile',
      component: UserProfile
    },
    {
      path: 'reviews',
      component: UserReviews
    }
  ]
}
/*router.beforeEach(async (to, from, next) => {
  next()
})*/
export default router