const filialService = require('../services/filial-service')
const timeTableService = require('../services/time-table-service')
class TimeTableController {
  async getWeekInfo (req, res, next) {
    try {
      const datestart = new Date(`${req.body.datestart}T00:00:00.000Z`)
      const datefinish = new Date(`${req.body.datefinish}T00:00:00.000Z`)
      const result = await filialService.getWeekInfo(datestart, datefinish)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async createTimeTable (req, res, next) {
    try {
      const timetable = await timeTableService.createTimeTable(req.body)
      await timeTableService.createDependencies(req.body, timetable.id)
      res.json(timetable)
    } catch (error) {
      next(error)
    }
  }
  async getAllTimeTables(req, res, next) {
    try {
      const timeTables = await timeTableService.getAlltimeTables()
      res.json(timeTables)
    } catch (error) {
      next(error)
    }
  }
  async deleteTimeTable (req, res, next) {
    try {
      const result = await timeTableService.deleteTimeTable(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async editTimeTable(req, res, next) {
    try {
      const result = await timeTableService.editTimeTable(req.body)
      await timeTableService.deleteDependencies(req.body.id)
      await timeTableService.createDependencies(req.body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TimeTableController()