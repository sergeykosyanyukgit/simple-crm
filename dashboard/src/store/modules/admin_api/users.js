import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async editParent (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editUser(user)
          await ctx.dispatch('getAllParents')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createParent (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createParent(user)
          await ctx.dispatch('getAllParents')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createTeacher (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createTeacher(user)
          await ctx.dispatch('getAllTeachers')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editAdmin (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editUser(user)
          await ctx.dispatch('getAllAdmins')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editTeacher (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editUser(user)
          await ctx.dispatch('getAllTeachers')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createAdmin (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createAdmin(user)
          await ctx.dispatch('getAllAdmins')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllMinings (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllMinings()
          console.log('getAllMinings')
          ctx.commit('updateMinings', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllParents (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllParents()
          ctx.commit('updateParents', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllParentInfo (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllParentInfo({id: user})
          ctx.commit('updateParent', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllTeachers (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllTeachers()
          ctx.commit('updateTeachers', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllAdmins (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllAdmins()
          ctx.commit('updateAdmins', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getTeacherPay (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getTeacherPay(user)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getTeacherPayMini (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getTeacherPayMini(user)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: { // Изменяем данные в store
    updateParents (state, parents) {
      state.parents = parents
    },
    updateMinings (state, minings) {
      state.minings = minings
    },
    updateParent (state, parent) {
      const index = state.parents.findIndex(x => x.id === parent.id)
      state.parents.splice(index, 1, parent)
    },
    updateTeachers (state, teachers) {
      state.teachers = teachers
    },
    updateAdmins (state, admins) {
      state.admins = admins
    }
  },
  state: { // Устанавливаем начальное значение
    parents: [],
    teachers: [],
    admins: [],
    minings: []
  },
  getters: { // Позволяют трансформировать данные и получать их из store
    allMinings (state) {
      return state.minings
    },
    allParents (state) {
      return state.parents
    },
    allTeachers (state) {
      return state.teachers
    },
    allAdmins (state) {
      return state.admins
    }
  }
}
