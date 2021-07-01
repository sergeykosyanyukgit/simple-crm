<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Пригласить Друзей</h4>
        <p class="category">Отправляя приглашение, вы подтверждаете, что согласны с 
          <a href="https://docs.google.com/document/d/1UbfU-KAFENfVb6406sKCMIE8Jpl6fvMt7x3TSUNXGAY/edit?usp=sharing" target="_blank">
            правилами отправки приглашений.
          </a>
        </p>
        <p class="category">
          <a href="https://docs.google.com/document/d/1Fc1uo32Z481N71nmS0zI9l7U4rbQad5FjLkmlfn1LAE/edit?usp=sharing" target="_blank">
            Как работает система приглашений?
          </a>
        </p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="text-center">
              <md-button class="md-success center" @click="showInviteModal">
                Отправить приглашение
              </md-button>
            </div>
            <div>
              <md-table>
                <md-table-row>
                  <md-table-head>Дата приглашения</md-table-head>
                  <md-table-head>Дата обновления</md-table-head>
                  <md-table-head>Вы пригласили</md-table-head>
                  <md-table-head>Статус</md-table-head>
                  <md-table-head>Получена скидка</md-table-head>
                </md-table-row>
                <md-table-row v-for="item in allReferals.referals" :key="item.id">
                  <md-table-cell>{{ `${item.createdAt}`.slice(0, 10) }}</md-table-cell>
                  <md-table-cell>{{ `${item.updatedAt}`.slice(0, 10) }}</md-table-cell>
                  <md-table-cell>{{ item.Trial.name }}</md-table-cell>
                  <md-table-cell>{{ item.Trial.res }}</md-table-cell>
                  <md-table-cell>{{ item.discount }}</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>

    
    <!-- INVITE MODAL -->
    <modal v-if="invite.modal" class="mini-modal-1">
      <template slot="header">
        <h4 class="modal-title">Приглашение</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="invite.modal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-100">
            <label for="name">Введите ФИО</label>
            <md-input v-model="invite.name" placeholder="Иванов Иван Иванович" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-100">
            <label for="phone">Введите номер</label>
            <md-input v-model="invite.phone" placeholder="8(999)123-45-67" name="phone"
            @focus="checkPhone" @input="nextPhoneCheck" type="text" maxlength="15" minlength="15"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="invite.modal = false">Отмена</md-button>
        <md-button class="md-success md-simple" @click="createInvitePrev">Отправить</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
//import Joi  from '@hapi/joi'
import { Modal } from '@/components'
export default {
  name: "user-referal",
  components: {
    Modal
  },
  data() {
    return {
      invite: {
        modal: false,
        phone: null,
        name: null
      }
    }
  },
  computed: {
    ...mapGetters(['getProfile', 'allReferals'])
  },
  async mounted() {
    this.updateLoading('start')
    await this.getReferalTrils()
    .then(res => {
      //console.log(res)
      this.updateLoading('done')
    })
    .catch(error => {
      //console.log(error)
      this.updateLoading('fail')
    })
  },
  methods: {
    ...mapActions(['createReferalTrial', 'getReferalTrils']),
    ...mapMutations(['updateLoading']),
    showInviteModal() {
      this.invite.phone = null
      this.invite.name = null
      this.invite.modal = true
    },
    async createInvitePrev() {
      this.updateLoading('start')
      /*const schema = Joi.object({
        UserId: Joi.number().min(1),
        name: Joi.string().min(3).max(50),
        phone: Joi.string().regex(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/, { invert: false }),
      })
      let err = schema.validate({UserId: this.getProfile.id, name: this.invite.name, phone: this.invite.phone})

      if(err.error != undefined) {
        this.updateLoading('fail')
        this.$notify({
          message: `Не все поля заполнены верно!`,
          icon: 'error',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      } else {*/
      this.invite.modal = false
      let info = {
        UserId: this.getProfile.id,
        name: this.invite.name,
        phone: this.invite.phone 
      }
      await this.createReferalTrial(info)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Приглашение было успешно отправлено!`,
          icon: 'person',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        console.log(error)
        this.updateLoading('fail')
        this.$notify({
          message: `Приглашение отправить не удалось! ${error}`,
          icon: 'person',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      //}
    },
    nextPhoneCheck(event) {
      if (this.invite.phone != null)
      if (this.invite.phone.length == 5) {
        this.invite.phone += ')'
      } else if (this.invite.phone.length == 9) {
        this.invite.phone += '-'
      } else if (this.invite.phone.length == 12) {
        this.invite.phone += '-'
      }
    },
    checkPhone() {
      if (this.invite.phone == null || this.invite.phone.length == 0) {
        this.invite.phone = '8('
      }
    }
  }
}
</script>

<style scoped>
.marg {
  margin-bottom: 15px;
}
</style>