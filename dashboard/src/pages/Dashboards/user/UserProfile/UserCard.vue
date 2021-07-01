<template>
  <md-card class="md-card-profile">
    <div class="photo">
      <md-avatar class="md-avatar-icon ">
        <img
          v-if="user.profileimage != ''"
          :src="`${config.FILE_SERVER}${user.profileimage}`"
          alt="Raised Image"
          class="img-raised rounded img-size md-elevation-6"
        />
        <div class="separator" v-else>
          {{user.surname[0]}}
        </div>
      </md-avatar>
    </div>

    <md-card-content>
      <h6 class="category text-gray">Добро пожаловать,</h6>
      <h4 class="card-title">{{ user.surname }} {{ user.name }} {{ user.middlename }}</h4>
      <p class="card-description">
        Номер телефона: {{ user.phone }}
      </p>
      <p class="card-description">
        Почта: {{ user.email }}
      </p>
      <!--<md-button class="md-round md-success">Follow</md-button> -->
    </md-card-content>
  </md-card>
</template>
<script>
import configFile from '../../../../config'
export default {
  name: "user-card",
  props: {
    user: {}
  },
  data() {
    return {
      config: configFile,
      profileimage: require('../../../../assets/img/load.gif')
    };
  },
  methods: {
  },
  mounted() {
    this.profileimage = `http://localhost:8081/${this.user.profileimage}`
  }
};
</script>
<style>
.md-card-profile {
  margin-top: 90px;
}
.photo {
  height: 80px;
  margin-top: -90px;
}
.photo .md-avatar-icon {
  min-width: 80px;
  min-height: 80px;
}
.photo .md-avatar-icon .separator {
  font-size: 40px;
}
</style>
