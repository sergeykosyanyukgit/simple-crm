const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async createtask (req, res, next) {
    const schema = Joi.object({
      name: valid.name,
      description: valid.description,
      numbertask: valid.numbertask,
      linkdocs: valid.linkdocs,
      CourseId: valid.id
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
  async deletetask (req, res, next) {
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
  async edittask (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      name: valid.name,
      description: valid.description,
      numbertask: valid.numbertask,
      linkdocs: valid.linkdocs,
      CourseId: valid.id
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