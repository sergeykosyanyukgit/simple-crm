import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async getAllThemeDashboard (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllThemeDashboard()
          ctx.commit('updateThemesDashboard', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createThemeDashboard (ctx, theme) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createThemeDashboard(theme)
          await ctx.dispatch('getAllThemeDashboard')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editThemeDashboard (ctx, theme) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editThemeDashboard(theme)
          await ctx.dispatch('getAllThemeDashboard')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async selectThemeDashboard (ctx, theme) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.selectThemeDashboard(theme)
          await ctx.dispatch('getAllThemeDashboard')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateThemeDashboard (state, ThemeDashboard) {
      state.ThemeDashboard = ThemeDashboard
    },
    updateThemesDashboard (state, ThemeDashboard) {
      state.ThemesDashboard = ThemeDashboard
    }
  },
  state: {
    ThemeDashboard: {},
    ThemesDashboard: []
  },
  getters: {
    allThemeDashboard (state) {
      return state.ThemesDashboard
    },
    selectedThemeDashboard (state) {
      return state.ThemeDashboard
    }
  }
}
