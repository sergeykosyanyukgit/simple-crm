const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async deleteChildschedule (req, res, next) {
    const schema = Joi.object({
      id: valid.id
    })
    
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async updateschedule (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      check: valid.check, 
      UserId: valid.id,
      TimeTableId: valid.id,
      date: valid.date
    })
    
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async updatechildschedule (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      check: valid.check, 
      UserId: valid.id,
      commit: valid.commit,
      date: valid.date
    })
    
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async updatescheduleotrab (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      check: valid.check, 
      date: valid.date,
      TimeTableId: valid.id,
      time: valid.time
    })
    
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async loadchildschedules (req, res, next) {
    const schema = Joi.object({
      data: Joi.array().min(0).max(30)
    })
    console.log(req.body)
    const {error} = schema.validate(req.body)
    console.log(error)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  }
}