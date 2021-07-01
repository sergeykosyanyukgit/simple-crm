import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueTopprogress from 'vue-top-progress'
import VueRouter from "vue-router"
import VCharts from 'v-charts'

Vue.use(VCharts)
Vue.use(VueRouter)
Vue.use(vueTopprogress)
Vue.config.productionTip = false

// dashboard
import GlobalComponents from "./plugins/globalComponents"
import GlobalDirectives from "./plugins/globalDirectives"
import Notifications from "./components/NotificationPlugin"
import MaterialDashboard from "./plugins/material-dashboard"
import Photoshop from 'vue-color'
import Chartist from "chartist"

Vue.prototype.$Chartist = Chartist
Vue.use(Photoshop)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
// end dashboard
const NavbarStore = {
  showNavbar: false
}
Vue.mixin({
  data() {
    return {
      NavbarStore
    }
  }
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App, 'photoshop-picker': Photoshop },
  router,
  data: {
    Chartist: Chartist
  },
  store
})
