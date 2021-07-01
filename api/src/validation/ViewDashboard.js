const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async updateviewdashboard (req, res, next) {
    const schema = Joi.object({
      id: Joi.number().min(1),
      name: Joi.string().min(1, 'utf8').max(30, 'utf8'),
      profileimage: Joi.string().min(1).max(100), 
      elementcolorlight: Joi.string().min(1).max(30),
      elementcolordark: Joi.string().min(1).max(30),
      elementcolorshadow: Joi.string().min(1).max(30),
      buttoncolor: Joi.string().min(1).max(30),
      buttoncolorshadow: Joi.string().min(1).max(30)
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
  async createviewdashboard (req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(1, 'utf8').max(30, 'utf8'),
      profileimage: Joi.string().min(1).max(100), 
      elementcolorlight: Joi.string().min(1).max(30),
      elementcolordark: Joi.string().min(1).max(30),
      elementcolorshadow: Joi.string().min(1).max(30),
      buttoncolor: Joi.string().min(1).max(30),
      buttoncolorshadow: Joi.string().min(1).max(30)
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
  async selectviewdashboard (req, res, next) {
    const schema = Joi.object({
      id: Joi.number().min(1)
    })
    
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  }
}
