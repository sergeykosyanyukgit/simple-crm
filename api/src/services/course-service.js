const { User, MiningTable, TeacherTable, Child, Childschedule, CourseTable, TrialCourse, Course, Schedule, TimeTable, Feedback, Trial, Task, Filial }
 = require('../services/db-service').models
const ApiError = require('../exceptions/api-error')

class CourseService {
  async createCourse(data) {
    try {
      const course = await Course.create(data)
      return course
    } catch (error) {
      throw ApiError.BadRequest('Курс создать не удалось')
    }
  }
  async updateCourse(data) {
    try {
      const result = await Course.update({
        name: data.name,
        description: data.description
      },{where: {id:data.id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Курс отредактировать не удалось')
    }
  }
  async getCourseById(id) {
    try {
      const course = await Course.findOne({where: {id}})
      return course
    } catch (error) {
      throw ApiError.BadRequest('Курс зыгрузить не удалось')
    }
  }
  async getAllCourses() {
    try {
      const courses = await Course.findAll({
        attributes: ['id', 'name', 'description', 'image'],
        include: [
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
      })
      return courses
    } catch (error) {
      throw ApiError.BadRequest('Курсы зыгрузить не удалось')
    }
  }
  async deleteCourse(id) {
    try {
      const result = await Course.destroy({where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Курс удалить не удалось')
    }
  }
}

module.exports = new CourseService()
