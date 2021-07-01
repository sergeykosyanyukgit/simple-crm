const router = require('express').Router()
const authMiddleware = require('../middlewares/auth-middleware')

const userValidation = require('../validation/User')
const userController = require('../controllers/user-controller')
const childController = require('../controllers/child-controller')
const childValidation = require('../validation/Child')
const trialController = require('../controllers/trial-controller')
const trialValidation = require('../validation/Trial')

const feedbackController = require('../controllers/feedback-controller')
const alertController = require('../controllers/alert-controller')
const galleryValidation = require('../validation/Gallery')
const galleryController = require('../controllers/gallery-controller')

router.get(
  '/getreferaltrils',
  authMiddleware,
  trialController.getReferalTrils
)
router.post(
  '/createreferaltrial',
  trialValidation.createReferalTrial,
  authMiddleware,
  trialController.createReferalTrial
)
router.post(
  '/userfullupdate',
  userValidation.userfullupdate,
  authMiddleware,
  userController.userFullUpdate
)
router.post(
  '/userpasswordupdate',
  userValidation.userpasswordupdate,
  authMiddleware,
  userController.passwordUpdate
)
//Отзывы
router.post(
  '/createfeedback',
  authMiddleware,
  userValidation.createfeedback,
  feedbackController.createFeedback
)
router.post(
  '/deletefeedback',
  authMiddleware,
  userValidation.deletefeedback,
  feedbackController.deleteFeedback
)

router.post(
  '/checkalert',
  authMiddleware,
  alertController.checkAlert
)
router.post(
  '/createmining',
  userValidation.createmining,
  authMiddleware,
  userController.createMining
)
router.post(
  '/likegallery',
  galleryValidation.likegallery,
  authMiddleware,
  galleryController.likeGallery
)
router.post(
  '/childfullupdate',
  childValidation.childfullupdate,
  authMiddleware, 
  childController.childFullUpdate
)
module.exports = router