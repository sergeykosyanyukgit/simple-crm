const ApiError = require('../exceptions/api-error')
module.exports = function (req, res, next) {
  try {
    console.log(req.user)
    if(req.user.isTeacher || req.user.isAdmin) {
      return next()
    }
    next(ApiError.UnathorizedError())
  } catch (error) {
    return next(ApiError.UnathorizedError())
  }
}