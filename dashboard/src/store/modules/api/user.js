import AuthService from '../../../services/AuthService'
import axios from 'axios'
import UserService from '../../../services/UserService'

import router from '../../../router'

export default {
  actions: {
    async loginUser(ctx, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await AuthService.login(payload.email, payload.password)
          console.log(response)
          localStorage.setItem('token', response.data.accessToken)
          this.commit('setAuth', true)
          this.commit('setUser', response.data.user)
          this.commit('updateThemeDashboard', response.data.theme)
          if(response.data.user.isAdmin) {
            router.push('/admin/timetable', () => {})
          } else if(response.data.user.isTeacher) {
            router.push('/teacher/attendance', () => {})
          } else {
            router.push('/user/course', () => {})
          }
          console.log(response)
          resolve(response)
        } catch (error) {
          console.log(error)
          reject(error.response.data.message)
        }
      })
    },
    async registerUser(ctx, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await AuthService.registration(payload.email, payload.password, payload.phone, payload.name)
          localStorage.setItem('token', response.data.accessToken)
          this.commit('setAuth', true)
          this.commit('setUser', response.data.user)
          resolve(response)
        } catch (error) {
          reject(error.response.data.message)
        }
      })
    },
    async logOut(ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await AuthService.logout()
          console.log(response)
          localStorage.removeItem('token')
          this.commit('setAuth', false)
          this.commit('setUser', {})
          router.push('/', () => {})
        } catch (error) {
          console.log(error.response.data.message)
        }
      })
    },
    async checkAuth(ctx) {
      return new Promise(async (resolve, reject) => {
        this.commit('setLoading', true)
        try {
          const response = await axios.get(`http://localhost:80/api/auth/refresh`, {
            withCredentials: true
          })
          localStorage.setItem('token', response.data.accessToken)
          this.commit('setAuth', true)
          this.commit('setUser', response.data.user)
          this.commit('updateThemeDashboard', response.data.theme)
          if(response.data.user.isAdmin) {
            router.push('/admin/timetable', () => {})
          } else if(response.data.user.isTeacher) {
            router.push('/teacher/attendance', () => {})
          } else {
            router.push('/user/course', () => {})
          }
          resolve(response)
        } catch (error) {
          //console.log(error.response.data.message)
          reject(error)
        } finally {
          this.commit('setLoading', false)
        }
      })
    },
    async fetchUsers() {
      try {
        const response = await UserService.fetchUsers()
        console.log(response)
        this.commit('setUsers', response.data)
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async restoreUser(ctx, data) {
      //console.log(data)
			return new Promise(async (resolve, reject) => {
        await AuthService.restore(data)
				.then(response => {
					resolve(response)
				})
				.catch(error => { 
          console.log(error)
          console.log(error.response.data.message)
					reject(error.response.data.message)
				})
			})
		}
  },
  mutations: {
    setLoading(state, bool) {
      state.isLoading = bool
    },
    setAuth(state, bool) {
      state.isAuth = bool
    },
    setUser(state, user) {
      state.user = user
    },
    setUsers(state, users) {
      state.users = users
    },
    addFeedback(state, feedback) {
      state.user.Feedbacks.push(feedback)
    },
    deleteFeedback(state, id) {
      let Feedbacks = []
      console.log(id)
      state.user.Feedbacks.forEach(feedback => {
        if (feedback.id != id) {
          Feedbacks.push(feedback)
        }
      })
      state.user.Feedbacks = Feedbacks
    },
    checkAlert(state, id) {
      state.user.Alerts.forEach((alert, index) => {
        if (alert.id == id) {
          state.user.Alerts[index].check = true
        }
      })
    },
    likePhoto(state, id) {
      state.user.Children.forEach((child, childindex) => {
        child.Galleries.forEach((gallery, galleryindex) => {
          if (gallery.id == id) {
            state.user.Children[childindex].Galleries[galleryindex].islike = true
          }
        })
      })
    },
    miningCreated(state, scheduleUpdated) {
      state.user.Children.forEach(children => {
        children.Childschedules.forEach(childSchedules => {
          childSchedules.Schedules.forEach(schedule => {
            if (schedule.id == scheduleUpdated.id)
            {
              schedule.check = scheduleUpdated.check
            }
          })
        })
      })
    },
    updateChild(state, child) {
      state.user.Children.forEach((children, index) => {
        if (children.id == child.id) {
          state.user.Children[index].name = child.name
          state.user.Children[index].middlename = child.middlename
          state.user.Children[index].surname = child.surname
          state.user.Children[index].phone = child.phone
          state.user.Children[index].profileimage = child.profileimage
        }
      })
    }
  },
  state: {
    user: {},
    isAuth: false,
    isLoading: false,
    users: []
	},
  getters: {
		isAuthenticated(state) {
			if (state.user == null && state.token == null) {
				return false
			} else {
				return true
			}
    },
    isUser(state) {
      return (!state.user.isAdmin && !state.user.isTeacher)
    },
    isTeacher(state) {
      return !!state.user.isTeacher
    },
    isAdmin(state) {
      return !!state.user.isAdmin
    },
    User(state) {
      return state.user
		},
		getProfile(state) {
      return state.user
		}
  }
}