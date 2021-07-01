import api from '../http'

export default class AuthService {
  static async login(email, password) {
    return api.post('/auth/login', {email, password})
  }
  static async registration(email, password, phone, name) {
    return api.post('/auth/registration', {email, password, phone, name})
  }
  static async logout() {
    return api.post('/auth/logout')
  }
  static async restore(email) {
    return api.post('/auth/restore', {email})
  }
}