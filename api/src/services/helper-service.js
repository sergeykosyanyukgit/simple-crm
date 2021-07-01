const { User, Child, Feedback, Alert, Trial, Course, TimeTable, Filial, Gallery, Childschedule, Schedule, Task } = require('./db-service').models
const ApiError = require('../exceptions/api-error')
class HelperService {
  async getFullUserInfo(email) {
    try {
      const user = await User.findOne(
        {where: {email},
        include: [
          {
            model: Feedback
          },
          {
            model: Alert,
            attributes: ['id','type', 'message', 'check', 'createdAt', 'updatedAt']
          },
          {
            model: Child,
            attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage', 'UserId', 'age'],
            include: [
              {
                model: Trial,
                attributes: ['id', 'check', 'name', 'phone', 'description', 'commit', 'createdAt', 'updatedAt', 'date'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  },
                  {
                    model: TimeTable,
                    attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                    include: [
                      {
                        model: Filial,
                        attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                      }
                    ]
                  },
                  {
                    model: User,
                    attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
                  }
                ]
              },
              {
                model: Course,
                attributes: ['id', 'name', 'description', 'image']
              },
              {
                model: Gallery,
                attributes: ['id', 'islike', 'name', 'description', 'image', 'format'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  }
                ]
              },
              {
                model: Childschedule,
                attributes: ['id'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  },
                  {
                    model: Schedule,
                    attributes: ['id', 'date', 'commit', 'check'],
                    required: false,
                    include: [
                      {
                        model: User,
                        attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
                      },
                      {
                        model: TimeTable,
                        attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                        include: [
                          {
                            model: Filial,
                            attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                          }
                        ]
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
                      }
                    ]
                  }
                ]
              },
              {
                model: TimeTable,
                attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'show'],
                include: [
                  {
                    model: Filial,
                    attributes: ['name']
                  }
                ]
              },
            ]
          }
        ]
      })
      return user
    } catch (error) {
      throw ApiError.BadRequest(`Загрузить данные о пользователе не удалось`) 
    }
  }
}

module.exports = new HelperService()