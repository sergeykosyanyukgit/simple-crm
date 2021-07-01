import AdminService from '../../../services/AdminService'
import TeacherService from '../../../services/TeacherService'

export default {
  actions: {
    async getWeekInfo (ctx, timetable) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await TeacherService.getWeekInfo(timetable)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async loadChildSchedules (ctx, schedule) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.loadChildSchedules(schedule)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async kickSchedule (ctx, schedule) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.kickSchedule(schedule)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async updateSchedule (ctx, schedule) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.updateSchedule(schedule)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async updatingScheduleOtrabs (ctx, schedule) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.updatingScheduleOtrabs(schedule)
          await ctx.dispatch('getAllMinings')
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async updateScheduleOtrabs (ctx, schedule) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.updateScheduleOtrabs(schedule)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllTimeTables (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllTimeTables()
          ctx.commit('updateTimeTables', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async edittimetable (ctx, timetable) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editTimeTable(timetable)
          await ctx.dispatch('getAllTimeTables')
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createTimeTable (ctx, timetable) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createTimeTable(timetable)
          await ctx.dispatch('getAllTimeTables')
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async deleteTimeTable (ctx, timetable) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteTimeTable(timetable)
          await ctx.dispatch('getAllTimeTables')
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateTimeTables (state, timetables) {
      state.timetables = timetables
    }
  },
  state: {
    timetables: []
  },
  getters: {
    allTimeTables (state) {
      return state.timetables
    }
  }
}
