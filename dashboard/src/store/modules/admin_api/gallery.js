import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async getAllGallery (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllGallery()
          ctx.commit('updateGallery', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async deleteGallery (ctx, gallery) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteGallery(gallery)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createGallery (ctx, gallery) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createGallery(gallery)
          await ctx.dispatch('getAllGallery')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateGallery (state, gallery) {
      state.gallery = gallery
    },
    filterGallery (state, filter) {
      // console.log(filter)
      state.gallery.sort((a, b) => {
        let nameA = a.createdAt.toLowerCase()
        let nameB = b.createdAt.toLowerCase()
        if (nameA < nameB) { return -1 }
        if (nameA > nameB) { return 1 }
        return 0
      })

      if (filter.sortDataValue === 1) {
        state.gallery.reverse()
      }

      state.gallerySorted = state.gallery.filter(item => {
        if (filter.sortCourseValue === 0) {
          return true
        } else {
          if (filter.sortCourseValue === item.Course.id) {
            return true
          } else {
            return false
          }
        }
      })

      state.gallerySorted = state.gallerySorted.filter(item => {
        if (filter.sortGroupValue === 0) {
          return true
        } else {
          if (filter.sortGroupValue === item.GroupId) {
            return true
          } else {
            return false
          }
        }
      })

      state.gallerySorted = state.gallerySorted.filter(item => {
        if (filter.sortChildValue === '') {
          return true
        } else {
          if (filter.sortChildValue === `${item.Child.surname} ${item.Child.name} ${item.Child.middlename}`) {
            return true
          } else {
            return false
          }
        }
      })
    }
  },
  state: {
    gallery: [],
    gallerySorted: []
  },
  getters: {
    allGallery (state) {
      return state.gallerySorted
    }
  }
}
