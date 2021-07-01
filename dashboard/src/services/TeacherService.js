import api from '../http'

export default class TeacherService {
  static async getAllFilialsOnly() {
    return await api.get('/teacher/allfilialsonly')
  }
  static async getWeekInfo(data) {
    return await api.post(`/teacher/getweekinfo`, data)
  }
}