<template>
  <div
    class="sidebar"
    :style="sidebarStyle"
    data-color="blue"
  >
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <md-avatar class="md-avatar-icon">
          <img
            v-if="getProfile.profileimage != undefined && getProfile.profileimage != ''"
            :src="`${config.FILE_SERVER}${getProfile.profileimage}`"
            alt="Raised Image"
            class="img-raised rounded img-size md-elevation-6"
          />
          <div class="separator" v-else>
            {{getProfile.surname ? getProfile.surname[0].toUpperCase() : 'U'}}
          </div>
        </md-avatar>
      </a>

      <h4 class="color-white">
        {{ getProfile.name }} {{ getProfile.middlename }}
      </h4>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
  import store from '../../store'
import router from '../../router'
import configFile from '../../config'
import SidebarLink from './SidebarLink.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      config: configFile,
      profileImage: require('@/assets/img/load.gif')
    }
  },
  components: {
    SidebarLink
  },
  props: {
    backgroundImage: {
      type: String,
      default: require('@/assets/img/sidebar-3.jpg')
      //default: this.ThemeDashboard.profileimage
    },
    activeColor: {
      type: String,
      default: 'green',
      /*validator: value => {
        let acceptedValues = ['', 'purple', 'blue', 'green', 'orange', 'red']
        return acceptedValues.indexOf(value) !== -1
      }*/
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  computed: {
    ...mapGetters(['getProfile', 'selectedThemeDashboard']),
    cssProps() {
      return {
        '--bg-custom-theme-color': 'green',
      }
    },
    sidebarStyle () {
      console.log(this.selectedThemeDashboard)
      if (this.selectedThemeDashboard != undefined)
      return {
        backgroundImage: `url(http://localhost/file/api/${this.selectedThemeDashboard.profileimage})`,
      }
      else return null
    },
    navBarLinkStyle () {
      return {
        backgroundColor: `${this.selectedThemeDashboard.buttoncolor}`
      }
    }
  },
  methods: {
    ...mapActions(['checkAuth']),
    /*async image() {
      if(this.getProfile.profileimage!=undefined) {
        await FileApi({method: 'load', name: this.getProfile.profileimage})
        .then(response => {
          this.profileImage = response
        })
        .catch(error => {return(null)})
      } else {
        this.profileImage = null
      }
    }*/
  },
  async mounted() {
    console.log(this.getProfile)
    if (localStorage.getItem('token') && this.getProfile.id == undefined) {
      await store.dispatch('checkAuth')
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        router.push('/', () => {});
      })
    }
    console.log(this.selectedThemeDashboard)
    document.documentElement.style.setProperty('--custom-color-element-light-theme', `${this.selectedThemeDashboard.elementcolorlight}`);
    document.documentElement.style.setProperty('--custom-color-element-dark-theme', `${this.selectedThemeDashboard.elementcolordark}`);
    document.documentElement.style.setProperty('--custom-shadow-element-theme', `rgba(${this.selectedThemeDashboard.elementcolorshadow}, 0.4)`);

    document.documentElement.style.setProperty('--custom-color-button-theme', `${this.selectedThemeDashboard.buttoncolor}`);
    document.documentElement.style.setProperty('--custom-shadow-button-theme', `rgba(${this.selectedThemeDashboard.buttoncolorshadow}, 0.2)`);
    //setTimeout(async () => await this.image(), 500);
  }
}
</script>
<style>
:root {
  --custom-bg-theme: #fafafa;
  --custom-shadow-button-theme: rgb(0,0,0)
}
.top-progress {
  /*background-color: var(--custom-color-button-theme) !important;*/
}
.md-datepicker-header {
  background-color: var(--custom-color-button-theme) !important;
}
.md-button, .md-button:hover, .md-button:focus {
  background-color: var(--custom-color-button-theme) !important;
}
.md-button:hover {
  box-shadow: 0 12px 20px -10px var(--custom-shadow-button-theme), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px var(--custom-shadow-button-theme);
}
.nav .md-list-item-container.active {
  background-color: var(--custom-color-button-theme) !important;
}
.nav .md-list-item-container:hover {
  background-color: var(--custom-shadow-button-theme) !important;
}
.page-item.active >.page-link {
  background-color: var(--custom-color-button-theme) !important;
}
.md-tabs-navigation {
  background: linear-gradient(60deg, var(--custom-color-element-light-theme), var(--custom-color-element-dark-theme)) !important; 
  box-shadow: 0 10px 30px -12px var(--custom-shadow-element-theme), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px var(--custom-shadow-element-theme) !important;
}
.md-card .md-card-header {
  background: linear-gradient(60deg, var(--custom-color-element-light-theme), var(--custom-color-element-dark-theme)) !important; 
  box-shadow: 0 10px 30px -12px var(--custom-shadow-element-theme), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px var(--custom-shadow-element-theme) !important;
}
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
.color-white {
  color: aliceblue;
}
</style>
