const router = require('express').Router()
const viewDashboardValidation = require('../validation/viewDashboard')
const viewDashboardController = require('../controllers/view-dashboard-controller')

const timeTableValidation = require('../validation/TimeTable')
const timeTableController = require('../controllers/time-table-controller')

const statisticsValidation = require('../validation/Statistic')
const statisticsController = require('../controllers/statistic-controller')

const userValidation = require('../validation/User')
const childValidation = require('../validation/Child')
const scheduleValidation = require('../validation/Schedule')
const miningValidation = require('../validation/Mining')
const adminController = require('../controllers/admin-controller')
const childController = require('../controllers/child-controller')
const childScheduleController = require('../controllers/child-schedule-controller')
const trialValidation = require('../validation/Trial')
const trialController = require('../controllers/trial-controller')

const filialValidation = require('../validation/Filial')
const filialController = require('../controllers/filial-controller')

const courseValidation = require('../validation/Course')
const courseController = require('../controllers/course-controller')

const taskValidation = require('../validation/Task')
const taskController = require('../controllers/task-controller')

const alertValidation = require('../validation/Alert')
const alertController = require('../controllers/alert-controller')

const galleryValidation = require('../validation/Gallery')
const galleryController = require('../controllers/gallery-controller')


const authMiddleware = require('../middlewares/auth-middleware')
const teacherMiddleware = require('../middlewares/teacher-middleware')

router.get(
  '/allfilialsonly',
  authMiddleware, 
  teacherMiddleware, 
  filialController.getAllFilialsOnly
)
router.post(
  '/getweekinfo',
  timeTableValidation.getweekinfo,
  authMiddleware, 
  teacherMiddleware, 
  timeTableController.getWeekInfo
)
module.exports = router