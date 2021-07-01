<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Обучающие курсы</h4>
        <p class="category">Просмотреть курсы</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>

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
  </div>
</template>

<script>
import configfile from '../../../config'
import { Modal } from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "teacher-courses",
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
      courseNameToDelete: '',
      courseToDelete: null,
      loading: require('@/assets/img/load.gif'),
      courses: [],
      image: null,
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
    ...mapActions(['getAllCourses']),
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
          message: `Задачку курса изменить не получилось! ${error.response.data}!`,
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
          message: `Задачку курса создать не получилось! ${error.response.data}!`,
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
          message: `Задачку курса удалить не получилось! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async seeCourse(course) {
      this.courseToSee = course
      this.seeCourseModal = true
    }
  },
  async mounted() {
    this.updateLoading('start')
    await this.getAllCourses()
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