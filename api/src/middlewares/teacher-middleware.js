const ApiError = require('../exceptions/api-error')
module.exports = function (req, res, next) {
  try {
    if(!req.user.isTeacher) {
      return next(ApiError.UnathorizedError())
    }

    next()
  } catch (error) {
    return next(ApiError.UnathorizedError())
  }
}