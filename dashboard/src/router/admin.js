import Home from '../pages/Home'

import AdminAlerts from '../pages/Dashboards/admin/AdminAlerts'
import AdminGallery from '../pages/Dashboards/admin/AdminGallery'
import AdminLanding from '../pages/Dashboards/admin/AdminLanding'
import AdminTimetable from '../pages/Dashboards/admin/AdminTimetable'
import AdminTrial from '../pages/Dashboards/admin/AdminTrial'
import AdminUsers from '../pages/Dashboards/admin/AdminUsers'
import AdminFilial from '../pages/Dashboards/admin/AdminFilial'
import AdminCourses from '../pages/Dashboards/admin/AdminCourses'
import AdminMining from '../pages/Dashboards/admin/AdminMining'
import AdminStatistics from '../pages/Dashboards/admin/AdminStatistics'

const router = {
  path: '/admin',
  component: Home,
  meta: { admin: true },
  children: [
    {
      path: 'alerts',
      component: AdminAlerts
    },
    {
      path: 'gallery',
      component: AdminGallery
    },
    {
      path: 'landing',
      component: AdminLanding
    },
    {
      path: 'timetable',
      component: AdminTimetable
    },
    {
      path: 'courses',
      component: AdminCourses
    },
    {
      path: 'trial',
      component: AdminTrial
    },
    {
      path: 'users',
      component: AdminUsers
    },
    {
      path: 'filial',
      component: AdminFilial
    },
    {
      path: 'mining',
      component: AdminMining
    }/*,
    {
      path: 'statistics',
      component: AdminStatistics
    }*/
  ]
}
export default router