const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async createcourse (req, res, next) {
    console.log(req.body)
    const schema = Joi.object({
      name: valid.name,
      description: valid.description,
      image: valid.linkdocs
    })
    
    const {error} = schema.validate(req.body)
    if (error) {
      console.log(error)
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async deletecourse (req, res, next) {
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
  async updatecourse (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      name: valid.name,
      description: valid.description
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