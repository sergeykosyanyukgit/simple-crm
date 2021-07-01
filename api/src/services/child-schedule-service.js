const {User, Filial, Task, Childschedule, Course, Schedule, TimeTable } 
= require('./db-service').models
const Op = require('sequelize').Op
const ApiError = require('../exceptions/api-error')

class ChildScheduleService {
  async createChildSchedule(CourseId, ChildId) {
    try {
      const result = await Childschedule.create({CourseId, ChildId})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Задать занятие у ученика не удалось')
    }
  }
  async deleteChildSchedule(id) {
    try {
      const result = await Childschedule.destroy({where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Удалить занятие у ученика не удалось')
    }
  }
  async getChildSchedules() {
    try {
      const result = await Childschedule.findAll()
      return result
    } catch (error) {
      throw ApiError.BadRequest('Получить занятия у ученика не удалось')
    }
  }
  async getChildSchedule(CourseId, ChildId) {
    try {
      const result = await Childschedule.findOne({where: {CourseId, ChildId}})
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Получить занятия у ученика не удалось')
    }
  }
  async getChildSchedulesFull(ChildsId) {
    try {
      const result = 
      await Childschedule.findAll({
        attributes: ['id', 'ChildId'],
        include: [
          {
            model: Schedule,
            attributes: ['id', 'date', 'commit', 'check', 'UserId'],
            required: false,
            include: [
              {
                model: User,
                attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
              },
              {
                model: Task,
                attributes: ['id', 'numbertask', 'name', 'description', 'linkdocs'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
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
              }
            ]
          },
          {
            model: Course,
            attributes: ['id', 'name']
          }
        ],
        where: {
          ChildId: {
            [Op.or]: ChildsId
          }
        }
      })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Получить занятия у ученика не удалось')
    }
  }
}

module.exports = new ChildScheduleService()