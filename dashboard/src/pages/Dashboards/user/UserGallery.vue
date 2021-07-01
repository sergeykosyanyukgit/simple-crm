<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <h4 class="title">Галерея</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-25 md-small-size-50">
            <md-field class="text-center">
              <label for="teachers">Сортировать по дате</label>
              <md-select v-model="sortDataValue" name="sortData" id="sortData">
                <md-option v-for="sort in sortData" :key="sort.order" :value="sort.order">{{sort.name}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-25 md-small-size-50">
            <md-field class="text-center">
              <label for="teachers">Показать</label>
              <md-select v-model="sortLikesValue" name="sortData" id="sortData">
                <md-option v-for="sort in sorLikes" :key="sort.order" :value="sort.order">{{sort.name}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-layout">
              <div 
              v-for="item in galleryFiltered" 
              :key="item.id"
              class="md-layout-item md-xsmall-size-100 md-small-size-40 md-size-30 md-card-custom md-elevation-4">
                <img :src="(item.image.length < 2) ? loading : `${config.FILE_SERVER}${item.image}`" alt="Cover" class="md-card-custom-image">
                <div class="md-card-custom-content">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-80">
                      <h3>{{item.name}}</h3>
                      <h4>{{item.description}}</h4>
                    </div>
                    <div class="md-layout-item md-size-20 text-center like-center">
                      <md-button class="md-danger md-just-icon" :disabled="item.islike" @click="photoLike(item)">
                        <md-icon>favorite</md-icon>
                      </md-button>
                      <md-button class="md-success md-just-icon" :href="`${config.FILE_SERVER}${item.image}`" target="blank" download>
                        <md-icon>cloud_download</md-icon>
                      </md-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import configFile from '../../../config'
import {Modal} from '@/components'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: "user-gallery",
  components: {
    Modal
  },
  data() {
    return {
      config: configFile,
      gallery: [],
      loading: require('@/assets/img/load.gif'),
      sortDataValue: 1,
      sortCourseValue: 0,
      sortLikesValue: 0,
      sortChildValue: 0,
      sortData: [
        {name: 'Сначала старые', order: 0},
        {name: 'Сначала новые', order: 1}
      ],
      sortCourse: [
        {name: 'Все', order: 0}
      ],
      sorLikes: [
        {name: 'Все', order: 0},
        {name: 'Только понравившееся', order: 1}
      ],
      sortChilds: [
        {name: 'Все', order: 0}
      ]
    }
  },
  computed: {
    ...mapGetters(['getProfile', 'selectedThemeDashboard']),
    galleryFiltered() {
      this.gallery.sort((a, b) => {
        var nameA=a.createdAt, nameB=b.createdAt
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      })
      if (this.sortDataValue == 1)
        this.gallery.reverse()
      return this.gallery.filter(this.filterLikes)
    },
  },
  methods: {
    ...mapActions(['thisUserPhotoLike']),
    ...mapMutations(['updateLoading']),
    filterLikes(gallery) {
      if (this.sortLikesValue == 0) {
        return true
      } else {
        return gallery.islike
      }
    },
    async photoLike(photo) {
      this.updateLoading('start')
      await this.thisUserPhotoLike({id: photo.id})
      .then(res => {
        //console.log(res)
        this.updateLoading('done')
        this.$notify({
          message: `Фото было успешно добавлено в избранное!`,
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
          message: `Фото не добавлено в избранное! ${error}!`,
          icon: 'close',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      })
    },
  },
  async mounted() {
    if(this.getProfile.Children)
    this.getProfile.Children.forEach(children => {
      children.Galleries.forEach(gallerys => {
        this.gallery.push(gallerys)
      }) 
    })
  }
}
</script>

<style scoped>
.img-size {
  width: 70px;
}
.md-card-custom {
  margin: 15px auto;
  border-radius: 3px;
  padding-left: 0;
  padding-right: 0;
}
.md-card-custom-image {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.md-card-custom-content {
  padding: 20px;
}
</style>