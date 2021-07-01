<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <nav-tabs-card>
        <template slot="content">
          <md-tabs md-alignment="left">
            <md-tab id="tab-home" md-label="Панель">
              <div class="md-layout">
                <div v-for="theme in allThemeDashboard" :key="theme.id" class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-30 md-size-20 text-center">
                  <md-card class="md-card-custom" :style="{ backgroundImage: 'url(' + config.FILE_SERVER + theme.profileimage + ')' }">
                    <md-card-content class="md-just-icon md-elevation-3 height">
                      <div class="md-layout">
                        <h3 class="md-layout-item md-size-100">
                          {{theme.name}}
                        </h3>
                      </div>
                      <md-button :disabled="theme.selected == 'true'" @click="selectedPrev(theme.id)">Use</md-button>
                      <md-button @click="editThemePrev(theme)">Edit</md-button>
                    </md-card-content>
                  </md-card>
                </div>

                <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-30 md-size-20 text-center">
                  <md-card class="md-card-custom orange-card">
                    <md-card-content class="md-just-icon md-elevation-3 height">
                      <md-button class="md-just-icon" @click="addThemeDashboardModal = true">
                        <md-icon>add</md-icon>
                        <md-tooltip md-direction="bottom">Добавить тему</md-tooltip>
                      </md-button>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
            </md-tab>

            <md-tab id="tab-teachers" md-label="Лендинг">
              Управление лендингом
            </md-tab>

          </md-tabs>
        </template>
      </nav-tabs-card>
    </div>

    <!--addThemeDashboardModal-->
    <modal v-if="addThemeDashboardModal">
      <template slot="header">
        <h4 class="modal-title">Создание темы для панели администратора</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="addThemeDashboardModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <md-content class="md-scrollbar">
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label for="name">Название темы</label>
                <md-input v-model="ThemeDashboard.name" name="name"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <md-input type="file" id="file" name="file" single></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 element-center">
              <div>
                <p>Светлый оттенок элементов</p>
                <chrome-picker v-model="ElementColorLight"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 element-center">
              <div>
                <p>Темный оттенок элементов</p>
                <chrome-picker v-model="ElementColorDark"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 element-center">
              <div>
                <p>Цвет тени элементов</p>
                <chrome-picker v-model="ElementColorShadow"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 mt-20 element-center">
              <div>
                <p>Цвет кнопок</p>
                <chrome-picker v-model="ButtonColor"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 mt-20 element-center">
              <div>
                <p>Цвет тени кнопок</p>
                <chrome-picker v-model="ButtonColorShadow"/>
              </div>
            </div>
          </div>
        </md-content>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="addThemeDashboardModal = false">Отмена</md-button>
        <md-button class="md-success md-simple" @click="CreateThemeDashboardPrev">Создать</md-button>
      </template>
    </modal>
    
    <!--editThemeModal-->
    <modal v-if="editThemeModal">
      <template slot="header">
        <h4 class="modal-title">Обновление темы для панели администратора</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editThemeModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <md-content class="md-scrollbar">
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label for="name">Название темы</label>
                <md-input v-model="ThemeDashboard.name" name="name"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <md-input type="file" id="file" name="file" single></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 element-center">
              <div>
                <p>Светлый оттенок элементов</p>
                <chrome-picker v-model="ElementColorLight"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 element-center">
              <div>
                <p>Темный оттенок элементов</p>
                <chrome-picker v-model="ElementColorDark"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 element-center">
              <div>
                <p>Цвет тени элементов</p>
                <chrome-picker v-model="ElementColorShadow"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 mt-20 element-center">
              <div>
                <p>Цвет кнопок</p>
                <chrome-picker v-model="ButtonColor"/>
              </div>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 mt-20 element-center">
              <div>
                <p>Цвет тени кнопок</p>
                <chrome-picker v-model="ButtonColorShadow"/>
              </div>
            </div>
          </div>
        </md-content>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="editThemeModal = false">Отмена</md-button>
        <md-button class="md-success md-simple" @click="EditThemeDashboardPrev">Обновить</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { NavTabsCard, NavTabsTable, Pagination, Modal } from '@/components'
import FileApi from '../../../http/FileApi'
import configFile from '../../../config'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Chrome } from 'vue-color'
export default {
  components: {
    Modal,
    Pagination,
    NavTabsCard,
    NavTabsTable,
    'chrome-picker': Chrome
  },
  data() {
    return {
      editThemeModal: false,
      config: configFile,
      addThemeDashboardModal: false,
      ElementColorLight: {
        hex: '',
        rgba: {
          r: 0,
          g: 0,
          b: 0
        }
      },
      ElementColorDark: {
        hex: '',
        rgba: {
          r: 0,
          g: 0,
          b: 0
        }
      },
      ElementColorShadow: {
        r: 0,
        g: 0,
        b: 0
      },
      ButtonColor: {
        hex: '',
        rgba: {
          r: 0,
          g: 0,
          b: 0
        }
      },
      ButtonColorShadow: {
        r: 0,
        g: 0,
        b: 0
      },
      ColorVariants: [
        {value: 'md-primary', name: 'Фиолетовый'},
        {value: 'md-info', name: 'Голубой'},
        {value: 'md-success', name: 'Зеленый'},
        {value: 'md-warning', name: 'Оранжевый'},
        {value: 'md-danger', name: 'Красный'},
      ],
      ThemeDashboard: {
        id: null,
        name: null,
        profileimage: null,
        elementcolorlight: null,
        elementcolordark: null,
        elementcolorshadow: null,
        buttoncolor: null,
        buttoncolorshadow: null,
        selected: false
      },
      image: null
    }
  },
  computed: {
    ...mapGetters(['allThemeDashboard', 'selectedThemeDashboard']),
    selectedThemeDashboardCustomElement() {
      return `background: linear-gradient(60deg, ${this.selectedThemeDashboard.elementcolorlight}, ${this.selectedThemeDashboard.elementcolordark}) !important; box-shadow: 0 12px 20px -10px rgba(${this.selectedThemeDashboard.elementcolorshadow}, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(${this.selectedThemeDashboard.elementcolorshadow}, 0.2);`
    },
    selectedThemeDashboardCustomButton() {
      return `background-color: ${this.selectedThemeDashboard.buttoncolor} !important; box-shadow: 0 12px 20px -10px rgba(${this.selectedThemeDashboard.buttoncolorshadow}, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(${this.selectedThemeDashboard.buttoncolorshadow}, 0.2);`
    },
    ElementStyle () {
      return `background: linear-gradient(60deg, ${this.ElementColorLight.hex}, ${this.ElementColorDark.hex}); box-shadow: 0 12px 20px -10px rgba(${this.ElementColorShadow.r}, ${this.ElementColorShadow.g}, ${this.ElementColorShadow.b}, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(${this.ElementColorShadow.r}, ${this.ElementColorShadow.g}, ${this.ElementColorShadow.b}, 0.2);`
    },
    ButtonStyle () {
      return `background-color: ${this.ButtonColor.hex} !important; box-shadow: 0 12px 20px -10px rgba(${this.ButtonColorShadow.r}, ${this.ButtonColorShadow.g}, ${this.ButtonColorShadow.b}, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(${this.ButtonColorShadow.r}, ${this.ButtonColorShadow.g}, ${this.ButtonColorShadow.b}, 0.2);`
    },
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions(['getAllThemeDashboard', 'createThemeDashboard',
    'updateThemeDashboard', 'selectThemeDashboard', 'editThemeDashboard']),
    testColors() {
      //console.log(this.ElementColorLight)
    },
    async EditThemeDashboardPrev() {
      this.updateLoading('start')
      let fileName = null
      fileName = this.ThemeDashboard.name + ``
      let file = document.querySelector('#file').files[0]
      await FileApi({method: 'upload', name: fileName, file: file})
      .then(response => {
        this.image = response
        this.updateLoading('done')
        //console.log(response)
        this.ThemeDashboard.profileimage = this.image
        this.$notify({
          message: `Фото на файловый сервер было успешно загружено!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log('err createGallery')
        this.updateLoading('fail')
        this.ThemeDashboard.profileimage = null
        this.$notify({
          message: `Фото на файловый сервер загрузить не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      this.ThemeDashboard.elementcolorlight = this.ElementColorLight.hex
      this.ThemeDashboard.elementcolordark = this.ElementColorDark.hex
      if (this.ElementColorShadow.rgba == undefined)
        this.ThemeDashboard.elementcolorshadow = `${this.ElementColorShadow.r}, ${this.ElementColorShadow.g}, ${this.ElementColorShadow.b}`
      else
        this.ThemeDashboard.elementcolorshadow = `${this.ElementColorShadow.rgba.r}, ${this.ElementColorShadow.rgba.g}, ${this.ElementColorShadow.rgba.b}`
      this.ThemeDashboard.buttoncolor = this.ButtonColor.hex
      if (this.ButtonColorShadow.rgba == undefined)
        this.ThemeDashboard.buttoncolorshadow = `${this.ButtonColorShadow.r}, ${this.ButtonColorShadow.g}, ${this.ButtonColorShadow.b}`
      else 
        this.ThemeDashboard.buttoncolorshadow = `${this.ButtonColorShadow.rgba.r}, ${this.ButtonColorShadow.rgba.g}, ${this.ButtonColorShadow.rgba.b}`

      let theme = {
        id: this.ThemeDashboard.id,
        name: this.ThemeDashboard.name,
        profileimage: this.ThemeDashboard.profileimage,
        elementcolorlight: this.ThemeDashboard.elementcolorlight,
        elementcolordark: this.ThemeDashboard.elementcolordark,
        elementcolorshadow: this.ThemeDashboard.elementcolorshadow,
        buttoncolor: this.ThemeDashboard.buttoncolor,
        buttoncolorshadow: this.ThemeDashboard.buttoncolorshadow
      }

      this.updateLoading('start')
      await this.editThemeDashboard(theme)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.editThemeModal = false
        this.$notify({
          message: `Тема для панели была успешно отредактирована!`,
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
          message: `Тему для панели отредактировать не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    editThemePrev(theme) {
      //console.log(theme)

      this.ElementColorLight.hex = theme.elementcolorlight
      this.ElementColorDark.hex = theme.elementcolordark

      this.ElementColorShadow.r = theme.elementcolorshadow.split(', ')[0]
      this.ElementColorShadow.g = theme.elementcolorshadow.split(', ')[1]
      this.ElementColorShadow.b = theme.elementcolorshadow.split(', ')[2]

      this.ButtonColor.hex= theme.buttoncolor
      this.ButtonColorShadow.r = theme.buttoncolorshadow.split(', ')[0]
      this.ButtonColorShadow.g = theme.buttoncolorshadow.split(', ')[1]
      this.ButtonColorShadow.b = theme.buttoncolorshadow.split(', ')[2]

      this.ThemeDashboard.name = theme.name
      this.ThemeDashboard.id = theme.id

      this.editThemeModal = true
    },
    async CreateThemeDashboardPrev() {
      this.updateLoading('start')
      let fileName = null
      fileName = this.ThemeDashboard.name + ``
      let file = document.querySelector('#file').files[0]
      await FileApi({method: 'upload', name: fileName, file: file})
      .then(response => {
        this.image = response
        this.updateLoading('done')
        //console.log(response)
        this.ThemeDashboard.profileimage = this.image
        this.$notify({
          message: `Фото на файловый сервер было успешно загружено!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log('err createGallery')
        this.updateLoading('fail')
        this.ThemeDashboard.profileimage = null
        this.$notify({
          message: `Фото на файловый сервер загрузить не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      this.ThemeDashboard.elementcolorlight = this.ElementColorLight.hex
      this.ThemeDashboard.elementcolordark = this.ElementColorDark.hex
      if (this.ElementColorShadow.rgba == undefined)
        this.ThemeDashboard.elementcolorshadow = `${this.ElementColorShadow.r}, ${this.ElementColorShadow.g}, ${this.ElementColorShadow.b}`
      else
        this.ThemeDashboard.elementcolorshadow = `${this.ElementColorShadow.rgba.r}, ${this.ElementColorShadow.rgba.g}, ${this.ElementColorShadow.rgba.b}`
      this.ThemeDashboard.buttoncolor = this.ButtonColor.hex
      if (this.ButtonColorShadow.rgba == undefined)
        this.ThemeDashboard.buttoncolorshadow = `${this.ButtonColorShadow.r}, ${this.ButtonColorShadow.g}, ${this.ButtonColorShadow.b}`
      else 
        this.ThemeDashboard.buttoncolorshadow = `${this.ButtonColorShadow.rgba.r}, ${this.ButtonColorShadow.rgba.g}, ${this.ButtonColorShadow.rgba.b}`

      let theme = {
        name: this.ThemeDashboard.name,
        profileimage: this.ThemeDashboard.profileimage,
        elementcolorlight: this.ThemeDashboard.elementcolorlight,
        elementcolordark: this.ThemeDashboard.elementcolordark,
        elementcolorshadow: this.ThemeDashboard.elementcolorshadow,
        buttoncolor: this.ThemeDashboard.buttoncolor,
        buttoncolorshadow: this.ThemeDashboard.buttoncolorshadow
      }

      this.updateLoading('start')
      await this.createThemeDashboard(theme)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.addThemeDashboardModal = false
        this.$notify({
          message: `Новая тема для панели была успешно создана!`,
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
          message: `Новую тему для панели создать не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async selectedPrev(id) {
      this.updateLoading('start')
      await this.selectThemeDashboard({id: id})
      .then(response => {
        this.updateLoading('done')
        this.$notify({
          message: `Тема выбрана!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Тему выбрать не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      this.updateLoading('done')
      
      document.documentElement.style.setProperty('--custom-color-element-light-theme', `${this.selectedThemeDashboard.elementcolorlight}`);
      document.documentElement.style.setProperty('--custom-color-element-dark-theme', `${this.selectedThemeDashboard.elementcolordark}`);
      document.documentElement.style.setProperty('--custom-shadow-element-theme', `rgba(${this.selectedThemeDashboard.elementcolorshadow}, 0.4)`);

      document.documentElement.style.setProperty('--custom-color-button-theme', `${this.selectedThemeDashboard.buttoncolor}`);
      document.documentElement.style.setProperty('--custom-shadow-button-theme', `rgba(${this.selectedThemeDashboard.buttoncolorshadow}, 0.2)`);
    }
  },
  async mounted() {
    //console.log(this.config)
    this.updateLoading('start')
    if(this.allThemeDashboard.length == 0) await this.getAllThemeDashboard()
    this.updateLoading('done')
    //console.log(this.allThemeDashboard)
  }
}
</script>

<style scoped>
.md-card-custom {
  margin-top: 30px;
  margin-bottom: 5px;
}
.green-card {
  background: linear-gradient(60deg, #66bb6a, #43a047);
}
.orange-card {
  background: linear-gradient(60deg, #ffa726, #fb8c00);
}
.red-card {
  background: linear-gradient(60deg, #ef5350, #e53935);
}
.md-card-content {
  padding: 5px;
}
.height {
  padding: 50px;
  min-height: 600px;
  color:#ef5350;
}
.img-size {
  width: 70px;
  height: 120px;
}
</style>