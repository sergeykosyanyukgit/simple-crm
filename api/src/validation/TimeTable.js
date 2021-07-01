const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async getweekinfo (req, res, next) {
    const schema = Joi.object({
      datestart: valid.date,
      datefinish: valid.date
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
  async deletetimetable (req, res, next) {
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
  async createtimetable (req, res, next) {
    const schema = Joi.object({
      name: valid.name,
      timestart: valid.date,
      timefinish: valid.date,
      day: valid.day,
      maxsize: valid.maxsize,
      FilialId: valid.id,
      timelong: valid.timelong,
      Users: valid.Users,
      Courses: valid.Courses
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
  async edittimetable (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      name: valid.name,
      timestart: valid.date,
      timefinish: valid.date,
      day: valid.day,
      maxsize: valid.maxsize,
      FilialId: valid.id,
      timelong: valid.timelong,
      teachers: valid.Users,
      courses: valid.Courses
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
}