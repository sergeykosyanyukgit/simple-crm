const jwt = require('jsonwebtoken')
const { Token } = require('./db-service').models

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  verifyAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch(error) {
      return null
    }
  }

  verifyRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch(error) {
      return null
    }
  }

  async saveToken(UserId, refreshToken) {
    const tokenData = await Token.findOne({UserId})
    if(tokenData) {
      return Token.update({refreshToken: refreshToken},{where: {UserId}})
    }
    const token = await Token.create({UserId, refreshToken: refreshToken})
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({where: {refreshToken: refreshToken}})
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({where: {refreshToken: refreshToken}})
    return tokenData
  }
}

module.exports = new TokenService()