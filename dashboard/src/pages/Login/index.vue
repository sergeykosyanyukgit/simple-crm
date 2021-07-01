<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-70 md-xsmall-size-100 login-panel">
      <stats-card data-background-color="green" v-if="forms.Login">
        <template slot="header">
          <md-icon>person</md-icon>
        </template>
        <template slot="content">
          <br>
          <h3 class="title">Вход</h3>
          <br>
          <form @submit.prevent="login">
            <md-field>
              <label>Введите Email</label>
              <md-input v-model="user.email"></md-input>
            </md-field>
            <md-field>
              <label>Введите пароль</label>
              <md-input v-model="user.password" type="password"></md-input>
            </md-field>
            <md-button class="md-block md-success" type="submit" v-bind:disabled="loginButton">Войти</md-button>
          </form>
        </template>
       <template slot="footer">
          <div class="md-layout">
              <md-button class="md-layout-item md-size-100 md-warning md-simple"
                @click="forms.Registration = false, forms.Login = false, forms.Restore = true"
              >Восстановить пароль</md-button>
              <md-button class="md-layout-item md-size-100 md-danger md-simple" 
              @click="forms.Registration = true, forms.Login = false, forms.Restore = false"
              >Регистрация</md-button>
          </div>
        </template>
      </stats-card>
      
      <stats-card data-background-color="red" v-else-if="forms.Registration">
        <template slot="header">
          <md-icon>person</md-icon>
        </template>
        <template slot="content">
          <br>
          <h3 class="title">Регистрация</h3>
          <br>
          <form novalidate @submit.prevent="registrationUserPrev" class="md-layout">
            <md-field v-if="step == 1" class="md-layout-item md-size-100" :disabled="sending">
              <md-input v-model="userRegistration.email" placeholder="Введите Email"></md-input>
            </md-field>
            <md-field v-if="step == 1" class="md-layout-item md-size-100" :disabled="sending">
              <md-input v-model="userRegistration.password" type="password" placeholder="Введите пароль" minlength="6"></md-input>
            </md-field>
            <md-field v-if="step == 1" class="md-layout-item md-size-100" :disabled="sending">
              <md-input v-model="userRegistration.phone" placeholder="Введите номер телефона" class="md-layout-item md-size-100"
              @focus="checkPhone" @input="nextPhoneCheck" type="text" maxlength="15" minlength="15"></md-input>
            </md-field>
            <md-field v-if="step == 1" class="md-layout-item md-size-100" :disabled="sending">
              <md-input v-model="userRegistration.name" type="text" placeholder="Введите имя" minlength="2"></md-input>
            </md-field>
            <md-button class="md-block md-danger" type="submit" v-bind:disabled="regButton">Регистрация</md-button>
          </form>
        </template>
        <template slot="footer">
          <div class="md-layout">
            <md-button class="md-layout-item md-size-100 md-warning md-simple md-block center-block"
              @click="forms.Registration = false, forms.Login = false, forms.Restore = true"
            >Восстановить пароль</md-button>
            <md-button class="md-layout-item md-size-100 md-success md-simple md-block center-block" 
              @click="forms.Registration = false, forms.Login = true, forms.Restore = false"
            >Вход</md-button>
          </div>
        </template>
      </stats-card>

      <stats-card data-background-color="orange" v-else-if="forms.Restore">
        <template slot="header">
          <md-icon>person</md-icon>
        </template>
        <template slot="content">
          <h3 class="title">Восстановить</h3>
          <br>
          <form @submit.prevent="restoreUserPrev">
            <md-field>
              <label>Введите Email</label>
              <md-input v-model="user.email"></md-input>
            </md-field>
            <md-button class="md-block md-warning" type="submit" v-bind:disabled="restoreButton">Отправить письмо</md-button>
          </form>
        </template>
        <template slot="footer">
          <div class="md-layout">
            <md-button class="md-layout-item md-size-100 md-danger md-simple" 
            @click="forms.Registration = true, forms.Login = false, forms.Restore = false"
            >Регистрация</md-button>

            <md-button class="md-layout-item md-size-100 md-success md-simple" 
              @click="forms.Registration = false, forms.Login = true, forms.Restore = false"
            >Вход</md-button>
          </div>
        </template>
      </stats-card>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  //import Notifications from '@/components/NotificationPlugin'
  //import {LOGIN_REQUEST, REG_REQUEST, RESTORE_REQUEST} from 'actions/login'
  import {StatsCard, ChartCard} from '@/components'
  //import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    helpers
  } from 'vuelidate/lib/validators'
  const alpha = helpers.regex('alpha', /^((8)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/)

  export default {
    name: 'login',
    //mixins: [validationMixin],
    components: {
      ChartCard,
      StatsCard
    },
    name: 'login',
    data () {
      return {
        sending: false,
        step: 1,
        restoreButton: false,
        loginButton: false,
        loadingReg: false,
        type: ['', 'info', 'success', 'warning', 'danger'],
        user: {
          email: null,
          phone: null,
          password: null,
          surname: null,
          name: null,
          middlename: null,
          profileimage: null
        },
        userRegistration: {
          email: null,
          password: null,
          phone: null,
          name: null
        },
        forms: {
          Login: true,
          Registration: false,
          Restore: false
        }
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['User']),
      regButton() {
        if (this.loadingReg || this.userRegistration.phone == null ||  this.userRegistration.name == null ||
        this.userRegistration.password == null || this.userRegistration.email == null) {
          return true
        }
        return false
      }
    },
    methods: {
      ...mapActions(['loginUser', 'registerUser', 'restoreUser']),
      async restoreUserPrev() {
        this.$parent.$refs.topProgress.start()
        this.restoreButton = true

        await this.restoreUser(this.user.email)
        .then(res => {
          //console.log(res)
          this.$parent.$refs.topProgress.done()
          this.$notify({
            message: `Письмо было отправлено на почту!`,
            icon: 'person',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
          this.forms.Restore = false
          this.forms.Login = true
          this.restoreButton = false
        })
        .catch(error => {
          //console.log(error)
          this.$parent.$refs.topProgress.fail()
          this.$notify({
            message: `Восстановить пароль не удалось! ${error}`,
            icon: 'person',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
          this.restoreButton = false
        })
      },
      async registrationUserPrev() {
        //console.log(this.userRegistration)
        this.$parent.$refs.topProgress.start()
        this.loadingReg = true
        let user = {
          email: this.userRegistration.email,
          password: this.userRegistration.password,
          phone: this.userRegistration.phone,
          name: this.userRegistration.name
        }

        await this.registerUser(user)
        .then(res => {
          //console.log(res.data)
          this.$parent.$refs.topProgress.done()
          this.forms.Registration = false
          this.forms.Login = true
          this.user.email = this.userRegistration.email
          this.user.password = this.userRegistration.password
          this.$notify({
            message: `Успешно! Подтвердите свою почту!`,
            icon: 'person',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
          this.loadingReg = false
        })
        .catch(error => {
          //console.log({error})
          this.$parent.$refs.topProgress.fail()
          this.$notify({
            message: `Неуспешно! ${error}!`,
            icon: 'person',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
          this.loadingReg = false
        })
      },
      nextPhoneCheck(event) {
        if (this.userRegistration.phone != null)
        if (this.userRegistration.phone.length == 5) {
          this.userRegistration.phone += ')'
        } else if (this.userRegistration.phone.length == 9) {
          this.userRegistration.phone += '-'
        } else if (this.userRegistration.phone.length == 12) {
          this.userRegistration.phone += '-'
        }
      },
      checkPhone() {
        if (this.userRegistration.phone == null || this.userRegistration.phone.length == 0) {
          this.userRegistration.phone = '8('
        }
      },
      async login() {
        this.$parent.$refs.topProgress.start()
        this.loginButton = true
        let user = {
          email: this.user.email,
          password: this.user.password
        }

        await this.loginUser(user)
        .then(res => {
          //console.log(res)
          this.$parent.$refs.topProgress.done()
          this.$notify({
            message: `Здравствуйте, ${res.data.user.name} ${res.data.user.middlename}!`,
            icon: 'person',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
          this.loginButton = false
        })
        .catch(error => {
          //console.log(error)
          this.$parent.$refs.topProgress.fail()
          this.$notify({
            message: `Неуспешная авторизация! ${error}`,
            icon: 'person',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
          this.loginButton = false
        })
      }
    }
  }
</script>

<style>
.login-panel {
  margin: 15ch auto;
}
.mtop {
  margin-top: 5px;
}
</style>
