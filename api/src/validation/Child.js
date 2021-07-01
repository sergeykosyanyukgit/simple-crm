const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async createchild (req, res, next) {
    const schema = Joi.object({
      name: valid.name,
      middlename: valid.middlename,
      surname: valid.surname, 
      UserId: valid.id,
      age: valid.age,
      CourseId: valid.id,
      profileimage: [valid.profileimage.optional(), Joi.allow(null)],
      phone: valid.phone,
      ChildTables: valid.ChildTables,
      Schedules: valid.Schedules
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
  async editchild (req, res, next) {
    console.log(req.body)
    const schema = Joi.object({
      id: valid.id,
      name: valid.name,
      middlename: valid.middlename,
      surname: valid.surname, 
      UserId: valid.id,
      age: valid.age,
      CourseId: valid.id,
      profileimage: [valid.profileimage.optional(), Joi.allow(null)],
      phone: valid.phone
    })
    
    const {error} = schema.validate(req.body)
    console.log(error)
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  },
  async editchildtimetables (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      timetables: valid.ChildTables,
      ChildId: valid.id
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
  async addmoneychild (req, res, next) {
    const schema = Joi.object({
      CourseId: valid.id,
      ChildId: valid.id,
      money: Joi.number().min(-24).max(24)
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
  async childfullupdate (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      age: valid.age,
      profileimage: [valid.profileimage.optional(), Joi.allow(null)],
      middlename: valid.middlename,
      name: valid.name,
      surname: valid.surname,
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
  async transferchild (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      CourseId: valid.id,
      ChildTables: valid.ChildTables,
      Schedules: valid.Schedules
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
  async kickschedule (req, res, next) {
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