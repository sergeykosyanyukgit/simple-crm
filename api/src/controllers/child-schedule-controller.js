const childScheduleService = require('../services/child-schedule-service')
const scheduleService = require('../services/schedule-service')

class ChildScheduleController {
  async loadchildschedules (req, res, next) {
    try {
      const childSchedules = await childScheduleService.getChildSchedulesFull(req.body.data)
      res.json(childSchedules)
    } catch (error) {
      next(error)
    }
  }
  async createchildschedule (req, res, next) {
    try {
      const schedule = await scheduleService.createSchedule(req.body)
      res.json(schedule)
    } catch (error) {
      next(error)
    }
  }
  async deleteChildschedule (req, res, next) {
    try {
      await scheduleService.deleteSchedule(req.body.id)
      const result = await childScheduleService.deleteChildSchedule(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async updatechildschedule (req, res, next) {
    try {
      await scheduleService.updateScheduleUser({
        commit: req.body.commit,
        check: req.body.check,
        UserId: req.body.UserId,
        date: req.body.date
      }, req.body.id)

      const result = await scheduleService.getSchedule(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async allchildschedules(req, res, next) {
    try {
      const schedules = await childScheduleService.getChildSchedules()
      res.json(schedules)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new ChildScheduleController()