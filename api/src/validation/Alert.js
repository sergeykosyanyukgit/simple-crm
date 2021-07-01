const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async createalert (req, res, next) {
    const schema = Joi.object({
      type: valid.type,
      message: valid.message,
      acive: valid.acive,
      course: valid.courses
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