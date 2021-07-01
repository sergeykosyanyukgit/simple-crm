const {
  Schedule, TimeTable, Filial, Task, Childschedule, Course, Child, TeacherTable, CourseTable
} = require('../services/db-service').models
const ApiError = require('../exceptions/api-error')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ScheduleService {
  async getSchedulesByTime(UserId, timestart, timefinish) {
    try {
      const schedules = await Schedule.findAll({
        where: {
          UserId,
          check: "Пройдено",
          [Op.and]: [
            { date: {[Op.gte]: timestart} },
            { date: {[Op.lte]: timefinish} }
          ]
        },
        attributes: ['id', 'date'],
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
          },
          {
            model: Task,
            attributes: ['id', 'name'],
            include: [
              {
                model: Course,
                attributes: ['id', 'name'],
              }
            ]
          },
          {
            model: Childschedule,
            attributes: ['id'],
            include: [
              {
                model: Child,
                attributes: ['id', 'name', 'middlename', 'surname']
              }
            ]
          }
        ]
      })
      return schedules
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async deleteSchedule(ChildscheduleId) {
    try {
      const result = await Schedule.destroy({where: {ChildscheduleId}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Удалить занятие не удалось')
    }
  }
  async updateScheduleMini(data) {
    try {
      const result = await Schedule.update({check: data.check}, {where: {id: data.id}})
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Обновить занятие не удалось')
    }
  }
  async updateScheduleByChild(TimeTableId, check, ChildscheduleId) {
    try {
      const result = await Schedule.update({
        TimeTableId
      }, {
        where: {
          check,
          ChildscheduleId
        }
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest('Обновить занятие не удалось')
    }
  }
  async updateScheduleById(id, TimeTableIdNew, TimeTableIdOld, ChildscheduleId) {
    try {
      const result = await Schedule.update({
        TimeTableId: TimeTableIdNew
      }, {
        where: {
          id: {
            [Op.or]: id
          },
          check: 'Не пройдено',
          TimeTableId: TimeTableIdOld,
          ChildscheduleId
        }
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest('Обновить занятие не удалось')
    }
  }
  async getSchedule(id) {
    try {
      const result = await Schedule.findOne({where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Получить занятие не удалось')
    }
  }
  async getSchedulesByChild(ChildscheduleId) {
    try {
      const result = await Schedule.findAll({where: {ChildscheduleId}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Получить занятия не удалось')
    }
  }
  async createSchedule(data) {
    try {
      const result = await Schedule.create(data)
      return result
    } catch (error) {
      throw ApiError.BadRequest('Создать занятие не удалось')
    }
  }
  async createSchedules(data) {
    try {
      const result = await Schedule.bulkCreate(data, {returning: true})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Создать занятия не удалось')
    }
  }
  async updateScheduleUser(data, id) {
    console.log(data)
    try {
      const result = await Schedule.update({
        check: data.check,
        UserId: data.UserId,
        TimeTableId: data.TimeTableId,
        date: data.date
      }, {
        where: {
          id
        }
      })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Обновить занятия не удалось')
    }
  }
  async updateScheduleFull(data) {
    try {
      const result = await Schedule.update({
        check: data.check,
        date: data.date,
        TimeTableId: data.TimeTableId
      }, {
        where: {
          id: data.id,
          check: 'Пропущено'
        }
      })
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Обновить занятия не удалось')
    }
  }
  async updateSchedule(data) {
    try {
      const result = await Schedule.update({ TimeTableId: data.TimeTableIdNew }, {
        where: {
          check: data.check, 
          TimeTableId: data.TimeTableId,
          ChildscheduleId: data.ChildscheduleId
        }
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest('Обновить занятия не удалось')
    }
  }
}

module.exports = new ScheduleService()