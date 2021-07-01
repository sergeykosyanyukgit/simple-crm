import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/api/user'

import helpers from './modules/helpers'
// Admin API
import statistic from './modules/admin_api/statistic'
import users from './modules/admin_api/users'
import courses from './modules/admin_api/courses'
import timetables from './modules/admin_api/timetables'
import filials from './modules/admin_api/filials'
import childs from './modules/admin_api/childs'
import gallery from './modules/admin_api/gallery'
import trial from './modules/admin_api/trial'
import alerts from './modules/admin_api/alerts'
import themedashboard from './modules/admin_api/themedashboard'

// User API
import userEdit from './modules/user_api/userEdit'
import userReviews from './modules/user_api/userReviews'
import userAlerts from './modules/user_api/userAlerts'
import userPhoto from './modules/user_api/userPhoto'
import userReferal from './modules/user_api/userReferal'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

Vue.config.errorHandler = (err, vm, info) => {
  if (process.env.NODE_ENV !== 'production') {
    // Show any error but this one
    if (err.message !== "Cannot read property 'badInput' of undefined") {
      console.error(err);
    }
  }
}

export default new Vuex.Store({
  modules: {
    statistic,
    users,
    courses,
    timetables,
    filials,
    childs,
    user,
    helpers,
    gallery,
    trial,
    alerts,
    themedashboard,
    userEdit,
    userReviews,
    userAlerts,
    userPhoto,
    userReferal
  },
  strict: debug,
})
