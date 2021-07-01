<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Посещаемость</h4>
        <p class="category">Здесь вы можете узнать сколько курсов пройдено, расписание пробных и обычных занятий</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout" v-if="getProfile.Children">
          <div class="md-layout-item md-small-size-100 md-size-100 children-card md-elevation-6" v-for="children in getProfile.Children" :key="children.id">
            <div class="md-layout">
              <div class="md-layout-item md-size-50 md-small-size-100">
                <h3>
                  <img
                    v-if="children.profileimage != ''"
                    :src="`${config.FILE_SERVER}${children.profileimage}`"
                    alt="Raised Image"
                    class="img-size-profile md-elevation-6"
                  />
                  <md-avatar v-else class="md-avatar-icon ">
                    <div class="separator">
                      {{children.surname[0].toUpperCase()}}
                    </div>
                  </md-avatar>
                  <!--Следующее занятие 2019-12-31 в 10:00-->
                </h3>
                <h4>
                  {{children.surname}} {{children.name}} {{children.middlename}}
                </h4>
                <h4>
                  {{children.phone}}
                  Текущий курс: {{children.Course.name}}
                </h4>
                <h4 v-for="trial in children.Trials" :key="trial.id">
                  <div>
                    Пробное занятие: на {{trial.Course.name}}: {{trial.date.slice(0, 10)}} в {{trial.TimeTable.timestart}}
                  </div>
                  <div>
                    ({{trial.description}}): {{trial.check}}, {{trial.commit}}
                  </div>
                </h4>
              </div>
              <div class="md-layout-item md-size-50 md-small-size-100">
                <div v-for="Childschedules in children.Childschedules" :key="Childschedules.id">
                  <div v-for="stats in childCourseStatus" :key="stats.ChildschedulesId">
                    <div v-if="stats.ChildschedulesId == Childschedules.id">
                      <md-button @click="childSchedule(Childschedules.Schedules)">{{Childschedules.Course.name}}</md-button>
                      <div>Пройдено занятий в курсе:{{stats.visitAndPay}}/24</div>
                      <!--<div>Пройдено неоплаченных занятий:{{stats.visitAndNoPay}}</div>-->
                      <div>Осталось оплаченных занятий в этом месяце:{{stats.noVisitAndPay}}</div>
                      <div>Пропущено занятий:{{stats.missAndPay}}</div>
                      <div class="md-layout mt-20">
                        <md-progress-bar class="md-layout-item md-size-33"
                          :class="{'green': stats.progress[0].commit == 8, 'red': stats.progress[0].commit < 8}"
                          :md-value="stats.progress[0].check/8*100">
                        </md-progress-bar>
                        <md-progress-bar class="md-layout-item md-size-33"
                          :class="{'green': stats.progress[1].commit == 8, 'red': stats.progress[1].commit < 8}"
                          :md-value="stats.progress[1].check/8*100">
                        </md-progress-bar>
                        <md-progress-bar class="md-layout-item md-size-33"
                          :class="{'green': stats.progress[2].commit == 8, 'red': stats.progress[2].commit < 8}"
                          :md-value="stats.progress[2].check/8*100">
                        </md-progress-bar>
                      </div>
                      <h3 v-if="children.Course.id == Childschedules.Course.id">
                        Следующая оплата должна быть не позднее
                        <span v-if="Childschedules.Schedules[0].date.slice(8, 10) < 15">10 числа</span>
                        <span v-else>25 числа</span>
                      </h3>
                      <!--<div v-for="mounth in stats.mounth" :key="mounth.name" class="mt-20">
                        {{mounth.name}} 
                        <md-progress-bar md-mode="buffer" :md-value="mounth.value/mounth.max*100" :md-buffer="mounth.buffer/mounth.max*100"></md-progress-bar>
                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <!-- CHILD SCHEDULE INFO MODAL -->
    <modal v-if="childScheduleInfoModal">
      <template slot="header">
        <h4 class="modal-title">Посещаемость</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childScheduleInfoModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
            <div v-if="childEditing.editScheduleActiveOtrab" class="md-layout-item md-size-100">
              <div class="md-layout">
                <div class="md-layout-item md-size-50">
                  <md-datepicker v-model="selectedLabeled">
                    <label>Дата отработки</label>
                  </md-datepicker>
                </div>
                <md-field class="md-layout-item md-size-50">
                  <label for="timefinish">Время время</label>
                  <md-select v-model="selectedTime" name="timefinish" id="timefinish">
                    <md-option v-for="time in times" :key="time" :value="time">{{time}}</md-option>
                  </md-select>
                </md-field>

                <div class="md-layout-item md-size-100">
                  <md-button class="md-danger" @click.stop="childEditing.editScheduleActiveOtrab = false">
                    Отмена
                  </md-button>
                  <md-button class="md-success" @click.stop="CreateMining(childEditing)">
                    Отправить запрос
                  </md-button>
                </div>
              </div>
            </div>
          <md-table class="md-layout-item md-size-100">
            <md-table-row>
              <md-table-head md-numeric>№</md-table-head>
              <md-table-head>Отметка</md-table-head>
              <md-table-head>Задание</md-table-head>
              <md-table-head>Группа</md-table-head>
              <md-table-head>Провел</md-table-head>
              <md-table-head>Дата</md-table-head>
              <md-table-head>Оплатили</md-table-head>
            </md-table-row>

            <md-table-row v-for="schedule in childScheduleInfo" :key="schedule.id">
              <md-table-cell md-numeric>{{schedule.Task.numbertask}}</md-table-cell>
              <md-table-cell>{{schedule.check}}</md-table-cell>
              <md-table-cell>{{schedule.Task.Course.name}}: {{schedule.Task.name}}</md-table-cell>
              <md-table-cell>{{schedule.TimeTable.Filial.name}} {{schedule.TimeTable.name}} {{schedule.TimeTable.day}} {{schedule.TimeTable.timestart}} - {{schedule.TimeTable.timefinish}}</md-table-cell>
              <md-table-cell v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</md-table-cell>
              <md-table-cell v-else>Не проведено</md-table-cell>
              <md-table-cell>{{schedule.date.slice(0, 10)}}</md-table-cell>
              <md-table-cell>{{schedule.commit}}</md-table-cell>
              <md-table-cell>
                <md-button v-if="schedule.check == 'Пропущено'" class="md-just-icon md-simple md-danger" @click.stop="updateScheduleOtrab(schedule)">
                  <md-icon>build</md-icon>
                  <md-tooltip md-direction="bottom">Отработка</md-tooltip>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="childScheduleInfoModal = false">Ок</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import configFile from '../../../config'
import format from 'date-fns/format'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {Modal} from '@/components'
export default {
  name: "user-course",
  components: {
    Modal
  },
  data() {
    return {
      config: configFile,
      selectedLabeled: null,
      selectedTime: null,
      times: [
        '8:00',
        '8:30',
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00'
      ],
      date: new Date(),
      childCourseStatus: [],
      childScheduleInfoModal: false,
      childScheduleInfo: null,
      nextOccupation: [],
      childEditing: {
        addMoney: false,
        addTrial: false,
        editChild: false,
        editSchedule: {
          showModal: false,
          schedule: null,
          check: null,
          checkVariants: [
            'Пройдено',
            'Не пройдено', 
            'Пропущено',
            'Назначена отработка'
          ],
          commit: null,
          commitVariants: [
            'Оплачено',
            'Не оплачено'
          ],
          User: null,
          UserVariants: [],
        },
        editScheduleActive: false,
        editScheduleActiveOtrab: false
      },
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    ...mapActions(['createMining']),
    ...mapMutations(['updateLoading']),
    async CreateMining(schedule) {
      let mining = {
        ScheduleId: schedule.editSchedule.schedule.id,
        date: format(this.selectedLabeled, this.$material.locale.dateFormat || 'yyyy-MM-dd'),
        time: this.selectedTime,
      }
      this.childEditing.editScheduleActiveOtrab = false
      //console.log(mining)
      this.updateLoading('start')
      await this.createMining(mining)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Заявка на назначение отработки - отправлена успешно!`,
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
          message: `Заявка не была создана! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    updateScheduleOtrab(schedule) {
      this.childEditing.editSchedule.schedule = schedule
      this.childEditing.editScheduleActive = false
      this.childEditing.editScheduleActiveOtrab = true
      //console.log(this.childEditing.editSchedule.schedule)
    },
    childSchedule(info) {
      //console.log(info)
      this.childScheduleInfo = info
      this.childScheduleInfoModal = true
    },
  },
  created() {
    if(this.getProfile.Children)
    this.getProfile.Children.forEach(children => {
      children.Childschedules.forEach(schedule => {
        let occupation = {
          id: children.id,
          info: null
        }
        let count = {
          ChildschedulesId: schedule.id,
          visitAndPay: 0,
          visitAndNoPay: 0,
          noVisitAndPay: 0,
          missAndPay: 0,
          mounth: [],
          progress: [
            {
              commit: 0,
              check: 0
            },
            {
              commit: 0,
              check: 0
            },
            {
              commit: 0,
              check: 0
            }
          ]
        }
        let mounth = []
        schedule.Schedules.forEach((sc, current) => {
          
          //console.log(sc)
          let filtered = mounth.filter(m => sc.date.slice(5, 7) == m.filter)
          if (current < 8) {
            if (sc.commit == "Оплачено")  count.progress[0].commit++
            if (sc.check == "Пройдено")  count.progress[0].check++
          } else if (current < 16) {
            if (sc.commit == "Оплачено")  count.progress[1].commit++
            if (sc.check == "Пройдено")  count.progress[1].check++
          } else if (current < 24) {
            if (sc.commit == "Оплачено")  count.progress[2].commit++
            if (sc.check == "Пройдено")  count.progress[2].check++
          }

          if (filtered.length == 0){
            let mm = {
              name: new Date(sc.date).toLocaleString('ru', { month: 'long' }),
              filter: sc.date.slice(5, 7),
              value: 0,
              buffer: 0,
              max: 1
            }
            if (sc.commit == "Оплачено" && sc.check == "Пройдено") {
              mm.value++
            }
            if (sc.commit == "Оплачено" && sc.check == "Не пройдено") {
              mm.buffer++
            }
            mounth.push(mm)
          } else {
            if (sc.commit == "Оплачено" && sc.check == "Пройдено") {
              filtered[0].value++
            }
            if (sc.commit == "Оплачено" && sc.check == "Не пройдено") {
              filtered[0].buffer++
            }
            filtered[0].max++
          }
          if (sc.commit == "Оплачено" && sc.check == "Пройдено") {
            count.visitAndPay++;
          }
          if (sc.commit == "Не оплачено" && sc.check == "Пройдено") {
            count.visitAndNoPay++;
          }
          if (sc.commit == "Оплачено" && sc.check == "Не пройдено" && format(this.date, this.$material.locale.dateFormat || 'yyyy-MM-dd').slice(5, 7) == sc.date.slice(5, 7)) {
            count.noVisitAndPay++;
          }
          if (sc.commit == "Оплачено" && sc.check == "Пропущено") {
            count.missAndPay++;
          }
        })
        count.mounth = mounth
        //console.log(mounth)
        this.childCourseStatus.push(count)
      })
    })
  }
}
</script>

<style scoped>
.md-layout > .md-progress-bar {
  padding-left: 0 !important;
}
.img-size-profile {
  border-radius: 10px;
  width: 50%;
}
.children-card {
  min-height: 150px;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>