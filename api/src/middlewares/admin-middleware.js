const ApiError = require('../exceptions/api-error')
module.exports = function (req, res, next) {
  try {
    if(!req.user.isAdmin) {
      return next(ApiError.UnathorizedError())
    }

    next()
  } catch (error) {
    return next(ApiError.UnathorizedError())
  }
}