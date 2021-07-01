<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Филиалы</h4>
        <p class="category">Вы можете добавить новый филиал здесь</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-just-icon" @click="createFilialModal = true">
              <md-icon>add</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-100">
            <md-table md-card v-if="allFilials != null">
              <md-table-row>
                <md-table-head>Фото</md-table-head>
                <md-table-head>Имя филиала</md-table-head>
                <md-table-head>Адрес филиала</md-table-head>
                <md-table-head>Телефон филиала</md-table-head>
                <md-table-head>Описание филиала</md-table-head>
                <md-table-head>Действия</md-table-head>
              </md-table-row>
              <md-table-row
                v-for="item in allFilials" :key="item.id">
                <md-table-cell>
                  <md-avatar class="md-avatar-icon  md-large">
                    <img
                      v-if="item.image != ''"
                      :src="item.image"
                      alt="Raised Image"
                      class="img-raised rounded img-size md-elevation-6"
                    />
                    <div class="separator" v-else>
                      {{item.name[0].toUpperCase()}}
                    </div>
                  </md-avatar>
                </md-table-cell>
                <md-table-cell>{{ item.name }}</md-table-cell>
                <md-table-cell>{{ item.addres }}</md-table-cell>
                <md-table-cell>{{ item.phone }}</md-table-cell>
                <md-table-cell>{{ item.description }}</md-table-cell>
                <md-table-cell>
                  <md-button class="md-just-icon md-simple md-success" @click="editFilial(item)">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                  </md-button>
                  <!--<md-button class="md-just-icon md-simple md-danger" @click="deleteFilialModal = true/*deleteFilial(item)*/">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="bottom">Удалить</md-tooltip>
                  </md-button>-->
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>
      </md-card-content>
    </md-card>

  <!-- FILIAL DELETE MODAL -->
    <modal v-if="deleteFilialModal" @close="deleteFilialModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Удаление филиала</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="deleteFilialModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field>
            <label for="name">Введите имя филиала</label>
            <md-input v-model="filial.name" name="name"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="deleteCheckFilial">Удалить</md-button>
        <md-button class="md-success md-simple" @click="deleteFilialModal = false">Отмена</md-button>
      </template>
    </modal>

    <!-- FILIAL ADD MODAL -->
    <modal v-if="createFilialModal" @close="createFilialModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Добавление филиала</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="createFilialModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <label for="name">Введите имя филиала</label>
            <md-input v-model="filial.name" ></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="addres">Адрес филиала</label>
            <md-input v-model="filial.addres" name="addres"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="phone">Номер для связи</label>
            <md-input v-model="filial.phone" name="phone"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Краткое описание</label>
            <md-input v-model="filial.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="coordx">Координата X</label>
            <md-input v-model="filial.coordsX" name="coordx"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="coordy">Координата Y</label>
            <md-input v-model="filial.coordsY" name="coordy"></md-input>
          </md-field>
          <!--<md-field>
            <md-input type="file" id="file" name="file" single></md-input>
          </md-field>-->
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="createSaveFilial(filial)">Добавить</md-button>
        <md-button class="md-danger md-simple" @click="createFilialModal = false">Отмена</md-button>
      </template>
    </modal>

    <!-- FILIAL EDIT MODAL -->
    <modal v-if="editFilialModal" @close="editFilialModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Редактировать филиал</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editFilialModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <label for="name">Введите имя филиала</label>
            <md-input v-model="filial.name" placeholder="Название филиала"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="addres">Адрес филиала</label>
            <md-input v-model="filial.addres" name="addres"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="phone">Номер для связи</label>
            <md-input v-model="filial.phone" name="phone"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Краткое описание</label>
            <md-input v-model="filial.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="coordx">Координата X</label>
            <md-input v-model="filial.coordsX" name="coordx"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="coordy">Координата Y</label>
            <md-input v-model="filial.coordsY" name="coordy"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="updateSaveFilial(filial)">Редактировать</md-button>
        <md-button class="md-danger md-simple" @click="editFilialModal = false">Отмена</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import FileApi from '../../../http/FileApi'
import {Modal} from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "admin-alerts",
  components: {
    Modal
  },
  data() {
    return {
      loading: require('@/assets/img/load.gif'),
      deleteFilialModal: false,
      createFilialModal: false,
      editFilialModal: false,
      filial: {
        id: 0,
        name: null,
        addres: null,
        phone: null,
        description: null,
        coordsX: null,
        coordsY: null,
        image: ''
      },
    }
  },
  computed: {
    ...mapGetters([{user: 'getProfile'}, 'allFilials'])
  },
  methods: {
    ...mapActions(['getAllFilials', 'updateFilial', 'deleteFilial', 'createFilial']),
    ...mapMutations(['updateLoading']),
    deleteCheckFilial() {
      this.allFilials.forEach(async filial => {
        if (filial.name == this.filial.name) {
          this.deleteFilialModal = false
          this.updateLoading('start')
          await this.deleteFilial({id: filial.id})
          .then(res => {
            //console.log(res)
            this.updateLoading('done')
            this.$notify({
              message: `Филиал был успешно удален!`,
              icon: 'check',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'warning'
            })
          })
          .catch(error => {
            //console.log(error)
            this.updateLoading('fail')
            this.$notify({
              message: `Филиал отредактировать не получилось! ${error}!`,
              icon: 'close',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
          })
        }
      })
    },
    editFilial(item) {
      this.filial.id = item.id
      this.filial.name = item.name
      this.filial.addres = item.addres
      this.filial.phone = item.phone
      this.filial.description = item.description
      this.filial.coordsX = item.coordsX
      this.filial.coordsY = item.coordsY
      this.filial.image = item.image
      this.editFilialModal = true
    },
    async updateSaveFilial(filial) {
      this.updateLoading('start')
      await this.updateFilial(filial)
      .then(res => {
        this.editFilialModal = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Филиал был успешно отредактирован!`,
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
          message: `Филиал отредактировать не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async createSaveFilial(filial) {
      //console.log(filial)
      let filialToCreate = {
        name: filial.name,
        description: filial.description,
        image: filial.image,
        addres: filial.addres,
        phone: filial.phone,
        coordsX: filial.coordsX,
        coordsY: filial.coordsY
      }
      this.updateLoading('start')
      await this.createFilial(filialToCreate)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.createFilialModal = false
        this.$notify({
          message: `Филиал был успешно создан!`,
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
          message: `Филиал создать не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
  },
  async mounted() {
    this.updateLoading('start')
    if(this.allFilials.length == 0) await this.getAllFilials()
    this.updateLoading('done')
  }
}
</script>

<style scoped>
.fix {
  min-width: 115ch;
}
.img-size {
  width: 70px;
}
</style>