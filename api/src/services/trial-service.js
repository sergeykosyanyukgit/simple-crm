const {
  Trial, TimeTable, Filial, User, TrialCourse, Course, ReferalParentTrial, TeacherTable, CourseTable
} = require('../services/db-service').models
const mailService = require('./mail-service')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ApiError = require('../exceptions/api-error')

class TrialService {
  async getTrialsByTime(UserId, timestart, timefinish) {
    try {
      const trials = await Trial.findAll({
        where: {
          UserId,
          check: "Пройдено",
          [Op.and]: [
            { date: {[Op.gte]: timestart} },
            { date: {[Op.lte]: timefinish} }
          ]
        },
        include: [
          {
            model: TimeTable,
            attributes: ['id', 'day', 'timelong', 'timestart', 'timefinish'],
            include: [
              {
                model: Filial,
                attributes: ['id', 'name'],
              }
            ]
          }
        ]
      })
      return trials
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async getReferalTrils(UserId) {
    try {
      const result = await ReferalParentTrial.findAll({
        where: {
          UserId
        },
        required: false,
        attributes: ['id' , 'discount', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Trial,
            attributes: ['name', 'res']
          }
        ]
      })
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async createReferalTrial(referalUser, name, phone) {
    try {
      const trial = await Trial.create({
        phone,
        name,
        commit: 'Не назначено',
        res: 'Не пройдено',
        description: `Пригласил ${referalUser.surname} ${referalUser.name} ${referalUser.middlename}`
      })
      await ReferalParentTrial.create({UserId: referalUser.id, TrialId: trial.id, discount: 0})
      
      return trial
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async referalDiscountUpdate(discount, ReferalParentTrialId) {
    try {
      const result = await ReferalParentTrial.update({discount}, {where: {id: ReferalParentTrialId}})
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Обновить данные не удалось`)
    }
  }
  async createSimpleTrial(phone, description) {
    try {
      const result = await Trial.create({phone, description, commit: 'Не назначено'})
      await mailService.sendTrialMail(phone, description)
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Создать заявку не удалось`)
    }
  }
  async getAllTrials() {
    try {
      const result = await Trial.findAll({
        required: false,
        include: [
          {
            model: ReferalParentTrial,
            include: [
              {
                model: User,
                attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
              }
            ]
          },
          {
            model: TimeTable,
            include: [
              {
                model: Filial
              }
            ]
          },
          {
            model: User,
            attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
          },
          {
            model: TrialCourse,
            attributes: ['id'],
            include: [
              {
                model: Course,
                attributes: ['id', 'name', 'description', 'image']
              }
            ]
          }
        ]
      })
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest(`Загрузить пробные не удалось`)
    }
  }
  async deleteTrial(id) {
    try {
      const result = await Trial.destroy({where: {id}})
      await TrialCourse.destroy({where: {TrialId: id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Удалить пробное не удалось`)
    }
  }
  async updateTrial(trialData) {
    try {
      await TrialCourse.destroy({where: {TrialId: trialData.id}})
      const trialCourses = []
      await trialData.CourseId.forEach(async course => {
        trialCourses.push({
          CourseId: course,
          TrialId: trialData.id
        })
      })
      await TrialCourse.bulkCreate(trialCourses, {returning: true})

      const result = await Trial.update({
        FilialId: trialData.FilialId,
        phone: trialData.phone,
        description: trialData.description,
        name: trialData.name,
        parentname: trialData.parentname,
        comment: trialData.comment,
        time: trialData.time,
        date: trialData.Labeled,
        commit: trialData.commit,
        res: trialData.res,
        check: (trialData.checkBuffer == undefined) ? trialData.check : trialData.checkBuffer,
        ChildId: trialData.ChildId,
        TimeTableId: trialData.TimeTableId,
        UserId: (trialData.UserIdBuffer == undefined) ? trialData.UserId : trialData.UserIdBuffer,
      }, {where: {id: trialData.id}})
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest(`Обновить пробное не удалось`)
    }
  }
  async createTrial(trialData) {
    try {
      if (trialData.TimeTableId != null) {
        let trial = await Trial.create(trialData)
        const trialCourses = []
        trialData.Course.forEach(CourseId => {
          trialCourses.push({
            CourseId: CourseId,
            TrialId: trial.id
          })
        })
        console.log(trialCourses)
        const tr = await TrialCourse.bulkCreate(trialCourses, {returning: true})
        console.log(tr)
        return trial
      } else if(trialData.UserId != null){
        const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
        const date = new Date(trialData.date);
        const day = days[date.getDay()]
        const timetable = await TimeTable.create({
          name: 'Пробное',
          timestart: trialData.time,
          timefinish: trialData.time,
          day: day,
          maxsize: 8,
          FilialId: trialData.FilialId,
          timelong: 1.5,
          show: true
        })
        await TeacherTable.create({UserId: trialData.UserId, TimeTableId: timetable.id})
  

        const courseTables = []
        trialData.Course.forEach(async course => {
          courseTables.push({CourseId: course, TimeTableId: timetable.id})
        })
        await CourseTable.bulkCreate(courseTables, {returning: true})

        const updInfo = trialData
        updInfo.TimeTableId = timetable.id
        const trial = await Trial.create(updInfo)
        const trialCourses = []
        await trialData.Course.forEach(async CourseId => {
          trialCourses.push({
            CourseId: CourseId,
            TrialId: trial.id
          })
        })
        await TrialCourse.bulkCreate(trialCourses, {returning: true})
        return trial
      } else {
        throw ApiError.BadRequest(`Укажите преподавателя или группу`)
      }
    } catch (error) {
      throw ApiError.BadRequest(`Удалить пробное не удалось`)
    }
  }

}

module.exports = new TrialService()