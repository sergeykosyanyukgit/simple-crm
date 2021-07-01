<template>
  <div class="md-layout">
    <div 
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 text-center"
      :class="{ 'md-size-15': Object.keys(TimeTablesData).length == 1 }"
      v-for="(fullday, name, index) in TimeTablesData" :key="fullday.id">
      <h5 v-if="Object.keys(TimeTablesData).length > 1">{{days[index].day}}</h5>
      <md-card md-with-hover v-for="day in fullday" :key="day.id" v-if="day.show != false && day.name != 'Пробное'"
      class="md-card-custom"
      v-bind:class="mathCardColor(day, day.date)">
        <md-card-content class="md-elevation-3" @click="TimeTableSelect(day)">
          <h3 class="card-item">{{day.name}}:{{day.Children.length}}/{{day.maxsize}}</h3>
          <h4 class="card-item">{{day.timestart}}-{{day.timefinish}}</h4>
          <h4 class="card-item">{{day.date}}</h4>
          <h5 class="card-item"><span v-for="course in day.Courses" :key="course.id">{{course.name}} </span></h5>
          <h5 class="card-item"><span v-for="teacher in day.Users" :key="teacher.id">{{teacher.name}} </span>
            <div>
              <md-chip class="md-primary" v-if="day.Trials.filter(days => days.date.slice(0, 10) == day.date).length > 0">
                <md-tooltip md-direction="top">Пробные занятия</md-tooltip>
                {{day.Trials.filter(days => days.date.slice(0, 10) == day.date).length}}
              </md-chip>
              <md-chip class="md-accent" v-if="day.MiningTables.filter(days => days.date.substr(0, 10) == day.date).length > 0">
                <md-tooltip md-direction="top">Отработки</md-tooltip>
                <span v-if="day.timelong == 3">{{day.MiningTables.filter(days => days.date.substr(0, 10) == day.date).length/2}}</span>
                <span v-else>{{day.MiningTables.filter(days => days.date.substr(0, 10) == day.date).length}}</span>
              </md-chip>
            </div>
          </h5>
          <div class="card-item">
            <md-button class="md-just-icon md-warning" @click="$emit('loadTimeTableFullInfo', day)">
              <md-icon>remove_red_eye</md-icon>
              <md-tooltip md-direction="bottom">Просмотреть</md-tooltip>
            </md-button>
            <md-button class="md-just-icon md-danger" @click="$emit('photoLoad', day)">
              <md-icon>insert_photo</md-icon>
              <md-tooltip md-direction="bottom">Загрузка фото</md-tooltip>
            </md-button>
          </div>
        </md-card-content>
      </md-card>
      <md-card md-with-hover v-for="day in fullday" :key="day.id" v-if="day.show != false && day.name == 'Пробное' && day.Trials.filter(days => days.date.slice(0, 10) == day.date).length > 0"
      class="md-card-custom red-card mini-card">
        <md-card-content class="md-elevation-3" @click="TimeTableSelect(day)">
          <h3 class="card-item">{{day.name}}:{{day.Trials.filter(days => days.date.slice(0, 10) == day.date).length}}</h3>
          <h4 class="card-item">{{day.timestart}}</h4>
          <h4 class="card-item">{{day.date}}</h4>
          <h5 class="card-item"><span v-for="course in day.Courses" :key="course.id">{{course.name}} </span></h5>
          <h5 class="card-item"><span v-for="teacher in day.Users" :key="teacher.id">{{teacher.name}} </span></h5>
          <md-button class="md-just-icon md-warning" @click="$emit('loadTimeTableFullInfo', day)">
            <md-icon>remove_red_eye</md-icon>
            <md-tooltip md-direction="bottom">Просмотреть</md-tooltip>
          </md-button>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
export default {
  events: ['photoLoad', 'loadTimeTableFullInfo'],
  props: ['TimeTablesData'],
  name: 'TimeTableNew',
  data () {
    return {
      days: [
        { value: 'monday', day: 'Понедельник'},
        { value: 'tuesday', day: 'Вторник'},
        { value: 'wednesday', day: 'Среда'},
        { value: 'thursday', day: 'Четверг'},
        { value: 'friday', day: 'Пятница'},
        { value: 'saturday', day: 'Суббота'},
        { value: 'sunday', day: 'Воскресенье'}
      ],
    }
  },
  methods: {
    mathCardColor(day, date) {
      let returned = 'green-card'
      day.Children.forEach(child => {
        console.log(child)
        child.Childschedules[0].Schedules.forEach((schedule, index) => {
          if (schedule.check == 'Не пройдено' || schedule.check == 'Назначена отработка' || schedule.check == 'Пропущено' && schedule.date.slice(0, 10) != date)
          {
            if (index == 0)
            {
              if (schedule.check == 'Пропущено')
              {
                returned = 'orange-card'
              }
              else
              {
                returned = 'red-card'
              }
            }
          }
        })
      })
      return returned
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