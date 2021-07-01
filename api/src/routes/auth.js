const router = require('express').Router()
const userController = require('../controllers/user-controller')
const authValidation = require('../validation/auth')

router.get('/activate/:link', userController.activate)
router.post('/restore', authValidation.restore, userController.restore)
router.post('/registration', authValidation.registration, userController.registration)
router.post('/login', authValidation.login, userController.login)
router.post('/logout', authValidation.logout, userController.logout)
router.get('/refresh', authValidation.refresh, userController.refresh)

module.exports = router