<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Отзывы</h4>
        <p class="category">Здесь вы можете отправить отзыв о работе нашей компании</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout-item md-small-size-100 md-size-100 text-center">
              <md-button class="md-just-icon" @click="ReviewShowAddModal">
                <md-icon>add</md-icon>
                <md-tooltip md-direction="top">Оставить отзыв</md-tooltip>
              </md-button>
            </div>
            <md-table v-if="getProfile.Feedbacks != null" v-model="getProfile.Feedbacks">
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }">
                  <md-table-cell>Оценка: {{ item.stars }}</md-table-cell>
                  <md-table-cell>{{ item.topic }}</md-table-cell>
                  <md-table-cell>{{ item.description }}</md-table-cell>
                  <md-table-cell>
                    <md-button class="md-just-icon md-simple md-danger" @click="deleteFeedback(item)">
                      <md-icon>close</md-icon>
                      <md-tooltip md-direction="top">Удалить</md-tooltip>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
            </md-table>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <!-- REVIEW ADD MODAL -->
    <modal v-if="feedbackmodal" @close="feedbackmodal = false" class="mini-modal-2">
      <template slot="header">
        <h4 class="modal-title">Добавление Отзыва</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="feedbackmodal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="md-layout">
          <md-field class="md-layout-item md-size-50">
            <md-input v-model="topic" placeholder="Тема" type="text"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-50">
            <md-input v-model="description" placeholder="Описание" type="text"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-100">
            <md-input v-model="stars" placeholder="Оценка от 1 до 10" type="number" @change="changedStars"></md-input>
          </md-field>
        </div>
      </template>
      <template slot="footer">
        <md-button class="md-success md-simple" @click="createFeedback">Добавить</md-button>
        <md-button class="md-danger md-simple" @click="feedbackmodal = false">Отмена</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {Modal} from '@/components'
export default {
  name: "user-reviews",
  components: {
    Modal
  },
  data() {
    return {
      feedbacks: [],
      feedbackmodal: false,
      topic: '',
      description: '',
      stars: null
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  methods: {
    ...mapActions(['thisUserReviewCreate', 'thisUserReviewDelete']),
    ...mapMutations(['updateLoading']),
    changedStars() {
      if (this.stars < 1) {
        this.stars = 1
      } 
      if (this.stars > 10) {
        this.stars = 10
      }
    },
    ReviewShowAddModal() {
      this.feedbackmodal = true
      //console.log('ReviewShowAddModal')
    },
    async createFeedback() {
      this.feedbackmodal = false
      let feedback = {
        UserId: this.getProfile.id,
        topic: this.topic,
        description: this.description,
        stars: this.stars
      }
      this.updateLoading('start')
      await this.thisUserReviewCreate(feedback)
      .then(response => {
        this.updateLoading('done')
        this.$notify({
          message: `Отзыв успешно отправлен!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Отзыв отправить не получилось! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
    async deleteFeedback(item) {
      this.updateLoading('start')
      await this.thisUserReviewDelete({id: item.id})
      .then(response => {
        this.updateLoading('done')
        this.$notify({
          message: `Отзыв успешно удален!`,
          icon: 'check',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
      .catch(error => {
        this.updateLoading('fail')
        this.$notify({
          message: `Отзыв удалить не получилось! ${error}!`,
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
.fix {
    min-width: 115ch;
}
</style>