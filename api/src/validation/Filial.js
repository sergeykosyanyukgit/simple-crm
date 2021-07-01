const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async createfilial (req, res, next) {
    const schema = Joi.object({
      name: valid.name,
      description: valid.description,
      image: [valid.linkdocs.optional(), Joi.allow(null)],
      addres: valid.addres,
      phone: valid.phone,
      coordsX: valid.coords,
      coordsY: valid.coords
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
  async editfilial (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      name: valid.name,
      description: valid.description,
      image: [valid.linkdocs.optional(), Joi.allow(null)],
      addres: valid.addres,
      phone: valid.phone,
      coordsX: valid.coords,
      coordsY: valid.coords
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
  async deletefilial (req, res, next) {
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
  }
}