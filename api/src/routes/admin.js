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
const adminMiddleware = require('../middlewares/admin-middleware')
const adminTeacherMiddleware = require('../middlewares/admin-teacher-middleware')
//const isAuth = require('../controllers/isAuth')
//const isAdmin = require('../controllers/isAdmin')
//const isTeacher = require('../controllers/isTeacher')
//const isTeacherOrAdmin = require('../controllers/isTeacherOrAdmin')

//Создание учеников 
router.post(
  '/editchildtimetables',
  authMiddleware,
  adminMiddleware,
  childValidation.editchildtimetables,
  childController.editChildTimeTables
)
router.post(
  '/addmoneychild',
  authMiddleware,
  adminMiddleware,
  childValidation.addmoneychild,
  childController.addMoneyChild
)
router.post(
  '/createchild',
  authMiddleware,
  adminMiddleware,
  childValidation.createchild,
  childController.createChild
)
router.get(
  '/allchilds',
  authMiddleware,
  adminTeacherMiddleware,
  childController.getAllChilds
)
router.post(
  '/editchild',
  authMiddleware,
  adminMiddleware,
  childValidation.editchild,
  childController.editChild
)

//Создание отметок расписания
router.post(
  '/deletechildschedule',
  authMiddleware,
  adminMiddleware,
  scheduleValidation.deleteChildschedule,
  childScheduleController.deleteChildschedule
)
router.post(
  '/updatechildschedule',
  authMiddleware,
  adminMiddleware,
  scheduleValidation.updatechildschedule,
  childScheduleController.updatechildschedule
)
router.get(
  '/allchildschedules',
  authMiddleware,
  adminMiddleware,
  childScheduleController.allchildschedules
)
router.post(
  '/loadchildschedules',
  authMiddleware,
  adminMiddleware,
  scheduleValidation.loadchildschedules,
  childScheduleController.loadchildschedules
)

//Курсы
router.post(
  '/createcourse',
  authMiddleware,
  adminMiddleware,
  courseValidation.createcourse,
  courseController.createCourse
)
router.post(
  '/updatecourse',
  authMiddleware,
  adminMiddleware,
  courseValidation.updatecourse,
  courseController.updateCourse
)
router.get(
  '/allcourses',
  authMiddleware,
  adminTeacherMiddleware,
  courseController.getAllCourses
)
//router.post('/deletecourse', /*isAuth,*/ /*isAdmin,*/ courseValidation.deletecourse, courseController.deletecourse)
  
//Задания курсов
router.post(
  '/createtask',
  authMiddleware,
  adminMiddleware,
  taskValidation.createtask,
  taskController.createTask
)
router.get(
  '/alltasks',
  authMiddleware,
  adminMiddleware,
  taskController.getAllTasks
)
router.post(
  '/deletetask',
  authMiddleware,
  adminMiddleware,
  taskValidation.deletetask,
  taskController.deleteTask
)
router.post(
  '/edittask',
  authMiddleware,
  adminMiddleware,
  taskValidation.edittask,
  taskController.editTask
)
  


//Галерея
router.post(
  '/creategallery',
  authMiddleware,
  adminTeacherMiddleware,
  galleryValidation.creategallery,
  galleryController.createGallery
)
router.post(
  '/deletegallery',
  authMiddleware,
  adminTeacherMiddleware,
  galleryValidation.deletegallery,
  galleryController.deleteGallery
)
router.get(
  '/allgallerys',
  authMiddleware,
  galleryController.allGallerys
)


//Filial
router.post(
  '/createfilial',
  authMiddleware,
  adminMiddleware,
  filialValidation.createfilial,
  filialController.createFilial
)
router.post(
  '/editfilial',
  authMiddleware,
  adminMiddleware,
  filialValidation.editfilial,
  filialController.editFilial
)
router.get(
  '/allfilials',
  authMiddleware,
  adminMiddleware,
  filialController.getAllFilials
)
/*router.get(
  '/allfilialsonly',
  authMiddleware, 
  adminMiddleware, 
  filialController.getAllFilialsOnly
)*/
//router.post('/deletefilial', /*isAuth,*/ /*isAdmin,*/  filialValidation.deletefilial, filialController.deletefilial)allfilialsonly



//Пробные занятия 
router.post(
  '/referaldiscountupdate',
  authMiddleware, 
  adminMiddleware, 
  trialValidation.referaldiscountupdate,
  trialController.referalDiscountUpdate
)
//router.post('/createreferaltrial', /*isAuth,*/ /*isAdmin,*/ trialValidation.createreferaltrial, trialController.createreferaltrial)
router.post(
  '/createsimpletrial',
  trialValidation.createsimpletrial,
  trialController.createSimpleTrial
)
router.post(
  '/createtrial',
  authMiddleware, 
  adminMiddleware, 
  trialValidation.createtrial,
  trialController.createTrial
)
router.post(
  '/deletetrial',
  authMiddleware, 
  adminMiddleware, 
  trialValidation.deletetrial,
  trialController.deleteTrial
)

router.get(
  '/alltrials',
  authMiddleware, 
  adminMiddleware, 
  trialController.getAllTrials
)
router.post(
  '/updatetrial',
  authMiddleware, 
  adminMiddleware, 
  trialValidation.updatetrial,
  trialController.updateTrial
)


router.post(
  '/updateschedule',
  authMiddleware, 
  adminMiddleware, 
  scheduleValidation.updateschedule,
  adminController.updateschedule
)
router.post(
  '/kickschedule',
  authMiddleware, 
  adminMiddleware, 
  childValidation.kickschedule,
  adminController.kickschedule
)
router.get(
  '/allmining',
  authMiddleware, 
  adminMiddleware, 
  adminController.allmining)
router.post(
  '/updatingscheduleotrab',
  authMiddleware, 
  adminMiddleware, 
  miningValidation.updatingscheduleotrab,
  adminController.updatingscheduleotrab
)
router.post(
  '/updatescheduleotrab',
  authMiddleware, 
  adminMiddleware, 
  scheduleValidation.updatescheduleotrab,
  adminController.updatescheduleotrab
)


//User
router.get(
  '/allusers',
  authMiddleware, 
  adminMiddleware, 
  adminController.allusers
)
router.get(
  '/allteachers',
  authMiddleware, 
  adminTeacherMiddleware, 
  adminController.allteachers
)
router.get(
  '/alladmins',
  authMiddleware, 
  adminMiddleware, 
  adminController.alladmins
)
router.post(
  '/alluserinfo',
  userValidation.alluserinfo,
  authMiddleware, 
  adminMiddleware, 
  adminController.alluserinfo
)
router.post(
  '/createparent',
  userValidation.createparent,
  authMiddleware, 
  adminMiddleware, 
  adminController.createparent
)
router.post(
  '/updateuser',
  userValidation.updateuser,
  authMiddleware, 
  adminMiddleware, 
  adminController.updateuser
)
router.post(
  '/createteacher',
  userValidation.createteacher,
  authMiddleware, 
  adminMiddleware, 
  adminController.createteacher
)
router.post(
  '/createadmin',
  userValidation.createadmin,
  authMiddleware, 
  adminMiddleware, 
  adminController.createadmin
)
router.post(
  '/getteacherpay',
  userValidation.getteacherpay,
  authMiddleware, 
  adminMiddleware, 
  adminController.getteacherpay
)
router.post(
  '/getteacherpaymini',
  userValidation.getteacherpay,
  authMiddleware, 
  adminTeacherMiddleware, 
  adminController.getteacherpaymini
)
router.post(
  '/transferchild',
  childValidation.transferchild,
  authMiddleware, 
  adminMiddleware, 
  childController.transferChild
)


//TimeTable
router.get(
  '/alltimetable',
  authMiddleware, 
  adminTeacherMiddleware, 
  timeTableController.getAllTimeTables
)
router.post(
  '/createtimetable',
  timeTableValidation.createtimetable,
  /*isAuth,*/
  /*isAdmin,*/
  timeTableController.createTimeTable
)
router.post(
  '/edittimetable',
  timeTableValidation.edittimetable,
  /*isAuth,*/
  /*isAdmin,*/
  timeTableController.editTimeTable
)
router.post(
  '/deletetimetable',
  timeTableValidation.deletetimetable,
  /*isAuth,*/
  /*isAdmin,*/
  timeTableController.deleteTimeTable
)

//statistics
router.post(
  '/statistics/trials',
  statisticsValidation.statisticstrials,
  /*isAuth,*/ 
  /*isAdmin,*/
  statisticsController.statisticsTrials
)
router.post(
  '/statistics/schedules',
  statisticsValidation.statisticsschedules,
  /*isAuth,*/
  /*isAdmin,*/
  statisticsController.statisticsSchedules
)
router.post(
  '/statistics/childs',
  statisticsValidation.statisticschilds,
  /*isAuth,*/
  /*isAdmin,*/
  statisticsController.statisticsChilds
)


//viewDashboard OK
router.post(
  '/createviewdashboard', 
  viewDashboardValidation.createviewdashboard,
  /*isAuth,*/ 
  /*isAdmin,*/ 
  viewDashboardController.createViewDashboard
)
router.post(
  '/updateviewdashboard',
  viewDashboardValidation.updateviewdashboard,
  /*isAuth,*/ 
  /*isAdmin,*/
  viewDashboardController.updateViewDashboard
)
router.post(
  '/selectviewdashboard',
  viewDashboardValidation.selectviewdashboard,
  /*isAuth,*/
  /*isAdmin,*/
  viewDashboardController.selectViewDashboard
)
router.get(
  '/loadallviewdashboard',
  authMiddleware, 
  adminMiddleware, 
  viewDashboardController.getAllViewDashboard
)
router.post(
  '/childfullupdate',
  childValidation.childfullupdate,
  authMiddleware, 
  adminMiddleware, 
  childController.childFullUpdate
)


//Оповещения
/*router.get(
  '/useralerts',
  authMiddleware,
  alertController.userAlerts)*/ //ОК
//router.get('/allalerts', alertController.allAlerts) //ОК
router.post(
  '/createalert',
  authMiddleware, 
  adminMiddleware, 
  alertValidation.createalert,
  alertController.createAlerts) //ОК
module.exports = router