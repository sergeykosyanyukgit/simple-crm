const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async referaldiscountupdate (req, res, next) {
    const schema = Joi.object({
      discount: valid.discount,
      ReferalParentTrialId: valid.id 
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
  async createReferalTrial (req, res, next) {
    const schema = Joi.object({
      phone: valid.phone,
      name: valid.name,
      UserId: valid.id
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
  async createsimpletrial (req, res, next) {
    const schema = Joi.object({
      phone: valid.phone,
      course: valid.course
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
  async createtrial (req, res, next) {
    const schema = Joi.object({
      ChildId: [valid.id.optional(), Joi.allow(null)],
      FilialId: valid.id,
      name: valid.name,
      phone: valid.phone,
      description: valid.description,
      Course: valid.courses,
      TimeTableId: valid.id,
      UserId: [valid.id.optional(), Joi.allow(null)],
      commit: valid.commit,
      res: valid.res,
      check: valid.check,
      date: valid.date,
      time: valid.time,
      comment: valid.comment,
      parentname: valid.name
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
  async deletetrial (req, res, next) {
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
  async updatetrial (req, res, next) {
    const schema = Joi.object({
      id: valid.id,
      name: valid.name,
      phone: valid.phone,
      description: valid.description,
      Labeled: valid.Labeled,
      check: valid.check,
      commit: valid.commit,
      FilialId: valid.id,
      res: valid.res,
      CourseId: valid.courses,
      ChildId: [valid.id.optional(), Joi.allow(null)],
      UserId: [valid.id.optional(), Joi.allow(null)],
      TimeTableId: valid.id,
      time: valid.time,
      comment: valid.comment,
      parentname: valid.name
    })
    console.log(req.body)
    const {error} = schema.validate(req.body)
    console.log('error 1')
    if (error) {
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  }
}