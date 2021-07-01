<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Оповещения</h4>
        <p class="category">Здесь вы можете получить задачи от адинистратора</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-toolbar 
            v-for="item in getProfile.Alerts.slice().reverse()" 
            :key="item.id" 
            class="marg"
            v-bind:class="{
              'md-success': item.check,
              'md-warning': (item.type == 'warning' && !item.check),
              'md-danger': (item.type == 'danger' && !item.check)
              }">
              <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                  <h3 class="md-title">{{ item.message }}</h3>
                </div>
                <div class="md-toolbar-section-end">
                  <div class="md-collapse">
                    <md-list>
                      <md-list-item v-if="!item.check">
                        <md-button class="md-just-icon md-simple md-danger" @click="checkAlert(item)">
                          <md-icon>remove_red_eye</md-icon>
                          <md-tooltip md-direction="top">Просмотреть</md-tooltip>
                        </md-button>
                      </md-list-item>
                    </md-list>
                  </div>
                </div>
              </div>
            </md-toolbar>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: "teacher-alerts",
  components: {
  },
  data() {
    return {
      alerts: []
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    ...mapActions(['thisUserAlertCheck']),
    ...mapMutations(['updateLoading']),
    async checkAlert(item) {
      this.updateLoading('start')
      await this.thisUserAlertCheck(item)
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Оповещение просмотрено!`,
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
          message: `Оповещение не просмотрено! ${error.response.data}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    }
  }
}
</script>

<style scoped>
.marg {
  margin-bottom: 15px;
}
</style>