<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Галерея</h4>
        <p class="category">Создать фото</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-25 md-small-size-50">
            <md-field class="text-center">
              <label for="teachers">По дате</label>
              <md-select v-model="sortDataValue" name="sortData" id="sortData">
                <md-option v-for="sort in sortData" :key="sort.order" :value="sort.order">{{sort.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-25 md-small-size-50">
              <md-autocomplete v-model="sortChildValue" :md-options="childsNames">
                <label>Ученик</label>
              </md-autocomplete>
              <!--<label for="teachers">По ученикам</label>
              <md-select v-model="sortChildValue" name="sortChilds" id="sortChilds">
                <md-option v-for="sort in sortChilds" :key="sort.order" :value="sort.order">{{sort.name}}</md-option>
              </md-select>-->
          </div>
          <div class="md-layout-item md-size-25 md-small-size-50">
            <md-field class="text-center">
              <label for="teachers">По курсам</label>
              <md-select v-model="sortCourseValue" name="sortCourse" id="sortCourse">
                <md-option v-for="sort in sortCourse" :key="sort.order" :value="sort.order">{{sort.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-25 md-small-size-50">
            <md-field class="text-center">
              <label for="teachers">По группам</label>
              <md-select v-model="sortGroupValue" name="sortGroup" id="sortGroup">
                <md-option v-for="sort in sortGroup" :key="sort.order" :value="sort.order">{{sort.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-just-icon" @click="createGalleryModal = true">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-table md-card v-if="galleryPaginated != null">
              <md-table-row>
                <md-table-head>Фото</md-table-head>
                <md-table-head>Имя фото</md-table-head>
                <md-table-head>Описание фото</md-table-head>
                <md-table-head>В избранном</md-table-head>
                <md-table-head>Удалить</md-table-head>
              </md-table-row>
              <md-table-row
                v-for="item in galleryPaginated" :key="item.id">
                <md-table-cell>
                  <img
                    :src="(item.image.length < 2) ? loading : `${config.FILE_SERVER}${item.image}`"
                    alt="Raised Image"
                    class="img-raised rounded img-size"
                  />
                </md-table-cell>
                <md-table-cell>{{ item.name }}</md-table-cell>
                <md-table-cell>{{ item.description }}</md-table-cell>
                <md-table-cell>
                  <md-icon v-if="item.islike">thumb_up</md-icon>
                  <md-icon v-else>thumbs_up_down</md-icon>
                </md-table-cell>
                <md-table-cell>
                  <md-button class="md-just-icon md-simple md-danger" @click="deleteGalleryPrev(item)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Удалить</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <pagination
              v-model="pagePagination"
              @input="paginationClick"
              :page-count="pageCount">
            </pagination>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <!-- GALLERY ADD MODAL -->
    <modal v-if="createGalleryModal" @close="createGalleryModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Добавление фото</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="createGalleryModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <label for="name">Имя фото</label>
            <md-input v-model="name" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Описание фото</label>
            <md-input v-model="description" name="description"></md-input>
          </md-field>
          <md-autocomplete class="md-layout-item md-size-50" v-model="selectedChild" :md-options="childsNames">
            <label>Ученик</label>
          </md-autocomplete>
          <md-field class="md-layout-item md-size-50">
            <md-input type="file" id="file" name="file" single></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="createGalleryPrev">Добавить</md-button>
        <md-button class="md-danger md-simple" @click="createGalleryModal = false">Отмена</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import configFile from '../../../config'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FileApi from '../../../http/FileApi'
import { Modal, Pagination } from '@/components'
import axios from 'axios'
export default {
  name: "admin-alerts",
  components: {
    Modal,
    Pagination
  },
  data() {
    return {
      config: configFile,
      pagePagination: 1,
      sortDataValue: 1,
      sortChildValue: '',
      sortCourseValue: 0,
      sortGroupValue: 0,
      sortData: [
        {name: 'Сначала старые', order: 0},
        {name: 'Сначала новые', order: 1}
      ],
      sortChilds: [
        {name: 'Все', order: 0}
      ],
      sortCourse: [
        {name: 'Все', order: 0}
      ],
      sortGroup: [
        {name: 'Все', order: 0}
      ],
      selectedChild: null,
      childsNames: [],
      loading: require('@/assets/img/load.gif'),
      createGalleryModal: false,
      childid: null,
      groupid: null,
      courseid: null,
      name: null,
      description: null,
      image: ''
    }
  },
  computed: {
    ...mapGetters(['getProfile', 'allChilds', 'allGallery', 'allCourses']),
    pageCount(sorted) {
      return Math.ceil(this.galleryFiltered.length / 10)
    },
    galleryPaginated() {
      let paginated = []
      let gallery = this.galleryFiltered
      gallery.forEach((gallery, index) => {
        if (this.pagePagination == 1) {
          if(index < 10) paginated.push(gallery)
        } else {
          if(index >= (this.pagePagination*10-10) && index < this.pagePagination*10) paginated.push(gallery)
        }
      })
      return paginated
    },
    galleryFiltered() {
      let filter = {
        sortDataValue: this.sortDataValue,
        sortChildValue: this.sortChildValue,
        sortCourseValue: this.sortCourseValue,
        sortGroupValue: this.sortGroupValue
      }
      this.filterGallery(filter)
      return this.allGallery
    }
  },
  methods: {
    ...mapActions(['getAllChilds', 'getAllGallery', 'deleteGallery', 'getAllCourses', 'getAllTimeTables', 'createGallery']),
    ...mapMutations(['filterGallery', 'updateLoading']),
    async paginationClick() {
      //console.log('paginationClick')
      //await this.loadPhoto()
    },
    async loadCourses() {
      this.allCourses.forEach(course => {
        let newCourse = {
          name: course.name,
          order: course.id
        }
        this.sortCourse.push(newCourse)
      })
    },
    async deleteGalleryPrev(item) {
      this.updateLoading('start')
      await this.deleteGallery({id: item.id})
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Фото было успешно удалено!`,
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
          message: `Фото удалить не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async createGalleryPrev() {
      //console.log('start')
      this.updateLoading('start')
      let child = null
      //console.log(this.allChilds.childs)
      this.allChilds.childs.forEach(ch => {
        if (`${ch.surname} ${ch.name} ${ch.middlename}` == this.selectedChild) {
          child = ch
          //console.log(child)
        }
      })
      //Загрузка фотографии
      let fileName = null
      if (child == null) {
        this.updateLoading('fail')
        //console.log('Ребенок не найден')
        return;
      }
      if (this.allGallery[0] == undefined) {
        fileName = `ID1`
      } else {
        let maxid = 1
        this.allGallery.forEach(gal => {
          if (gal.id > maxid) {
            maxid = gal.id
          }
        })
        fileName= `ID${maxid+1}`
      }
      var file = document.querySelector('#file').files[0];

      await FileApi({method: 'upload', name: fileName, file: file})
      .then(response => {
        this.image = response
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
        //console.log('err createGallery')
        this.updateLoading('fail')
        this.$notify({
          message: `Фото на файловый сервер загрузить не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })

      let gallery = {
        image: this.image,
        name: this.name,
        description: this.description,
        format: this.image.slice(this.image.search('\\.')),
        ChildId: child.id,
        CourseId: child.Course.id
      }
      //console.log(gallery)
      this.updateLoading('start')
      await this.createGallery(gallery)
      .then(res => {
        this.createGalleryModal = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Фото былы успешно создано!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log(error.response.data)
        this.updateLoading('fail')
        this.$notify({
          message: `Фото создать не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    }
  },
  async mounted() {
    this.updateLoading('start')
    await this.getAllGallery()
    .then(res => {

    })
    .catch(err => {
      
    })
    this.updateLoading('done')
    await this.getAllChilds()
    .then(childs => {
      this.childsNames = []
      //console.log(childs)
      childs.forEach(child => {
        let children = {
          name: `${child.surname} ${child.name} ${child.middlename}`,
          order: child.id
        }
        this.childsNames.push(children.name)
        this.sortChilds.push(children)
      })
    })
    .catch(error => {
      //console.log(error)
    })

    await this.getAllTimeTables()
    .then(timetables => {
      timetables.forEach(group => {
        let gr = {
          name: `${group.name} ${group.day} ${group.timestart} ${group.timefinish}`,
          order: group.id
        }
        this.sortGroup.push(gr)
      })
    })
    .catch(error => {})

    if (this.allCourses.length == 0) await this.getAllCourses()
    await this.loadCourses()
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
.modal-mask {
  z-index: 11;
}
.button-top-margin {
  margin-top: 20px;
}
.pagination {
  align-items: center;
  justify-content: center;
}
</style>