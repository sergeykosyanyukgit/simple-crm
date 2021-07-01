const statisticService = require('../services/statistic-service')

class StatisticController{
  async statisticsChilds(req, res, next) {
    try {
      const timeStart = new Date(`${req.body.timestart}T00:00:00.000Z`)
      const timeFinish = new Date(`${req.body.timefinish}T00:00:00.000Z`)
      const result = await statisticService.statisticsChilds(req.body.FilialId, timeStart, timeFinish, req.body.status)
      res.json(result) 
    } catch (error) {
      next(error)
    }
  }
  async statisticsSchedules(req, res, next) {
    try {
      const timeStart = new Date(`${req.body.timestart}T00:00:00.000Z`)
      const timeFinish = new Date(`${req.body.timefinish}T00:00:00.000Z`)
      const result = await statisticService.statisticsSchedules(req.body.FilialId, timeStart, timeFinish, req.body.status)
      res.json(result) 
    } catch (error) {
      next(error)
    }
  }
  async statisticsTrials(req, res, next) {
    try {
      const timeStart = new Date(`${req.body.timestart}T00:00:00.000Z`)
      const timeFinish = new Date(`${req.body.timefinish}T00:00:00.000Z`)
      const result = await statisticService.statisticsTrials(req.body.FilialId, timeStart, timeFinish, req.body.status)
      res.json(result) 
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new StatisticController()