const childService = require('../services/child-service')
const alertService = require('../services/alert-service')

class AlertController {
  async createAlerts (req, res, next) {
    try {
      const childs = await childService.getAlertChilds(req.body.course, req.body.active)
      const data = []
      childs.forEach(child => {
        data.push({
          type: req.body.type,
          message: req.body.message,
          check: false,
          UserId: child.UserId
        })
      })
      const alert = await alertService.createAlerts(data)
      res.json(alert)
    } catch (error) {
      next(error)
    }
  }

  async deleteAlert (req, res) {
    try {
      const alert = await alertService.deleteAlert(req.body.id)
      res.json(alert)
    } catch (error) {
      next(error)
    }
  }

  async checkAlert (req, res, next) {
    try {
      const alert = await alertService.userAlerts(req.body.id)
      res.json(alert)
    } catch (error) {
      next(error)
    }
  }
  async userAlerts (req, res, next) {
    try {
      const alerts = await alertService.userAlerts(req.body.userId)
      res.json(alerts)
    } catch (error) {
      next(error)
    }
  }

  async allAlerts (req, res, next) {
    try {
      const alerts = await alertService.allAlerts()
      res.json(alerts)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AlertController()