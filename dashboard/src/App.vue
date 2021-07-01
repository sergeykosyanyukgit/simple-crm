<template>
  <div id="material-kit">
    <notifications></notifications>
      <div v-if="getLoading == 'start'" class="spinner-container">
        <div class="spinner" >
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
      </div>
    <template>
      <vue-topprogress ref="topProgress"></vue-topprogress>
    </template>
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div>
         <router-view/>
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
  import store from './store'
  import Notifications from '@/components/NotificationPlugin'
  import vueTopProgress from 'vue-top-progress'
  import Navigation from 'components/navigation'
  //import { USER_REQUEST } from 'actions/user'
  import SqreenFooter from './components/footer/index.vue'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import router from './router'
  export default {
    components: {
      vueTopProgress,
      SqreenFooter,
      Navigation 
    },
    name: 'app',
    computed: {
      ...mapGetters(['getLoading'])
    },
    methods: {
      ...mapActions(['checkAuth']),
      ...mapMutations([]),
    },
    watch: {
      getLoading() {
        if (this.getLoading == 'done') {
          this.$refs.topProgress.done()
        } else if (this.getLoading == 'start') {
          this.$refs.topProgress.start()
        } else if (this.getLoading == 'fail') {
          this.$refs.topProgress.fail()
        }
      }
    },
    mounted: async () => {
      /*if (localStorage.getItem('token')) {
        await store.dispatch('checkAuth')
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          router.push('/', () => {});
        })
      }*/
    }
  }
</script>

<style>
.spinner-container {
  z-index: 9999 !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}
.spinner {
  display: table-cell !important;
  vertical-align: middle !important;
  text-align: center;
}
.z-up {
  z-index: 12 !important;
}
.green > .md-progress-bar-fill {
  background-color: #3fc52e !important;
} 
.red > .md-progress-bar-fill {
  background-color: #ff5252 !important;
}
.green {
  background-color: #98eb8d !important;
}
.red {
  background-color: #ffa3a3 !important;
}
.md-tabs-navigation .md-button {
  max-width: 100% !important;
}
.md-scrollbar > .md-layout {
  margin-top: 20px;
}
.md-table {
  width: 98% !important;
  margin-left: 1% !important;
  margin-right: 1% !important;
}
.element-center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
.md-scrollbar {
  max-height: 450px;
  overflow: auto;
}
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  color: #2e426b;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.md-card .md-card-content .md-tabs .md-tabs-content {
  height: 100% !important;
}
.md-card .md-card-content .md-tabs .md-tabs-navigation {
  padding: 5px !important;
}
.md-datepicker-dialog {
  z-index: 9999 !important;
}
</style>
