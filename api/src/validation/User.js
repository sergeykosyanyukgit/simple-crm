const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async userpasswordupdate (req, res, next) {
    const schema = Joi.object({
      OldPassword: valid.password,
      NewPassword: valid.password
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
  async userfullupdate (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      email: [valid.email.optional(), Joi.allow(null)],
      profileimage: [valid.profileimage.optional(), Joi.allow(null)],
      middlename: valid.middlename,
      surname: valid.surname,
      name: valid.name,
      phone: valid.phone
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
  async createfeedback (req, res, next) {
    const schema = Joi.object({
      UserId: valid.id,
      topic: valid.topic,
      description: valid.description,
      stars: valid.stars
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
  async deletefeedback (req, res, next) {
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
  async checkalert (req, res, next) {
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
  async createmining (req, res, next) {
    const schema = Joi.object({
      ScheduleId: valid.id,
      date: valid.date,
      time: valid.time
    })
    
    const {error} = schema.validate(req.body)
    console.log(error)
    console.log(req.body)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async alluserinfo (req, res, next) {
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
  async createparent (req, res, next) {
    const schema = Joi.object({
      email: [valid.email.optional(), Joi.allow(null)],
      password: valid.password,
      middlename: valid.middlename,
      surname: valid.surname,
      name: valid.name,
      phone: valid.phone
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
  async updateuser (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      email: [valid.email.optional(), Joi.allow(null)],
      profileimage: [valid.profileimage.optional(), Joi.allow(null)],
      password: valid.password,
      middlename: valid.middlename,
      surname: valid.surname,
      name: valid.name,
      phone: valid.phone
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
  async createteacher (req, res, next) {
    const schema = Joi.object({
      email: valid.email,
      password: valid.password,
      middlename: valid.middlename,
      surname: valid.surname,
      name: valid.name,
      phone: valid.phone
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
  async createadmin (req, res, next) {
    const schema = Joi.object({
      email: valid.email,
      password: valid.password,
      middlename: valid.middlename,
      surname: valid.surname,
      name: valid.name,
      phone: valid.phone
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
  async getteacherpay (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      payhours: valid.payhours,
      paychilds: valid.paychilds,
      timestart: valid.timestart,
      timefinish: valid.timefinish
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
