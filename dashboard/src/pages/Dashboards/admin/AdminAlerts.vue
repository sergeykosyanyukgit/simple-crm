<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Оповещения</h4>
        <p class="category">Создание оповещений и рассылок.</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-medium-size-50 md-size-33">
            <div class="mini-card-alert md-elevation-4 text-center md-layout">
              <md-icon class="md-layout-item md-size-100 md-size-5x mt-20">mail_outline</md-icon>
              <div class="md-layout-item md-size-100 mt-20">
                <md-button disabled @click="createEmailModal = true">Email Рассылка</md-button>
              </div>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100 md-medium-size-50 md-size-33">
            <div class="mini-card-alert md-elevation-4 text-center md-layout">
              <md-icon class="md-layout-item md-size-100 md-size-5x mt-20">add_alert</md-icon>
              <div class="md-layout-item md-size-100 mt-20">
                <md-button @click="createAlertModal = true">Рассылка Оповещений</md-button>
              </div>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100 md-medium-size-50 md-size-33">
            <div class="mini-card-alert md-elevation-4 text-center md-layout">
              <md-icon class="md-layout-item md-size-100 md-size-5x mt-20">perm_phone_msg</md-icon>
              <div class="md-layout-item md-size-100 mt-20">
                <md-button disabled >Смс Рассылка</md-button>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <!-- Alert MODAL -->
    <modal v-if="createAlertModal" @close="createAlertModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Рассылка оповещений</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="createAlertModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="type">Тип оповещения</label>
            <md-select v-model="alert.type" name="type" id="type">
              <md-option v-for="item in alertTypes" :key="item" :value="item">
                {{item}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="acive">Клиенты</label>
            <md-select v-model="alert.acive" name="acive" id="acive">
              <md-option v-for="item in alertAcives" :key="item" :value="item">
                {{item}}
              </md-option>
            </md-select>
          </md-field>
            <md-field class="md-layout-item md-small-size-100 md-size-33">
              <label for="courses">Курс</label>
              <md-select v-model="alert.course" name="courses" id="courses" multiple>
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
          <md-field class="md-layout-item md-size-100">
            <label for="message">Сообщение</label>
            <md-input v-model="alert.message" name="message"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="createAlert">Создать</md-button>
        <md-button class="md-danger md-simple" @click="createAlertModal = false">Отмена</md-button>
      </template>
    </modal>

    <!-- Email MODAL -->
    <modal v-if="createEmailModal" @close="createEmailModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Email Рассылка</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="createEmailModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <label for="acive">Клиенты</label>
            <md-select v-model="alert.acive" name="acive" id="acive">
              <md-option v-for="item in alertAcives" :key="item" :value="item">
                {{item}}
              </md-option>
            </md-select>
          </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="courses">Курс</label>
              <md-select v-model="alert.course" name="courses" id="courses" multiple>
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
          <md-field class="md-layout-item md-size-100">
            <md-input type="file" id="file" name="file" single></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="createEmail">Создать</md-button>
        <md-button class="md-danger md-simple" @click="createEmailModal = false">Отмена</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import {Modal} from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "admin-alerts",
  components: {
    Modal
  },
  data() {
    return {
      alertPay: [
        'Все',
        'Оплатили',
        'Не оплатили'
      ],
      alertTypes: [
        'warning',
        'danger',
        'success'
      ],
      alertAcives: [
        'Все',
        'Активныe',
        'Не активные'
      ],
      alert: {
        type: null,
        message: null,
        acive: null,
        //pay: null,
        //filial: [],
        course: []
      },
      feedbacks: [],
      alerts: [],
      createAlertModal: false,
      createEmailModal: false,
      userid: null,
      type: '',
      message: '',
      check: false
    }
  },
  computed: {
    ...mapGetters(['allFilials', 'allCourses', 'allTimeTables', 'allTeachers', 'allParents']),
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions(['createAlerts']),
    async createEmail() {
      //console.log(this.alert)
    },
    async createAlert() {
      //console.log(this.alert)

      this.updateLoading('start')
      await this.createAlerts(this.alert)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.createAlertModal = false
        this.$notify({
          message: `Рассылка оповещений была успешно создана!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log(error)
        this.updateLoading('fail')
        this.$notify({
          message: `Рассылка оповещений не удалась! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      this.childAddModal = false
    }
  },
  async mounted() {
    //await this.loadAllAlerts()
    //await this.loadAllFeedbacks()
  }
}
</script>

<style scoped>
.mini-card-alert {
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
}
.mt-20 {
  margin-top: 30px;
}
</style>