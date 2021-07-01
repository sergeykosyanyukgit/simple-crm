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
    <div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-20">
      <md-datepicker v-model="date">
        <label>Показать:</label>
      </md-datepicker>
    </div>
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
      <md-button class="md-just-icon" @click="addGroup">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="top">Новая группа</md-tooltip>
      </md-button>
      <md-button class="md-just-icon mr-10" @click="refreshTimeTable">
        <md-icon>refresh</md-icon>
        <md-tooltip md-direction="top">Обновить</md-tooltip>
      </md-button>
    </div>
    <div class="md-layout-item md-size-100" v-if="isloaded">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 text-center" v-for="(fullday, name, index) in weekfiltered" :key="fullday.id">
          <h5 v-if="Object.keys(weekfiltered).length > 1">{{days[index].day}}</h5>
          <!--<h5>{{thisWeek[index]}}</h5>-->
          <div v-if="day.show != false && day.name != 'Пробное'">
            <md-card md-with-hover v-for="day in fullday" :key="day.id"
            class="md-card-custom"
            v-bind:class="{
              'green-card': day.Children.length <= 4,
              'orange-card': day.Children.length > 4 && day.Children.length <= 6,
              'red-card': day.Children.length > 6
            }">
              <md-card-content class="md-elevation-3" @click="TimeTableSelect(day)">
                <h3 class="card-item">{{day.name}}:{{day.Children.length}}/{{day.maxsize}}
                  <!--<span v-if="day.Trials.filter(trial => trial.check == `Не пройдено`).length > 0">
                    +{{day.Trials.filter(trial => trial.check == `Не пройдено`).length}}
                  </span>-->
                </h3>
                <h4 class="card-item">{{day.timestart}}-{{day.timefinish}}</h4>
                <h4 class="card-item">{{day.date}}</h4>
                <h5 class="card-item"><span v-for="course in day.Courses" :key="course.id">{{course.name}} </span></h5>
                <h5 class="card-item"><span v-for="teacher in day.Users" :key="teacher.id">{{teacher.name}} </span>
                  <div>
                    <md-chip class="md-primary" v-if="day.Trials.filter(days => days.date.slice(0, 10) == day.date).length > 0">
                      <md-tooltip md-direction="top">Пробные занятия</md-tooltip>
                      {{day.Trials.filter(days => days.date.slice(0, 10) == day.date).length}}
                    </md-chip>
                    <md-chip class="md-accent" v-if="day.Schedules.filter(days => days.date.substr(0, 10) == day.date).length > 0">
                      <md-tooltip md-direction="top">Отработки</md-tooltip>
                      <span v-if="day.timelong == 3">{{day.Schedules.filter(days => days.date.substr(0, 10) == day.date).length/2}}</span>
                      <span v-else>{{day.Schedules.filter(days => days.date.substr(0, 10) == day.date).length}}</span>
                    </md-chip>
                  </div>
                </h5>
                <div class="card-item">
                  <md-button class="md-just-icon md-simple md-primary" @click="loadTimeTableFullInfo(day)/*seeTimeTable(day)*/">
                    <md-icon>remove_red_eye</md-icon>
                    <md-tooltip md-direction="bottom">Просмотреть</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-simple md-primary" @click="updateTimeTable(day)">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-simple md-primary" @click="deleteTimeTablePrev(day)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="bottom">Удалить</md-tooltip>
                  </md-button>
                </div>
              </md-card-content>
            </md-card>
          </div>
          <div v-if="day.show != false && day.name == 'Пробное' && day.Trials.filter(days => days.date.slice(0, 10) == day.date).length > 0">
            <md-card md-with-hover v-for="day in fullday" :key="day.id"
            class="md-card-custom red-card mini-card">
              <md-card-content class="md-elevation-3" @click="TimeTableSelect(day)">
                <h3 class="card-item">{{day.name}}:{{day.Trials.filter(days => days.date.slice(0, 10) == day.date).length}}</h3>
                <h4 class="card-item">{{day.timestart}}</h4>
                <h4 class="card-item">{{day.date}}</h4>
                <h5 class="card-item"><span v-for="course in day.Courses" :key="course.id">{{course.name}} </span></h5>
                <h5 class="card-item"><span v-for="teacher in day.Users" :key="teacher.id">{{teacher.name}} </span></h5>
                <md-button class="md-just-icon md-simple md-primary" @click="loadTimeTableFullInfo(day)/*seeTimeTable(day)*/">
                  <md-icon>remove_red_eye</md-icon>
                  <md-tooltip md-direction="bottom">Просмотреть</md-tooltip>
                </md-button>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </div>

    <!-- CHILD SCHEDULE INFO MODAL -->
    <modal v-if="childScheduleInfoModal" class="z-up">
      <template slot="header">
        <h4 class="modal-title">Посещаемость {{childScheduleInfo.surname}} {{childScheduleInfo.name}} {{childScheduleInfo.middlename}}</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click.stop="childScheduleInfoModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <div v-if="childEditingFull.editScheduleActive" class="md-layout-item md-size-100">
            <div class="md-layout">
              <md-field class="md-layout-item md-size-25">
                <label for="check">Отметка</label>
                <md-select v-model="childEditingFull.editSchedule.check" name="check" id="check">
                  <md-option v-for="check in childEditingFull.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                </md-select>
              </md-field>
              <md-field class="md-layout-item md-size-25">
                <label for="check">Провел</label>
                <md-select v-model="childEditingFull.editSchedule.User.id" name="teacher" id="teacher">
                  <md-option v-for="teacher in childEditingFull.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                </md-select>
              </md-field>
              <md-field class="md-layout-item md-size-25">
                <label for="check">Оплатили</label>
                <md-select v-model="childEditingFull.editSchedule.commit" name="commit" id="commit">
                  <md-option v-for="commit in childEditingFull.editSchedule.commitVariants" :key="commit" :value="commit">{{commit}}</md-option>
                </md-select>
              </md-field>
              <md-datepicker class="md-layout-item md-size-25" v-model="childEditingFull.editSchedule.date">
                <label>Дата проведения</label>
              </md-datepicker>
              <div class="md-layout-item md-size-100">
                <md-button class="md-danger" @click.stop="childEditingFull.editScheduleActive = false">
                  Отмена
                </md-button>
                <md-button class="md-success" @click.stop="editSchedulePrev()">
                  Сохранить
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
    
            <md-table-row v-for="schedule in childScheduleInfo.Childschedules[childScheduleInfo.Childschedules.length-1].Schedules" :key="schedule.id">
              <md-table-cell md-numeric>{{schedule.Task.numbertask}}</md-table-cell>
              <md-table-cell>{{schedule.check}}</md-table-cell>
              <md-table-cell>{{schedule.Task.Course.name}}: {{schedule.Task.name}}</md-table-cell>
              <md-table-cell>{{schedule.TimeTable.Filial.name}} {{schedule.TimeTable.name}} {{schedule.TimeTable.day}} {{schedule.TimeTable.timestart}} - {{schedule.TimeTable.timefinish}}</md-table-cell>
              <md-table-cell v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</md-table-cell>
              <md-table-cell v-else>Не проведено</md-table-cell>
              <md-table-cell>{{schedule.date.slice(0, 10)}}</md-table-cell>
              <md-table-cell>{{schedule.commit}}</md-table-cell>
              <md-table-cell>
                <md-button class="md-just-icon md-simple md-success" @click.stop="updateScheduleFull(schedule)">
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="bottom">Исправить</md-tooltip>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click.stop="childScheduleInfoModal = false">Ок</md-button>
      </template>
    </modal>

    <!-- TIMETABLE ADD MODAL -->
    <modal v-if="showCreateGroupModal" @close="showCreateGroupModal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Добавление группы</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showCreateGroupModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="groupname">Название группы</label>
            <md-input v-model="group.name" name="groupname"></md-input>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="groupsize">Размер группы</label>
            <md-input v-model="group.maxsize" name="groupsize" type="number"></md-input>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="day">День занятий</label>
            <md-select v-model="group.day">
              <md-option v-for="day in days" :key="day.day" :value="day.day">{{day.day}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="timestart">Время начала</label>
            <md-select v-model="group.timestart" name="timestart" id="timestart">
              <md-option v-for="time in times" :key="time" :value="time">{{time}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="timefinish">Время окончания</label>
            <md-select v-model="group.timefinish" name="timefinish" id="timefinish">
              <md-option v-for="time in times" :key="time" :value="time">{{time}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="filial">Филиалал</label>
            <md-select v-model="group.FilialId" name="filial" id="filial">
              <md-option v-for="filial in allFilials" :key="filial.id" :value="filial.id">{{filial.name}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="courses">Курсы</label>
            <md-select v-model="group.courses" name="courses" id="courses" multiple>
              <md-option v-for="course in allCourses" :key="course.id" :value="course.id">
                {{course.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-50 md-size-33">
            <label for="courses">Преподаватели</label>
            <md-select v-model="group.teachers" multiple>
              <md-option v-for="teacher in allTeachers" :key="teacher.id" :value="teacher.id">
                {{teacher.surname}} {{teacher.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-100 md-size-33">
            <label for="courses">Длина занятия</label>
            <md-select v-model="group.timelong">
              <md-option v-for="time in timelong" :key="time" :value="time">
                {{time}} часа
              </md-option>
            </md-select>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="CreateGroup">Добавить</md-button>
        <md-button class="md-danger md-simple" @click="showCreateGroupModal = false">Отмена</md-button>
      </template>
    </modal>

    <!-- TIMETABLE DELETE MODAL -->
    <modal v-if="showDeleteDialog" @close="showDeleteDialog = false" class="mini-modal-1">
      <template slot="header">
        <h4 class="modal-title">Удаление группы</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showDeleteDialog = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout text-center">
          <h4 class="md-layout-item md-size-100">Вы действительно хотите удалить группу {{dayToEdit.name}}?</h4>
          <md-field class="md-layout-item md-size-100">
            <label for="groupname">Для подтверждения введите название группы</label>
            <md-input v-model="groupNameToDelete" placeholder="Название группы" name="groupname"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="deleteTable">Удалить</md-button>
        <md-button class="md-success md-simple" @click="showDeleteDialog = false">Отмена</md-button>
      </template>
    </modal>

    <!-- TIMETABLE EDIT MODAL -->
    <modal v-if="showEditGroupModal" @close="showEditGroupModal = false">
      <template slot="header">
        <h4 class="modal-title">Редактирование группы</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="showEditGroupModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-33">
            <label for="groupname">Название группы</label>
            <md-input v-model="group.name" name="groupname"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="groupsize">Размер группы</label>
            <md-input v-model="group.maxsize" name="groupsize" type="number"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="day">День занятий</label>
            <md-select v-model="group.day">
              <md-option v-for="day in days" :key="day.day" :value="day.day">{{day.day}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="timestart">Время начала</label>
            <md-select v-model="group.timestart" name="timestart" id="timestart">
              <md-option v-for="time in times" :key="time" :value="time">{{time}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="timefinish">Время окончания</label>
            <md-select v-model="group.timefinish" name="timefinish" id="timefinish">
              <md-option v-for="time in times" :key="time" :value="time">{{time}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="filial">Филиалал</label>
            <md-select v-model="group.FilialId" name="filial" id="filial">
              <md-option v-for="filial in allFilials" :key="filial.id" :value="filial.id">{{filial.name}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Курсы</label>
            <md-select v-model="group.courses" name="courses" id="courses" multiple>
              <md-option v-for="course in allCourses" :key="course.id" :value="course.id">
                {{course.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Преподаватели</label>
            <md-select v-model="group.teachers" multiple>
              <md-option v-for="teacher in allTeachers" :key="teacher.id" :value="teacher.id">
                {{teacher.surname}} {{teacher.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Длина занятия</label>
            <md-select v-model="group.timelong">
              <md-option v-for="time in timelong" :key="time" :value="time">
                {{time}} часа
              </md-option>
            </md-select>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="saveEditTimeTable">Сохранить</md-button>
        <md-button class="md-danger md-simple" @click="showEditGroupModal = false">Отмена</md-button>
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
                  <div>{{ item.Course.name }}, {{ (item.active == "true") ? "Активен" : "Не активен" }} {{ item.phone }}</div>
                  <md-button v-show="item.Childschedules != null" class="md-sm" @click="ShowCourseInfo(item)">
                    Посмотреть
                  </md-button>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-60">
                  <div v-for="cs in item.Childschedules" :key="cs.id">
                    <div v-for="schedule in cs.Schedules" :key="schedule.id">
                      <div v-if="cs.Course.id == item.CourseId && schedule.date.substr(0, 10) == dayToEdit.date" class="md-layout">
                        <div class="md-layout-item md-size-100">
                          {{schedule.commit}}
                          {{schedule.check}}
                          <span v-if="schedule.User != null">{{schedule.User.surname}} {{schedule.User.name}}</span>
                          <a :href="schedule.Task.linkdocs" target="blank">{{schedule.Task.numbertask}}: {{schedule.Task.name}}</a>
                        </div>
                        <md-field class="md-layout-item md-small-size-100 md-size-40">
                          <label for="check">Отметка</label>
                          <md-select v-model="schedule.checkBuffer" name="check" id="check">
                            <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                          </md-select>
                        </md-field>
                        <md-field class="md-layout-item md-small-size-100 md-size-40">
                          <label for="check">Провел</label>
                          <md-select v-model="schedule.UserIdBuffer" name="teacher" id="teacher">
                            <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                          </md-select>
                        </md-field>
                        <div class="md-layout-item md-small-size-100 md-size-20">
                          <md-button class="md-just-icon" @click="scheduleSavePrev(schedule)">
                            <md-icon>save</md-icon>
                            <md-tooltip md-direction="top">Сохранить</md-tooltip>
                          </md-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="md-layout-item md-size-100">
            <div v-for="item in dayToEdit.Trials" :key="item.id">
              <div v-if="item.date.substr(0, 10) == dayToEdit.date">
              <div class="md-layout md-elevation-3 md-children">
                <div class="md-layout-item md-small-size-100 md-size-40">
                  {{ item.name }},
                  <span v-for="course in item.TrialCourses" :key="course.id">{{ course.Course.name }},</span> {{ item.phone }},
                  Пробное занятие. В {{item.time}}
                </div>
                <div class="md-layout-item md-small-size-100 md-size-60">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-100">
                      {{ item.check }}, {{ item.commit }},
                      {{ item.description }}
                    </div>
                    <md-field class="md-layout-item md-small-size-100 md-size-40">
                      <label for="check">Отметка</label>
                      <md-select v-model="item.checkBuffer" name="check" id="check">
                        <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                      </md-select>
                    </md-field>
                    <md-field class="md-layout-item md-small-size-100 md-size-40">
                      <label for="check">Провел</label>
                      <md-select v-model="item.UserIdBuffer" name="teacher" id="teacher">
                        <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                      </md-select>
                    </md-field> 
                    <div class="md-layout-item md-small-size-100 md-size-20">
                      <md-button class="md-just-icon" @click="trialSavePrev(item)">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="top">Сохранить</md-tooltip>
                      </md-button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div class="md-layout-item md-size-100">
            <div v-for="item in dayToEdit.Schedules" :key="item.id">
              <div v-if="item.date.substr(0, 10) == dayToEdit.date">
              <div class="md-layout md-elevation-3 md-children">
                <div class="md-layout-item md-small-size-100 md-size-40">
                  <div>{{item.Childschedule.Child.surname}} {{item.Childschedule.Child.name}} {{item.Childschedule.Child.middlename}}</div>
                  <div>{{item.Task.Course.name}} {{item.Childschedule.Child.phone}}</div>
                  <div>Отработка. В {{item.MiningTable.time}}</div>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-60">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-100">
                      {{ item.check }}, {{ item.commit }}
                      <a :href="item.Task.linkdocs" target="blank">{{item.Task.numbertask}}: {{item.Task.name}}</a>
                    </div>
                    <md-field class="md-layout-item md-small-size-100 md-size-40">
                      <label for="check">Отметка</label>
                      <md-select v-model="item.checkBuffer" name="check" id="check">
                        <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                      </md-select>
                    </md-field>
                    <md-field class="md-layout-item md-small-size-100 md-size-40">
                      <label for="check">Провел</label>
                      <md-select v-model="item.UserIdBuffer" name="teacher" id="teacher">
                        <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                      </md-select>
                    </md-field> 
                    <div class="md-layout-item md-small-size-100 md-size-20">
                      <md-button class="md-just-icon" @click="scheduleSavePrev(item)">
                        <md-icon>save</md-icon>
                        <md-tooltip md-direction="top">Сохранить</md-tooltip>
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
import {Modal} from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "group-timetable",
  components: {
    Modal
  },
  data() {
    return {
      childScheduleInfo: [],
      childEditingFull: {
        addMoney: false,
        addTrial: false,
        editChild: false,
        editSchedule: {
          date: null,
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
      filialsSet: 1,
      teachers: [],
      teachersSet: 0,
      showCreateGroupModal: false,
      showEditGroupModal: false,
      showDeleteDialog: false,
      showSeeModal: false
    }
  },
  computed: {
    ...mapGetters([{user: 'getProfile'}, 'allTeachers', 'allFilials', 'allTimeTables', 'allCourses']),
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
    ...mapActions(['getAllTeachers', 'getAllFilials', 'getAllCourses', 
    'createTimeTable', 'updateSchedule', 'editTrial', 'loadChildSchedules',
    'edittimetable', 'editChildSchedule', 'deleteTimeTable', 'allMinings']),
    async editSchedulePrev() {
      this.updateLoading('start')
      let obj = {
        UserId: 0,
        schedule: {
          id: this.childEditingFull.editSchedule.schedule.id,
          commit: this.childEditingFull.editSchedule.commit,
          check: this.childEditingFull.editSchedule.check,
          UserId: this.childEditingFull.editSchedule.User.id,
          date: this.childEditingFull.editSchedule.date
        }
      }
      console.log(obj.schedule)

      await this.editChildSchedule(obj)
      .then(async res => {
        /*console.log(this.dayToEdit)
        console.log(this.childEditingFull)
       this.dayToEdit.Children.forEach(children => {
          children.Childschedules.forEach(Childschedule => {
            if (Childschedule.id == res.ChildscheduleId) {
              Childschedule.Schedules.forEach(Schedule => {
                if (Schedule.id == res.id) {
                  console.log(Schedule)
                  Schedule.check = res.check
                  Schedule.commit = res.commit
                  Schedule.UserId = res.UserId 
                  Schedule.User.id = res.UserId 
                }
              })
            }
          })
        })*/
        this.updateLoading('done')
        //this.childScheduleInfoModal = false
        this.$notify({
          message: `Посещаемость сохранена успешно!`,
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
          message: `Посещаемость не была сохранена! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })

      this.childEditingFull.editScheduleActive = false
    },
    ShowCourseInfo(info) {
      this.childScheduleInfoModal = true
      this.childScheduleInfo = info
      console.log(info)
    },
    async saveEditTimeTable() {
      this.updateLoading('start')
      let group = {
        id: this.group.id,
        name: this.group.name,
        timestart: this.group.timestart,
        timefinish: this.group.timefinish,
        day: this.group.day,
        maxsize: this.group.maxsize,
        FilialId: this.group.FilialId,
        timelong: this.group.timelong,
        teachers: this.group.teachers,
        courses: this.group.courses
      }
      await this.edittimetable(group)
      .then(res => {
      this.showEditGroupModal = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Готово!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.refreshTimeTable()
      })
      .catch(error => {
        //console.log(error)
        this.updateLoading('fail')
        this.$notify({
          message: `Ошибка! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async deleteTable() {
      //console.log(this.dayToEdit, this.groupNameToDelete)
      if(this.groupNameToDelete == this.dayToEdit.name) {
        console.log(this.dayToEdit)
        this.updateLoading('start')
        await this.deleteTimeTable({id: this.dayToEdit.id})
        .then(res => {
          this.updateLoading('done')
          this.showDeleteDialog = false
          this.refreshTimeTable()
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
            message: `Ошибка! ${error}!`,
            icon: 'close',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
      } else {
        this.$notify({
          message: `Группа не удалена! Имя группы введено неверно!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      }
    },
    async loadTimeTableFullInfo(timetable) {
      /*s*/
      let childsToLoad = []
      timetable.Children.forEach(child => {
        if(child.Childschedules == undefined) childsToLoad.push(child.id)
      })
      //console.log(childsToLoad)
      if (childsToLoad.length > 0) {
        this.updateLoading('start')
        await this.loadChildSchedules(childsToLoad)
        .then(res => {
          //console.log(res)
          this.updateLoading('done')
          timetable.Children.forEach(Children => {
            //console.log(Children.childSchedule)
            if(Children.childSchedule == undefined)
            res.forEach(childSchedule => {
              if (Children.id == childSchedule.ChildId) {
                if (Children.Childschedules == undefined) 
                {
                  Children.Childschedules = []
                  Children.Childschedules.push(childSchedule)
                  Children.Childschedules.forEach(Childschedules => {
                    Childschedules.Schedules.forEach(Schedules => {
                      if(Schedules.status == 'Назначена отработка') console.log('yes#1')
                      Schedules.checkBuffer = Schedules.check
                      Schedules.UserIdBuffer = Schedules.UserId
                    })
                  })
                  //console.log(Children)
                }else {
                  Children.Childschedules.push(childSchedule)
                  Children.Childschedules.forEach(Childschedules => {
                    Childschedules.Schedules.forEach(Schedules => {
                      if(Schedules.status == 'Назначена отработка') console.log('yes#2')
                      Schedules.checkBuffer = Schedules.check
                      Schedules.UserIdBuffer = Schedules.UserId
                    })
                  })
                }
              }
            })
          })
        })
        .catch(error => {
          //console.log(error)
          this.updateLoading('fail')
        })
      } 
          this.seeTimeTable(timetable)
    },
    async trialSavePrev(item) {
      //updateTrial
      console.log(item)
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
      trialToSave.UserId = item.UserIdBuffer
      trialToSave.TimeTableId = item.TimeTableId
      trialToSave.FilialId = this.filialsSet
      trialToSave.CourseId = []
      console.log(item)
      item.TrialCourses.forEach(course => {
        trialToSave.CourseId.push(course.Course.id)
      })
      trialToSave.res = item.res
      if(item.date != null ) trialToSave.Labeled = item.date.substr(0, 10)
      else trialToSave.Labeled = null
      trialToSave.check = item.checkBuffer
      trialToSave.commit = item.commit
      trialToSave.ChildId = item.ChildId
      trialToSave.phone = item.phone
      trialToSave.description = item.description
      trialToSave.name = item.name
      trialToSave.time = item.time ? item.time : '10:00'
      trialToSave.comment = item.comment ? item.comment : 'comment'
      trialToSave.parentname = item.parentname ? item.parentname : 'parentname'
      trialToSave.res = item.checkBuffer
      console.log(trialToSave)
      await this.editTrial(trialToSave)
      .then(res => {
        //console.log(res)
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
        //console.log(error)
        this.updateLoading('fail')
        this.$notify({
          message: `Ошибка! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async scheduleSavePrev(schedule) {
      this.updateLoading('start')
      let sc = {
        id: schedule.id,
        check: schedule.checkBuffer,
        TimeTableId: this.dayToEdit.id,
        UserId: schedule.UserIdBuffer
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
          message: `Ошибка! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    deleteChild(child) {
      this.group.childs.forEach((element, index) => {
        if (child.id == element.id) {
          this.group.childs.splice(index, 1)
        } 
      })
    },
    selectedChild() {
      //console.log('selectedChild')
      
    },
    addChild() {
      let names = this.selectedChildToAdd.split(' ')
      if (names.length == 3) {
        this.selectedChildToAdd = ''
        this.childs.forEach(child => {
          let notAdded = false
          this.group.childs.forEach(element => {
            if (child.id == element.id) {
              notAdded = true
            }
          })
          if (child.surname == names[0] && child.name == names[1] && child.middlename == names[2] && !notAdded) {
            this.group.childs.push(child)
            //console.log(this.group)
          }
        })
      } else {
        //console.log('ERROR')
      }
    },
    filterFilialTeacher(day) {
      if (day.day == 'Понедельник') day.date = this.thisWeek[0]
      else if (day.day == 'Вторник') day.date = this.thisWeek[1]
      else if (day.day == 'Среда') day.date = this.thisWeek[2]
      else if (day.day == 'Четверг') day.date = this.thisWeek[3]
      else if (day.day == 'Пятница') day.date = this.thisWeek[4]
      else if (day.day == 'Суббота') day.date = this.thisWeek[5]
      else if (day.day == 'Воскресенье') day.date = this.thisWeek[6]
      ////console.log(day)
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
    async seeTimeTable(day) {
      this.showSeeModal = true
      this.dayToEdit = day
      console.log(this.dayToEdit.Schedules)
    },
    updateTimeTable(day) {
      this.group = {...day}
      this.group.teachers = []
      this.group.courses = []
      day.Users.forEach(element => {
        this.group.teachers.push(element.id)
      })
      day.Courses.forEach(element => {
        this.group.courses.push(element.id)
      })
      //console.log(this.group)
      this.showEditGroupModal = true
    },
    deleteTimeTablePrev(day) {
      this.showDeleteDialog = true
      this.dayToEdit = day
      ////console.log(day)
    },
    addGroup() {
      this.group= {
        name: null,
        timestart: null,
        timefinish: null,
        day: null,
        maxsize: null,
        FilialId: null,
        courses: null,
        teachers: null,
        childs: []
      }
      this.showCreateGroupModal = true
    },
    async CreateGroup() {
      let timetable = {
        name: this.group.name,
        timestart: this.group.timestart,
        timefinish: this.group.timefinish,
        day: this.group.day,
        maxsize: this.group.maxsize,
        timelong: this.group.timelong,
        FilialId: this.group.FilialId,
        Users: this.group.teachers,
        Courses: this.group.courses
      }

      this.updateLoading('start')
      await this.createTimeTable(timetable)
      .then(res => {
        this.showCreateGroupModal = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Группа была успешно создана!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.refreshTimeTable()
      })
      .catch(error => {
        //console.log(error)
        this.updateLoading('fail')
        this.$notify({
          message: `Новую группу создать не удалась! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
      //console.log(timetable)
    },
    optimizationGroup() {
      let timeTables = []
      this.allFilials.forEach(filial => {
        filial.TimeTables.forEach(TimeTable => {
          timeTables.push(TimeTable)
        })
      })
      timeTables.forEach(TimeTables => {
        TimeTables.Trials.forEach(Trials => {
          Trials.checkBuffer = Trials.check
          Trials.UserIdBuffer = Trials.UserId
        })
        TimeTables.Schedules.forEach(Schedule => {
          Schedule.checkBuffer = Schedule.check
          Schedule.UserIdBuffer = Schedule.UserId
        })
      })
      //console.log(timeTables)
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
      //console.log(this.week)
    },
    async refreshTimeTable() {
      this.updateLoading('start')
      await this.getAllFilials()
      .then(result => {
        this.optimizationGroup()
        this.updateLoading('done')
      })
      .catch(err => {
        this.updateLoading('fail')
      })
    },
    
    async updateScheduleFull(schedule) {
      this.childEditingFull.editScheduleActiveOtrab = false
      this.childEditingFull.editSchedule.date = schedule.date.slice(0,10)
      this.childEditingFull.editSchedule.schedule = schedule
      this.childEditingFull.editSchedule.commit = this.childEditingFull.editSchedule.schedule.commit
      this.childEditingFull.editSchedule.check = this.childEditingFull.editSchedule.schedule.check
      this.childEditingFull.editSchedule.UserVariants = []
      if (this.childEditingFull.editSchedule.schedule.User == null) {
        this.childEditingFull.editSchedule.User = {
          id: 0,
          name: `Не`,
          middlename: 'проведено'
        }
      } else {
        this.childEditingFull.editSchedule.User = this.childEditingFull.editSchedule.schedule.User
      }
      this.childEditingFull.editSchedule.UserVariants.push({
        id: 0,
        name: `Не`,
        middlename: 'проведено'
      })
      this.allTeachers.forEach(teacher => {
        this.childEditingFull.editSchedule.UserVariants.push(teacher)
      })
      /*await this.getAllTeachers()
      .then(res => {
        this.allTeachers.forEach(teacher => {
          this.childEditingFull.editSchedule.UserVariants.push(teacher)
        })
      })
      .catch(err => {})*/
      this.childEditingFull.editScheduleActive = true
        //console.log(this.childEditingFull)
      //console.log(schedule)
      //console.log(this.childEditing.editScheduleActive)
      //console.log(this.childEditing.editSchedule.UserVariants)
    },
  },
  async mounted() {
    this.updateLoading('start')
    if(this.allFilials.length == 0) await this.getAllFilials()
    this.optimizationGroup()
    this.updateLoading('done')
    if (this.allTeachers.length == 0) {
      await this.getAllTeachers()
      .then(res => {
        this.allTeachers.forEach(teacher => {
          this.childEditing.editSchedule.UserVariants.push(teacher)
        })
      })
      .catch(err => {})
    } else {
      this.allTeachers.forEach(teacher => {
        this.childEditing.editSchedule.UserVariants.push(teacher)
      })
    }
  }
}
</script>

<style scoped>
.mini-card .md-elevation-3 > .card-item {
  margin-top: 0;
  margin-bottom: 0;
}
.mini-card > .md-card-content {
  min-height: 100px !important;
}
.mr-10 {
  margin-left: 20px;
}
.md-card-custom {
  margin-top: 5px;
  margin-bottom: 25px;
}
.md-card-custom > .md-card-content {
  min-height: 330px;
}
.card-item {
  min-height: 35px;
}
.green-card {
  background: linear-gradient(60deg, #66bb6a, #43a047);
}
.orange-card {
  background: linear-gradient(60deg, #ffa726, #fb8c00);
}
.red-card {
  background: linear-gradient(60deg, #d37a78, #d34846);
}
.md-card-content {
  padding: 5px;
}
h3, h5, p {
  line-height: 1.1em;
}
h5, p {
  font-size: 0.8rem;
}
.disabled {
  cursor:not-allowed;
  box-shadow: none;
}
.disabled:hover {
  box-shadow: none;
}
.btn-center {
  display: inline-block;
}
.modal-mask {
  z-index: 11;
}
.card-buttons {
  margin-top: -20px;
}
.md-table-cell {
  padding: 0;
  padding-left: 10px;
} 
</style>