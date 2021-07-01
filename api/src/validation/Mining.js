const Joi = require('joi')
const valid = require('./index')

module.exports = {
  async updatingscheduleotrab (req, res, next) {
    const schema = Joi.object({
      check: valid.check,
      TimeTableId: valid.id,
      ScheduleId: valid.id,
      date: valid.date,
      status: valid.status,
      MiningId: valid.id,
      time: valid.time
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