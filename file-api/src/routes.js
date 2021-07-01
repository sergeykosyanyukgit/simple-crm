const authMiddleware = require('./middlewares/auth-middleware')
const UploadController = require('./UploadController')
module.exports = async (app) => {
  await app.put(
    '//upload',
    authMiddleware,
    UploadController.upload
  )
}