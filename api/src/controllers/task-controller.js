const taskService = require('../services/task-service')
class TaskController{
  async createTask (req, res, next) {
    try {
      let task = await taskService.createTask(req.body)
      res.json(task)
    } catch (error) {
      next(error)
    }
  }
  async getAllCourseTasks (req, res, next) {
    try {
      let tasks = []
      const result = await taskService.getAllCourseTasks(req.body.id)
      result.rows.forEach(element => {
        tasks.push(element.dataValues)
      })
      res.json(tasks)
    } catch (error) {
      next(error)
    }
  }
  async deleteTask (req, res, next) {
    try {
      const result = await taskService.deleteTask(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async getAllTasks (req, res, next) {
    try {
      const tasks = await taskService.getAllTasks()
      res.json({
        tasks: tasks
      })
    } catch (error) {
      next(error)
    }
  }
  async editTask (req, res, next) {
    try {
      const result = await taskService.editTask(req.body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TaskController()
