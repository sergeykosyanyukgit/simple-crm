const { User, MiningTable, TeacherTable, Child, Childschedule, CourseTable, TrialCourse, Course, Schedule, TimeTable, Feedback, Trial, Task, Filial }
 = require('../services/db-service').models
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ApiError = require('../exceptions/api-error')

class StatisticService {
  async statisticsChilds(FilialId, timeStart, timeFinish, status) {
    try {
      const result = await Child.findAll({
        attributes: ['id', 'surname', 'name', 'middlename'],
        include: [
          {
            model: ChildTable,
            attributes: ['id', 'TimeTableId'],
            where: {
              TimeTableId: {
                [Op.ne]: null
              }
            },
            include: [
              {
                model: TimeTable,
                attributes: ['id'],
                include: [
                  {
                    model: Filial,
                    attributes: ['id', 'name'],
                    where: {
                      id: FilialId
                    }
                  }
                ]
              }
            ]
          },
          {
            model: Childschedule,
            attributes: ['id'],
            include: [
              {
                model: Schedule,
                attributes: ['id', 'date'],
                where: {
                  [Op.and]: [
                    { check: status },
                    { date: {[Op.gte]: timeStart} },
                    { date: {[Op.lte]: timeFinish} }
                  ]
                }
              }
            ]
          },
        ]
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async statisticsSchedules(FilialId, timeStart, timeFinish, status) {
    try {
      const result = await User.findAll({
        attributes: ['id', 'surname', 'name', 'middlename'],
        include: [
          {
            model: Schedule,
            attributes: ['id', 'check', 'date'],
            where: {
              [Op.and]: [
                { check: status },
                { date: {[Op.gte]: timeStart} },
                { date: {[Op.lte]: timeFinish} }
              ]
            },
            include: [
              {
                model: TimeTable,
                attributes: ['FilialId'],
                where: {
                  FilialId
                }
              }
            ]
          }
        ]
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async statisticsTrials(FilialId, timeStart, timeFinish, status) {
    try {
      const result = await User.findAll({
        attributes: ['id', 'surname', 'name', 'middlename'],
        include: [
          {
            model: Trial,
            attributes: ['id', 'check', 'res', 'date', 'UserId'],
            where: {
              [Op.and]: [
                { res: status },
                { date: {[Op.gte]: timeStart} },
                { date: {[Op.lte]: timeFinish} }
              ]
            },
            include: [
              {
                model: TimeTable,
                attributes: ['FilialId'],
                where: {
                  FilialId
                }
              }
            ]
          }
        ]
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
}

module.exports = new StatisticService()