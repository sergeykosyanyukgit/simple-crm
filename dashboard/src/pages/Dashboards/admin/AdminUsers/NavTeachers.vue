<template>
  <div>
    <div class="text-center">
      <md-button class="md-just-icon" @click="$emit('CreateTeacherShowModal')">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="bottom">Добавить преподавателя</md-tooltip>
      </md-button>
    </div>
      <md-table md-card>
        <md-table-row>
          <md-table-head>Фото</md-table-head>
          <md-table-head>ФИО</md-table-head>
          <md-table-head>Почта</md-table-head>
          <md-table-head>Телефон</md-table-head>
          <md-table-head>Действия</md-table-head>
        </md-table-row>
      <md-table-row v-for="item in allTeachers" :key="item.id">
      <md-table-cell>
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
      </md-table-cell>
        <md-table-cell>{{ item.surname }} {{ item.name }} {{ item.middlename }}</md-table-cell>
        <md-table-cell>{{ item.email }}</md-table-cell>
        <md-table-cell>{{ item.phone }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-just-icon md-simple md-primary" @click="$emit('TeacherShowInfo', item)">
            <md-icon>person</md-icon>
            <md-tooltip md-direction="bottom">Информация</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-success" @click="$emit('TeacherUpdate', item)">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import configFile from '../../../../config'
export default {
  model: {
    events: ['CreateTeacherShowModal', 'TeacherShowInfo', 'TeacherUpdate', 'TeacherDelete']
  },
  props: {
    //teachers: ''
  },
  name: "nav-teachers",
  data() {
    return {
      config: configFile,
    }
  },
  computed: mapGetters(['allTeachers']),
  methods: mapActions(['getAllTeachers']),
  async mounted() {
  }
}
</script>

<style scoped>
  .img-size {
    width: 70px;
  }
</style>