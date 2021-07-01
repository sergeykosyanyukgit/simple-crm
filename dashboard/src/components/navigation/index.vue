<template>
  <div class="navigation">
    <ul>
      <li>
        <router-link class="brand" to="/">
          <img src="../../assets/logo.png" width="40px"/><strong>DOGEBOOK</strong>
        </router-link>
      </li>
    </ul>
    <ul>
      <li v-if="isProfileLoaded">
        <router-link to="/">{{name}}</router-link>
      </li><!--
      <li v-if="isProfileLoaded && isTeacher">
        <router-link to="/TeacherDashboard">{{name}}</router-link>
      </li>
      <li v-if="isProfileLoaded && isUser">
        <router-link to="/UserDashboard">{{name}}</router-link>
      </li>-->
      <li v-if="isAuthenticated" @click="logout">
        <span class="logout">Logout</span>
      </li>
      <li v-if="!isAuthenticated && !LOGINLoading">
        <router-link to="/">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  a {
    color: white;
    text-decoration: none;
  }
  .navigation {
    display: flex;
    color: white;
    align-items: center;
    background-color: #ffa035;
    padding: 5px;

    ul{
      display: flex;
      &:first-child{
        flex-grow: 1;
      }
      li {
        padding-right: 1em;
      }
    }
  }
  .brand {
    display: flex;
    align-items: center;

  }
  .logout {
    &:hover {
      cursor: pointer;
    }
  }

</style>

<script>
  import { mapGetters, mapState } from 'vuex'
  //import { LOGIN_LOGOUT } from 'actions/login'

  export default {
    name: 'navigation',
    methods: {
      logout: function () {
        //this.$store.dispatch(LOGIN_LOGOUT).then(() => this.$router.push('/login'))
      }
    },
    computed: {
      ...mapGetters(['getProfile', 'isLOGINenticated', 'isProfileLoaded']),
      ...mapState({
        LOGINLoading: state => state.LOGIN.status === 'loading',
        name: state => `${state.user.profile.email} ${state.user.profile.phone}`,
      })
    },
  }
</script>
