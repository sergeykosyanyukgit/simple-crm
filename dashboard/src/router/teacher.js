import Home from '../pages/Home'

import TeacherAttendance from '../pages/Dashboards/teacher/TeacherAttendance'
import TeacherPhotouploads from '../pages/Dashboards/teacher/TeacherPhotouploads'
import TeacherAlerts from '../pages/Dashboards/teacher/TeacherAlerts'
import TeacherCourses from '../pages/Dashboards/teacher/TeacherCourses'

const router = {
  path: '/teacher',
  component: Home,
  meta: { teacher: true },
  children: [
    {
      path: "attendance",
      component: TeacherAttendance
    },
    {
      path: "photouploads",
      component: TeacherPhotouploads
    },
    {
      path: "alerts",
      component: TeacherAlerts
    },
    {
      path: "сourses",
      component: TeacherCourses
    }
  ]
}
/*router.beforeEach(async (to, from, next) => {
  next()
})*/
export default router