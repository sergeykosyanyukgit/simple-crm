import api from '../http'

export default class AdminService {
  //FILIALS//
  static async getAllFilials() {
    return await api.get('/admin/allfilials')
  }
  /*static async getAllFilialsOnly() {
    return await api.get('/admin/allfilialsonly')
  }*/
  static async updateFilial(data) {
    return await api.post(`/admin/editfilial`, data)
  }
  static async deleteFilial(data) {
    return await api.post(`/admin/deletefilial`, data)
  }
  static async createFilial(data) {
    return await api.post(`/admin/createfilial`, data)
  }

  //COURSES//
  static async getAllCourses() {
    return await api.get(`/admin/allcourses`)
  }
  static async updateCourse(data) {
    return await api.post(`/admin/updatecourse`, data)
  }
  static async updateCourse(data) {
    return await api.post(`/admin/updatecourse`, data)
  }
  static async createCourse(data) {
    return await api.post(`/admin/createcourse`, data)
  }
  static async deleteCourse(data) {
    return await api.post(`/admin/deletecourse`, data)
  }
  static async deleteTask(data) {
    return await api.post(`/admin/deletetask`, data)
  }
  static async createTask(data) {
    return await api.post(`/admin/createtask`, data)
  }
  static async editTask(data) {
    return await api.post(`/admin/edittask`, data)
  }

  //GALLERY//
  static async getAllGallery() {
    return await api.get(`/admin/allgallerys`)
  }
  static async deleteGallery(data) {
    return await api.post(`/admin/deletegallery`, data)
  }
  static async createGallery(data) {
    return await api.post(`/admin/creategallery`, data)
  }

  //USERS//
  static async editUser(data) {
    return await api.post(`/admin/updateuser`, data)
  }
  static async createParent(data) {
    return await api.post(`/admin/createparent`, data)
  }
  static async createTeacher(data) {
    return await api.post(`/admin/createteacher`, data)
  }
  static async createAdmin(data) {
    return await api.post(`/admin/createadmin`, data)
  }
  static async getAllMinings() {
    return await api.get(`/admin/allmining`)
  }
  static async getAllParents() {
    return await api.get(`/admin/allusers`)
  }
  static async getAllParentInfo(data) {
    return await api.post(`/admin/alluserinfo`, data)
  }
  static async getAllTeachers() {
    return await api.get(`/admin/allteachers`)
  }
  static async getAllAdmins() {
    return await api.get(`/admin/alladmins`)
  }
  static async getTeacherPay(data) {
    return await api.post(`/admin/getteacherpay`, data)
  }
  static async getTeacherPayMini(data) {
    return await api.post(`/admin/getteacherpaymini`, data)
  }

  //CHILD//
  static async deleteChildschedule(data) {
    return await api.post(`/admin/deletechildschedule`, data)
  }
  static async editChildTimeTables(data) {
    return await api.post(`/admin/editchildtimetables`, data)
  }
  static async transferChild(data) {
    return await api.post(`/admin/transferchild`, data)
  }
  static async editChildSchedule(data) {
    return await api.post(`/admin/updatechildschedule`, data)
  }
  static async editChildVuex(data) {
    return await api.post(`/admin/editchild`, data)
  }
  static async getAllChilds() {
    return await api.get(`/admin/allchilds`)
  }
  static async createChild(data) {
    return await api.post(`/admin/createchild`, data)
  }
  static async addMoneyChild(data) {
    return await api.post(`/admin/addmoneychild`, data)
  }

  //TIMETABLE//
  static async loadChildSchedules(data) {
    return await api.post(`/admin/loadchildschedules`, { data: data})
  }
  static async kickSchedule(data) {
    return await api.post(`/admin/kickschedule`, data)
  }
  static async updateSchedule(data) {
    return await api.post(`/admin/updateschedule`, data)
  }
  static async updatingScheduleOtrabs(data) {
    return await api.post(`/admin/updatingscheduleotrab`, data)
  }
  static async updateScheduleOtrabs(data) {
    return await api.post(`/admin/updatescheduleotrab`, data)
  }
  static async getAllTimeTables() {
    return await api.get(`/admin/alltimetable`)
  }
  static async editTimeTable(data) {
    return await api.post(`/admin/edittimetable`, data)
  }
  static async createTimeTable(data) {
    return await api.post(`/admin/createtimetable`, data)
  }
  static async deleteTimeTable(data) {
    return await api.post(`/admin/deletetimetable`, data)
  }

  //TRIAL//
  static async referalDiscountUpdate(data) {
    return await api.post(`/admin/referaldiscountupdate`, data)
  }
  static async deleteTrial(data) {
    return await api.post(`/admin/deletetrial`, data)
  }
  static async editTrial(data) {
    return await api.post(`/admin/updatetrial`, data)
  }
  static async createTrial(data) {
    return await api.post(`/admin/createtrial`, data)
  }
  static async getAllTrials() {
    return await api.get(`/admin/alltrials`)
  }

  //THEME DASHBOARD//
  static async getAllThemeDashboard() {
    return await api.get(`/admin/loadallviewdashboard`)
  }
  static async createThemeDashboard(data) {
    return await api.post(`/admin/createviewdashboard`, data)
  }
  static async editThemeDashboard(data) {
    return await api.post(`/admin/updateviewdashboard`, data)
  }
  static async selectThemeDashboard(data) {
    return await api.post(`/admin/selectviewdashboard`, data)
  }

  //ALERTS//
  static async createAlert(data) {
    return await api.post(`/admin/createalert`, data)
  }

  //STATISTICS//
  static async getStatisticsChilds(data) {
    return await api.post(`/admin/statistics/childs`, data)
  }
  static async getStatisticsSchedules(data) {
    return await api.post(`/admin/statistics/schedules`, data)
  }
  static async getStatisticsTrials(data) {
    return await api.post(`/admin/statistics/trials`, data)
  }
}