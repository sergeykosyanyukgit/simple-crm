const { User, MiningTable, TeacherTable, Child, Childschedule, CourseTable, TrialCourse, Course, Schedule, TimeTable, Feedback, Trial, Task, Filial }
 = require('../services/db-service').models
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ApiError = require('../exceptions/api-error')

class TimeTableService {
  async deleteDependencies(TimeTableId) {
    try {
      await TeacherTable.destroy({where: {TimeTableId}})
      await CourseTable.destroy({where: {TimeTableId}})
      return true
    } catch(error) {
      throw ApiError.BadRequest(`Создать зависимости не удалось`)
    }
  }
  async createDependencies(timetable, TimeTableId) {
    try {
      const teacherTables = []
      const courseTables = []
      timetable.Users.forEach(async user => {
        teacherTables.push({UserId: user, TimeTableId})
      })
      timetable.Courses.forEach(async course => {
        courseTables.push({CourseId: course, TimeTableId})
      })
      await TeacherTable.bulkCreate(teacherTables, {returning: true})
      await CourseTable.bulkCreate(courseTables, {returning: true})
      return true
    } catch(error) {
      throw ApiError.BadRequest(`Создать зависимости не удалось`)
    }
  }
  async createTimeTable(timetable) {
    try {
      const timeTable = await TimeTable.create({
        name: timetable.name,
        timestart: timetable.timestart,
        timefinish: timetable.timefinish,
        day: timetable.day,
        maxsize: timetable.maxsize,
        FilialId: timetable.FilialId,
        timelong: timetable.timelong,
        show: true
      })
      return timeTable
    } catch(error) {
      throw ApiError.BadRequest(`Создать группу не удалось`)
    }
  }
  async getAlltimeTables() {
    try {
      const timeTables = await TimeTable.findAll({
        required: false,
        attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'FilialId', 'timelong', 'show'],
        include: [
          {
            model: Child
          },
          {
            model: User,
            attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
          },
          {
            model: Course
          },
          {
            model: Trial
          }
        ]
      })
      return timeTables
    } catch(error) {
      throw ApiError.BadRequest(`Загрузить данные не удалось`)
    }
  }
  async deleteTimeTable(id) {
    try {
      const result = await TimeTable.update({show: false}, {where: {id}})
      return result
    } catch(error) {
      throw ApiError.BadRequest(`Удалить группу не удалось`)
    }
  }
  async editTimeTable(timetable) {
    try {
      const result = await TimeTable.update(
        {
          name: timetable.name,
          timefinish: timetable.timefinish,
          timestart: timetable.timestart,
          day: timetable.day,
          FilialId: timetable.FilialId,
          maxsize: timetable.maxsize,
          timelong: timetable.timelong,
        },{where: {id:timetable.id}
      })
      return result
    } catch(error) {
      throw ApiError.BadRequest(`Удалить группу не удалось`)
    }
  }
}

module.exports = new TimeTableService()