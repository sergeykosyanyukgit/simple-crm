const {User, ChildTable, Child, Childschedule, Course, Schedule, TimeTable } 
= require('./db-service').models
const Op = require('sequelize').Op
const ApiError = require('../exceptions/api-error')

class ChildTableService {
  async createChildTables(data) {
    try {
      const result = await ChildTable.bulkCreate(data, {returning: true})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Задать группы у ученика не удалось')
    }
  }
  async createChildTable(data) {
    try {
      const result = await ChildTable.create(data)
      return result
    } catch (error) {
      throw ApiError.BadRequest('Задать группу у ученика не удалось')
    }
  }
  async getChildTablesByChildId(ChildId) {
    try {
      const result = await ChildTable.findAll({where: {ChildId, TimeTableId: {[Op.ne]: null}}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Загрузить группу у ученика не удалось')
    }
  }
  async updateChildTable(TimeTableId, id) {
    try {
      const result = await ChildTable.update({TimeTableId}, {where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Обновить запись ученика в группу не удалось')
    }
  }

}

module.exports = new ChildTableService()