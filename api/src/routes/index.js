const authRouter = require('./auth')
const adminRouter = require('./admin')
const teacherRouter = require('./teacher')
const userRouter = require('./user')

module.exports = (app) => {
  app.use('//auth', authRouter)
  app.use('//user', userRouter)
  app.use('//admin', adminRouter)
  app.use('//teacher', teacherRouter)
}