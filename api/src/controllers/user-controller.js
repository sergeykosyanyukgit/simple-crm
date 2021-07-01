const childService = require('../services/child-service')
const alertService = require('../services/alert-service')
const userService = require('../services/user-service')
const miningService = require('../services/mining-service')
const scheduleService = require('../services/schedule-service')
const ApiError = require('../exceptions/api-error')

class UserController {
  async restore (req, res, next) {
    try {
      const result = await userService.restore(req.body.email)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async registration(req, res, next) {
    try {
      console.log(req.body)
      const {email, password, phone, name} = req.body
      console.log(req.body)
      const userData = await userService.registration(email, password, phone, name)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password)
      console.log(userData)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  async passwordUpdate (req, res, next) {
    try {
      const user = await userService.getUser(req.user.id)
      const isPasswordValid = await bcrypt.compare(req.body.OldPassword, user.password)
      if (!isPasswordValid){
        throw ApiError.BadRequest('Старый пароль введен неверно')
      } else {
        const NewPassword = await bcrypt.hash(req.body.NewPassword, 3)
        const result = await userService.passwordUpdate(NewPassword, req.user.id)
        res.json(result)
      }
    } catch (error) {
      next(error)
    }
  }
  async userFullUpdate(req, res, next) {
    try {
      await userService.fullUpdateUser(req.body)
      const user = await userService.getUser(req.body.id)
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async createMining(req, res, next) {
    try {
      await miningService.createMining({
        date: req.body.date, 
        time: req.body.time,
        ScheduleId: req.body.ScheduleId,
        status: 'Ожидает подтверждения'
      })
      await scheduleService.updateScheduleMini({
        check: 'Ожидает подтверждения',
        id: req.body.ScheduleId
      })
      const schedule = await scheduleService.getSchedule(req.body.ScheduleId)
      return res.json(schedule)
    } catch (error) {
      next(error)
    }
  }
/*
  async deleteAlert (req, res) {
    try {
      const alert = await alertService.deleteAlert(req.body.id)
      res.json(alert)
    } catch (error) {
      next(error)
    }
  }

  async checkAlert (req, res, next) {
    try {
      const alert = await alertService.userAlerts(req.body.id)
      res.json(alert)
    } catch (error) {
      next(error)
    }
  }
  async userAlerts (req, res, next) {
    try {
      const alerts = await alertService.userAlerts(req.body.userId)
      res.json(alerts)
    } catch (error) {
      next(error)
    }
  }

  async allAlerts (req, res, next) {
    try {
      const alerts = await alertService.allAlerts()
      res.json(alerts)
    } catch (error) {
      next(error)
    }
  }*/
}

module.exports = new UserController()