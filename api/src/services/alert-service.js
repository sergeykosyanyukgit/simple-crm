const {Alert} = require('./db-service').models
const ApiError = require('../exceptions/api-error')
class AlertService {
  async createAlerts(alerts) {
    try {
      const alert = await Alert.bulkCreate(alerts, {returning: true})
      return alert
    } catch (error) {
      throw ApiError.BadRequest(`Создать объявление не удалось`)
    }
  }
  
  async deleteAlert(id) {
    try {
      const alert = await Alert.destroy({where: {id}})
      return alert
    } catch (error) {
      throw ApiError.BadRequest(`Удалить объявление не удалось`)
    }
  }

  async checkAlert(id) {
    try {
      const alert = await Alert.update({check: true}, {where: {id}})
      return alert
    } catch (error) {
      throw ApiError.BadRequest(`Отметить объявление не удалось`)
    }
  }

  async userAlerts(UserID) {
    try {
      const alerts = await Alert.findAll({where: {UserID}})
      return alerts
    } catch (error) {
      throw ApiError.BadRequest(`Получить объявления не удалось`)
    }
  }

  async allAlerts() {
    try {
      const alerts = await Alert.findAll()
      return alerts
    } catch (error) {
      throw ApiError.BadRequest(`Получить объявления не удалось`)
    }
  }
}

module.exports = new AlertService()