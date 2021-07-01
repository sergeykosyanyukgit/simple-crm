const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

module.exports = function (req, res, next) {
  try {
    const authorizationHandler = req.headers.authorization
    if(!authorizationHandler) {
      return next(APiError.UnathorizedError())
    }

    const accessToken = authorizationHandler.split(' ')[1]
    if(!accessToken) {
      return next(APiError.UnathorizedError())
    }

    const userData = tokenService.verifyAccessToken(accessToken)
    if(!userData) {
      return next(ApiError.UnathorizedError())
    }

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnathorizedError())
  }
}