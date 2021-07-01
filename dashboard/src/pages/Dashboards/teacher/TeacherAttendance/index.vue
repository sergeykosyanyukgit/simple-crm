<template>
  <div class="md-layout">
    <div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-20">
      <md-field class="text-center">
        <label for="filials">Филиал</label>
        <md-select v-model="filialsSet" name="filial" id="filial">
          <md-option v-for="filial in allFilials" :key="filial.id" :value="filial.id">{{filial.name}}</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-20">
      <md-field class="text-center">
        <label for="teachers">Преподаватель</label>
        <md-select v-model="teachersSet" name="teachers" id="teachers">
          <md-option value="0">Все</md-option>
          <md-option v-for="teacher in allTeachers" :key="teacher.id" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
        </md-select>
      </md-field>
    </div>
    <!--<div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-20" disabled>
      <md-datepicker v-model="date" @input="refreshTimeTable">
        <label>Показать:</label>
      </md-datepicker>
    </div>-->
    <div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-20">
      <md-field class="text-center">
        <label for="days">День недели</label>
        <md-select v-model="selectedDay" name="days" id="days">
          <md-option value="Все">Все</md-option>
          <md-option v-for="day in days" :key="day.day" :value="day.day">{{day.day}}</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-20 text-center">
      <md-switch class="mr-10" v-model="newTypeTimeTable" disabled></md-switch>
      <md-button class="md-just-icon mr-10" @click="TeacherShowInfo">
        <md-icon>attach_money</md-icon>
        <md-tooltip md-direction="top">Рассчитать зарплату</md-tooltip>
      </md-button>
      <md-button class="md-just-icon mr-10" @click="refreshTimeTable">
        <md-icon>refresh</md-icon>
        <md-tooltip md-direction="top">Обновить</md-tooltip>
      </md-button>
    </div>
    
    <div class="md-layout-item md-size-100" v-if="newTypeTimeTable">
      <TimeTableNew 
        :TimeTablesData="weekfiltered"
        v-on:loadTimeTableFullInfo="seeTimeTable"
        v-on:photoLoad="photoLoadPrev"
      />
    </div>


    <!-- PHOTO LOAD -->
    <modal v-if="photoLoad.modal" @close="photoLoad.modal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Загрузка фото</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="photoLoad.modal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout text-center">
          <md-field class="md-layout-item md-size-100">
            <label for="childs">Ученики для загрузки</label>
            <md-select v-model="photoLoad.ChildId" name="childs" id="childs" multiple>
              <md-option v-for="child in photoLoad.Children" :key="child.id" :value="child.id">{{child.surname}} {{child.name}} {{child.middlename}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="photoname">Название фото</label>
            <md-input v-model="photoLoad.name" name="photoname"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="photodesc">Описание фото</label>
            <md-input v-model="photoLoad.description" name="photodesc"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-100">
            <md-input type="file" id="file" name="file" single></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="photoLoad.modal = false">Отмена</md-button>
        <md-button class="md-success md-simple" @click="PhotoLoad">Загрузка</md-button>
      </template>
    </modal> 

    <!-- TEACHER SHOW MODAL -->
    <modal v-if="teacherShowModal" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">{{ teacherBuffer.surname }} {{ teacherBuffer.name }} {{ teacherBuffer.middlename }}</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="teacherShowModal = false, pay.fullinfo = null">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50" disabled>
            <label for="emailupdate">ЗП в час</label>
            <md-input v-model="pay.hours" name="emailupdate"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50" disabled>
            <label for="emailupdate">ЗП за ученика</label>
            <md-input v-model="pay.childs" name="emailupdate"></md-input>
          </md-field>
          <md-datepicker  class="md-layout-item md-size-50" v-model="pay.teacherPayStart">
            <label>Считать с:</label>
          </md-datepicker>
          <md-datepicker  class="md-layout-item md-size-50" v-model="pay.teacherPayEnd">
            <label>Считать по:</label>
          </md-datepicker>
          <div v-if="pay.fullinfo != null" class="md-layout-item md-size-100 md-layout">
            <div class="md-layout-item md-size-50">
              <h4>
                Итоговая зп:
                {{pay.fullinfo.salary}}₽
              </h4>
            </div>
            <div class="md-layout-item md-size-50">
              <md-button class="md-success" @click="createTableTest(pay.fullinfo)/*teacherCreateReport(mathTeacherPay)*/">
                Создать отчет
              </md-button>
            </div>
          </div>
          <div class="md-layout-item md-layout">
            <div class="md-layout-item md-size-100">
              <md-button class="md-success" @click="mathPay(teacherBuffer)/*teacherCreateReport(mathTeacherPay)*/">
                Рассчитать
              </md-button>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="teacherShowModal = false, pay.fullinfo = null">Закрыть</md-button>
      </template>
    </modal>

    <!-- TIMETABLE SEE MODAL -->
    <modal v-if="showSeeModal" @close="showSeeModal = false">
      <template slot="header">
        <h4 class="modal-title">Просмотр группы</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showSeeModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <md-content class="md-scrollbar">
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <div v-for="item in dayToEdit.Children" :key="item.id">
                <div class="md-layout md-elevation-3 md-children">
                  <div class="md-layout-item md-small-size-100 md-size-40">
                    <div>{{ item.surname }} {{ item.name }} {{ item.middlename }}, {{(((date.getTime() - new Date(item.age.substring(6,10), item.age.substring(3,5), item.age.substring(0,2))) / (24 * 3600 * 365.25 * 1000)) | 0).toFixed(0)}} лет</div>
                    <div>{{ item.Course.name }}</div>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-60">
                    <div v-for="cs in item.Childschedules" :key="cs.id">
                      <div v-for="(schedule, index) in cs.Schedules" :key="schedule.id">
                        <div class="md-layout" v-if="(cs.CourseId == item.CourseId && index == 0) || (index == 1 && dayToEdit.timelong == '3')">
                          <div v-if="index == 0" class="md-layout-item md-small-size-100 md-size-30">
                            <md-field>
                              <label for="check">Отметка</label>
                              <md-select v-model="schedule.check" name="check" id="check" disabled>
                                <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                              </md-select>
                            </md-field>
                          </div>
                          <div v-if="index == 0" class="md-layout-item md-small-size-100 md-size-30">
                            <md-field>
                              <label for="check">Провел</label>
                              <md-select v-model="schedule.UserId" name="teacher" id="teacher" disabled>
                                <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                              </md-select>
                            </md-field>
                          </div>
                          <div v-if="index == 0" class="md-layout-item md-small-size-100 md-size-40">
                            <div><a :href="schedule.Task.linkdocs" target="blank">{{schedule.Task.numbertask}}: {{schedule.Task.name}},</a></div>
                            <div v-if="cs.Schedules.length > 1 && dayToEdit.timelong == '3'">
                              <a :href="cs.Schedules[index+1].Task.linkdocs" target="blank">{{cs.Schedules[index+1].Task.numbertask}}: {{cs.Schedules[index+1].Task.name}}</a>
                            </div>
                            <div>
                              <md-button class="md-just-icon md-success" @click="scheduleSavePrev([schedule], 'Пройдено', getProfile.id, date)" :disabled="schedule.check=='Пройдено'">
                                <md-icon>done</md-icon>
                                <md-tooltip md-direction="top">Посещение 1.5ч</md-tooltip>
                              </md-button>
                              <md-button class="md-just-icon md-danger" @click="scheduleSavePrev([schedule], 'Пропущено', getProfile.id, date)" :disabled="schedule.check=='Пропущено'">
                                <md-icon>clear</md-icon>
                                <md-tooltip md-direction="top">Пропуск 1.5ч</md-tooltip>
                              </md-button>
                            </div>
                            <div>
                              <md-button class="md-just-icon md-success" 
                                v-if="dayToEdit.timelong == '3'" 
                                @click="scheduleSavePrev(cs.Schedules, 'Пройдено', getProfile.id, date)" 
                                :disabled="cs.Schedules[0].check=='Пройдено' && cs.Schedules[1].check=='Пройдено'">
                                <md-icon>looks_3</md-icon>
                                <md-tooltip md-direction="top">Посещение 3ч</md-tooltip>
                              </md-button>
                              <md-button class="md-just-icon md-danger" 
                                v-if="dayToEdit.timelong == '3'" 
                                @click="scheduleSavePrev(cs.Schedules, 'Пропущено', getProfile.id, date)" 
                                :disabled="cs.Schedules[0].check=='Пропущено' && cs.Schedules[1].check=='Пропущено'">
                                <md-icon>looks_3</md-icon>
                                <md-tooltip md-direction="top">Пропуск 3ч</md-tooltip>
                              </md-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- TRIAL -->
            <div class="md-layout-item md-size-100">
              <div v-for="item in dayToEdit.Trials" :key="item.id">
                <div v-if="item.date.substr(0, 10) == dayToEdit.date">
                <div class="md-layout md-elevation-3 md-children">
                  <div class="md-layout-item md-small-size-100 md-size-40">
                    {{ item.name }},
                    <span v-for="course in item.TrialCourses" :key="course.id">{{ course.Course.name }},</span>
                    Пробное занятие. В {{item.time}}
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-60">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-100">
                        {{ item.check }}, {{ item.commit }},
                        {{ item.description }}
                      </div>
                      <md-field class="md-layout-item md-small-size-100 md-size-33">
                        <label for="check">Отметка</label>
                        <md-select v-model="item.check" name="check" id="check" disabled>
                          <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                        </md-select>
                      </md-field>
                      <md-field class="md-layout-item md-small-size-100 md-size-33">
                        <label for="check">Провел</label>
                        <md-select v-model="item.UserId" name="teacher" id="teacher" disabled>
                          <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                        </md-select>
                      </md-field> 
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-button class="md-just-icon md-success" @click="trialSavePrev(item, 'Пройдено', getProfile.id)" :disabled="item.check=='Пройдено'">
                          <md-icon>done</md-icon>
                          <md-tooltip md-direction="top">Посещение</md-tooltip>
                        </md-button>
                        <md-button class="md-just-icon md-danger" @click="trialSavePrev(item, 'Пропущено', getProfile.id)" :disabled="item.check=='Пропущено'">
                          <md-icon>clear</md-icon>
                          <md-tooltip md-direction="top">Пропуск</md-tooltip>
                        </md-button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <!-- MINING -->
            <div class="md-layout-item md-size-100">
              <div v-for="item in dayToEdit.MiningTables" :key="item.id">
                <div v-if="item.date.substr(0, 10) == dayToEdit.date">
                <div class="md-layout md-elevation-3 md-children">
                  <div class="md-layout-item md-small-size-100 md-size-40">
                    <div>{{item.Schedule.Childschedule.Child.surname}} {{item.Schedule.Childschedule.Child.name}} {{item.Schedule.Childschedule.Child.middlename}}</div>
                    <div>{{item.Schedule.Task.Course.name}} {{item.Schedule.Childschedule.Child.phone}}</div>
                    <div>Отработка. В {{item.time}}</div>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-60">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-100">
                        {{ item.Schedule.check }}, {{ item.Schedule.commit }}
                        <a :href="item.Schedule.Task.linkdocs" target="blank">{{item.Schedule.Task.numbertask}}: {{item.Schedule.Task.name}}</a>
                      </div>
                      <md-field class="md-layout-item md-small-size-100 md-size-33" disabled>
                        <label for="check">Отметка</label>
                        <md-select v-model="item.Schedule.check" name="check" id="check">
                          <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                        </md-select>
                      </md-field>
                      <md-field class="md-layout-item md-small-size-100 md-size-33" disabled>
                        <label for="check">Провел</label>
                        <md-select v-model="item.Schedule.UserId" name="teacher" id="teacher">
                          <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                        </md-select>
                      </md-field> 
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-button class="md-just-icon md-success" @click="scheduleSavePrev([item.Schedule], 'Пройдено', getProfile.id, date)" :disabled="item.Schedule.check=='Пройдено'">
                          <md-icon>done</md-icon>
                          <md-tooltip md-direction="top">Посещение</md-tooltip>
                        </md-button>
                        <md-button class="md-just-icon md-danger" @click="scheduleSavePrev([item.Schedule], 'Пропущено', getProfile.id, date)" :disabled="item.Schedule.check=='Пропущено'">
                          <md-icon>clear</md-icon>
                          <md-tooltip md-direction="top">Пропуск</md-tooltip>
                        </md-button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </md-content>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="showSeeModal = false">Ок</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import TimeTableNew from './TimeTableNew'
import FileApi from '../../../../http/FileApi'
import {Modal} from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

export default {
  name: "group-timetable",
  components: {
    Modal,
    TimeTableNew
  },
  data() {
    return {
      TimeTablesData: [],
      newTypeTimeTable: true,
      childScheduleInfo: [],
      childEditingFull: {
        date: null,
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
      childScheduleInfoModal: false,
      selectedDay: 'Все',
      childEditing: {
        editSchedule: {
          checkVariants: [
            'Пройдено',
            'Не пройдено', 
            'Пропущено',
            'Назначена отработка'
          ],
          UserVariants: [],
        },
      },
      date: new Date(),
      selectedChildToAdd: null,
      groupNameToDelete: null,
      dayToEdit: null,
      isloaded: false,
      array: [],
      days: [
        { value: 'monday', day: 'Понедельник'},
        { value: 'tuesday', day: 'Вторник'},
        { value: 'wednesday', day: 'Среда'},
        { value: 'thursday', day: 'Четверг'},
        { value: 'friday', day: 'Пятница'},
        { value: 'saturday', day: 'Суббота'},
        { value: 'sunday', day: 'Воскресенье'}
      ],
      timelong: [
        '3',
        '1.5'
      ],
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
      group: {
        name: null,
        timestart: null,
        timefinish: null,
        day: null,
        maxsize: null,
        FilialId: null,
        courses: null,
        teachers: null,
        timelong: null
        //childs: []
      },
      courses: [],
      childs: [],
      childsNames: [],
      groups: [],
      week: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
      filials: [],
      filialsSet: 2,
      teachers: [],
      teachersSet: 0,
      showCreateGroupModal: false,
      showEditGroupModal: false,
      showDeleteDialog: false,
      showSeeModal: false,
      photoLoad: {
        modal: false,
        Children: [],
        name: null,
        description: null,
        ChildId: []
      },
      pay: {
        hours: 100,
        childs: 150,
        teacherPayStart: null,
        teacherPayEnd: null,
        fullinfo: null
      },
      teacherShowModal: false,
      teacherBuffer: null
    }
  },
  computed: {
    ...mapGetters(['allGallery', 'getProfile', 'allTeachers', 'allFilials', 'allTimeTables', 'allCourses']),
    dateToday() {
      return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
    },
    getWeekDay() {
      var day = this.date.getDay();
      if(day==0) return 7;
      else return day;  
    },
    thisWeek() {
      let week = []
      let dd = new Date(this.date)
      dd.setDate(this.date.getDate()-(this.getWeekDay-1));
        
      if (`${dd.getDate()}`.length == 1) {
        if (`${dd.getMonth()}`.length == 1)
          week.push(`${dd.getFullYear()}-0${dd.getMonth() + 1}-0${dd.getDate()}`)
        else 
          week.push(`${dd.getFullYear()}-${dd.getMonth() + 1}-0${dd.getDate()}`)
      } else {
        if (`${dd.getMonth()}`.length == 1)
          week.push(`${dd.getFullYear()}-0${dd.getMonth() + 1}-${dd.getDate()}`)
        else 
          week.push(`${dd.getFullYear()}-${dd.getMonth() + 1}-${dd.getDate()}`)
      }
      for (let i = 0; i < 6; i++) {
        dd.setDate(dd.getDate() + 1)
        if (`${dd.getDate()}`.length == 1) {
          if (`${dd.getMonth()}`.length == 1)
            week.push(`${dd.getFullYear()}-0${dd.getMonth() + 1}-0${dd.getDate()}`)
          else 
            week.push(`${dd.getFullYear()}-${dd.getMonth() + 1}-0${dd.getDate()}`)
        } else {
           if (`${dd.getMonth()}`.length == 1)
            week.push(`${dd.getFullYear()}-0${dd.getMonth() + 1}-${dd.getDate()}`)
          else 
            week.push(`${dd.getFullYear()}-${dd.getMonth() + 1}-${dd.getDate()}`)
        }
      }
      return week
    },
    weekfiltered() {
      let FilialFiltered = null
      if (this.selectedDay == 'Все') {
        FilialFiltered = {
          monday: this.week.monday.filter(this.filterFilialTeacher),
          tuesday: this.week.tuesday.filter(this.filterFilialTeacher),
          wednesday: this.week.wednesday.filter(this.filterFilialTeacher),
          thursday: this.week.thursday.filter(this.filterFilialTeacher),
          friday: this.week.friday.filter(this.filterFilialTeacher),
          saturday: this.week.saturday.filter(this.filterFilialTeacher),
          sunday: this.week.sunday.filter(this.filterFilialTeacher)
        }
      } else if (this.selectedDay == 'Понедельник') {
        FilialFiltered = {monday: this.week.monday.filter(this.filterFilialTeacher)}
      } else if (this.selectedDay == 'Вторник') {
        FilialFiltered = {tuesday: this.week.tuesday.filter(this.filterFilialTeacher)}
      } else if (this.selectedDay == 'Среда') {
        FilialFiltered = {wednesday: this.week.wednesday.filter(this.filterFilialTeacher)}
      } else if (this.selectedDay == 'Четверг') {
        FilialFiltered = {thursday: this.week.thursday.filter(this.filterFilialTeacher)}
      } else if (this.selectedDay == 'Пятница') {
        FilialFiltered = {friday: this.week.friday.filter(this.filterFilialTeacher)}
      } else if (this.selectedDay == 'Суббота') {
        FilialFiltered = {saturday: this.week.saturday.filter(this.filterFilialTeacher)}
      } else if (this.selectedDay == 'Воскресенье') {
        FilialFiltered = {sunday: this.week.sunday.filter(this.filterFilialTeacher)}
      }
      if(FilialFiltered.monday != undefined) FilialFiltered.monday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      if(FilialFiltered.tuesday != undefined) FilialFiltered.tuesday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      if(FilialFiltered.wednesday != undefined) FilialFiltered.wednesday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      if(FilialFiltered.thursday != undefined) FilialFiltered.thursday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      if(FilialFiltered.friday != undefined) FilialFiltered.friday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      if(FilialFiltered.saturday != undefined) FilialFiltered.saturday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      if(FilialFiltered.sunday != undefined) FilialFiltered.sunday.sort((a,b) => {
        if (a.timestart > b.timestart) return 1
        if (a.timestart < b.timestart) return -1
        return 0
      })
      
      return FilialFiltered
    },
    isChildToAdd() {
      if (this.selectedChildToAdd != null && this.selectedChildToAdd != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions(['getAllTeachers', 'getAllFilialsOnly', 'getAllCourses', 
    'createTimeTable', 'updateSchedule', 'editTrial', 'loadChildSchedules',
    'edittimetable', 'editChildSchedule', 'getAllGallery', 'createGallery',
    'getTeacherPayMini', 'getWeekInfo']),
    TeacherShowInfo() {
      this.teacherBuffer = this.getProfile
      let date1 = new Date()
      let date2 = new Date(date1.getFullYear(), date1.getMonth(), 1)
      let date3 = new Date(date1.getFullYear(), date1.getMonth() + 1, 0)
      this.pay.teacherPayStart = date2
      this.pay.teacherPayEnd = date3
      this.teacherShowModal = true
    },
    async mathPay(data) {
      let timestart = `${this.pay.teacherPayStart.getFullYear()}-`
      if(this.pay.teacherPayStart.getMonth()+1 < 10) timestart += `0${this.pay.teacherPayStart.getMonth()+1}-`
      else timestart += `${this.pay.teacherPayStart.getMonth()+1}-`
      if(this.pay.teacherPayStart.getDate() < 10) timestart += `0${this.pay.teacherPayStart.getDate()}T00:00:00.000Z`
      else timestart += `${this.pay.teacherPayStart.getDate()}T00:00:00.000Z`
      
      let timefinish = `${this.pay.teacherPayEnd.getFullYear()}-`
      if(this.pay.teacherPayEnd.getMonth()+1 < 10) timefinish += `0${this.pay.teacherPayEnd.getMonth()+1}-`
      else timefinish += `${this.pay.teacherPayEnd.getMonth()+1}-`
      if(this.pay.teacherPayEnd.getDate() < 10) timefinish += `0${this.pay.teacherPayEnd.getDate()}T00:00:00.000Z`
      else timefinish += `${this.pay.teacherPayEnd.getDate()}T00:00:00.000Z`

      //console.log(timestart)
      //console.log(timefinish)
      let dataInfo = {
        id: data.id,
        payhours: this.pay.hours,
        paychilds: this.pay.childs,
        timestart: timestart,
        timefinish: timefinish
      }
      //console.log(dataInfo)
      this.updateLoading('start')
      await this.getTeacherPayMini(dataInfo)
      .then(res => {
        console.log(res.data.teacherResponse)
        this.pay.fullinfo = res.data.teacherResponse
        this.updateLoading('done')
      })
      .catch(error => {
        //console.log(error)
        this.updateLoading('fail')
      })
    },
    createTableTest(data) {
      let infoArr = []
      data.usedTimeTables.forEach(info => {
        let infoMini = []
        infoMini.push(`${info.date} в ${info.TimeTable.timestart}-${info.TimeTable.timefinish}`)
        infoMini.push(`${info.hours}`)
        infoMini.push(`${info.childs}`)
        let childs = ''
        info.Childrens.forEach(child => {
          if(child.status == undefined)
          childs += `${child.surname} ${child.name} ${child.middlename}\n` 
          else
          childs += `(Пробное) ${child.name}\n` 
        })
        infoMini.push(childs)
        infoArr.push(infoMini)
      })
      var docDefinition = {
        content: [
          {text: `Отчет о работе ${this.teacherBuffer.surname} ${this.teacherBuffer.name} ${this.teacherBuffer.middlename} за период с ${this.getNormalDate(this.pay.teacherPayStart)} по ${this.getNormalDate(this.pay.teacherPayEnd)}`, style: 'header'},
          {text: `Итоговая зп ${data.salary}₽`, style: 'subheader'},
          {
            style: 'tableExample',
            table: {
              body: [
                ['Дата и Время', 'Часы', 'Детей пришло', 'Дети'],
              ]
            }
          },
        ]
      }
      infoArr.forEach(info => {
        docDefinition.content[2].table.body.push(info)
      })
      pdfMake.vfs = pdfFonts.pdfMake.vfs
      pdfMake.createPdf(docDefinition).download();
      
    },
    getNormalDateToServer(date) {
      let timestart = `${date.getFullYear()}`

      if(date.getMonth() < 10){
        timestart += `-0${date.getMonth()+1}`
      }
      else
      {
        timestart += `-${date.getMonth()}`
      }

      if(date.getDate() < 10){
        timestart += `-0${date.getDate()}`
      }
      else
      {
        timestart += `-${date.getDate()}`
      } 
      return timestart
    },
    getNormalDate(date) {
      let timestart = ''
      if(date.getDate() < 10){
        timestart += `0${date.getDate()}.`
      }
      else
      {
        timestart += `${date.getDate()}.`
      } 
      if(date.getMonth() < 10){
        timestart += `0${date.getMonth()+1}`
      }
      else
      {
        timestart += `${date.getMonth()}`
      }
      timestart += `.${date.getFullYear()}`
      return timestart
    },
    async PhotoLoad() {
      let fileName = null
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
      if (this.photoLoad.ChildId.length == 0) {
        this.updateLoading('fail')
        this.$notify({
          message: `Нужно выбрать хоть одного ученика!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
        return;
      }
      let file = document.querySelector('#file').files[0];
      let image = null

      await FileApi({method: 'upload', name: fileName, file: file})
      .then(response => {
        image = response
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

      await this.photoLoad.ChildId.forEach(async ChildId => {
        let Child = this.photoLoad.Children.filter(child => child.id == ChildId)[0]
        //Создание ссылки на фото
        let gallery = {
          image: image,
          name: this.photoLoad.name,
          description: this.photoLoad.description,
          format: image.slice(image.search('\\.')),
          ChildId: ChildId,
          CourseId: Child.CourseId
        }
        //console.log(gallery)
        this.updateLoading('start')
        await this.createGallery(gallery)
        .then(res => {
          this.createGalleryModal = false
          //console.log(res)
          this.updateLoading('done')
          this.$notify({
            message: `Фото для ${Child.surname} ${Child.name} ${Child.middlename} успешно создано!`,
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
      })
      this.photoLoad.modal = false
    },
    async photoLoadPrev(day) {
      await this.getAllGallery()
      this.photoLoad.Children = [...day.Children]
      this.photoLoad.ChildId = []
      this.photoLoad.Children.forEach(child => {
        this.photoLoad.ChildId.push(child.id)
      })
      this.photoLoad.modal = true
    },
    async trialSavePrev(item, status, UserId) {
      item.check = status
      item.UserId = UserId
      this.updateLoading('start')
      let trialToSave = {
        id: null,
        UserId: null,
        TimeTableId: null,
        FilialId: null,
        CourseId: null,
        res: null,
        Labeled: null,
        check: null,
        ChildId: null,
        phone: null,
        description: null,
        name: null,
        time: null,
        comment: null,
        parentname: null
      }
      trialToSave.id = item.id
      trialToSave.UserId = UserId
      trialToSave.TimeTableId = item.TimeTableId
      trialToSave.FilialId = this.filialsSet
      trialToSave.CourseId = []
      item.TrialCourses.forEach(course => {
        trialToSave.CourseId.push(course.Course.id)
      })
      trialToSave.res = item.res
      if(item.date != null ) trialToSave.Labeled = item.date.substr(0, 10)
      else trialToSave.Labeled = null
      trialToSave.check = status
      trialToSave.commit = item.commit
      trialToSave.ChildId = item.ChildId
      trialToSave.phone = item.phone
      trialToSave.description = item.description
      trialToSave.name = item.name
      trialToSave.time = item.time
      trialToSave.comment = item.comment
      trialToSave.parentname = item.parentname
      await this.editTrial(trialToSave)
      .then(res => {
        this.updateLoading('done')
        this.$notify({
          message: `Готово!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Ошибка! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async scheduleSavePrev(schedules, status, UserId, date) {
      this.updateLoading('start')
      schedules.forEach(async schedule => {
        schedule.check = status
        schedule.UserId = UserId
        let sc = {
          id: schedule.id,
          check: status,
          UserId: UserId,
          TimeTableId: this.dayToEdit.id,
          date: this.getNormalDateToServer(date)
        }

        await this.updateSchedule(sc)
        .then(res => {
          this.updateLoading('done')
          this.$notify({
            message: `Готово!`,
            icon: 'check',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
        })
        .catch(error => {
          this.updateLoading('fail')
          this.$notify({
            message: `Ошибка! ${error.response.data}!`,
            icon: 'close',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
      })
    },
    filterFilialTeacher(day) {
      if (day.day == 'Понедельник') day.date = this.thisWeek[0]
      else if (day.day == 'Вторник') day.date = this.thisWeek[1]
      else if (day.day == 'Среда') day.date = this.thisWeek[2]
      else if (day.day == 'Четверг') day.date = this.thisWeek[3]
      else if (day.day == 'Пятница') day.date = this.thisWeek[4]
      else if (day.day == 'Суббота') day.date = this.thisWeek[5]
      else if (day.day == 'Воскресенье') day.date = this.thisWeek[6]
      if (day.FilialId == this.filialsSet) {
        if (this.teachersSet == 0) return true
        else {
          let ret = false
          day.Users.forEach(teacher => {
            if (teacher.id == this.teachersSet) ret = true
          })
          return ret
        }
      }
      return false
    },
    seeTimeTable(day) {
      console.log(day)
      this.showSeeModal = true
      this.dayToEdit = day
    },
    optimizationGroup(data) {
      let timeTables = []
      data.forEach(filial => {
        filial.TimeTables.forEach(TimeTable => {
          timeTables.push(TimeTable)
        })
      })
      this.week.monday = []
      this.week.tuesday = []
      this.week.wednesday = []
      this.week.thursday = []
      this.week.friday = []
      this.week.saturday = []
      this.week.sunday = []
      timeTables.forEach(group => {
        if (group.day == 'Понедельник')
        {
          this.week.monday.push(group)
        }
        if (group.day == 'Вторник')
        {
          this.week.tuesday.push(group)
        }
        if (group.day == 'Среда')
        {
          this.week.wednesday.push(group)
        }
        if (group.day == 'Четверг')
        {
          this.week.thursday.push(group)
        }
        if (group.day == 'Пятница')
        {
          this.week.friday.push(group)
        }
        if (group.day == 'Суббота')
        {
          this.week.saturday.push(group)
        }
        if (group.day == 'Воскресенье')
        {
          this.week.sunday.push(group)
        }
      });
      this.isloaded = true
    },
    async refreshTimeTable() {
      this.updateLoading('start')
      let tt = {
        datestart: this.thisWeek[0],
        datefinish: this.thisWeek[this.thisWeek.length-1]
      }
      console.log(tt)
      await this.getWeekInfo(tt)
      .then(res => {
        this.TimeTablesData = res
      })
      .catch(err => console.log(err))
      this.optimizationGroup(this.TimeTablesData)
      this.updateLoading('done')
    },
  },
  async mounted() {
    this.updateLoading('start')
    await this.getAllFilialsOnly()
    await this.getAllTeachers()
    .then(res => {
      this.allTeachers.forEach(teacher => {
        this.childEditing.editSchedule.UserVariants.push(teacher)
      })
    })
    .catch(err => {})

    let tt = {
      datestart: this.thisWeek[0],
      datefinish: this.thisWeek[this.thisWeek.length-1]
    }
    await this.getWeekInfo(tt)
    .then(res => {
      this.TimeTablesData = res
    })
    .catch(err => console.log(err))
    this.optimizationGroup(this.TimeTablesData)
    this.allTeachers.forEach(teacher => {
      if(`${this.getProfile.name} ${this.getProfile.middlename}` == `${teacher.name} ${teacher.middlename}`) {
        this.teachersSet = teacher.id
      }
    })
    console.log(this.getProfile)
    this.updateLoading('done')
  }
}
</script>

<style scoped>
</style>