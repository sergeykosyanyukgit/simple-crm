<template>
  <div v-if="isAuthenticated" class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar v-if="!getProfile.isTeacher && !getProfile.isAdmin && selectedThemeDashboard!= null">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-for="userBar in userBars" v-bind:key="userBar.id" v-bind:to="userBar.component">
        <md-icon>{{userBar.icon}}</md-icon>
        <p>{{userBar.name}}<!-- <span class="badge">6</span>--></p>
      </sidebar-link>
    </side-bar>

    <side-bar v-if="getProfile.isTeacher">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-for="teacherBar in teacherBars" v-bind:key="teacherBar.id" v-bind:to="teacherBar.component">
        <md-icon>{{teacherBar.icon}}</md-icon>
        <p>{{teacherBar.name}}</p>
      </sidebar-link>
    </side-bar>

    <side-bar v-if="getProfile.isAdmin && selectedThemeDashboard != null">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-for="adminBar in adminBars" v-bind:key="adminBar.id" v-bind:to="adminBar.component">
        <md-icon>{{adminBar.icon}}</md-icon>
        <p>{{adminBar.name}}</p>
      </sidebar-link>
    </side-bar>
    
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content></dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "../../pages/Layout/TopNavbar";
import ContentFooter from "../../pages/Layout/ContentFooter";
import DashboardContent from "../../pages/Layout/Content";
import MobileMenu from "../../pages/Layout/MobileMenu";

import { mapGetters, mapActions } from 'vuex'
import Login from '../Login'

  export default {
    components: {
      TopNavbar,
      DashboardContent,
      ContentFooter,
      MobileMenu,
      Login
    },
    name: 'home',
    computed: {
      ...mapGetters(['selectedThemeDashboard', 'isAuthenticated', /*'authStatus', */'getProfile']),
      /*loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      }*/
    },
    data () {
      return {
        notificationStore: '',
        userBars: [
          {
            name: 'Посещаемость',
            component: '/user/course',
            icon: 'assignment_turned_in'
          },
          {
            name: 'Пригласить друзей',
            component: '/user/invite',
            icon: 'supervised_user_circle'
          },
          /*{
            name: 'Пройденные курсы',
            component: '/user/course',
            icon: 'assignment_turned_in'
          },*/
          {
            name: 'Галерея',
            component: '/user/gallery',
            icon: 'collections'
          },
          {
            name: 'Оповещения',
            component: '/user/alerts',
            icon: 'local_post_office'
          },
          {
            name: 'Профиль',
            component: '/user/profile',
            icon: 'insert_emoticon'
          },
          {
            name: 'Отзывы',
            component: '/user/reviews',
            icon: 'comment'
          }
        ],
        teacherBars: [
          {
            name: 'Посещаемость и График',
            component: '/teacher/attendance',
            icon: 'calendar_today'
          },
          {
            name: 'Загрузка фото',
            component: '/teacher/photouploads',
            icon: 'collections'
          },/*
          {
            name: 'График',
            component: '/teacher/schedule',
            icon: 'assignment_turned_in'
          },*/
          {
            name: 'Оповещения',
            component: '/teacher/alerts',
            icon: 'local_post_office'
          },
          {
            name: 'Курсы',
            component: '/teacher/сourses',
            icon: 'dvr'
          }
        ],
        adminBars: [
          {
            name: 'Расписание',
            component: '/admin/timetable',
            icon: 'insert_chart'
          },
          /*{
            name: 'Статистика',
            component: '/admin/statistics',
            icon: 'event_note'
          },*/
          {
            name: 'Управление',
            component: '/admin/landing',
            icon: 'view_compact'
          },
          {
            name: 'Заявки на отработку',
            component: '/admin/mining',
            icon: 'format_list_bulleted'
          },
          {
            name: 'Заявки на пробное',
            component: '/admin/trial',
            icon: 'person_add'
          },
          {
            name: 'Оповещения',
            component: '/admin/alerts',
            icon: 'local_post_office'
          },
          {
            name: 'Пользователи',
            component: '/admin/users',
            icon: 'person'
          },
          {
            name: 'Курсы',
            component: '/admin/courses',
            icon: 'add'
          },
          {
            name: 'Филиалы',
            component: '/admin/filial',
            icon: 'assistant'
          },
          {
            name: 'Галерея',
            component: '/admin/gallery',
            icon: 'photo'
          }
        ]
      }
    },
    methods: mapActions(['getAllFilials', 'getAllTimeTables', 'getAllTeachers', 'getAllAdmins', 'getAllCourses', 'getAllThemesDashboards']),
    async mounted() {
      //await this.getAllThemeDashboard()
      if (this.getProfile.isAdmin == true) {
        await this.getAllCourses()
      }
    }
  }
</script>

<style>
.mt-20 {
  margin-top: 20px;
}
.mr-10 {
  margin-right: 10px;
}
.md-children {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
}
.md-table {
  max-height: 500px !important;
}
.table-size .md-theme-default{
  max-height: 300px !important;
  overflow: auto !important;
}
/*.modal-container {
  max-width: 50% !important;
}*/
.md-ripple > span {
top: 15px; left: 40px;
}
.md-menu-content {
  z-index: 9999 !important;
}
.badge {
  padding: 3px 6px;
  margin-left: 15px;
  border-radius: 2px;
  background-color: orange;
}
.primary-bg{
  background-color: rgb(156, 39, 176);
}
.danger-bg{
  background-color: rgb(244, 67, 54);
}
.warning-bg{
  background-color: rgb(255, 152, 0);
}
.success-bg{
  background-color: rgb(76, 175, 80);
}
.info-bg{
  background-color: rgb(0, 188, 212);
}
.gray-bg{
  background-color: rgb(153, 153, 153);
}
.mini-modal-1 .modal-wrapper .modal-container {
  max-width: 300px !important;
  text-align: center;
}
.mini-modal-2 .modal-wrapper .modal-container {
  max-width: 500px !important;
  text-align: center;
}
.normal-modal .modal-wrapper .modal-container {
  max-width: 550px !important;
  text-align: center;
}
</style>
