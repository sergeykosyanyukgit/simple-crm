<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <nav-tabs-card>
        <template slot="content">
          <md-tabs
            md-alignment="left"
            >
            <md-tab id="tab-home" md-label="Клиенты">
              <nav-parents
                v-on:ShowCourseInfo="ShowCourseInfo"
                v-on:CreateUser="userAdd"
                v-on:UserShowInfo="userShowModal = true"
                v-on:UserUpdate="userUpdate"
                v-on:ChildShowAddModal="childAdd"
                v-on:addMoney="addMoney"
                v-on:editCourse="editCourse"
                v-on:addTrial="addTrial"
                v-on:editChild="editChild"
                v-on:editSchedule="editSchedule"
                v-on:updateNewSchedule="updateNewSchedule"
                v-on:parentClick="parentClick"
                v-on:kickSchedule="kickSchedulePrev"
                v-on:editTimetables="editTimetablesPrev"
                v-on:ChildscheduleDelete="ChildscheduleDeletePrev">
              </nav-parents>
            </md-tab>

            <md-tab id="tab-teachers" md-label="Преподаватели">
              <nav-teachers 
                v-on:CreateTeacherShowModal="teacherAddModal = true"
                v-on:TeacherShowInfo="TeacherShowInfo"
                v-on:TeacherUpdate="TeacherUpdateInfo"
                v-on:TeacherDelete="TeacherDeleteInfo">
              </nav-teachers>
            </md-tab>

            <md-tab id="tab-admins" md-label="Администраторы">
              <nav-admins 
                v-on:CreateAdminShowModal="adminAddModal = true"
                v-on:AdminShowInfo="adminShowInfo"
                v-on:AdminUpdate="AdminUpdateInfo"
                v-on:AdminDelete="adminDeleteModal = true">
              </nav-admins>
            </md-tab>
          </md-tabs>
        </template>
      </nav-tabs-card>

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
            <div v-if="childEditing.editScheduleActive" class="md-layout-item md-size-100">
              <div class="md-layout">
                <md-field class="md-layout-item md-size-25 md-small-size-50">
                  <label for="check">Отметка</label>
                  <md-select v-model="childEditing.editSchedule.check" name="check" id="check">
                    <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-25 md-small-size-50">
                  <label for="check">Провел</label>
                  <md-select v-model="childEditing.editSchedule.User.id" name="teacher" id="teacher">
                    <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-25 md-small-size-50">
                  <label for="check">Оплатили</label>
                  <md-select v-model="childEditing.editSchedule.commit" name="commit" id="commit">
                    <md-option v-for="commit in childEditing.editSchedule.commitVariants" :key="commit" :value="commit">{{commit}}</md-option>
                  </md-select>
                </md-field>
                <md-datepicker class="md-layout-item md-size-25 md-small-size-50" v-model="childEditing.editSchedule.date">
                  <label>Дата проведения</label>
                </md-datepicker>
                <div class="md-layout-item md-size-100">
                  <md-button class="md-danger" @click.stop="childEditing.editScheduleActive = false">
                    Отмена
                  </md-button>
                  <md-button class="md-success" @click.stop="editSchedulePrev()">
                    Сохранить
                  </md-button>
                </div>
              </div>
            </div>
            <div v-if="childEditing.editScheduleActiveOtrab" class="md-layout-item md-size-100">
              <div class="md-layout">
                <md-field class="md-layout-item md-size-25">
                  <label for="check">Состояние</label>
                  <md-select v-model="childEditing.editSchedule.check" name="check" id="check">
                    <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-25">
                  <label for="courses">Филиал</label>
                  <md-select v-model="selectedFilial" name="filials" id="filials">
                    <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                      {{item.name}}
                    </md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-25">
                  <label for="selectedTime">Время</label>
                  <md-input v-model="selectedTime" name="selectedTime"></md-input>
                </md-field>
                <div class="md-layout-item md-size-25">
                  <md-datepicker v-model="selectedLabeled">
                    <label>Дата</label>
                  </md-datepicker>
                </div>
                <md-field class="md-layout-item md-size-33">
                  <label for="courses">Курс</label>
                  <md-select v-model="selectedCourse" name="courses" id="courses">
                    <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                      {{item.name}}
                    </md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-33" >
                  <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
                </md-field>
                <md-field class="md-layout-item md-size-33">
                  <label for="courses">Группы</label>
                  <md-select v-model="selectedGroups" name="groups" id="groups">
                    <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                      {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                    </md-option>
                  </md-select>
                </md-field>

                <div class="md-layout-item md-size-100">
                  <md-button class="md-danger" @click.stop="childEditing.editScheduleActiveOtrab = false">
                    Отмена
                  </md-button>
                  <md-button class="md-success" @click.stop="editSchedulePrevOtrab(childEditing)">
                    Сохранить
                  </md-button>
                </div>
              </div>
            </div>
            <div v-if="scheduleVersionNew" class="md-layout-item md-size-100 full-control">
              <md-table>
                <div class="list">
                  <md-list>
                    <md-list-item md-expand>
                      <md-icon>directions_run</md-icon>
                      <span class="md-list-item-text">Посещений: {{ childScheduleInfo.filter(sc => { return sc.check =='Пройдено' }).length }}</span>

                      <md-list slot="md-expand">
                        <md-list-item
                          v-for="schedule in childScheduleInfo.filter(sc => { return sc.check =='Пройдено' })" :key="schedule.id"
                          class="md-inset">
                          <div>{{ schedule.Task.numbertask }}) {{ schedule.date.slice(0,10) }}: </div>
                          <div v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</div>
                          <div v-else>Не проведено</div>
                        </md-list-item>
                      </md-list>
                    </md-list-item>

                    <md-list-item md-expand>
                      <md-icon>close</md-icon>
                      <span class="md-list-item-text">Пропусков: {{ childScheduleInfo.filter(sc => { return sc.check =='Пропущено' }).length }}</span>

                      <md-list slot="md-expand">
                        <md-list-item
                          v-for="schedule in childScheduleInfo.filter(sc => { return sc.check =='Пропущено' })" :key="schedule.id"
                          class="md-inset">
                          <div>{{ schedule.Task.numbertask }}) {{ schedule.date.slice(0,10) }}: </div>
                          <div v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</div>
                          <div v-else>Не проведено</div>
                        </md-list-item>
                      </md-list>
                    </md-list-item>

                    <md-list-item md-expand>
                      <md-icon>zoom_out_map</md-icon>
                      <span class="md-list-item-text">Не пройдено: {{ childScheduleInfo.filter(sc => { return sc.check =='Не пройдено' }).length }}</span>

                      <md-list slot="md-expand">
                        <md-list-item
                          v-for="schedule in childScheduleInfo.filter(sc => { return sc.check =='Не пройдено' })" :key="schedule.id"
                          class="md-inset">
                          <div>{{ schedule.Task.numbertask }}) {{ schedule.date.slice(0,10) }}: </div>
                          <div v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</div>
                          <div v-else>Не проведено</div>
                        </md-list-item>
                      </md-list>
                    </md-list-item>

                    <md-list-item md-expand>
                      <md-icon>transfer_within_a_station</md-icon>
                      <span class="md-list-item-text">Назначено Отработок: {{ childScheduleInfo.filter(sc => { return sc.check =='Назначена отработка' }).length }}</span>

                      <md-list slot="md-expand">
                        <md-list-item
                          v-for="schedule in childScheduleInfo.filter(sc => { return sc.check =='Назначена отработка' })" :key="schedule.id"
                          class="md-inset">
                          <div>{{ schedule.Task.numbertask }}) {{ schedule.date.slice(0,10) }}: </div>
                          <div v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</div>
                          <div v-else>Не проведено</div>
                        </md-list-item>
                      </md-list>
                    </md-list-item>
                  </md-list>
                </div>
              </md-table>
            </div>
            <md-table v-if="!scheduleVersionNew" class="md-layout-item md-size-100 max-w-100">
              <div class="md-layout">
                <md-table-row class="md-layout-item md-size-100 ">
                  <md-table-head md-numeric>№</md-table-head>
                  <md-table-head>Отметка</md-table-head>
                  <md-table-head>Задание</md-table-head>
                  <md-table-head>Группа</md-table-head>
                  <md-table-head>Провел</md-table-head>
                  <md-table-head>Дата</md-table-head>
                  <md-table-head>Оплатили</md-table-head>
                  <md-table-head>Действия</md-table-head>
                </md-table-row>

                <md-table-row v-for="schedule in childScheduleInfo" :key="schedule.id" class="md-layout-item md-size-100">
                  <md-table-cell md-numeric>{{schedule.Task.numbertask}}</md-table-cell>
                  <md-table-cell>{{schedule.check}}</md-table-cell>
                  <md-table-cell>{{schedule.Task.Course.name}}: {{schedule.Task.name}}</md-table-cell>
                  <md-table-cell>{{schedule.TimeTable.Filial.name}} {{schedule.TimeTable.name}} {{schedule.TimeTable.day}} {{schedule.TimeTable.timestart}} - {{schedule.TimeTable.timefinish}}</md-table-cell>
                  <md-table-cell v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</md-table-cell>
                  <md-table-cell v-else>Не проведено</md-table-cell>
                  <md-table-cell>{{schedule.date.slice(0, 10)}}</md-table-cell>
                  <md-table-cell>{{schedule.commit}}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-success" @click.stop="updateSchedule(schedule)">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="bottom">Исправить</md-tooltip>
                    </md-button>
                    <md-button v-if="schedule.check == 'Пропущено'" class="md-just-icon md-simple md-danger" @click.stop="updateScheduleOtrab(schedule)">
                      <md-icon>build</md-icon>
                      <md-tooltip md-direction="bottom">Отработка</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </div>
            </md-table>
          </div>
        </template>
        <template slot="footer">
          <md-switch v-model="scheduleVersionNew">Мини версия</md-switch>
          <md-button class="md-success md-simple" @click="childScheduleInfoModal = false">Ок</md-button>
        </template>
      </modal>

      <!-- USER ADD MODAL -->
      <modal v-if="userAddModal" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Добавление родителя</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="userAddModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="surnameadd">Фамилия</label>
              <md-input v-model="user.surname" name="surnameadd"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="nameadd">Имя</label>
              <md-input v-model="user.name" name="nameadd"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="middlenameadd">Отчество</label>
              <md-input v-model="user.middlename" name="middlenameadd"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="phoneadd">Номер телефона</label>
              <md-input v-model="user.phone"  name="phoneadd"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="createUser(user)">Добавить</md-button>
          <md-button class="md-danger md-simple" @click="userAddModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- USER UPDATE MODAL -->
      <modal v-if="userEditModal" @close="userEditModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Редактирование родителя</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="userEditModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-33">
              <label for="surnameupdate">Фамилия</label>
              <md-input v-model="user.surname" name="surnameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="nameupdate">Имя</label>
              <md-input v-model="user.name" name="nameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="middlenameupdate">Отчество</label>
              <md-input v-model="user.middlename" name="middlenameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="phoneupdate">Номер телефона</label>
              <md-input v-model="user.phone" name="phoneupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="emailupdate">Почта</label>
              <md-input v-model="user.email" name="emailupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="passupdate">Новый пароль</label>
              <md-input v-model="user.password" name="passupdate"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="userSave(user)">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="userEditModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- CHILD ADD MODAL -->
      <modal v-if="childAddModal">
        <template slot="header">
          <h4 class="modal-title">Добавление Ученика</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childAddModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="surnameaddchild">Фамилия</label>
              <md-input v-model="child.surname" name="surnameaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="nameaddchild">Имя</label>
              <md-input v-model="child.name" name="nameaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="middlenameaddchild">Отчество</label>
              <md-input v-model="child.middlename" name="middlenameaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="phoneaddchild">Номер телефона родителя</label>
              <md-input v-model="child.phone" name="phoneaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="ages">Дата рождения</label>
              <md-input v-model="child.age" name="ages" placeholder="01.01.2010"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Филиал</label>
              <md-select v-model="selectedFilial" name="filials" id="filials">
                <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Курс</label>
              <md-select v-model="selectedCourse" name="courses" id="courses">
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33" >
              <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Группы</label>
              <md-select v-model="selectedGroups" name="groups" id="groups" multiple>
                <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                  {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                </md-option>
              </md-select>
            </md-field>
            <div class="md-layout-item md-size-33">
              <md-datepicker v-model="selectedLabeled">
                <label>Дата первого занятия</label>
              </md-datepicker>
            </div>
            <md-field class="md-layout-item md-size-33">
              <label for="payed">Оплачены занятия</label>
              <md-input v-model="payed" type="number" name="payed" @change="buildSchedule"></md-input>
            </md-field>
            
            <md-table class="md-layout-item md-size-100" v-if="isValidChildAddForm">
              <md-table-row>
                <md-table-head md-numeric>№</md-table-head>
                <md-table-head>Задание</md-table-head>
                <md-table-head>Группа</md-table-head>
                <md-table-head>Дата</md-table-head>
                <md-table-head>Оплата</md-table-head>
              </md-table-row>

              <md-table-row v-for="(schedule, index) in childSchedulePrev" :key="schedule.Date">
                <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                <md-table-cell>
                  <div v-for="tasked in schedule.Task" :key="tasked.id">
                    {{tasked.Course.name}}: {{tasked.name}}
                  </div>
                </md-table-cell>
                <md-table-cell>{{schedule.TimeTable}}</md-table-cell>
                <md-table-cell>{{schedule.Date}}</md-table-cell>
                <md-table-cell>{{schedule.Pay}}</md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="ChildAddSave">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="childAddModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- CHILD COURSE ADD MODAL -->
      <modal v-if="childTransferModal">
        <template slot="header">
          <h4 class="modal-title">Перевод Ученика</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childTransferModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Филиал</label>
              <md-select v-model="selectedFilial" name="filials" id="filials">
                <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Курс</label>
              <md-select v-model="selectedCourse" name="courses" id="courses">
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33" >
              <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Группы</label>
              <md-select v-model="selectedGroups" name="groups" id="groups" multiple>
                <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                  {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                </md-option>
              </md-select>
            </md-field>
            <div class="md-layout-item md-size-33">
              <md-datepicker v-model="selectedLabeled">
                <label>Дата первого занятия</label>
              </md-datepicker>
            </div>
            <md-field class="md-layout-item md-size-33">
              <label for="payed">Оплачены занятия</label>
              <md-input v-model="payed" type="number" name="payed" @change="buildSchedule"></md-input>
            </md-field>
            
            <md-table class="md-layout-item md-size-100" v-if="isValidChildAddForm">
              <md-table-row>
                <md-table-head md-numeric>№</md-table-head>
                <md-table-head>Задание</md-table-head>
                <md-table-head>Группа</md-table-head>
                <md-table-head>Дата</md-table-head>
                <md-table-head>Оплата</md-table-head>
              </md-table-row>

              <md-table-row v-for="(schedule, index) in childSchedulePrev" :key="schedule.Date">
                <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                <md-table-cell>
                  <div v-for="tasked in schedule.Task" :key="tasked.id">
                    {{tasked.Course.name}}: {{tasked.name}}
                  </div>
                </md-table-cell>
                <md-table-cell>{{schedule.TimeTable}}</md-table-cell>
                <md-table-cell>{{schedule.Date}}</md-table-cell>
                <md-table-cell>{{schedule.Pay}}</md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="childTransfer">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="childTransferModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- TEACHER ADD MODAL -->
      <modal v-if="teacherAddModal" @close="teacherAddModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Добавление Преподавателя</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="teacherAddModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="teacheraddsurname">Фамилия</label>
              <md-input v-model="teacher.surname" name="teacheraddsurname"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="teacheraddname">Имя</label>
              <md-input v-model="teacher.name" name="teacheraddname"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="teacheraddmiddlename">Отчество</label>
              <md-input v-model="teacher.middlename" name="teacheraddmiddlename"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="teacheraddphone">Номер телефона</label>
              <md-input v-model="teacher.phone" name="teacheraddphone"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="teacheraddemail">Почта</label>
              <md-input v-model="teacher.email" name="teacheraddemail"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="teacheraddpassword">Пароль</label>
              <md-input v-model="teacher.password" name="teacheraddpassword"></md-input>
            </md-field>
            <!--<md-field class="md-layout-item md-size-100">
              <md-input type="file" id="file" name="file" single></md-input>
            </md-field> -->
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="TeacherAddSave">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="teacherAddModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- TEACHER UPDATE MODAL -->
      <modal v-if="teacherUpdateModal" @close="teacherUpdateModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Редактирование преподавателя</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="teacherUpdateModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="surnameupdate">Фамилия</label>
              <md-input v-model="teacherBuffer.surname" placeholder="Фамилия" name="surnameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="nameupdate">Имя</label>
              <md-input v-model="teacherBuffer.name" placeholder="Имя" name="nameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="middlenameupdate">Отчество</label>
              <md-input v-model="teacherBuffer.middlename" placeholder="Отчество" name="middlenameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="phoneupdate">Номер телефона</label>
              <md-input v-model="teacherBuffer.phone" placeholder="Номер телефона" name="phoneupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="emailupdate">Почта</label>
              <md-input v-model="teacherBuffer.email" placeholder="Почта" name="emailupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="passupdate">Новый пароль</label>
              <md-input v-model="teacherBuffer.password" placeholder="Новый пароль" name="passupdate"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="teacherUpdatePrev">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="teacherUpdateModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- TEACHER DELETE MODAL -->
      <modal v-if="teacherDeleteModal" @close="teacherDeleteModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Удаление преподавателя</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="teacherDeleteModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-100">
              <label for="emailteacherdelete">Введите почту администратора</label>
              <md-input v-model="emailToDelete" placeholder="Введите почту преподавателя" name="emailteacherdelete"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="teacherDeletePrev">Удалить</md-button>
          <md-button class="md-success md-simple" @click="teacherDeleteModal = false">Закрыть</md-button>
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
            <md-field class="md-layout-item md-size-50">
              <label for="emailupdate">ЗП в час</label>
              <md-input v-model="pay.hours" name="emailupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
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


      <!-- ADMIN ADD MODAL -->
      <modal v-if="adminAddModal" @close="adminAddModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Добавление Администратора</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="adminAddModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="surnamecreateadmin">Роль</label>
              <md-input v-model="admin.surname" name="surnamecreateadmin"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="namecreateadmin">Имя</label>
              <md-input v-model="admin.name" name="namecreateadmin"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="middlenamecreateadmin">Отчество</label>
              <md-input v-model="admin.middlename" name="middlenamecreateadmin"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="phonecreateadmin">Номер телефона</label>
              <md-input v-model="admin.phone" name="phonecreateadmin"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="emailcreateadmin">Почта</label>
              <md-input v-model="admin.email" name="emailcreateadmin"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="passwordcreateadmin">Пароль</label>
              <md-input v-model="admin.password" name="passwordcreateadmin"></md-input>
            </md-field>
            <!--<md-field class="md-layout-item md-size-100">
              <md-input type="file" id="file" name="file" single></md-input>
            </md-field>-->
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="AdminAddSave">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="adminAddModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- ADMIN SHOW MODAL -->
      <modal v-if="adminShowModal" @close="adminShowModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">{{ adminBuffer.surname }}</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="adminShowModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <h4>Имя: {{ adminBuffer.name }} {{ adminBuffer.middlename }}</h4>
          <h4>Телефон: {{ adminBuffer.phone }}</h4>
          <h4>Почта: {{ adminBuffer.email }}</h4>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="adminShowModal = false">Закрыть</md-button>
        </template>
      </modal>

      <!-- ADMIN UPDATE MODAL -->
      <modal v-if="adminUpdateModal" @close="adminUpdateModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Редактирование администратора</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="adminUpdateModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-50">
              <label for="surnameupdate">Должность</label>
              <md-input v-model="adminBuffer.surname" placeholder="Должность" name="surnameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="nameupdate">Имя</label>
              <md-input v-model="adminBuffer.name" placeholder="Имя" name="nameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="middlenameupdate">Отчество</label>
              <md-input v-model="adminBuffer.middlename" placeholder="Отчество" name="middlenameupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="phoneupdate">Номер телефона</label>
              <md-input v-model="adminBuffer.phone" placeholder="Номер телефона" name="phoneupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="emailupdate">Почта</label>
              <md-input v-model="adminBuffer.email" placeholder="Почта" name="emailupdate"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="passupdate">Новый пароль</label>
              <md-input v-model="adminBuffer.password" placeholder="Новый пароль" name="passupdate"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="adminUpdatePrev">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="adminUpdateModal = false">Отмена</md-button>
        </template>
      </modal>

      <!-- ADMIN DELETE MODAL -->
      <modal v-if="adminDeleteModal" @close="adminDeleteModal = false" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Удаление администратора</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="adminDeleteModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-100">
              <label for="emailadmindelete">Введите почту администратора</label>
              <md-input v-model="emailToDelete" placeholder="Введите почту администратора" name="emailadmindelete"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="adminDeletePrev">Удалить</md-button>
          <md-button class="md-success md-simple" @click="adminDeleteModal = false">Закрыть</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING addMoney -->
      <modal v-if="childEditing.addMoney" @close="childEditing.addMoney = false" class="mini-modal-1">
        <template slot="header">
          <h4 class="modal-title">Добавление оплаты к текущему курсу</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childEditing.addMoney = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-100">
              <label for="number">Оплатили занятий</label>
              <md-input v-model="childEditingData.addMoney" type="number" name="number"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="childEditing.addMoney = false">Закрыть</md-button>
          <md-button class="md-success md-simple" @click="addMoneyChildPrev">Сохранить</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING addTrial -->
      <modal v-if="childEditing.addTrial" class="normal-modal">
        <template slot="header">
          <h4 class="modal-title">Добавление пробного занятия</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childEditing.addTrial = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Филиал</label>
              <md-select v-model="selectedFilial" name="filials" id="filials">
                <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Курс</label>
              <md-select v-model="selectedCourse" name="courses" id="courses" multiple>
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33" >
              <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
            </md-field>
            <md-field class="md-layout-item md-size-50">
              <label for="courses">Группа</label>
              <md-select v-model="selectedGroups" name="groups" id="groups">
                <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                  {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                </md-option>
              </md-select>
            </md-field>
            <div class="md-layout-item md-size-50">
              <md-datepicker v-model="selectedLabeled">
                <label>Дата пробного занятия</label>
              </md-datepicker>
            </div>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="childEditing.addTrial = false">Закрыть</md-button>
          <md-button class="md-success md-simple" @click="addTrialChildPrev">Сохранить</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING editChild -->
      <modal v-if="childEditing.editChild" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Редактирование Ученика</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childEditing.editChild = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-33">
              <label for="surnameaddchild">Фамилия</label>
              <md-input v-model="child.surname" name="surnameaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="nameaddchild">Имя</label>
              <md-input v-model="child.name" name="nameaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="ages">Дата рождения</label>
              <md-input v-model="child.age" name="ages" placeholder="01.01.2010"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="middlenameaddchild">Отчество</label>
              <md-input v-model="child.middlename" name="middlenameaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="phoneaddchild">Номер телефона родителя</label>
              <md-input v-model="child.phone" name="phoneaddchild"></md-input>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Курс</label>
              <md-select v-model="selectedCourse" name="courses" id="courses">
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <!--<md-field class="md-layout-item md-size-33">
              <label for="courses">Филиал</label>
              <md-select v-model="selectedFilial" name="filials" id="filials">
                <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Курс</label>
              <md-select v-model="selectedCourse" name="courses" id="courses">
                <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                  {{item.name}}
                </md-option>
              </md-select>
            </md-field>
            <md-field class="md-layout-item md-size-33" >
              <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
            </md-field>
            <md-field class="md-layout-item md-size-33">
              <label for="courses">Группы</label>
              <md-select v-model="selectedGroups" name="groups" id="groups" multiple>
                <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                  {{item.name}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                </md-option>
              </md-select>
            </md-field>
            <div class="md-layout-item md-size-33">
              <md-datepicker v-model="selectedLabeled">
                <label>Дата первого занятия</label>
              </md-datepicker>
            </div>
            <md-field class="md-layout-item md-size-33">
              <label for="payed">Оплачены занятия</label>
              <md-input v-model="payed" type="number" name="payed" @change="buildSchedule"></md-input>
            </md-field>
            <md-table class="md-layout-item md-size-100" v-if="isValidChildAddForm">
              <md-table-row>
                <md-table-head md-numeric>№</md-table-head>
                <md-table-head>Задание</md-table-head>
                <md-table-head>Группа</md-table-head>
                <md-table-head>Дата</md-table-head>
                <md-table-head>Оплата</md-table-head>
              </md-table-row>

              <md-table-row v-for="(schedule, index) in childSchedulePrev" :key="schedule.Date">
                <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                <md-table-cell>
                  <div v-for="tasked in schedule.Task" :key="tasked.id">
                    {{tasked.Course.name}}: {{tasked.name}}
                  </div>
                </md-table-cell>
                <md-table-cell>{{schedule.TimeTable}}</md-table-cell>
                <md-table-cell>{{schedule.Date}}</md-table-cell>
                <md-table-cell>{{schedule.Pay}}</md-table-cell>
              </md-table-row>
            </md-table>-->
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="ChildEditSave">Сохранить</md-button>
          <md-button class="md-danger md-simple" @click="childEditing.editChild = false">Отмена</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING editSchedule -->
      <modal v-if="childEditing.editSchedule.showModal">
        <template slot="header">
          <h4 class="modal-title">Исправление посещаемости и отработка</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="childEditing.editSchedule.showModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <div v-if="childEditing.editScheduleActive" class="md-layout-item md-size-100">
              <div class="md-layout">
                <md-field class="md-layout-item md-size-33">
                  <label for="check">Отметка</label>
                  <md-select v-model="childEditing.editSchedule.check" name="check" id="check">
                    <md-option v-for="check in childEditing.editSchedule.checkVariants" :key="check" :value="check">{{check}}</md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-33">
                  <label for="check">Провел</label>
                  <md-select v-model="childEditing.editSchedule.User.id" name="teacher" id="teacher">
                    <md-option v-for="teacher in childEditing.editSchedule.UserVariants" :key="teacher.name" :value="teacher.id">{{teacher.name}} {{teacher.middlename}}</md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-33">
                  <label for="check">Оплатили</label>
                  <md-select v-model="childEditing.editSchedule.commit" name="commit" id="commit">
                    <md-option v-for="commit in childEditing.editSchedule.commitVariants" :key="commit" :value="commit">{{commit}}</md-option>
                  </md-select>
                </md-field>
                <div class="md-layout-item md-size-100">
                  <md-button class="md-danger" @click.stop="childEditing.editScheduleActive = false">
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
                <md-table-head>№</md-table-head>
                <md-table-head>Отметка</md-table-head>
                <md-table-head>Задание</md-table-head>
                <md-table-head>Группа</md-table-head>
                <md-table-head>Провел</md-table-head>
                <md-table-head>Дата</md-table-head>
                <md-table-head>Оплатили</md-table-head>
              </md-table-row>

              <md-table-row v-for="schedule in allParents.filter(parent => user.id == parent.id)[0].Children.filter(child => child.id == childBuffer.id)[0].Childschedules[0].Schedules" :key="schedule.id">
                <md-table-cell>{{schedule.Task.numbertask}}</md-table-cell>
                <md-table-cell>{{schedule.check}}</md-table-cell>
                <md-table-cell>{{schedule.Task.Course.name}}: {{schedule.Task.name}}</md-table-cell>
                <md-table-cell>{{schedule.TimeTable.name}} {{schedule.TimeTable.day}} {{schedule.TimeTable.timestart}} - {{schedule.TimeTable.timefinish}}</md-table-cell>
                <md-table-cell v-if="schedule.User!=null">{{schedule.User.name}} {{schedule.User.middlename}}</md-table-cell>
                <md-table-cell v-else>Не проведено</md-table-cell>
                <md-table-cell>{{schedule.date.slice(0, 10)}}</md-table-cell>
                <md-table-cell>{{schedule.commit}}</md-table-cell>
                <md-table-cell>
                  <md-button class="md-just-icon md-simple md-success" @click.stop="updateSchedule(schedule)">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="bottom">Исправить</md-tooltip>
                  </md-button>
                  <md-button class="md-just-icon md-simple md-danger" @click.stop="updateScheduleOtrab(schedule.id)">
                    <md-icon>build</md-icon>
                    <md-tooltip md-direction="bottom">Отработка</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="childEditing.editSchedule.showModal = false">Закрыть</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING kickSchedule -->
      <modal v-if="kickScheduleModal">
        <template slot="header">
          <h4 class="modal-title">Исключение из групп</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="kickScheduleModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <div class="md-layout-item md-size-100" v-for="timetable in kickScheduleData.TimeTables" :key="timetable.id">
                <div class="md-layout">
                  <h4 class="md-layout-item md-size-80">{{timetable.name}} {{timetable.day}} {{timetable.timestart}}-{{timetable.timefinish}} {{timetable.Filial.name}}</h4>
                  <md-button class="md-just-icon" @click="kickSchedulePrevTwo(timetable.ChildTable)">
                    <md-icon>remove</md-icon>
                    <md-tooltip md-direction="top">Исключить</md-tooltip>
                  </md-button>
                </div>
            </div>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="kickScheduleModal = false">Закрыть</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING ChildscheduleDelete-->
      <modal v-if="ChildscheduleDeleteModal" class="mini-modal-1">
        <template slot="header">
          <h4 class="modal-title">Удаление посещаемости</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="ChildscheduleDeleteModal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <md-field class="md-layout-item md-size-100">
              <label for="nameaddchild">Введите имя курса </label>
              <md-input v-model="ChildscheduleDeleteCourseTest" name="nameaddchild"></md-input>
            </md-field>
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="ChildscheduleDeleteModal = false">Закрыть</md-button>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="ChildscheduleDelete">Удалить</md-button>
        </template>
      </modal>

      <!-- CHILD EDITING TimeTablesEdit-->
      <modal v-if="editTimetablesData.modal" class="mini-modal-2">
        <template slot="header">
          <h4 class="modal-title">Перевод в другую группу</h4>
          <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editTimetablesData.modal = false">
            <md-icon>clear</md-icon>
          </md-button>
        </template>
        <template slot="body">
          <div class="md-layout">
            <div class="md-layout-item md-size-50">
              <h3>Текущие группы</h3>
              <p v-for="item in editTimetablesData.OldTimeTables" :key="item.id" :value="item.id">
                {{item.Filial.name}}: {{item.day}} {{item.timestart}}-{{item.timefinish}}
              </p>
            </div>
            <div class="md-layout-item md-size-50">
              <h3>Новые группы</h3>
              <div class="md-layout">
                <md-field class="md-layout-item md-size-50">
                  <label for="courses">Филиал</label>
                  <md-select v-model="selectedFilial" name="filials" id="filials">
                    <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                      {{item.name}}
                    </md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-50">
                  <label for="courses">Курс</label>
                  <md-select v-model="selectedCourse" name="courses" id="courses">
                    <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                      {{item.name}}
                    </md-option>
                  </md-select>
                </md-field>
                <md-field class="md-layout-item md-size-50" >
                  <md-switch v-model="ignore"></md-switch><!--<span class="mleft-10">Игнорировать</span>-->
                </md-field>
                <md-field class="md-layout-item md-size-50">
                  <label for="courses">Группы</label>
                  <md-select v-model="editTimetablesData.NewTimeTables" name="groups" id="groups" multiple>
                    <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                      {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <!--<div class="md-layout-item md-size-100 md-layout">
              <div class="md-layout-item md-size-100">
                <hr>
              </div>
              <div class="md-layout-item md-size-50">
                <p v-for="schedule in editTimetablesData.OldSchedules.Schedules" :key="schedule.id">
                  <span v-if="schedule.check=='Не пройдено'">
                    {{schedule.Task.numbertask}}) {{schedule.date.slice(0, 10)}} {{schedule.TimeTable.day}} {{schedule.TimeTable.timestart}} {{schedule.TimeTable.timefinish}}
                  </span>
                </p>
              </div>
              <div class="md-layout-item md-size-50">
                {{editTimetablesData.NewSchedules}}
              </div>
            </div>-->
          </div>
        </template>
        <template slot="footer">
          <md-button class="md-danger md-simple" @click="editTimetablesData.modal = false">Закрыть</md-button>
        </template>
        <template slot="footer">
          <md-button class="md-success md-simple" @click="editTimetables">Перевести</md-button>
        </template>
      </modal>
    </div> 
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import NavParents from './NavParents'
import NavTeachers from './NavTeachers'
import NavAdmins from './NavAdmins'
import {Modal} from '@/components'

import format from 'date-fns/format'
import {NavTabsCard, NavTabsTable} from '@/components'

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

export default {
  components: {
    NavTabsCard,
    NavTabsTable,
    Modal,
    NavParents,
    NavTeachers,
    NavAdmins
  },
  name: 'Index',
  data () {
    return {
      scheduleVersionNew: true,
      ChildscheduleDeleteData: null,
      ChildscheduleDeleteCourseTest: null,
      ChildscheduleDeleteModal: false,
      kickScheduleData: null,
      kickScheduleModal: false,
      childTransferModal: false,
      oneUpdate: true,
      pay: {
        hours: 100,
        childs: 150,
        teacherPayStart: null,
        teacherPayEnd: null,
        fullinfo: null
      },
      adminBuffer: {
        id: 0,
        name: '',
        middlename: '',
        surname: '',
        phone: '',
        email: '',
        password: ''
      },
      teacherBuffer: {
        id: 0,
        name: '',
        middlename: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        Alerts: [],
        Schedules: [],
      },
      childBuffer: null,
      childEditingData: {
        addMoney: null,
        editChild: null,
        addTrial: null
      },
      childEditing: {
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
      isValidChildAddForm: false,
      selectedLabeled: null,
      selectedFilial: null,
      selectedCourse: null,
      selectedTime: null,
      selectedGroups: [],
      ignore: false,
      payed: null,
      user: {
        id: 0,
        name: '',
        middlename: '',
        surname: '',
        phone: '',
        email: '',
        password: ''
      },
      child: {
        id: 0,
        name: '',
        middlename: '',
        surname: '',
        phone: '',
        UserId: 0,
        CourseId: 0,
        age: 0
      },
      teacher: {
        id: 0,
        name: '',
        middlename: '',
        surname: '',
        phone: '',
        email: '',
        password: ''
      },
      admin: {
        id: 0,
        name: '',
        middlename: '',
        surname: '',
        phone: '',
        email: '',
        password: ''
      },
      childSchedulePrev: [],
      childScheduleInfoModal: false,
      childScheduleInfo: [],
      schedules: [],
      teacherDeleteModal: false,
      teacherUpdateModal: false,
      teacherShowModal: false,
      teacherAddModal: false,
      userAddModal: false,
      userEditModal: false,
      userShowModal: false,
      childAddModal: false,
      adminAddModal: false,
      adminShowModal: false,
      adminUpdateModal: false,
      adminDeleteModal: false,
      editTimetablesData: {
        modal: false,
        OldSchedules: [],
        NewSchedules: [],
        OldTimeTables: [],
        NewTimeTables: []
      }
    }
  },
  computed: {
    ...mapGetters(['allFilials', 'allCourses', 'allTimeTables', 'allTeachers', 'allParents'/*, 'mathTeacher'*/, 'allAdmins']),
    groupsFiltered() {
      let timetables = []
      if (!this.ignore) {
        this.allTimeTables.forEach(timetable => {
          timetable.Courses.forEach(course => {
            if (course.id == this.selectedCourse) timetables.push(timetable)
          })
        })
      } else {
        timetables = this.allTimeTables
      }
      timetables = timetables.filter(timetable => this.selectedFilial == timetable.FilialId)
      //console.log(timetables)
      return timetables
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions(['createParent', 
    'editParent', 'getAllFilials', 'getAllTimeTables', 
    'getAllParents', 'getAllTeachers', 'getAllAdmins', 
    'getAllTimeTables', 'createChild', 'addMoneyChild',
    'createTrial', 'editChildSchedule', 'editChildVuex',
    'createTeacher', 'createAdmin', 'editAdmin', 'editTeacher',
    'transferChild', 'kickSchedule', 'updateScheduleOtrabs',
    'getAllParentInfo', 'deleteChildschedule',
    'editChildTimeTables', 'getTeacherPay']),
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
      await this.getTeacherPay(dataInfo)
      .then(res => {
        //console.log(res)
        console.log(res.data)
        this.pay.fullinfo = res.data.teacherResponse
        this.updateLoading('done')
      })
      .catch(error => {
        //console.log(error)
        this.updateLoading('fail')
      })
    },
    async editTimetables() {
      console.log(this.editTimetablesData)
      this.updateLoading('start')
        await this.editChildTimeTables({ChildId: this.editTimetablesData.OldTimeTables[0].ChildTable.ChildId, timetables: this.editTimetablesData.NewTimeTables})
        .then(res => {
          console.log(res)
          this.updateLoading('done')
          this.$notify({
            message: `Перевод успешно произведен!`,
            icon: 'check',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
        })
        .catch(error => {
          this.updateLoading('fail')
          this.$notify({
            message: `Перевести ученика не получилось! ${error}!`,
            icon: 'close',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
        this.editTimetablesData.modal = false
    },
    editTimetablesPrev(info) {
      console.log(info)
      this.editTimetablesData.modal = true
      let findChildSchedules = info.Childschedules.filter(childschedule => info.Course.id == childschedule.Course.id)
      let findChildSchedule = null
      console.log(findChildSchedules)
      if (findChildSchedules.length > 0)
      {
        findChildSchedule = findChildSchedules[findChildSchedules.length-1]
        this.editTimetablesData.OldSchedules = findChildSchedule
        this.editTimetablesData.NewSchedules = []
      }
      this.editTimetablesData.OldTimeTables = info.TimeTables
      this.editTimetablesData.NewTimeTables = []
      console.log(this.editTimetablesData)
    },
    ChildscheduleDeletePrev(Childschedule) {
      this.ChildscheduleDeleteData = Childschedule
      this.ChildscheduleDeleteModal = true
    },
    async ChildscheduleDelete() {
      console.log(this.ChildscheduleDeleteData)
      console.log(this.ChildscheduleDeleteCourseTest)
      if (this.ChildscheduleDeleteCourseTest == this.ChildscheduleDeleteData.Course.name) {
        this.updateLoading('start')
        await this.deleteChildschedule({id: this.ChildscheduleDeleteData.id})
        .then(res => {
          this.updateLoading('done')
          this.$notify({
            message: `Удалено успешно!`,
            icon: 'check',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
        })
        .catch(error => {
          this.updateLoading('fail')
          this.$notify({
            message: `Удаление не получилось! ${error}!`,
            icon: 'close',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
        this.ChildscheduleDeleteModal = false
      } else {
        this.$notify({
          message: `Удаление не получилось! Вы неправильно ввели имя курса!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      }
    },
    createTableTest(data) {
      console.log(data)
      console.log(data.usedtimetables)
      let infoArr = []
      data.usedtimetables.forEach(info => {
        let infoMini = []
        infoMini.push(`${info.date} в ${info.TimeTable.timestart}-${info.TimeTable.timefinish}`)
        infoMini.push(`${info.hours}`)
        infoMini.push(`${info.childs}`)
        let childs = ''
        info.Childrens.forEach(child => {
          if(child.status == undefined)
          childs += `${child.surname} ${child.name} ${child.middlename} ${child.phone}\n` 
          else
          childs += `(Пробное) ${child.name} ${child.phone}\n` 
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
    async teacherCreateReport(payed) {
    },
    async editSchedulePrevOtrab(schedule) {
      let updatedSchedule = {
        id: schedule.editSchedule.schedule.id,
        date: format(this.selectedLabeled, this.$material.locale.dateFormat || 'yyyy-MM-dd'),
        TimeTableId: this.selectedGroups,
        check: this.childEditing.editSchedule.check,
        time: this.selectedTime
      }
      this.updateLoading('start')
      await this.updateScheduleOtrabs(updatedSchedule)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
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
          message: `Отработка не была назначена! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async kickSchedulePrevTwo(item) {
      //console.log(item)
      
      this.updateLoading('start')
      await this.kickSchedule({id: item.id})
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.kickScheduleModal = false
        this.$notify({
          message: `Ребенок был исключен из группы успешно!`,
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
          message: `Ребенок не был исключен! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    kickSchedulePrev(item) {
      this.kickScheduleData = item
      this.kickScheduleModal = true
      //console.log(item)
    },
    buildSchedule() {
      //this.selectedLabeled = format(this.selectedLabeled, this.$material.locale.dateFormat || 'yyyy-MM-dd')
      if (this.payed != '') {
        let Course = this.allCourses.filter(course => course.id == this.selectedCourse)
        let TimeTables =  []
        this.allTimeTables.forEach(timetable => 
          this.selectedGroups.forEach(elem=> {
            if (timetable.id == elem) {
              TimeTables.push(timetable)
            }
          })
        )
        let newDate = new Date()
        newDate = this.selectedLabeled
        this.selectedLabeled = null
        this.childSchedulePrev = []
        let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
        let prop = false
        Course[0].Tasks.forEach((task, index) => {
          if (!prop) {
            let schedule = {
              Task: [],
              Date: null,
              Pay: null
            }
            if (index >= 0) {
              let added = false
              while(!added) {
                newDate.setDate(newDate.getDate() + 1)
                TimeTables.forEach(timetable => {
                  if (timetable.day == days[newDate.getDay()]) {
                    schedule.TimeTable = `${timetable.name} ${timetable.day}`
                    schedule.TimeTableId = timetable.id
                    schedule.Date = format(newDate, this.$material.locale.dateFormat || 'yyyy-MM-dd')

                    if (timetable.timelong == 3) {
                      schedule.Task.push(Course[0].Tasks[index])
                      schedule.Task.push(Course[0].Tasks[index+1])
                      schedule.Pay = (index < this.payed*2) ? "Оплачено" : "Не оплачено"
                      prop = true
                    } else {
                      schedule.Task.push(Course[0].Tasks[index])
                      schedule.Pay = (index < this.payed) ? "Оплачено" : "Не оплачено"
                      prop = false
                    }

                    this.childSchedulePrev.push(schedule)
                    added = true
                  }
                })
              }
            }
          } else {
            prop = false
          }
        })
        this.isValidChildAddForm = true
      } else {
        this.isValidChildAddForm = false
      }
    },
    async updateScheduleOtrab(schedule) {
      this.childEditing.editSchedule.schedule = schedule
      this.childEditing.editScheduleActive = false
      this.childEditing.editScheduleActiveOtrab = true
      //console.log(this.childEditing.editSchedule.schedule)
    },
    async childTransfer() {
      //console.log(this.childTransferId)

      // Подготовка расписания к сохранению
      //Связь ребенка с курсом
      this.child.CourseId = this.selectedCourse
      this.child.Childschedule = {
        CourseId: this.selectedCourse,
        ChildId: this.child.id
      }
      //Связь ребенка с группами
      this.child.ChildTables = []
      this.selectedGroups.forEach(timetable => {
        this.child.ChildTables.push({
          ChildId: this.child.id,
          TimeTableId: timetable
        })
      })
      
      this.child.Schedules = []
      this.childSchedulePrev.forEach(schedule => {
        schedule.Task.forEach(task => {
          this.child.Schedules.push({
            ChildscheduleId: null,
            TaskId: task.id,
            TimeTableId: schedule.TimeTableId,
            UserId: null,
            check: "Не пройдено",
            commit: schedule.Pay,
            date: schedule.Date
          })
        })
      })
      this.child.id = this.childTransferId

      this.updateLoading('start')
      
      let ch = {
        id: this.child.id,
        CourseId: this.child.CourseId,
        ChildTables: this.child.ChildTables,
        Schedules: this.child.Schedules
      }
      await this.transferChild(ch)
      .then(res => {
        this.childTransferModal = false
        //console.log(res)
        this.childSchedulePrev = []
        this.selectedGroups = []
        this.selectedFilial = null
        this.selectedCourse = null
        this.payed = null
        this.child.name = null
        this.child.id = null
        this.child.middlename = null
        this.child.surname = null
        this.child.phone = null
        this.child.age = null

        this.updateLoading('done')
        this.$notify({
          message: `Ребенок был успешно переведен на другой курс!`,
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
          message: `Ребенок не был переведен! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    childAdd(info) {
      //console.log(info)
      this.user = info
      this.child.surname = this.user.surname
      this.child.phone = this.user.phone
      this.child.UserId = this.user.id
      this.childAddModal = true
    },
    updateNewSchedule(item) {
      //console.log(item)
      this.childTransferId = item.id
      this.childTransferModal = true
    },
    async ChildAddSave() {
      // Подготовка расписания к сохранению
      //Связь ребенка с курсом
      this.child.CourseId = this.selectedCourse
      this.child.Childschedule = {
        CourseId: this.selectedCourse,
        ChildId: this.child.id
      }
      //Связь ребенка с группами
      this.child.ChildTables = []
      this.selectedGroups.forEach(timetable => {
        this.child.ChildTables.push({
          ChildId: this.child.id,
          TimeTableId: timetable
        })
      })
      
      this.child.Schedules = []
      this.childSchedulePrev.forEach(schedule => {
        schedule.Task.forEach(task => {
          this.child.Schedules.push({
            ChildscheduleId: null,
            TaskId: task.id,
            TimeTableId: schedule.TimeTableId,
            UserId: null,
            check: "Не пройдено",
            commit: schedule.Pay,
            date: schedule.Date,
          })
        })
      })
      let ch = {
        name: this.child.name,
        middlename: this.child.middlename,
        surname: this.child.surname,
        UserId: this.child.UserId,
        CourseId: this.child.CourseId,
        profileimage: this.child.profileimage,
        phone: this.child.phone,
        ChildTables: this.child.ChildTables,
        Schedules: this.child.Schedules,
        age: this.child.age
      }
      this.updateLoading('start')
      await this.createChild(ch)
      .then(res => {
        //console.log(res)
        this.childSchedulePrev = []
        this.selectedGroups = []
        this.selectedFilial = null
        this.selectedCourse = null
        this.payed = null
        this.child.name = null
        this.child.id = null
        this.child.middlename = null
        this.child.surname = null
        this.child.phone = null
        this.child.age = null
        this.childAddModal = false

        this.updateLoading('done')
        this.$notify({
          message: `Ребенок был добавлен успешно!`,
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
          message: `Ребенок не был добавлен! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    ShowCourseInfo(info) {
      this.childScheduleInfoModal = true
      this.childScheduleInfo = info
      console.log(info)
    },
    async teacherUpdatePrev() {
      this.updateLoading('start')
      let us = {
        id: this.teacherBuffer.id,
        profileimage: this.teacherBuffer.profileimage,
        email: this.teacherBuffer.email,
        password: this.teacherBuffer.password,
        middlename: this.teacherBuffer.middlename,
        surname: this.teacherBuffer.surname,
        name: this.teacherBuffer.name,
        phone: this.teacherBuffer.phone,
      }
      await this.editTeacher(us)
      .then(res => {
        //console.log(res)
      this.teacherUpdateModal = false
        this.updateLoading('done')
        this.$notify({
          message: `Преподаватель был успешно отредактирован!`,
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
          message: `Преподавателя отредактировать не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    AdminUpdateInfo(item) {
      //console.log(item)
      this.adminBuffer = {...item}
      /*this.adminBuffer.email = {...item.email}
      this.adminBuffer.phone = {...item.phone}
      this.adminBuffer.surname = {...item.surname}
      this.adminBuffer.middlename = {...item.middlename}
      this.adminBuffer.name = {...item.name}*/
      this.adminBuffer.password = ""
      this.adminUpdateModal = true
    },
    async adminUpdatePrev() {
      this.updateLoading('start')
      await this.editAdmin(this.adminBuffer)
      .then(res => {
        this.adminUpdateModal = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Администратор был успешно отредактирован!`,
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
          message: `Администратора отредактировать не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async AdminAddSave() {
      let adm = {
        name: this.admin.name,
        email: this.admin.email,
        middlename: this.admin.middlename,
        surname: this.admin.surname,
        phone: this.admin.phone,
        password: this.admin.password
      }
      await this.createAdmin(adm)
      .then(res => {
        //console.log(res)
        this.adminAddModal = false
        this.updateLoading('done')
        this.$notify({
          message: `Новый администратор был успешно добавлен!`,
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
          message: `Нового администратора добавить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    adminShowInfo(item) {
      this.adminBuffer = item
      this.adminShowModal = true
    },
    async TeacherAddSave() {
      //console.log(this.teacher)
      this.updateLoading('start')
      let th = {
        email: this.teacher.email,
        middlename: this.teacher.middlename,
        surname: this.teacher.surname,
        name: this.teacher.name,
        phone: this.teacher.phone,
        password: this.teacher.password,
      }
      await this.createTeacher(th)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.teacherAddModal = false
        this.$notify({
          message: `Новый преподаватель был успешно добавлен!`,
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
          message: `Нового преподавателя добавить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    TeacherShowInfo(item) {
      this.teacherBuffer = item
      let date1 = new Date()
      let date2 = new Date(date1.getFullYear(), date1.getMonth(), 1)
      let date3 = new Date(date1.getFullYear(), date1.getMonth() + 1, 0)
      this.pay.teacherPayStart = date2
      this.pay.teacherPayEnd = date3
      this.teacherShowModal = true
    },
    TeacherUpdateInfo(item) {
      this.teacherBuffer.id = item.id
      this.teacherBuffer.email = item.email
      this.teacherBuffer.phone = item.phone
      this.teacherBuffer.surname = item.surname
      this.teacherBuffer.middlename = item.middlename
      this.teacherBuffer.name = item.name
      this.teacherBuffer.password = ""
      this.teacherUpdateModal = true
    },
    TeacherDeleteInfo(item) {
      this.teacherBuffer = item
      this.teacherDeleteModal = true
    },
    //  Parents //
    userAdd() {
      this.userAddModal = true
      //console.log('userAdd')
    },
    async createUser(user) {
      this.updateLoading('start')
      let usr = {
        email: "",
        middlename: user.middlename,
        surname: user.surname,
        name: user.name,
        phone: user.phone,
        password: "123456"
      }
      await this.createParent(usr)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.userAddModal = false
        this.$notify({
          message: `Новый родитель был успешно добавлен!`,
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
          message: `Нового родителя добавить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    userUpdate(user) {
      this.user.id = user.id
      this.userEditModal = true
      this.user.middlename = user.middlename
      this.user.name = user.name
      this.user.surname = user.surname
      this.user.phone = user.phone
      this.user.email = user.email
      this.user.password = user.password
    },
    async userSave(user) {
      //console.log(user)
      this.updateLoading('start')
      let usr = {
        id: user.id,
        email: user.email,
        middlename: user.middlename,
        surname: user.surname,
        name: user.name,
        phone: user.phone,
        password: user.password,
        profileiamge: user.profileiamge
      }
      await this.editParent(usr)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.userEditModal = false
        this.$notify({
          message: `Родитель отредактирован успешно!`,
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
          message: `Родитель не был отредактирован! ${error}`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    parentClick(item) {
      this.user = item
    },
    updateSchedule(schedule) {
      console.log(schedule)
      this.childEditing.editScheduleActiveOtrab = false
      this.childEditing.editSchedule.date = schedule.date.slice(0,10)
      this.childEditing.editSchedule.schedule = schedule
      this.childEditing.editSchedule.commit = this.childEditing.editSchedule.schedule.commit
      this.childEditing.editSchedule.check = this.childEditing.editSchedule.schedule.check
      this.childEditing.editSchedule.UserVariants = []
      if (this.childEditing.editSchedule.schedule.User == null) {
        this.childEditing.editSchedule.User = {
          id: 0,
          name: `Не`,
          middlename: 'проведено'
        }
      } else {
        this.childEditing.editSchedule.User = this.childEditing.editSchedule.schedule.User
      }
      this.childEditing.editSchedule.UserVariants.push({
        id: -1,
        name: `Не`,
        middlename: 'проведено'
      })
      this.allTeachers.forEach(teacher => {
        this.childEditing.editSchedule.UserVariants.push(teacher)
      })
      this.childEditing.editScheduleActive = true
      //console.log(schedule)
      //console.log(this.childEditing.editScheduleActive)
      //console.log(this.childEditing.editSchedule.UserVariants)
    },
    async editSchedulePrev() {
      this.updateLoading('start')
      let obj = {
        UserId: this.user.id,
        schedule: {
          id: this.childEditing.editSchedule.schedule.id,
          commit: this.childEditing.editSchedule.commit,
          check: this.childEditing.editSchedule.check,
          UserId: this.childEditing.editSchedule.User.id,
          date: this.childEditing.editSchedule.date
        }
      }

      await this.editChildSchedule(obj)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
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

      //console.log(obj)
      this.childScheduleInfoModal = false
      this.childEditing.editScheduleActive = false
    },
    addMoney(childBuffer) {
      this.childEditing.addMoney = true
      this.childBuffer = childBuffer
    },
    editCourse(childBuffer) {
      this.childEditing.editCourse = true
      this.childBuffer = childBuffer
    },
    addTrial(childBuffer) {
      this.childEditing.addTrial = true
      this.childBuffer = childBuffer
    },
    async ChildEditSave() {
      //console.log(this.child)
      this.child.CourseId = this.selectedCourse
      let ch = {
        id: this.child.id,
        name: this.child.name,
        middlename: this.child.middlename,
        surname: this.child.surname,
        UserId: this.child.UserId,
        CourseId: this.child.CourseId,
        profileimage: this.child.profileimage,
        phone: this.child.phone,
        age: this.child.age
      }
      this.updateLoading('start')
      console.log('editChildVuex')
      await this.editChildVuex(ch)
      .then(res => {
        this.childEditing.editChild = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Ребенок был отредактирован успешно!`,
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
          message: `Ребенок не был отредактирован! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    editChild(childBuffer) {
      this.childEditing.editChild = true
      this.childBuffer = childBuffer

      //this.child = this.childBuffer
      this.selectedCourse = this.childBuffer.Course.id
      this.child.age = this.childBuffer.age
      this.child.id = this.childBuffer.id
      this.child.name = this.childBuffer.name
      this.child.middlename = this.childBuffer.middlename
      this.child.phone = this.childBuffer.phone
      this.child.surname = this.childBuffer.surname
      this.child.UserId = this.childBuffer.UserId
      this.child.Galleries = this.childBuffer.Galleries
      this.child.Childschedules = this.childBuffer.Childschedules
      this.child.Course = this.childBuffer.Course

      //console.log(this.childBuffer.Childschedules[0].Schedules)

      this.childScheduleInfo = this.childBuffer.Childschedules[0].Schedules
    },
    editSchedule(childBuffer) {
      this.childEditing.editSchedule.showModal = true
      this.childBuffer = childBuffer
      this.childScheduleInfo = childBuffer.Childschedules[0].Schedules
      //console.log(this.childBuffer)
    },
    async addMoneyChildPrev() {
      this.updateLoading('start')
      //console.log(this.childBuffer)
      await this.addMoneyChild({
        money: this.childEditingData.addMoney, 
        ChildId: this.childBuffer.id, 
        CourseId: this.childBuffer.Course.id
      })
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.childEditing.addMoney = false
        this.$notify({
          message: `Оплата успешно сохранена!`,
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
          message: `Оплату сохранить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async addTrialChildPrev() {
      console.log(this.childBuffer)
      let trial = {
        check: "Не пройдено", //Пройдено или нет
        name: `${this.childBuffer.surname} ${this.childBuffer.name}`,
        phone: this.childBuffer.phone,
        description: "Переход с другого курса", //Где узнали
        commit: "Назначено", //от препода
        TimeTableId: this.selectedGroups, //Группа
        Course: [...this.selectedCourse], //Курс
        date: format(this.selectedLabeled, this.$material.locale.dateFormat || 'yyyy-MM-dd'),
        ChildId: this.childBuffer.id
      }
      console.log(trial)
      //console.log(trial)
      this.updateLoading('start')

      await this.createTrial(trial)
      .then(res => {
        this.childEditing.addTrial = false
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Пробное занятие успешно создано!`,
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
          message: `Пробное задание создать не получилось! ${error}!`,
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
    if(this.allParents.length == 0) await this.getAllParents()
    this.updateLoading('done')
    if(this.allTeachers.length == 0) await this.getAllTeachers()
    if(this.allAdmins.length == 0) await this.getAllAdmins()
    if(this.allTimeTables.length == 0) await this.getAllTimeTables()
  }
}
</script>

<style>
  .max-height-350 {
    max-height: 350px;
  }
.img-size {
  width: 70px;
}
.modal-mask {
  z-index: 11;
}
.mleft-10 {
  margin-top: 15px;
  color: rgb(170, 170, 170);
  font-weight: 400;
  font-size: 14px;
}
.md-schedule-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}
.max-w-100 {
  width: 100px !important;
}
</style>