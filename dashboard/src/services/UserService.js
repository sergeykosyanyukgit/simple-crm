import api from '../http'

export default class UserService {
  static async fetchUsers() {
    return await api.get('/users')
  }
  static async thisUserFullUpdate(data) {
    return await api.post(`/user/userfullupdate`, data)
  }
  static async thisUserPasswordUpdate(data) {
    return await api.post(`/user/userpasswordupdate`, data)
  }
  static async thisChildFullUpdate(data) {
    return await api.post(`/user/childfullupdate`, data)
  }
  static async createMining(data) {
    return await api.post(`/user/createmining`, data)
  }
  static async thisUserReviewCreate(data) {
    return await api.post(`/user/createfeedback`, data)
  }
  static async thisUserReviewDelete(data) {
    return await api.post(`/user/deletefeedback`, data)
  }
  static async getReferalTrils() {
    return await api.get(`/user/getreferaltrils`)
  }
  static async createReferalTrial(data) {
    return await api.post(`/user/createreferaltrial`, data)
  }
  static async thisUserPhotoLike(data) {
    return await api.post(`/user/likegallery`, data)
  }
  static async thisUserAlertCheck(data) {
    return await api.post(`/user/checkalert`, data)
  }
}