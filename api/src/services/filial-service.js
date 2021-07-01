const { User, MiningTable, ReferalParentTrial, Child, Childschedule, CourseTable, TrialCourse, Course, Schedule, TimeTable, Feedback, Trial, Task, Filial }
 = require('../services/db-service').models
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ApiError = require('../exceptions/api-error')

class FilialService {
  async createFilial(data) {
    try {
      const filial = await Filial.create(data)
      return filial
    } catch (error) {
      throw ApiError.BadRequest('Филиал создать не удалось')
    }
  }
  async getAllFilialsOnly() {
    try {
      const filials = await Filial.findAll({
        attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY'],
      })
      return filials
    } catch (error) {
      throw ApiError.BadRequest('Филиалы загрузить не удалось')
    }
  }
  async getAllFilials() {
    try {
      const filials = await Filial.findAll({
        required: false,
        attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY'],
        include: [
          {
            model: TimeTable,
            attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'FilialId', 'timelong', 'show'],
            include: [
              {
                model: Child,
                include: [
                  {
                    model: Course,
                    attributes: ['name'],
                  }
                ]
              },
              {
                model: User,
                attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
              },
              {
                model: Course
              },
              {
                model: Schedule,
                include: [
                  {
                    model: Childschedule,
                    attributes: ['id'],
                    include: [
                      {
                        model: Child
                      }
                    ]
                  },
                  {
                    model: Task,
                    include: [
                      {
                        model: Course,
                        attributes: ['name']
                      }
                    ]
                  },
                ]
              },
              {
                model: Trial,
                include: [
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
              }
            ]
          }
        ]
      })
      return filials
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Филиалы загрузить не удалось')
    }
  }
  async deleteFilial(id) {
    try {
      const result = await Filial.destroy({where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Филиал удалить не удалось')
    }
  }
  async editFilial(data) {
    try {
      const result = await Filial.update({
        name: data.name,
        addres: data.addres,
        phone: data.phone,
        description: data.description,
        coordsX: data.coordsX,
        coordsY: data.coordsY
      },{where: {id: data.id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Филиал отредактировать не удалось')
    }
  }
  async getFilialById(id) {
    try {
      const result = await Filial.findOne({where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Филиал загрузить не удалось')
    }
  }
  async getWeekInfo(datestart, datefinish) {
    try {
      console.log(datestart, datefinish)
      const filial = await Filial.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: TimeTable,
            attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'FilialId', 'timelong', 'show'],
            include: [
              {
                model: Child,
                attributes: ['id', 'age', 'surname', 'name', 'middlename', 'CourseId',],
                include: [
                  {
                    model: Childschedule,
                    limit: 2,
                    include: [
                      {
                        model: Schedule,
                        limit: 2,
                        where: {
                          [Op.or]: {
                            [Op.not]: { check: 'Пройдено' },
                            [Op.and]: [
                              { date: {[Op.gte]: datestart} },
                              { date: {[Op.lte]: datefinish} }
                            ]
                          }
                        },
                        include: [
                          {
                            model: Task,
                            include: [
                              {
                                model: Course,
                                attributes: ['name']
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description'],
                  }
                ]
              },
              {
                model: Trial,
                include: [
                  {
                    model: TrialCourse,
                    attributes: ['id'],
                    include: [
                      {
                        model: Course,
                        attributes: ['id', 'name', 'description', 'image']
                      }
                    ]
                  },
                  {
                    model: User,
                    attributes: ['id', 'surname', 'name', 'middlename']
                  }
                ]
              },
              {
                model: MiningTable,
                attributes: ['id', 'time', 'date'],
                include: [
                  {
                    model: Schedule,
                    where: {
                      [Op.and]: [
                        { date: {[Op.gte]: datestart} },
                        { date: {[Op.lte]: datefinish} }
                      ]
                    },
                    include: [
                      {
                        model: Task,
                        include: [
                          {
                            model: Course,
                            attributes: ['name']
                          }
                        ]
                      },
                      {
                        model: Childschedule,
                        attributes: ['id'],
                        include: [
                          {
                            model: Child,
                            attributes: ['id', 'age', 'surname', 'name', 'middlename', 'CourseId',]
                          } 
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                model: User,
                attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
              },
              {
                model: Course
              }
            ]
          }
        ]
      })
      console.log(filial)
      return filial
    } catch(error) {
      console.log(error)
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
}

module.exports = new FilialService()