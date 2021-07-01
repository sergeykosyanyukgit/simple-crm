const {Task} = require('./db-service').models
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ApiError = require('../exceptions/api-error')

class TaskService {
  async createTask(taskData) {
    try {
      const task = Task.create(taskData)
      return task
    } catch (error) {
      throw ApiError.BadRequest(`Создать таску не удалось`)
    }
  }
  async getAllCourseTasks(courseid) {
    try {
      const tasks = await Task.findAndCountAll({
        where: {
          courseid: {
            [Op.or]: courseid
          }
        }
      })
      return tasks
    } catch (error) {
      throw ApiError.BadRequest(`Получить таски не удалось`)
    }
  }
  async deleteTask(id) {
    try {
      const task = await Task.destroy({where: {id}})
      return task
    } catch (error) {
      throw ApiError.BadRequest(`Удалить таску не удалось`)
    }
  }
  async getAllTasks() {
    try {
      const tasks = await Task.findAll()
      return tasks
    } catch (error) {
      throw ApiError.BadRequest(`Получить таски не удалось`)
    }
  }
  async editTask(taskData) {
    try {
      const task = await Task.update({
        name: taskData.name,
        numbertask: taskData.numbertask,
        description: taskData.description,
        linkdocs: taskData.linkdocs
      },{where: {id: taskData.id}})
      return task
    } catch (error) {
      throw ApiError.BadRequest(`Отредактировать таску не удалось`)
    }
  }
}

module.exports = new TaskService()