<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Редактировать профиль</h4>
        <p class="category">Завершите оформление своего профиля</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout" v-if="localUser!=null">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Фамилия</label>
              <md-input v-model="localUser.surname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Имя</label>
              <md-input v-model="localUser.name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Отчество</label>
              <md-input v-model="localUser.middlename" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Номер телефона</label>
              <md-input v-model="localUser.phone" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Электронная почта</label>
              <md-input v-model="localUser.email" type="email" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <md-input type="file" id="file" name="file" single @change="selectedFile"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100 text-center">
            <md-button class="md-raised" :class="selectedThemeDashboard.selectcolor" @click="$emit('NewPassword')">
              Установить новый пароль
            </md-button>
            <md-button class="md-raised" :class="selectedThemeDashboard.selectcolor" @click="saveUserUpdate" :disabled="disabledSaveButton">
              Сохранить изменения
            </md-button>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">

            <md-table v-model="localUser.Children">

              <md-table-row
                slot="md-table-row"
                slot-scope="{ item, index }"
              >
                <md-table-cell>
                  <md-avatar class="md-avatar-icon  md-large">
                    <img
                      v-if="item.profileimage != ''"
                      :src="`${config.FILE_SERVER}${item.profileimage}`"
                      alt="Raised Image"
                      class="img-raised rounded img-size md-elevation-6"
                    />
                    <div class="separator" v-else>
                      {{item.surname}}
                    </div>
                  </md-avatar>
                </md-table-cell>
                <md-table-cell>{{ item.surname }} {{ item.name }} {{ item.middlename }}</md-table-cell>
                <md-table-cell>{{ item.Course.name }}</md-table-cell>
                
                <md-table-cell>
                  <md-button class="md-just-icon md-simple md-success" @click="$emit('ChildEdit', item)/*UserUpdate(item)*/">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Редактировать</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
            <!--<div class="md-layout-item md-size-100 text-center">
              <md-button class="md-just-icon" :class="selectedThemeDashboard.selectcolor" @click="$emit('ChildAdd')">
                <md-icon>add</md-icon>
                <md-tooltip md-direction="top">Добавить ребенка</md-tooltip>
              </md-button>
            </div>-->
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import configFile from '../../../../config'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FileApi from '../../../../http/FileApi'

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    },
  },
  model: {
    events: ['ChildEdit', 'NewPassword', 'ChildAdd', 'UserEdit']
  },
  data() {
    return {
      config: configFile,
      file: null,
      localUser: null
    };
  },
  computed: {
    ...mapGetters(['selectedThemeDashboard', 'getProfile']),
    disabledSaveButton() {
      if(this.localUser.email != this.getProfile.email ||
      this.localUser.middlename != this.getProfile.middlename ||
      this.localUser.name != this.getProfile.name ||
      this.localUser.phone != this.getProfile.phone ||
      this.file!=undefined ||
      this.localUser.surname != this.getProfile.surname ||
      this.localUser.Children != this.getProfile.Children) return false
      else return true
    }
  },
  methods: {
    ...mapActions(['thisUserFullUpdate']),
    ...mapMutations(['updateLoading']),
    selectedFile() {
      this.file = document.querySelector('#file').files[0];
    },
    async saveUserUpdate() {
      this.updateLoading('start')
      let fileName = `UserID${this.getProfile.id}`
      if (this.file != undefined)
      await FileApi({method: 'upload', name: fileName, file: this.file})
      .then(response => {
        this.localUser.profileimage = response
        this.updateLoading('done')
        this.$notify({
          message: `Фото на файловый сервер было успешно загружено!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Фото на файловый сервер загрузить не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })

      if (!this.disabledSaveButton) {
        this.updateLoading('start')
        let usr = {
          id: this.localUser.id,
          email: this.localUser.email,
          profileimage: this.localUser.profileimage,
          middlename: this.localUser.middlename,
          surname: this.localUser.surname,
          name: this.localUser.name,
          phone: this.localUser.phone
        }
        await this.thisUserFullUpdate(usr)
        .then(response => {
          this.updateLoading('done')
          this.$notify({
            message: `Пользователь отредактирован успешно`,
            icon: 'check',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
          //this.localUser = { ...this.getProfile }
          this.file = null
        })
        .catch(error => {
          this.updateLoading('fail')
          this.$notify({
            message: `Пользователя отредактировать не получилось! ${error}!`,
            icon: 'close',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
      }
    }
  },
  async mounted() {
    this.localUser = { ...this.getProfile }
  }
};
</script>
<style scoped>
  .img-size {
    width: 70px;
  }
</style>