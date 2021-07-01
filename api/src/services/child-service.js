const {User, ChildTable, Child, Childschedule, Course, Schedule, TimeTable } 
= require('./db-service').models
const Op = require('sequelize').Op
const ApiError = require('../exceptions/api-error')

class ChildService {
  async editChildCourse(CourseId, id) {
    try {
      const child = await Child.update({
        CourseId
      }, {
        where: {
          id
        }
      })
      return child
    } catch (error) {
      throw ApiError.BadRequest('Получить профиль ученика не удалось')
    }
  }
  async getChildById(id) {
    try {
      const child = await Child.findOne({where: {id}})
      return child
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Получить профиль ученика не удалось')
    }
  }
  async getChildByParent(id, UserId) {
    try {
      const child = await Child.findOne({where: {id, UserId}})
      return child
    } catch (error) {
      throw ApiError.BadRequest('Получить профиль ученика не удалось')
    }
  }
  async editChild(data) {
    try {
      console.log(data)
      const result = await Child.update({
        phone: data.phone,
        surname: data.surname,
        name: data.name,
        middlename: data.middlename,
        UserId: data.UserId,
        CourseId: data.CourseId,
        age: data.age,
        profileimage: data.profileimage 
      }, {where: {id: data.id}})
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Отредактировать профиль ученика не удалось')
    }
  }
  async getAlertChilds(course, active) {
    try {
      const childs = await Child.findAll({
        attributes: ['UserId'],
        where: {
          active: active == null ? {
            [Op.in]: [true, false]
          } : active,
          CourseId: {
            [Op.in]: course
          }
        }
      })
      return childs
    } catch (error) {
      throw ApiError.BadRequest('Получить оповещения не удалось')
    }
  }
  async getAllChilds() {
    try {
      const childs = await Child.findAll({
        required: false,
        attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage', 'UserId', 'age'],
        include: [
          {
            model: TimeTable
          },
          {
            model: User,
            attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
          },
          {
            model: Course,
            attributes: ['id', 'name', 'description', 'image']
          }
        ]
      })
      return childs
    } catch (error) {
      throw ApiError.BadRequest('Загрузить учеников не удалось')
    }
  }
  async addMoneyChild(data) {
    try {
      const childschedule = await Childschedule.findOne({where: {
        CourseId: data.CourseId, 
        ChildId: data.ChildId
      }})
      console.log('1')
      
      if (data.money > 0) {
        let allChildSchedulesToUpdate = await Schedule.findAll({where: {
          ChildscheduleId: childschedule.id,
          commit: 'Не оплачено'
        }})
        console.log('2')
  
        allChildSchedulesToUpdate = allChildSchedulesToUpdate.slice(0, data.money)
        const schs = []
        allChildSchedulesToUpdate.forEach(sch => {
          schs.push(sch.id)
        })
        console.log('3')
        const result = await Schedule.update({commit: "Оплачено"}, {where: {
          id: {
            [Op.or]: schs
          }
        }})
        
        console.log('4')
        return result
      } else {
        let allChildSchedulesToUpdate = await Schedule.findAll({where: {
          ChildscheduleId: childschedule.id,
          commit: "Оплачено"
        }})
        
        console.log('5')
        allChildSchedulesToUpdate = allChildSchedulesToUpdate.slice(data.money)
  
        const schs = []
        await allChildSchedulesToUpdate.forEach(async sch => {
          schs.push(sch.id)
        })
        console.log('6')
        const result = await Schedule.update({commit: "Не оплачено"}, {where: {
          id: {
            [Op.or]: schs
          }
        }})
        console.log('5')
        return result
      }
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Добавить оплату не удалось')
    }
  }
  async createChild(data) {
    try {
      const child = await Child.create(data)
      return child
    } catch (error) {
      throw ApiError.BadRequest('Создать профиль ученика не удалось')
    }
  }
}

module.exports = new ChildService()