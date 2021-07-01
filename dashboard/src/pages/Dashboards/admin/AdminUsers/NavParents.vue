<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100 md-size-33">
      <div class="md-layout">
        <md-field md-clearable class="md-layout-item md-size-100">
          <label for="middlenameadd">Поиск</label>
          <md-input v-model="search" name="middlenameadd"></md-input>
        </md-field>
      </div>
    </div>
    <div class="md-layout-item md-small-size-100 md-size-33 text-center">
      <md-button class="md-just-icon" @click="$emit('CreateUser')">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="bottom">Добавить родителя</md-tooltip>
      </md-button>
    </div>
    <div class="md-layout-item md-size-100">
      <md-list>
        <md-list-item md-expand v-for="item in usersPaginated"
        :key="item.id" 
        class="list-border md-elevation-3" 
        @click="parentClick(item) && $emit('parentClick', item)">
          <div class="md-layout m-left-fix">
            <div class="md-layout-item md-small-size-100 md-size-10 text-center">
              <md-avatar class="md-avatar-icon  md-large">
                <img
                  v-if="item.profileimage != ''"
                  :src="`${config.FILE_SERVER}${item.profileimage}`"
                  alt="Raised Image"
                  class="img-raised rounded img-size md-elevation-6"
                />
                <div class="separator" v-else>
                  {{item.surname[0].toUpperCase()}}
                </div>
              </md-avatar>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-40 md-left text-center">
              <h5>
                {{ item.surname }} {{ item.name }} {{ item.middlename }}
              </h5>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30 text-center">
              <h5>
                {{ item.phone }}
              </h5>
              <h5>
                {{ item.email }}
              </h5>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-10 text-center">
              <h5>
                <md-button class="md-just-icon md-simple md-success" @click.stop="$emit('UserUpdate', item)">
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                </md-button>
                <md-button class="md-just-icon md-simple md-danger" @click.stop="$emit('ChildShowAddModal', item)">
                  <md-icon>add</md-icon>
                  <md-tooltip md-direction="bottom">Добавить ребенка</md-tooltip>
                </md-button>
              </h5>
            </div>
          </div>
          <div slot="md-expand" class="md-layout">
            <div class="md-layout-item md-size-100">
              <nav-tabs-card>
                <template slot="content">
                  <md-tabs 
                    md-alignment="left">
                    <md-tab id="tab-child" md-label="Дети" md-icon="person">
                      <div class="md-layout-item md-size-100" v-for="item in item.Children" :key="item.id">
                        <div class="text-left md-layout">
                          <div class="md-layout-item md-size-10 md-small-size-100 text-center">
                            <md-avatar class="md-avatar-icon md-large">
                              <img
                                v-if="item.profileimage != ''"
                                :src="`${config.FILE_SERVER}${item.profileimage}`"
                                alt="Raised Image"
                                class="img-raised rounded img-size md-elevation-6"
                              />
                              <div class="separator" v-else>
                                {{item.surname[0].toUpperCase()}}
                              </div>
                            </md-avatar>
                          </div>
                          <div class="md-layout-item md-size-20 md-small-size-100">
                            <span v-if="item.Childschedules != undefined" >
                              <div v-for="Childschedule in item.Childschedules" :key="Childschedule.id" class="md-layout">
                                <md-button @click="$emit('ShowCourseInfo', Childschedule.Schedules)" class="md-layout-item md-sm md-size-60 md-small-size-100">
                                  {{ Childschedule.Course.name }}
                                </md-button>
                                <div class="md-layout-item md-size-30 md-small-size-100 text-center">
                                  <md-button class="md-just-icon md-danger" @click="$emit('ChildscheduleDelete', Childschedule)">
                                    <md-icon>clear</md-icon>
                                    <md-tooltip md-direction="bottom">Удалить расписание</md-tooltip>
                                  </md-button>
                                </div>

                              </div>
                            </span>
                          </div>
                          <div class="md-layout-item md-size-20 md-small-size-100 text-center">
                            <div class="md-top">
                              {{ item.surname }} <br>{{ item.name }} {{ item.middlename }}
                            </div>
                            <div class="md-top">
                              {{ item.phone }},
                            </div>
                            <div class="md-top">
                              Возраст: {{(((date.getTime() - new Date(item.age.substring(6,10), item.age.substring(3,5), item.age.substring(0,2))) / (24 * 3600 * 365.25 * 1000)) | 0).toFixed(0)}}
                            </div>
                            <div class="md-top">
                              {{item.Course.name}}
                            </div>
                          </div>
                          <div class="md-layout-item md-size-50 md-small-size-100">
                            <div class="md-top md-layout">
                              <div class="md-layout-item md-size-10 md-small-size-50">
                                <md-button class="md-just-icon md-success" @click="$emit('addMoney', item)">
                                  <md-icon>attach_money</md-icon>
                                  <md-tooltip md-direction="bottom">Добавить оплату</md-tooltip>
                                </md-button>
                              </div>
                              <div class="md-layout-item md-size-10 md-small-size-50">
                                <md-button class="md-just-icon md-warning" @click="$emit('editTimetables', item)">
                                  <md-icon>perm_contact_calendar</md-icon>
                                  <md-tooltip md-direction="bottom">Изменить группу</md-tooltip>
                                </md-button>
                              </div>
                              <div class="md-layout-item md-size-10 md-small-size-50">
                                <md-button class="md-just-icon md-primary" @click="$emit('addTrial', item)">
                                  <md-icon>description</md-icon>
                                  <md-tooltip md-direction="bottom">Добавить пробное</md-tooltip>
                                </md-button>
                              </div>
                              <div class="md-layout-item md-size-10 md-small-size-50">
                                <md-button class="md-just-icon md-warning" @click="$emit('editChild', item)">
                                  <md-icon>edit</md-icon>
                                  <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
                                </md-button>
                              </div>
                              <div class="md-layout-item md-size-10 md-small-size-50">
                                <md-button class="md-just-icon" @click="$emit('updateNewSchedule', item)">
                                  <md-icon>timeline</md-icon>
                                  <md-tooltip md-direction="bottom">Переход на другой курс</md-tooltip>
                                </md-button>
                              </div>
                              <div class="md-layout-item md-size-10 md-small-size-50">
                                <md-button class="md-just-icon md-danger" @click="$emit('kickSchedule', item)">
                                  <md-icon>remove</md-icon>
                                  <md-tooltip md-direction="bottom">Исключить из групп</md-tooltip>
                                </md-button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </md-tab>
                    <md-tab id="tab-trial" md-label="Пробные" md-icon="person_add">
                      <div class="md-layout" v-for="child in item.Children" :key="child.id">
                        <div v-for="trial in child.Trials" :key="trial.id" 
                        class="md-layout-item md-size-100 mini-menu"
                        v-bind:class="{
                          'danger-bg': trial.check == 'Пропущено',
                          'warning-bg': trial.check == 'Не пройдено',
                          'success-bg': trial.check == 'Пройдено',
                        }">
                          <h5>
                            {{ trial.check }}.
                            {{ trial.name }}.
                            {{ trial.phone }}.
                            {{ trial.description }}.
                            {{ trial.commit }}.
                          </h5>
                          <h5>
                            <span v-if="trial.User!=null">
                              {{ trial.User.name }} {{ trial.User.middlename }}.
                            </span>
                            <span v-else>
                              Нет преподавателя.
                            </span>
                            <span v-if="trial.TimeTable!=null">
                              {{ trial.TimeTable.Filial.name }} {{ trial.TimeTable.name }}: {{ trial.TimeTable.day }} {{ trial.TimeTable.timestart }} ({{ trial.date }}).
                            </span>
                            <span v-else>
                              Группа не назначена.
                            </span>
                          </h5>
                        </div>
                      </div>
                    </md-tab>
                    <md-tab id="tab-feedback" md-label="Отзывы" md-icon="sentiment_very_satisfied">
                      <div class="md-layout">
                        <div v-for="feedback in item.Feedbacks" 
                        :key="feedback.id" 
                        class="md-layout-item md-size-40 mini-menu md-elevation-3"
                        v-bind:class="{
                          'danger-bg': feedback.stars < 4,
                          'warning-bg': feedback.stars >= 4 && feedback.stars < 8,
                          'success-bg': feedback.stars >= 8,
                        }">
                          <md-icon v-if="feedback.stars < 4">sentiment_very_dissatisfied</md-icon>
                          <md-icon v-else-if="feedback.stars >= 4 && feedback.stars < 6">sentiment_dissatisfied</md-icon>
                          <md-icon v-else-if="feedback.stars >= 6 && feedback.stars < 8">sentiment_satisfied</md-icon>
                          <md-icon v-else>sentiment_very_satisfied</md-icon>
                          {{ feedback.topic }} {{ feedback.description }} {{ feedback.stars }}
                        </div>
                      </div>
                    </md-tab>
                    <md-tab id="tab-alert" md-label="Оповещения" md-icon="local_post_office">
                      <div class="md-layout">
                        <div v-for="alert in item.Alerts" :key="alert.id"
                        class="md-layout-item md-size-100 mini-menu md-elevation-3"
                        v-bind:class="{
                          'danger-bg': alert.type == 'danger',
                          'warning-bg': alert.type == 'warning',
                          'success-bg': alert.type == 'success',
                        }">
                          <h5>
                            <md-icon v-if="alert.check">done</md-icon>
                            <md-icon v-else>clear</md-icon>
                            <span v-if="alert.check">Прочитано.</span>
                            <span v-else>Не прочитано.</span>
                            Сообщение: {{ alert.message }}. 
                            Создано: {{ alert.createdAt }}.
                          </h5>
                        </div>
                      </div>
                    </md-tab>
                  </md-tabs>
                </template>
              </nav-tabs-card>
            </div>
          </div>
        </md-list-item>
      </md-list>
    </div>
    <div class="md-layout-item md-size-100 text-center">
      <pagination
        v-model="pagePagination"
        @input="paginationClick"
        :page-count="pageCount">
      </pagination>
    </div>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}
import configFile from '../../../../config'
import { NavTabsCard, NavTabsTable, Pagination } from '@/components'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Pagination,
    NavTabsCard,
    NavTabsTable,
  },
  model: {
    events: ['CreateUser', 'UserShowInfo', 'UserUpdate', 'ChildShowAddModal', 'parentClick', 'ChildscheduleDelete']
  },
  props: {
    //users: ''
  },
  name: "nav-parents",
  data() {
    return {
      date: new Date(),
      config: configFile,
      search: null,
      pagePagination: 1,
      selectedChildToAdd: null,
      childsNames: [],
      loading: require('@/assets/img/load.gif'),
      expandNews: false,
      expandSingle: false,
      parentPrevChildren: null
    }
  },
  async mounted() {
  },
  methods: {
    ...mapActions(['getAllParents', 'getAllParentInfo']),
    async parentClick(parent) {
      //console.log(parent)
      await this.getAllParentInfo(parent.id)
      //this.parentPrevChildren = parent.Children
    },
    async paginationClick() {
      //console.log(this.pagePagination)
    }
  },
  computed: {
    ...mapGetters(['allParents']),
    pageCount(sorted) {
      return Math.ceil(this.allParents.length / 6)
    },
    usersPaginated() {
      let paginated = []
      let parents = this.allParents
      if (this.search) {
        parents = this.allParents.filter(item => {
          if (toLower(item.middlename).includes(toLower(this.search)) ||
          toLower(item.name).includes(toLower(this.search)) ||
          toLower(item.surname).includes(toLower(this.search)) ||
          toLower(item.phone).includes(toLower(this.search)) ||
          toLower(item.email).includes(toLower(this.search))||
          toLower(item.Children[0].name).includes(toLower(this.search)) ||
          toLower(item.Children[0].middlename).includes(toLower(this.search)) ||
          toLower(item.Children[0].Course.name).includes(toLower(this.search)) ||
          toLower(item.Children[0].name).includes(toLower(this.search)) || 
          toLower(item.Children[0].surname).includes(toLower(this.search)))
          {
            return true
          } else {
            return false
          }
        })
      }
      parents.forEach((user, index) => {
        if (this.pagePagination == 1) {
          if(index < 6) paginated.push(user)
        } else {
          if(index >= (this.pagePagination*6-6) && index < this.pagePagination*6) paginated.push(user)
        }
      })
      return paginated
    }
  }
}
</script>

<style scoped>
  .m-left-fix {
    /*margin-left: 30px;*/
    white-space:initial;
    margin-left: 0;
  }
  .img-size {
    width: 80px;
  }
  .md-left {
    margin-left: 20px;
  }
  .md-top {
    margin-top: 12px;
  }
  .md-top-max {
    margin-top: 20px;
  }
  .badged {
    margin-top: 5px;
    border-radius: 10px;
    padding: 2px 5px;
    margin-right: 10px;
    width: 80%;
    cursor: pointer;
  }
  .img-size-big {
    width: 160px;
  }
  .pagination {
    align-items: center;
    justify-content: center;
  }
  .list-border {
    margin-bottom: 10px;
    /*border: 1px solid #ebe9e9;*/
    border-radius: 5px;
  }
  .mini-menu {
    border-radius: 5px;
    margin: 15px;
    padding: 10px 10px;
  }
  .mini-menu:hover {
    cursor: pointer;
  }
  @media (max-width: 960px) {
    .m-left-fix {
      margin-left: 10%;
    }
  }
</style>