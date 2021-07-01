<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Обучающие курсы</h4>
        <p class="category">Создать, удалить, просмотреть курсы</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-just-icon" @click="createCourseModal = true">
              <md-icon>add</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout">
              <div 
              v-for="item in allCourses" 
              :key="item.id"
              class="md-layout-item md-xsmall-size-100 md-small-size-40 md-size-30 md-card-custom md-elevation-4">
                <img :src="`${config.FILE_SERVER}${item.image}`" alt="Cover" class="md-card-custom-image">
                <div class="md-card-custom-content">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-80">
                      <h3>{{item.name}}</h3>
                      <h4>{{item.description}}</h4>
                    </div>
                    <div class="md-layout-item md-size-20 text-center like-center">
                      <md-button class="md-just-icon" @click="seeCourse(item)">
                        <md-icon>remove_red_eye</md-icon>
                      </md-button>
                      <md-button class="md-just-icon" @click="updateCoursePrev(item)">
                        <md-icon>edit</md-icon>
                      </md-button>
                      <!--<md-button class="md-just-icon" @click="deleteCoursePrev(item)">
                        <md-icon>delete</md-icon>
                      </md-button>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-just-icon md-success" @click="createCourseModal = true">
              <md-icon>add</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-100">
            <md-table md-card v-if="courses != null">
              <md-table-row>
                <md-table-head>Фото</md-table-head>
                <md-table-head>Название</md-table-head>
                <md-table-head>Описание</md-table-head>
                <md-table-head>Действия</md-table-head>
              </md-table-row>
              <md-table-row
                v-for="item in courses" :key="item.id">
                <md-table-cell>
                  <img
                    :src="(item.image.length < 50) ? loading : item.image"
                    alt="Raised Image"
                    class="img-raised rounded img-size"
                  />
                </md-table-cell>
                <md-table-cell>{{ item.name }}</md-table-cell>
                <md-table-cell>{{ item.description }}</md-table-cell>
                <md-table-cell>
                  <md-button class="md-just-icon md-simple md-danger" @click="seeCourse(item)">
                    <md-icon>remove_red_eye</md-icon>
                    <md-tooltip md-direction="top">Просмотреть</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-simple md-danger" @click="updateCourse(item)">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Редактировать</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-simple md-danger" @click="deleteCoursePrev(item)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Удалить</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>-->
        </div>
      </md-card-content>
    </md-card>

    <!-- COURSE EDIT MODAL -->
    <modal v-if="editCourseModal" @close="editCourseModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Редактирование курса</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editCourseModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <label for="name">Название курса</label>
            <md-input v-model="courseToEdit.name" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Описание курса</label>
            <md-input v-model="courseToEdit.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="name">Номер занятия</label>
            <md-input v-model="newTask.numbertask" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Имя занятия</label>
            <md-input v-model="newTask.name" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Описание занятия</label>
            <md-input v-model="newTask.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Ссылка на документ</label>
            <md-input v-model="newTask.linkdocs" name="description"></md-input>
          </md-field>
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-success" 
              @click="addTask(newTask)" 
              :disabled="!(newTask.name!= null && newTask.description!= null && newTask.numbertask!= null && newTask.linkdocs!= null)"
              v-if="!editedTask">
              Создать занятие
            </md-button>
            <md-button class="md-success" 
              @click="editSaveTask(newTask)" 
              v-if="editedTask">
              Сохранить изменения
            </md-button>
            <md-button class="md-danger" @click="abortEdit" v-if="editedTask">
              Отмена
            </md-button>
          </div>
        </div>
        <md-table class="table-size" v-model="courseToEdit.Tasks" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }" class="text-left">
            <md-table-cell md-label="Номер">{{ item.numbertask }}</md-table-cell>
            <md-table-cell md-label="Имя/Ссылка">
              <a :href="item.linkdocs" target="blank">{{ item.name }}</a>
            </md-table-cell>
            <md-table-cell md-label="Описание">{{ item.description }}</md-table-cell>
            <md-table-cell md-label="Действия">
              <md-button class="md-just-icon md-danger md-simple" @click="editTask(item)">
                <md-icon>edit</md-icon>
              </md-button>
              <md-button class="md-just-icon md-danger md-simple" @click="deleteTaskPrev(item)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="editCourse(courseToEdit)">Сохранить</md-button>
        <md-button class="md-danger md-simple" @click="editCourseModal = false">Закрыть</md-button>
      </template>
    </modal>

    <!-- COURSE SEE MODAL -->
    <modal v-if="seeCourseModal" @close="seeCourseModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Просмотр курса {{courseToSee.name}}</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="seeCourseModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <h4 class="modal-title">{{courseToSee.description}}</h4>
        <md-table class="table-size" v-model="courseToSee.Tasks" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }" class="text-left">
            <md-table-cell md-label="Номер">{{ item.numbertask }}</md-table-cell>
            <md-table-cell md-label="Имя/Ссылка">
              <a :href="item.linkdocs" target="blank">{{ item.name }}</a>
            </md-table-cell>
            <md-table-cell md-label="Описание">{{ item.description }}</md-table-cell>
          </md-table-row>
        </md-table>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="seeCourseModal = false">Ок</md-button>
      </template>
    </modal>

    <!-- COURSE ADD MODAL -->
    <modal v-if="createCourseModal" @close="createCourseModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Добавление нового курса</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="createCourseModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <label for="name">Название курса</label>
            <md-input v-model="course.name" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="description">Описание курса</label>
            <md-input v-model="course.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-100">
            <md-input type="file" id="file" name="file" single></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="createCoursePrev">Добавить</md-button>
        <md-button class="md-danger md-simple" @click="createCourseModal = false">Отмена</md-button>
      </template>
    </modal>

    <!-- COURSE DELETE MODAL -->
    <modal v-if="deleteCourseModal" @close="deleteCourseModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Удаление курса</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="deleteCourseModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field>
            <md-input v-model="courseNameToDelete" placeholder="Введите название курса"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="deleteCheckCourse">Удалить</md-button>
        <md-button class="md-success md-simple" @click="deleteCourseModal = false">Отмена</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import configfile from '../../../config'
import FileApi from '../../../http/FileApi'
import { Modal } from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "admin-courses",
  components: {
    Modal
  },
  data() {
    return {
      config: configfile,
      editedTask: false,
      editCourseModal: false,
      courseToEdit: {
        id: null,
        name: null,
        description: null,
        image: null,
        Tasks: []
      },
      newTask: {
        id: null,
        name: null,
        description: null,
        numbertask: null,
        linkdocs: null
      },
      seeCourseModal: false,
      courseToSee: null,
      deleteCourseModal: false,
      courseNameToDelete: '',
      courseToDelete: null,
      loading: require('@/assets/img/load.gif'),
      courses: [],
      image: null,
      createCourseModal: false,
      course: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters(['allCourses'])
  },
  methods: {
    ...mapActions(['createCourse', 'deleteCourse', 'updateCourse', 'deleteTask', 'edittask', 'createtask', 'getAllCourses']),
    ...mapMutations(['updateLoading']),
    abortEdit() {
      //console.log('Aborted Edit')
      this.newTask.id = null
      this.newTask.name = null
      this.newTask.description = null
      this.newTask.numbertask = null
      this.newTask.linkdocs = null
      this.editedTask = false
    },
    editTask(task) {
      //console.log(task)
      this.newTask.id = task.id
      this.newTask.name = task.name
      this.newTask.description = task.description
      this.newTask.numbertask = task.numbertask
      this.newTask.linkdocs = task.linkdocs
      this.editedTask = true
    },
    async editSaveTask(task) {
      this.updateLoading('start')
      //console.log(task)
      await this.edittask(task)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.courseToEdit.Tasks = this.allCourses.find(item => item.id == this.courseToEdit.id).Tasks
        //console.log(this.courseToEdit.Tasks)
        this.newTask.id = null
        this.newTask.name = null
        this.newTask.description = null
        this.newTask.numbertask = null
        this.newTask.linkdocs = null
        this.editedTask = false
        this.$notify({
          message: `Задачка курса была успешно изменена!`,
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
          message: `Задачку курса изменить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async addTask(task) {
      task.CourseId = this.courseToEdit.id
      this.updateLoading('start')
      //console.log(task)
      let taskCreatePrev= {
        name: task.name,
        description: task.description,
        numbertask: task.numbertask,
        linkdocs: task.linkdocs,
        CourseId: task.CourseId
      }
      await this.createtask(taskCreatePrev)
      .then(res => {
        this.updateLoading('done')
        this.courseToEdit.Tasks = this.allCourses.find(item => item.id == this.courseToEdit.id).Tasks
        this.newTask.id = null
        this.newTask.numbertask++
        this.newTask.name = null
        this.newTask.description = null
        this.newTask.numbertask = null
        this.newTask.linkdocs = null
        this.$notify({
          message: `Задачка курса была успешно создана!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Задачку курса создать не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async deleteTaskPrev(task) {
      this.updateLoading('start')
      await this.deleteTask({id: task.id})
      .then(res => {
        //console.log(res)
        this.updateLoading('done')

        this.courseToEdit.Tasks = this.allCourses.find(item => item.id == this.courseToEdit.id).Tasks
        //console.log(this.courseToEdit.Tasks)
        this.$notify({
          message: `Задачка курса была успешно удалена!`,
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
          message: `Задачку курса удалить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async updateCoursePrev(course) {
      this.courseToEdit.name = course.name
      this.courseToEdit.description = course.description
      this.courseToEdit.id = course.id
      this.courseToEdit.image = course.image
      this.courseToEdit.Tasks = course.Tasks
      this.editCourseModal = true
    },
    async seeCourse(course) {
      this.courseToSee = course
      this.seeCourseModal = true
    },
    async deleteCheckCourse() {
      if (this.courseToDelete.name == this.courseNameToDelete) {
        this.updateLoading('start')
        await this.deleteCourse({id: this.courseToDelete.id})
        .then(res => {
          //console.log(res)
          this.updateLoading('done')
          this.deleteCourseModal = false
          this.$notify({
            message: `Курс был успешно удален!`,
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
            message: `Курс удалить не получилось! ${error}!`,
            icon: 'close',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
      }
    },
    deleteCoursePrev(course) {
      this.deleteCourseModal = true
      this.courseToDelete = course
    },
    async createCoursePrev() {
      this.updateLoading('start')
      //Загрузка фотографии
      let fileName = `CourseID${this.allCourses.length+1}`
      var file = document.querySelector('#file').files[0];

      await FileApi({method: 'upload', name: fileName, file: file})
      .then(response => {
        this.image = response
        this.updateLoading('done')
        this.updateLoading('start')
        this.$notify({
          message: `Фото ${this.image}, было успешно загружено!`,
          icon: 'cloud_done',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        //console.log('createGallery')
        this.updateLoading('fail')
        this.updateLoading('start')
        this.$notify({
          message: `Фото, для курса загрузить не удалось! ${error}!`,
          icon: 'cloud_off',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      let course = {
        name: this.course.name,
        description: this.course.description,
        image: this.image
      }
      await this.createCourse(course)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.createCourseModal = false
        this.$notify({
          message: `Курс был успешно создан!`,
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
          message: `Курс создать не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async editCourse(item) {
      this.updateLoading('start')
      let courseToUpdate = {
        id: item.id,
        name: item.name,
        description: item.description
      }
      await this.updateCourse(courseToUpdate)
      .then(res => {
        //console.log(res)
        this.editCourseModal = false
        this.updateLoading('done')
        this.$notify({
          message: `Курс ${res.data.name}, был успешно изменен!`,
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
          message: `Курс изменить не получилось! ${error}!`,
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
    if (this.AllCourses == null){
      await this.getAllCourses()
      .then(res => {})
      .catch(async err => {
        if(err == null) {
          await this.getAllCourses()
        }
      })
    }
    this.updateLoading('done')
  }
}
</script>

<style scoped>
.img-size {
  width: 70px;
}
.md-card-custom {
  margin: 15px auto;
  border-radius: 3px;
  padding-left: 0;
  padding-right: 0;
}
.md-card-custom-image {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.md-card-custom-content {
  padding: 20px;
}
</style>