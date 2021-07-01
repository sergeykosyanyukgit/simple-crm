const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

module.exports = function (req, res, next) {
  try {
    console.log('authorizationHandler0')
    const authorizationHandler = req.headers.authorization
    console.log('authorizationHandler')
    if(!authorizationHandler) {
      return next(APiError.UnathorizedError())
    }
    console.log(authorizationHandler)
    const accessToken = authorizationHandler.split(' ')[1]
    if(!accessToken) {
      return next(APiError.UnathorizedError())
    }
    console.log('accessToken')

    const userData = tokenService.verifyAccessToken(accessToken)
    console.log(userData)
    if(!userData) {
      return next(ApiError.UnathorizedError())
    }
    console.log('userData')

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnathorizedError())
  }
}