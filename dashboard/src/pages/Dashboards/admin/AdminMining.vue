<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <nav-tabs-card>
          <template slot="content">
            <md-tabs
              md-alignment="left">
              <md-tab id="tab-new" md-label="Новые">
                <div class="text-center">
                </div>
                <md-table>
                  <md-table-row>
                    <md-table-head>Статус</md-table-head>
                    <md-table-head>Желаемое дата и время</md-table-head>
                    <md-table-head>ФИО ученика</md-table-head>
                    <md-table-head>ФИО и телефон Родителя</md-table-head>
                    <md-table-head>Курс и филиал</md-table-head>
                    <md-table-head>Действие</md-table-head>
                  </md-table-row>
                  <md-table-row v-for="item in allMinings" :key="item.id">
                    <md-table-cell>
                      {{item.Schedule.commit}}, {{item.status}}
                    </md-table-cell>
                    <md-table-cell>
                      {{item.date.slice(0, 10)}}, {{item.time}}
                    </md-table-cell>
                    <md-table-cell>
                      {{item.Schedule.Childschedule.Child.surname}} {{item.Schedule.Childschedule.Child.name}} {{item.Schedule.Childschedule.Child.middlename}}
                    </md-table-cell>
                    <md-table-cell>
                      {{item.Schedule.Childschedule.Child.User.surname}} {{item.Schedule.Childschedule.Child.User.name}} {{item.Schedule.Childschedule.Child.User.middlename}}
                      {{item.Schedule.Childschedule.Child.User.phone}}
                    </md-table-cell>
                    <md-table-cell>
                      {{item.Schedule.Childschedule.Course.name}}  {{item.Schedule.TimeTable.Filial.name}}
                    </md-table-cell>
                    <md-table-cell>
                      <md-button class="md-just-icon md-simple md-danger" @click.stop="miningOpen(item)">
                        <md-icon>build</md-icon>
                        <md-tooltip md-direction="bottom">Отработка</md-tooltip>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>

    <!-- CHILD SCHEDULE INFO MODAL -->
    <modal v-if="childMiningModal">
      <template slot="header">
        <h4 class="modal-title">Подтверждение отработки</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childMiningModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <div class="md-layout-item md-size-100">
            <div class="md-layout">
              <md-field class="md-layout-item md-xsmall-size-100 md-size-33">
                <label for="check">Состояние</label>
                <md-select v-model="mining.status" name="check" id="check">
                  <md-option v-for="check in checkVariants" :key="check" :value="check">{{check}}</md-option>
                </md-select>
              </md-field>
              <md-field class="md-layout-item md-xsmall-size-100 md-size-33">
                <label for="courses">Филиал</label>
                <md-select v-model="mining.FilialId" name="filials" id="filials">
                  <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                    {{item.name}}
                  </md-option>
                </md-select>
              </md-field>
              <md-field class="md-layout-item md-size-25">
                <label for="selectedTime">Время</label>
                <md-input v-model="mining.time" name="selectedTime"></md-input>
              </md-field>
              <div class="md-layout-item md-xsmall-size-100 md-size-33">
                <md-datepicker v-model="mining.date">
                  <label>Дата</label>
                </md-datepicker>
              </div>
              <md-field class="md-layout-item md-xsmall-size-50 md-size-33">
                <label for="courses">Курс</label>
                <md-select v-model="mining.CourseId" name="courses" id="courses">
                  <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                    {{item.name}}
                  </md-option>
                </md-select>
              </md-field>
              <md-field class="md-layout-item md-xsmall-size-50 md-size-33" >
                <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
              </md-field>
              <md-field class="md-layout-item md-xsmall-size-100 md-size-33">
                <label for="courses">Группы</label>
                <md-select v-model="mining.TimeTableId" name="groups" id="groups">
                  <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                    {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="childMiningModal = false">Отмена</md-button>
        <md-button class="md-success md-simple" @click.stop="editMiningPrev(mining)">Сохранить</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import {Modal, NavTabsCard, NavTabsTable} from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "admin-mining",
  components: {
    Modal,
    NavTabsCard, 
    NavTabsTable
  },
  data() {
    return {
      childMiningModal: false,
      mining: {
        MiningId: null,
        ScheduleId: null,
        status: null,
        FilialId: null,
        date: null,
        CourseId: null,
        TimeTableId: null,
        time: null
      },
      checkVariants: [
        'Ожидает подтверждения',
        'Назначена отработка'
      ],
      selectedFilial: null,
      ignore: false
    }
  },
  computed: {
    ...mapGetters(['allMinings', 'allFilials', 'allCourses', 'allTimeTables', 'allChilds', 'allTeachers']),
    groupsFiltered() {
      let timetables = []
      if (!this.ignore) {
        this.allTimeTables.forEach(timetable => {
          timetable.Courses.forEach(course => {
            if (course.id == this.mining.CourseId) timetables.push(timetable)
          })
        })
      } else {
        timetables = this.allTimeTables
      }
      timetables = timetables.filter(timetable => this.mining.FilialId == timetable.FilialId)
      return timetables
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions(['getAllMinings', 'updatingScheduleOtrabs']),
    async editMiningPrev(info) {
      this.updateLoading('start')
      let mining = {
        check: info.check,
        TimeTableId: info.TimeTableId,
        ScheduleId: info.ScheduleId,
        date: info.date,
        status: info.status,
        MiningId: info.MiningId,
        time: info.time
      }
      await this.updatingScheduleOtrabs(mining)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.childMiningModal = false
        this.$notify({
          message: `Отработка назначена успешно!`,
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
          message: `Отработка не была назначена! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    miningOpen(info){
      //console.log(info)
      this.mining.MiningId = info.id
      this.mining.status = info.status
      this.mining.ScheduleId = info.ScheduleId
      this.mining.FilialId = info.Schedule.TimeTable.FilialId
      this.mining.date = info.date.slice(0, 10)
      this.mining.CourseId = info.Schedule.Childschedule.CourseId 
      this.mining.TimeTableId = info.Schedule.TimeTableId
      this.mining.time = info.time
      
      //console.log(this.mining)
      this.childMiningModal = true
    }
  },
  async mounted() {
    this.updateLoading('start')
    this.getAllMinings()
    //console.log(this.allMinings)
    this.updateLoading('done')
  }
}
</script>

<style scoped>
.mini-card-alert {
  border-radius: 5px;
  padding: 15px;
}
.mt-20 {
  margin-top: 30px;
}
</style>