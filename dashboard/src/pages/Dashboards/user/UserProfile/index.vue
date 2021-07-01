<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form 
          v-on:NewPassword="NewPassword.Modal = true"
          v-on:ChildEdit="childEdit"
          v-on:ChildAdd="CreatingChild.Modal = true"
          >
        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card :user="getProfile"></user-card>
      </div>

      <!-- USER PASSWORD EDIT -->
      <modal v-if="NewPassword.Modal" @close="NewPassword.Modal = false" class="mini-modal-1">
        <template slot="header">
          <h4 class="modal-title">Редактирование пароля</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="NewPassword.Modal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-100">
              <label for="old">Старый пароль</label>
              <md-input v-model="NewPassword.OldPassword" type="password" name="old"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-100">
              <label for="new">Новый пароль</label>
              <md-input v-model="NewPassword.NewPassword" type="password" name="new"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="NewPassword.Modal = false">Закрыть</md-button>
          <md-button class="md-success md-simple" @click="NewPasswordSave">Сохранить</md-button>
        </template>
      </modal>

      <!-- CHILD EDIT -->
      <modal v-if="EditingChild.Modal" @close="EditingChild.Modal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Редактирование ученика</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="EditingChild.Modal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="surname">Фамилия ученика</label>
              <md-input v-model="EditingChild.Child.surname" type="text" name="surname"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="name">Имя ученика</label>
              <md-input v-model="EditingChild.Child.name" type="text" name="name"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="middlename">Отчество ученика</label>
              <md-input v-model="EditingChild.Child.middlename" type="text" name="middlename"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="phone">Телефон ученика</label>
              <md-input v-model="EditingChild.Child.phone" type="text" name="phone"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-100">
              <md-input type="file" id="file2" name="file" single @change="selectedFile"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="EditingChild.Modal = false">Закрыть</md-button>
          <md-button class="md-success md-simple" @click="childEditSave">Сохранить</md-button>
        </template>
      </modal>

    </div>
  </div>
</template>

<script>
import {Modal} from '@/components'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EditProfileForm from './EditProfileForm'
import UserCard from './UserCard'
import FileApi from '../../../../http/FileApi'

export default {
  name: 'user-profile',
  components: {
    EditProfileForm,
    UserCard,
    Modal
  },
  data () {
    return {
      file: null,
      NewPassword: {
        Modal: false,
        OldPassword: null,
        NewPassword: null
      },
      EditingChild: {
        Modal: false,
        Child: null
      },
      CreatingChild: {
        Modal: false,
        Child: {

        }
      }
    };
  },
  computed: {
    ...mapGetters(['getProfile', 'selectedThemeDashboard'])
  },
  methods: {
    ...mapActions(['thisUserPasswordUpdate', 'thisChildFullUpdate']),
    ...mapMutations(['updateLoading']),
    selectedFile() {
      this.file = document.querySelector('#file2').files[0];
    },
    childEdit(child) {
      this.EditingChild.Modal = true
      this.EditingChild.Child = {...child}
      //console.log(child)
    },
    async childEditSave() {
      this.EditingChild.Modal = false
      this.updateLoading('start')
      
      let fileName = `ChildID${this.EditingChild.Child.id}`
      if (this.file != undefined)
      await FileApi({method: 'upload', name: fileName, file: this.file})
      .then(response => {
        this.EditingChild.Child.profileimage = response
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
      let childToUpdate = {
        id: this.EditingChild.Child.id,
        name: this.EditingChild.Child.name,
        surname: this.EditingChild.Child.surname,
        middlename: this.EditingChild.Child.middlename,
        profileimage: this.EditingChild.Child.profileimage,
        phone: this.EditingChild.Child.phone,
      }
      await this.thisChildFullUpdate(childToUpdate)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Ученик успешно изменен!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log({error})
        this.updateLoading('fail')
        this.$notify({
          message: `Ученика изменить не удалось! ${error.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      this.updateLoading('done')
      //console.log(this.EditingChild.Child)
    },
    async NewPasswordSave() {
      this.updateLoading('start')
      this.NewPassword.Modal = false
      //console.log(this.NewPassword)
      let dataPass = {
        OldPassword: this.NewPassword.OldPassword,
        NewPassword: this.NewPassword.NewPassword
      }
      await this.thisUserPasswordUpdate(dataPass)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Пароль был успешно изменен!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log({error})
        this.updateLoading('fail')
        this.$notify({
          message: `Пароль изменить не удалось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      this.updateLoading('done')
    },

  },
  async mounted() {
    //console.log(this.getProfile.Children[0])
  }
}
</script>

<style scoped>

</style>