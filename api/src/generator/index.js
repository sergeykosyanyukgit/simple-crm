const generatePassword = require('password-generator')
const maxLength = 18
const minLength = 8

module.exports = {
  async customPassword() {
    let password = ""
    let randomLength = await Math.floor(Math.random() * (maxLength - minLength)) + minLength
    password = await generatePassword(randomLength, false, /[\w\d\?\-]/)
    return password 
  },
  async refreshTokenGenerate() {
    let token = ""
    let randomLength = await Math.floor(Math.random() * (maxLength - minLength)) + minLength
    token = await generatePassword(randomLength, false, /[\w\d\?\-]/)
    return token 
  }
}
