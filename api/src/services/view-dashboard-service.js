const { ViewDashboard } = require('./db-service').models
const ApiError = require('../exceptions/api-error')

class ViewDashboardService {
  async getSelectedView() {
    try {
      const viewDashboard = await ViewDashboard.findOne({where: {selected: 'true'}})
      if (!viewDashboard) {
        throw ApiError.BadRequest('Тема не создана или не выбрана!')
      } else {
        return viewDashboard
      }
    } catch (error) {
      throw ApiError.BadRequest('Загрузить тему не удалось!')
    }
  }
  async createViewDashboard(data) {
    try {
      const viewDashboard = await ViewDashboard.create(data)
      return viewDashboard
    } catch (error) {
      throw ApiError.BadRequest('Создать тему не удалось!')
    }
  }
  async selectViewDashboard(id) {
    try {
      await ViewDashboard.update({selected: 'false'},{where: {selected: 'true'}})
      console.log(id)
      const viewDashboard = await ViewDashboard.update({selected: 'true'},{where: {id}})
      return viewDashboard
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Выбрать тему не удалось!')
    }
  }
  async getAllViewDashboard() {
    try {
      const viewDashboards = await ViewDashboard.findAll()
      return viewDashboards
    } catch (error) {
      throw ApiError.BadRequest('Загрузить темы не удалось!')
    }
  }
  async updateViewDashboard(viewData) {
    try {
      const viewDashboard = await ViewDashboard.update({
        name: viewData.name,
        profileimage: viewData.profileimage,
        elementcolorlight: viewData.elementcolorlight,
        elementcolordark: viewData.elementcolordark,
        elementcolorshadow: viewData.elementcolorshadow,
        buttoncolor: viewData.buttoncolor,
        buttoncolorshadow: viewData.buttoncolorshadow
      },{where: {id: viewData.id}})
      return viewDashboard
    } catch (error) {
      throw ApiError.BadRequest('Обновить тему не удалось!')
    }
  }
}

module.exports = new ViewDashboardService()
