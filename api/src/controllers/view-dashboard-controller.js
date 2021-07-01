const { ViewDashboard } = require('../services/db-service').models
const viewDashboardService = require('../services/view-dashboard-service')
class ViewDashboardController{
  async createViewDashboard (req, res, next) {
    try {
      let view = {
        name: req.body.name,
        profileimage: req.body.profileimage,
        elementcolorlight: req.body.elementcolorlight,
        elementcolordark: req.body.elementcolordark,
        elementcolorshadow: req.body.elementcolorshadow,
        buttoncolor: req.body.buttoncolor,
        buttoncolorshadow: req.body.buttoncolorshadow,
        selected: false
      }
      const viewDashboard = await viewDashboardService.createViewDashboard(view)
      res.json(viewDashboard)
    } catch (error) {
      next(error)
    }
  }
  async getAllViewDashboard (req, res, next) {
    try {
      const viewDashboard = await viewDashboardService.getAllViewDashboard()
      console.log('getAllViewDashboard', viewDashboard)
      res.json(viewDashboard)
    } catch (error) {
      next(error)
    }
  }
  async selectViewDashboard (req, res, next) {
    try {
      const viewDashboard = await viewDashboardService.selectViewDashboard(req.body.id)
      res.json(viewDashboard)
    } catch (error) {
      next(error)
    }
  }
  async updateViewDashboard (req, res, next) {
    try {
      const viewDashboard = await viewDashboardService.updateViewDashboard(req.body)
      res.json(viewDashboard)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ViewDashboardController()