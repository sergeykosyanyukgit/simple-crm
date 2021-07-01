const { User, Child, MiningTable, Alert, Trial, Course, TimeTable, Filial, Gallery, Childschedule, Schedule, Task } = require('./db-service').models
const ApiError = require('../exceptions/api-error')

class MiningService {
  async createMining(data) {
    try {
      const result = await MiningTable.create(data)
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest(`Создать отработку не удалось`)
    }
  }
  async updateMining(data) {
    try {
      const result = await MiningTable.body({
        TimeTableId: data.TimeTableId,
        ScheduleId: data.id,
        date: data.date,
        status: data.status,
        time: data.time
      }, { where: {id: data.MiningId}})
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Создать отработку не удалось`)
    }
  }
  async getAllMinings() {
    try {
      const result = await MiningTable.findAll({
        where: {
          status: 'Ожидает подтверждения'
        },
        include: [
          {
            model: Schedule,
            include: [
              {
                model: Childschedule,
                include: [
                  {
                    model: Course
                  },
                  {
                    model: Child,
                    include: [
                      {
                        model: User,
                        attributes: ['id', 'name', 'middlename', 'surname', 'phone']
                      }
                    ]
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
          }
        ]
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
}

module.exports = new MiningService()