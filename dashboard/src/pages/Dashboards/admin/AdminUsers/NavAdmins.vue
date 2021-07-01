<template>
  <div>
    <div class="text-center">
      <md-button class="md-just-icon" @click="$emit('CreateAdminShowModal')">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="bottom">Добавить администратора</md-tooltip>
      </md-button>
    </div>
      <md-table md-card>
        <md-table-row>
          <md-table-head>Фото</md-table-head>
          <md-table-head>Имя</md-table-head>
          <md-table-head>Должность</md-table-head>
          <md-table-head>Почта</md-table-head>
          <md-table-head>Телефон</md-table-head>
          <md-table-head>Действия</md-table-head>
        </md-table-row>
      <md-table-row v-for="item in allAdmins" :key="item.id">
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
        <md-table-cell>{{ item.name }} {{ item.middlename }}</md-table-cell>
        <md-table-cell>{{ item.surname }}</md-table-cell>
        <md-table-cell>{{ item.email }}</md-table-cell>
        <md-table-cell>{{ item.phone }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-just-icon md-simple md-primary" @click="$emit('AdminShowInfo', item)">
            <md-icon>person</md-icon>
            <md-tooltip md-direction="bottom">Информация</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-success" @click="$emit('AdminUpdate', item)">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="bottom">Редактировать</md-tooltip>
          </md-button>
          <!--<md-button class="md-just-icon md-simple md-danger" @click="$emit('AdminDelete', item)">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="bottom">Удалить</md-tooltip>
          </md-button>-->
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import configFile from '../../../../config'
export default {
  model: {
    events: ['CreateAdminShowModal', 'AdminShowInfo', 'AdminUpdate', 'AdminDelete']
  },
  props: {
    //admins: ''
  },
  name: "nav-admins",
  data() {
    return {
      config: configFile,
    }
  },
  computed: mapGetters(['allAdmins']),
  methods: mapActions(['getAllAdmins']),
  async mounted() {
  }
}
</script>

<style scoped>
  .img-size {
    width: 70px;
  }
</style>