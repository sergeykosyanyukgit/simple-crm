const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async auth (req, res, next) {
    const schema = Joi.object({
      email: valid.email,
      password: valid.password
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
  async tokenauth (req, res, next) {
    const schema = Joi.object({
      token: valid.token,
      refreshToken: [valid.token.optional(), Joi.allow(null)]
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
  async logout (req, res, next) {
    const schema = Joi.object({
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
  async login (req, res, next) {
    const schema = Joi.object({
      email: valid.email,
      password: valid.password
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
  async registration (req, res, next) {
    const schema = Joi.object({
      email: valid.email,
      phone: valid.phone,
      name: valid.name,
      password: valid.password
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
  async restore (req, res, next) {
    const schema = Joi.object({
      email: valid.email
    })
    console.log(req.body)
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async refresh (req, res, next) {
    const schema = Joi.object({
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
