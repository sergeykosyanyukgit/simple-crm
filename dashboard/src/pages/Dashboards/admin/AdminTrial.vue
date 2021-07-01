<template>
  <div class="content">
    <div class="md-layout">
    <!--<div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-20">
      <md-field class="text-center">
        <label for="filials">Филиал</label>
        <md-select v-model="filialsSet" name="filial" id="filial">
          <md-option v-for="filial in allFilials" :key="filial.id" :value="filial.id">{{filial.name}}</md-option>
        </md-select>
      </md-field>
    </div>-->
      <div class="md-layout-item md-size-100">
        <nav-tabs-card>
          <template slot="content">
            <md-tabs
              md-alignment="left">
              <md-tab id="tab-new" md-label="Не обработаны">
                <div class="text-center">
                  <md-button class="md-just-icon" @click="createTrialModal = true">
                    <md-icon>add</md-icon>
                    <md-tooltip md-direction="top">Новая заявка</md-tooltip>
                  </md-button>
                </div>
                <md-table>
                  <md-table-row>
                    <md-table-head>Группа</md-table-head>
                    <md-table-head>Филиал</md-table-head>
                    <md-table-head>Результат</md-table-head>
                    <md-table-head>Пройдено</md-table-head>
                    <md-table-head>Назначение</md-table-head>
                    <md-table-head>Имя Ребенка</md-table-head>
                    <md-table-head>Имя Родителя</md-table-head>
                    <md-table-head>Преподаватель</md-table-head>
                    <md-table-head>Телефон</md-table-head>
                    <md-table-head>Дата</md-table-head>
                    <md-table-head>Курс</md-table-head>
                    <md-table-head>Описание</md-table-head>
                    <md-table-head>Действия</md-table-head>
                  </md-table-row>
                  <md-table-row v-for="item in allTrials" :key="item.id">
                    <md-table-cell v-if="item.commit == 'Не назначено'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.name }} {{ item.TimeTable.day }} {{ item.TimeTable.timestart }}
                      </span>
                      <span v-else>
                        Нет группы
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.Filial.name }}
                      </span>
                      <span v-else>
                        Нет филиала
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.res }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.commit }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.check }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.name }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.parentname }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено' && item.User != null">{{ item.User.surname }} {{ item.User.name }}</md-table-cell>
                    <md-table-cell v-else-if="item.commit == 'Не назначено' && item.User == null">Нет преподавателя</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.phone }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'"><span v-if="item.date != null">{{ item.date.slice(0, 10) }}</span></md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">
                      <span v-for="course in item.TrialCourses" :key="course.id">
                        {{course.Course.name}},
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">{{ item.description }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Не назначено'">
                      <md-button class="md-just-icon md-simple md-success" @click="editTrialPrev(item)">
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                      </md-button>
                      <md-button class="md-just-icon md-simple md-danger" @click="deleteTrialPrev(item)">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="bottom">Удалить</md-tooltip>
                      </md-button>
                      <md-button v-if="item.ReferalParentTrials.length > 0" class="md-just-icon md-simple md-danger" @click="editReferalDiscountPrev(item)">
                        <md-icon>attach_money</md-icon>
                        <md-tooltip md-direction="bottom">Назначить скидку рефералу</md-tooltip>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>

              <md-tab id="tab-selected" md-label="Назначенные">
                <md-table>
                  <md-table-row>
                    <md-table-head>Группа</md-table-head>
                    <md-table-head>Филиал</md-table-head>
                    <md-table-head>Результат</md-table-head>
                    <md-table-head>Пройдено</md-table-head>
                    <md-table-head>Назначение</md-table-head>
                    <md-table-head>Имя Ребенка</md-table-head>
                    <md-table-head>Имя Родителя</md-table-head>
                    <md-table-head>Преподаватель</md-table-head>
                    <md-table-head>Телефон</md-table-head>
                    <md-table-head>Дата</md-table-head>
                    <md-table-head>Курс</md-table-head>
                    <md-table-head>Описание</md-table-head>
                    <md-table-head>Действия</md-table-head>
                  </md-table-row>
                  <md-table-row v-for="item in allTrials" :key="item.id">
                    <md-table-cell v-if="item.commit == 'Назначено'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.name }} {{ item.TimeTable.day }} {{ item.TimeTable.timestart }}
                      </span>
                      <span v-else>
                        Нет группы
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.Filial.name }}
                      </span>
                      <span v-else>
                        Нет филиала
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.res }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.commit }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.check }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.name }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.parentname }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено' && item.User != null">{{ item.User.surname }} {{ item.User.name }}</md-table-cell>
                    <md-table-cell v-else-if="item.commit == 'Назначено' && item.User == null">Нет преподавателя</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.phone }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.date.slice(0, 10) }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">
                      <span v-for="course in item.TrialCourses" :key="course.id">
                        {{course.Course.name}},
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">{{ item.description }}</md-table-cell>
                    <md-table-cell v-if="item.commit == 'Назначено'">
                      <md-button class="md-just-icon md-simple md-success" @click="editTrialPrev(item)">
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                      </md-button>
                      <md-button class="md-just-icon md-simple md-danger" @click="deleteTrialPrev(item)">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="bottom">Удалить</md-tooltip>
                      </md-button>
                      <md-button v-if="item.ReferalParentTrials.length > 0" class="md-just-icon md-simple md-danger" @click="editReferalDiscountPrev(item)">
                        <md-icon>attach_money</md-icon>
                        <md-tooltip md-direction="bottom">Назначить скидку рефералу</md-tooltip>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>

              <md-tab id="tab-finish" md-label="Пройденные">
                <md-table>
                  <md-table-row>
                    <md-table-head>Группа</md-table-head>
                    <md-table-head>Филиал</md-table-head>
                    <md-table-head>Результат</md-table-head>
                    <md-table-head>Пройдено</md-table-head>
                    <md-table-head>Назначение</md-table-head>
                    <md-table-head>Имя Ребенка</md-table-head>
                    <md-table-head>Имя Родителя</md-table-head>
                    <md-table-head>Преподаватель</md-table-head>
                    <md-table-head>Телефон</md-table-head>
                    <md-table-head>Дата</md-table-head>
                    <md-table-head>Курс</md-table-head>
                    <md-table-head>Описание</md-table-head>
                    <md-table-head>Действия</md-table-head>
                  </md-table-row>
                  <md-table-row v-for="item in allTrials" :key="item.id">
                    <md-table-cell v-if="item.check == 'Пройдено'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.name }} {{ item.TimeTable.day }} {{ item.TimeTable.timestart }}
                      </span>
                      <span v-else>
                        Нет группы
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.Filial.name }}
                      </span>
                      <span v-else>
                        Нет филиала
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.res }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.commit }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.check }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.name }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.parentname }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено' && item.User != null">{{ item.User.surname }} {{ item.User.name }}</md-table-cell>
                    <md-table-cell v-else-if="item.check == 'Пройдено' && item.User == null">Нет преподавателя</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.phone }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.date.slice(0, 10) }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">
                      <span v-for="course in item.TrialCourses" :key="course.id">
                        {{course.Course.name}},
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">{{ item.description }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пройдено'">
                      <md-button class="md-just-icon md-simple md-success" @click="editTrialPrev(item)">
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                      </md-button>
                      <md-button class="md-just-icon md-simple md-danger" @click="deleteTrialPrev(item)">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="bottom">Удалить</md-tooltip>
                      </md-button>
                      <md-button v-if="item.ReferalParentTrials.length > 0" class="md-just-icon md-simple md-danger" @click="editReferalDiscountPrev(item)">
                        <md-icon>attach_money</md-icon>
                        <md-tooltip md-direction="bottom">Назначить скидку рефералу</md-tooltip>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>

              <md-tab id="tab-missed" md-label="Пропущенные">
                <md-table>
                  <md-table-row>
                    <md-table-head>Группа</md-table-head>
                    <md-table-head>Филиал</md-table-head>
                    <md-table-head>Результат</md-table-head>
                    <md-table-head>Пройдено</md-table-head>
                    <md-table-head>Назначение</md-table-head>
                    <md-table-head>Имя Ребенка</md-table-head>
                    <md-table-head>Имя Родителя</md-table-head>
                    <md-table-head>Преподаватель</md-table-head>
                    <md-table-head>Телефон</md-table-head>
                    <md-table-head>Дата</md-table-head>
                    <md-table-head>Курс</md-table-head>
                    <md-table-head>Описание</md-table-head>
                    <md-table-head>Действия</md-table-head>
                  </md-table-row>
                  <md-table-row v-for="item in allTrials" :key="item.id">
                    <md-table-cell v-if="item.check == 'Пропуск'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.name }} {{ item.TimeTable.day }} {{ item.TimeTable.timestart }}
                      </span>
                      <span v-else>
                        Нет группы
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">
                      <span v-if="item.TimeTable != null">
                        {{ item.TimeTable.Filial.name }}
                      </span>
                      <span v-else>
                        Нет филиала
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.res }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.commit }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.check }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.name }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.parentname }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск' && item.User != null">{{ item.User.surname }} {{ item.User.name }}</md-table-cell>
                    <md-table-cell v-else-if="item.check == 'Пропуск' && item.User == null">Нет преподавателя</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.phone }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.date.slice(0, 10) }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">
                      <span v-for="course in item.TrialCourses" :key="course.id">
                        {{course.Course.name}},
                      </span>
                    </md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">{{ item.description }}</md-table-cell>
                    <md-table-cell v-if="item.check == 'Пропуск'">
                      <md-button class="md-just-icon md-simple md-success" @click="editTrialPrev(item)">
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                      </md-button>
                      <md-button class="md-just-icon md-simple md-danger" @click="deleteTrialPrev(item)">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="bottom">Удалить</md-tooltip>
                      </md-button>
                      <md-button v-if="item.ReferalParentTrials.length > 0" class="md-just-icon md-simple md-danger" @click="editReferalDiscountPrev(item)">
                        <md-icon>attach_money</md-icon>
                        <md-tooltip md-direction="bottom">Назначить скидку рефералу</md-tooltip>
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

    <!-- CHILD EDITING addTrial -->
    <modal v-if="editTrialModal" class="normal-modal">
      <template slot="header">
        <h4 class="modal-title">Изменение пробного занятия</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="editTrialModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Филиал</label>
            <md-select v-model="selected.FilialId" name="filials" id="filials">
              <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                {{item.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Курс</label>
            <md-select v-model="selected.CourseId" name="courses" id="courses" multiple>
              <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                {{item.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-size-33" >
            <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
          </md-field>
          
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Назначение</label>
            <md-select v-model="selected.commit">
              <md-option v-for="item in trialCommit" :key="item" :value="item">
                {{item}}
              </md-option>
            </md-select>
          </md-field>
          
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Пройдено</label>
            <md-select v-model="selected.check">
              <md-option v-for="item in trialCheck" :key="item" :value="item">
                {{item}}
              </md-option>
            </md-select>
          </md-field>
          
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Ученик</label>
            <md-select v-model="selected.ChildId">
              <md-option v-for="item in allChilds.childs" :key="item.id" :value="item.id">
                {{item.surname}} {{item.name}} {{item.middlename}}
              </md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-size-33">
            <label for="courses">Преподаватель</label>
            <md-select v-model="selected.UserId">
              <md-option v-for="item in allTeachers" :key="item.id" :value="item.id">
                {{item.surname}} {{item.name}} {{item.middlename}}
              </md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-size-33">
            <label for="courses">Группа</label>
            <md-select v-model="selected.TimeTableId">
              <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
              </md-option>
            </md-select>
          </md-field>
          <div class="md-layout-item md-size-33">
            <md-datepicker v-model="selected.Labeled">
              <label>Дата пробного занятия</label>
            </md-datepicker>
          </div>
          <md-field class="md-layout-item md-size-33">
            <label for="phone">Телефон</label>
            <md-input v-model="selected.phone"
              @focus="checkPhone" @input="nextPhoneCheck" type="text" maxlength="15" minlength="15"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="description">Описание</label>
            <md-input v-model="selected.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-33">
            <label for="courses">Результат</label>
            <md-select v-model="selected.res">
              <md-option v-for="item in trialRes" :key="item" :value="item">
                {{item}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-33 md-size-33">
            <label for="time">Время пробного</label>
            <md-input v-model="selected.time" name="time"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-33 md-size-33">
            <label for="name">Имя Ребенка</label>
            <md-input v-model="selected.name" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-33 md-size-33">
            <label for="parentname">Имя Родителя</label>
            <md-input v-model="selected.parentname" name="parentname"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-100 md-size-100">
            <label for="comment">Комментарий</label>
            <md-input v-model="selected.comment" name="comment"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="editTrialModal = false">Закрыть</md-button>
        <md-button class="md-success md-simple" @click="addTrialChildPrev">Сохранить</md-button>
      </template>
    </modal>

    <!-- addTrial -->
    <modal v-if="createTrialModal" class="normal-modal">
      <template slot="header">
        <h4 class="modal-title">Создание пробного занятия</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="createTrialModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33">
            <label for="courses">Филиал</label>
            <md-select v-model="selected.FilialId" name="filials" id="filials">
              <md-option v-for="item in allFilials" :key="item.id" :value="item.id">
                {{item.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-33">
            <label for="courses">Курс</label>
            <md-select v-model="selected.CourseId" name="courses" id="courses" multiple>
              <md-option v-for="item in allCourses" :key="item.id" :value="item.id">
                {{item.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-33" >
            <md-switch v-model="ignore"></md-switch><span class="mleft-10">Игнорировать</span>
          </md-field>

          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-33 md-size-33">
            <label for="courses">Группа</label>
            <md-select v-model="selected.TimeTableId">
              <md-option v-for="item in groupsFiltered" :key="item.id" :value="item.id">
                {{item.name}} {{item.Children.length}}/{{item.maxsize}} {{item.day}} {{item.timestart}}-{{item.timefinish}}
              </md-option>
            </md-select>
          </md-field>
          <div class="md-layout-item md-xsmall-size-100 md-small-size-33 md-size-33">
            <md-datepicker v-model="selected.Labeled">
              <label>Дата пробного</label>
            </md-datepicker>
          </div>
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-33 md-size-33">
            <label for="time">Время пробного</label>
            <md-input v-model="selected.time" name="time"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-50">
            <label for="name">Имя Ребенка</label>
            <md-input v-model="selected.name" name="name"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-50">
            <label for="parentname">Имя Родителя</label>
            <md-input v-model="selected.parentname" name="parentname"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="phone">Телефон</label>
            <md-input v-model="selected.phone"
              @focus="checkPhone" @input="nextPhoneCheck" type="text" maxlength="15" minlength="15" name="phone"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-50 md-size-50">
            <label for="description">Откуда узнали</label>
            <md-input v-model="selected.description" name="description"></md-input>
          </md-field>
          <md-field class="md-layout-item md-xsmall-size-50 md-size-50">
            <label for="comment">Комментарий</label>
            <md-input v-model="selected.comment" name="comment"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <label for="courses">Преподаватель</label>
            <md-select v-model="selected.UserId">
              <md-option v-for="item in allTeachers" :key="item.id" :value="item.id">
                {{item.surname}} {{item.name}} {{item.middlename}}
              </md-option>
            </md-select>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="createTrialModal = false">Закрыть</md-button>
        <md-button class="md-success md-simple" @click="addTrialPrev">Сохранить</md-button>
      </template>
    </modal>

    <!-- referalDiscount.modal -->
    <modal v-if="referalDiscount.modal" class="mini-modal-1">
      <template slot="header">
        <h4 class="modal-title">Скидка за приглашение</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="referalDiscount.modal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <h4 class="md-layout-item md-size-100">
            {{ `${referalDiscount.User.surname} ${referalDiscount.User.name} ${referalDiscount.User.middlename}` }}
          </h4>
          <md-field class="md-layout-item md-size-100">
            <label for="discount">Назначить скидку</label>
            <md-input v-model="referalDiscount.discount" name="discount"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-danger md-simple" @click="referalDiscount.modal = false">Отмена</md-button>
        <md-button class="md-success md-simple" @click="referalDiscountSavePrev">Назначить</md-button>
      </template>
    </modal>

    
    <!-- deleteTrialModal -->
    <modal v-if="deleteTrialModal" class="mini-modal-1">
      <template slot="header">
        <h4 class="modal-title">Удаление пробного</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="deleteTrialModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <p class="md-layout-item md-size-100">
            Вы действительно хотите удалить пробное занятие у {{deleteTrialItem.name}}?
          </p>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="deleteTrialModal = false">Отмена</md-button>
        <md-button class="md-danger md-simple" @click="deleteTrialThis(deleteTrialItem.id)">Удалить</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import {Modal, NavTabsCard, NavTabsTable} from '@/components'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import format from 'date-fns/format'
export default {
  name: "admin-trial",
  components: {
    Modal,
    NavTabsCard, 
    NavTabsTable
  },
  data() {
    return {
      deleteTrialItem: null,
      deleteTrialModal: false,
      createTrialModal: false,
      editTrialModal: false,
      ignore: true,
      filialsSet: 1,
      selected: {
        id: null,
        phone: null,
        description: null,
        ChildId: null,
        commit: null,
        check: null,
        Labeled: null,
        FilialId: null,
        CourseId: null,
        TimeTableId: null,
        UserId: null,
        res: null,
        name: null,
        parentname: null,
        time: null,
        comment: null
      },
      trialRes: [
        'Не пройдено',
        'Думают',
        'Записались',
        'Не записались'
      ],
      trialCommit: [
        'Не назначено',
        'Назначено'
      ],
      trialCheck: [
        'Пройдено',
        'Пропуск',
        'Не пройдено'
      ],
      referalDiscount: {
        modal: false,
        User: null,
        discount: null,
        referaltrialid: null
      },
      trialDescription: null,
      trialPhone: null,
      trialName: null,
      alert: {
        type: null,
        message: null,
        acive: null,
        //pay: null,
        //filial: [],
        course: []
      },
      feedbacks: [],
      alerts: [],
      createAlertModal: false,
      createEmailModal: false,
      userid: null,
      type: '',
      message: '',
      check: false
    }
  },
  computed: {
    ...mapGetters(['allTrials', 'allFilials', 'allCourses', 'allTimeTables', 'allChilds', 'allTeachers']),
    groupsFiltered() {
      let timetables = []
      if (!this.ignore) {
        this.allTimeTables.forEach(timetable => {
          timetable.Courses.forEach(course => {
            if (course.id == this.selected.CourseId) timetables.push(timetable)
          })
        })
      } else {
        timetables = this.allTimeTables
      }
      timetables = timetables.filter(timetable => this.selected.FilialId == timetable.FilialId)
      return timetables
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions(['getAllTrials', 'getAllChilds', 'editTrial', 'getAllTeachers',
    'getAllTimeTables', 'createTrial', 'getAllFilials', 'getAllCourses', 'ReferalDiscountUpdate',
    'deleteTrial']),
    nextPhoneCheck(event) {
      if (this.selected.phone != null)
      if (this.selected.phone.length == 5) {
        this.selected.phone += ')'
      } else if (this.selected.phone.length == 9) {
        this.selected.phone += '-'
      } else if (this.selected.phone.length == 12) {
        this.selected.phone += '-'
      }
    },
    checkPhone() {
      if (this.selected.phone == null || this.selected.phone.length == 0) {
        this.selected.phone = '8('
      }
    },
    deleteTrialPrev(item) {
      this.deleteTrialItem = item
      this.deleteTrialModal = true
    },
    editReferalDiscountPrev(item) {
      this.referalDiscount.discount = item.ReferalParentTrials[0].discount
      this.referalDiscount.User = item.ReferalParentTrials[0].User
      this.referalDiscount.referaltrialid = item.ReferalParentTrials[0].id
      this.referalDiscount.modal = true
    },
    async deleteTrialThis(id) {
      let info = {
        id: id
      }
      this.updateLoading('start')
      await this.deleteTrial(info)
      .then(res => {
        this.updateLoading('done')
        this.deleteTrialModal = false
        this.$notify({
          message: `Пробное занятие успешно удалено!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        console.log(error.response)
        this.updateLoading('fail')
        this.$notify({
          message: `Пробное удалить не удалась! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async referalDiscountSavePrev() {
      console.log(this.referalDiscount)
      let info = {
        ReferalParentTrialId: this.referalDiscount.referaltrialid,
        discount: this.referalDiscount.discount
      }
      console.log(info)
      this.updateLoading('start')
      await this.ReferalDiscountUpdate(info)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.referalDiscount.modal = false
        this.$notify({
          message: `Скидка за приглашение успешно назначена!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Скидку за приглашение создать не удалась! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async addTrialPrev() {
      let trial = {
        FilialId: this.selected.FilialId,
        phone: this.selected.phone,
        description: this.selected.description,
        name: this.selected.name,
        Course: [...this.selected.CourseId],
        UserId: this.selected.UserId,
        TimeTableId: this.selected.TimeTableId,
        res: 'Не пройдено',
        commit: 'Назначено',
        check: 'Не пройдено',
        parentname: this.selected.parentname,
        time: this.selected.time,
        comment: this.selected.comment,
        date: format(this.selected.Labeled, this.$material.locale.dateFormat || 'yyyy-MM-dd'),
      }
      console.log(trial)
      this.updateLoading('start')
      await this.createTrial(trial)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.createTrialModal = false
        this.$notify({
          message: `Пробное занятие успешно создано!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        console.log(error.response)
        console.log(error.response.data)
        this.updateLoading('fail')
        this.$notify({
          message: `Пробное занятие создать не удалась! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async addTrialChildPrev() {
      this.updateLoading('start')
      console.log(this.selected)
      await this.editTrial(this.selected)
      .then(res => {
        //console.log(res)
        this.editTrialModal = false
        this.updateLoading('done')
        this.$notify({
          message: `Пробное занятие успешно отредактировано!`,
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
          message: `Пробное занятие отредактировать не удалась! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    editTrialPrev(item) {
      this.editTrialModal = true
      console.log(item)
      this.selected.id = item.id
      this.selected.UserId = item.UserId
      this.selected.TimeTableId = item.TimeTableId
      if(item.TimeTable != null ) this.selected.FilialId = item.TimeTable.Filial.id
      else this.selected.FilialId = null
      this.selected.CourseId = []
      item.TrialCourses.forEach(course => {
        this.selected.CourseId.push(course.Course.id)
      })
      this.selected.res = item.res
      if(item.date != null ) this.selected.Labeled = item.date.substr(0, 10)
      else this.selected.Labeled = null
      this.selected.check = item.check
      this.selected.commit = item.commit
      this.selected.ChildId = item.ChildId
      this.selected.phone = item.phone
      this.selected.description = item.description
      this.selected.name = item.name
      this.selected.parentname = item.parentname
      this.selected.time = item.time
      this.selected.comment = item.comment
      //console.log(this.selected.CourseId)
      //console.log(this.selected)
    },
  },
  async mounted() {
    this.updateLoading('start')
    let timeTables = []
    this.allFilials.forEach(filial => {
      filial.TimeTables.forEach(TimeTable => {
        timeTables.push(TimeTable)
      })
    })
    if(this.allTrials.length == 0) await this.getAllTrials()
    this.updateLoading('done')
    
    if(this.allTimeTables.length == 0) await this.getAllTimeTables()
    if(this.allChilds.childs.length == 0) await this.getAllChilds()
    if(this.allTeachers.length == 0) await this.getAllTeachers()
    if(this.allCourses.length == 0) await this.getAllCourses()
    console.log(this.allTrials)
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