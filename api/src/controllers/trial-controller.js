const trialService = require('../services/trial-service')
const mailService = require('../services/mail-service')

class TrialController {
  async getReferalTrils (req, res, next) {
    try {
      const trils = await trialService.getReferalTrils(req.user.id)
      res.json(trils)
    } catch (error) {
      next(error)
    }
  }

  async createReferalTrial (req, res, next) {
    try {
      console.log(req.body)
      await trialService.createReferalTrial(req.user, req.body.name, req.body.phone)
      await mailService.sendReferalMail(`${req.user.surname} ${req.user.name} ${req.user.middlename}`, req.body.name, req.body.phone)
      const trils = await trialService.getReferalTrils(req.user.id)
      res.json(trils)
    } catch (error) {
      next(error)
    }
  }

  async referalDiscountUpdate (req, res, next) {
    try {
      const trial = await trialService.referalDiscountUpdate(req.body.discount, req.body.ReferalParentTrialId)
      res.json(trial)
    } catch (error) {
      next(error)
    }
  }
  async createSimpleTrial (req, res, next) {
    try {
      const trial = await trialService.createSimpleTrial(req.body.phone, req.body.course)
      res.json(trial)
    } catch (error) {
      next(error)
    }
  }
  async deleteTrial (req, res, next) {
    try {
      const result = await trialService.deleteTrial(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async createTrial (req, res, next) {
    try {
      const result = await trialService.createTrial(req.body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async updateTrial (req, res, next) {
    try {
      const result = await trialService.updateTrial(req.body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async getAllTrials(req, res, next) {
    try {
      const result = await trialService.getAllTrials()
      result.sort((a,b) => {
        return new Date(b.date) - new Date(a.date)
      })
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new TrialController()