import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async getAllCourses (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllCourses()
          if(data.data) {
            ctx.commit('updateCourses', data.data)
            resolve(data.data)
          } else {
            resolve(data)
          }
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async updateCourse (ctx, course) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.updateCourse(course)
          await ctx.dispatch('getAllCourses')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createCourse (ctx, course) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createCourse(course)
          await ctx.dispatch('getAllCourses')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async deleteCourse (ctx, course) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteCourse(course)
          await ctx.dispatch('getAllCourses')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async deleteTask (ctx, course) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteTask(course)
          await ctx.dispatch('getAllCourses')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createtask (ctx, course) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createTask(course)
          await ctx.dispatch('getAllCourses')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async edittask (ctx, course) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editTask(course)
          await ctx.dispatch('getAllCourses')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateCourses (state, courses) {
      state.courses = courses
      courses.forEach((course, index) => {
        state.courses[index].Tasks = course.Tasks.sort((a, b) => a.numbertask - b.numbertask)
      })
    }
  },
  state: {
    courses: []
  },
  getters: {
    allCourses (state) {
      return state.courses
    }
  }
}
