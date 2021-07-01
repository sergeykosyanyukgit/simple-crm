const childService = require('../services/child-service')
const childScheduleService = require('../services/child-schedule-service')
const childTableService = require('../services/child-table-service')
const scheduleService = require('../services/schedule-service')
const ApiError = require('../exceptions/api-error')

class ChildController {
  async childFullUpdate(req, res, next) {
    try {
      const child = await childService.getChildByParent(req.body.id, req.user.id)
      if(child != null) {
        await childService.editChild(req.body)
        const updatedChild = await childService.getChildByParent(req.body.id, req.user.id)
        res.send(updatedChild)
      } else {
        throw ApiError.BadRequest('Получить профиль ученика не удалось')
      }
    } catch(error) {
      next(error)
    }
  }
  async editChild(req, res, next) {
    try {
      const result = await childService.editChild(req.body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async editChildTimeTables (req, res, next) {
    try {
      console.log(req.body)
      const child = await childService.getChildById(req.body.ChildId)
      console.log(child)
      console.log('child', child.id, ' ', child.CourseId)
      const ChildTablesOld = await childTableService.getChildTablesByChildId(req.body.ChildId)
      const childschedule = await childScheduleService.getChildSchedule(child.CourseId, child.id)
      console.log('childschedule', childschedule)

      if(ChildTablesOld.length == req.body.timetables.length && req.body.timetables.length == 2) {
        await scheduleService.updateSchedule({
          TimeTableIdNew: req.body.timetables[0],
          TimeTableId: ChildTablesOld[0].TimeTableId,
          check: 'Не пройдено',
          ChildscheduleId: childschedule.id
        })
        await scheduleService.updateSchedule({
          TimeTableIdNew: req.body.timetables[1],
          TimeTableId: ChildTablesOld[1].TimeTableId,
          check: 'Не пройдено',
          ChildscheduleId: childschedule.id
        })

        await childTableService.updateChildTable(req.body.timetables[0], ChildTablesOld[0].id)
        await childTableService.updateChildTable(req.body.timetables[1], ChildTablesOld[1].id)
      }
      if(ChildTablesOld.length == req.body.timetables.length && req.body.timetables.length == 1) {
        await scheduleService.updateSchedule({
          TimeTableId: req.body.timetables[0],
          TimeTableId: ChildTablesOld[0].TimeTableId,
          check: 'Не пройдено',
          ChildscheduleId: childschedule.id
        })
        await childTableService.updateChildTable(req.body.timetables[0], ChildTablesOld[0].id)
      }

      
      if(ChildTablesOld.length == 1 && req.body.timetables.length == 2){
        const schedules = await scheduleService.getSchedulesByChild(childschedule.id)
        const firstSchedules = []
        const lastSchedules = []
        if (schedules[0].id % 2 == 0)
        {
          schedules.forEach(schedule => {
            if (schedule.id%2 == 0)
            {
              firstSchedules.push(schedule.id)
            }
          })
          schedules.forEach(schedule => {
            if (schedule.id%2 != 0)
            {
              lastSchedules.push(schedule.id)
            }
          })
        }
        else
        {
          schedules.forEach(schedule => {
            if (schedule.id%2 != 0)
            {
              firstSchedules.push(schedule.id)
            }
          })
          schedules.forEach(schedule => {
            if (schedule.id%2 == 0)
            {
              lastSchedules.push(schedule.id)
            }
          })
        }
        await scheduleService.updateScheduleById(firstSchedules, req.body.timetables[0], ChildTablesOld[0].TimeTableId, childschedule.id)
        await scheduleService.updateScheduleById(lastSchedules, req.body.timetables[1], ChildTablesOld[0].TimeTableId, childschedule.id)
       
        await childTableService.updateChildTable(req.body.timetables[0], ChildTablesOld[0].id)
        await childTableService.createChildTable({TimeTableId: req.body.timetables[1], ChildId: child.id})
      }
      if(ChildTablesOld.length == 2 && req.body.timetables.length == 1){
        await scheduleService.updateScheduleByChild(req.body.timetables[0], 'Не пройдено', childschedule.id)
        await childTableService.updateChildTable(req.body.timetables[0], ChildTablesOld[0].id)
        await childTableService.updateChildTable(null, ChildTablesOld[1].id)
      }
      const ChildTablesNew = await childTableService.getChildTablesByChildId(req.body.ChildId)
      res.json(ChildTablesNew)
    } catch (error) {
      next(error)
    }
  }
  async transferChild (req, res, next) {
    try {
      const child = await childService.getChildById(req.body.id)
      await ChildTable.update({
        TimeTableId: null
      },{where: {ChildId: req.body.id}})

      const childschedule = await childScheduleService.createChildSchedule(req.body.CourseId, child.id)

      const childTables = []
      req.body.ChildTables.forEach(element => {
        childTables.push({TimeTableId: element.TimeTableId, ChildId: child.id})
      })
      await childTableService.createChildTables(childTables)
      
      const schedules = []
      req.body.Schedules.forEach(element => {
        schedules.push({
          ChildscheduleId: childschedule.id,
          TaskId: element.TaskId,
          TimeTableId: element.TimeTableId,
          UserId: null,
          check: element.check,
          commit: element.commit,
          date: element.date
        })
      })
      await scheduleService.createSchedules(schedules)
      const result = await childService.editChildCourse(req.body.CourseId, req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
  async createChild (req, res, next) {
    try {
      const childData = {
        phone: req.body.phone,
        surname: req.body.surname,
        name: req.body.name,
        middlename: req.body.middlename,
        profileimage: "",
        UserId: req.body.UserId,
        CourseId: req.body.CourseId,
        active: "true",
        age: req.body.age
      }
      const child = await childService.createChild(childData)
      const childSchedule = await childScheduleService.createChildSchedule(req.body.CourseId, child.id)

      const childTables = []
      req.body.ChildTables.forEach(element => {
        childTables.push({TimeTableId: element.TimeTableId, ChildId: child.id})
      })
      await childTableService.createChildTables(childTables)

      const schedules = []
      req.body.Schedules.forEach(element => {
        schedules.push({
          ChildscheduleId: childSchedule.id,
          TaskId: element.TaskId,
          TimeTableId: element.TimeTableId,
          UserId: null,
          check: element.check,
          commit: element.commit,
          date: element.date
        })
      })
      await scheduleService.createSchedules(schedules)
      res.json(child)
    } catch (error) {
      next(error)
    }
  }
  async getAllChilds (req, res, next) {
    try {
      const childs = await childService.getAllChilds()
      res.json(childs)
    } catch (error) {
      next(error)
    }
  }
  async addMoneyChild (req, res, next) {
    try {
      await childService.addMoneyChild(req.body)
      const child = await childService.getChildById(req.body.ChildId)
      res.json({UserId: child.UserId})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ChildController()