const filialService = require('../services/filial-service')

class FilialController {
  async createFilial (req, res, next) {
    try {
      const filial = await filialService.createFilial(req.body)
      res.json(filial)
    } catch (error) {
      next(error)
    }
  }
  async getAllFilialsOnly (req, res, next) {
    try {
      const filials = await filialService.getAllFilialsOnly()
      res.json(filials)
    } catch (error) {
      next(error)
    }
  }
  async getAllFilials (req, res, next) {
    try {
      const filials = await filialService.getAllFilials()
      res.json(filials)
    } catch (error) {
      next(error)
    }
  }
  async deleteFilial (req, res, next) {
    try {
      const result = await filialService.deleteFilial(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async editFilial (req, res, next) {
    try {
      await filialService.editFilial(req.body)
      const filial = filialService.getFilialById(req.body.id)
      res.json(filial)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FilialController()