const bcrypt = require('bcrypt')
const trialService = require('../services/trial-service')
const scheduleService = require('../services/schedule-service')
const miningService = require('../services/mining-service')
const userService = require('../services/user-service')
const childTableService = require('../services/child-table-service')

class AdminController {
  async getteacherpaymini (req, res, next) {
    try {
      const timestart = new Date(req.body.timestart)
      const timefinish = new Date(req.body.timefinish)
      const trials = await trialService.getTrialsByTime(req.body.id, timestart, timefinish)
      const schedules = await scheduleService.getSchedulesByTime(req.body.id, timestart, timefinish)

      let teacherResponse = {
        id: req.body.id,
        salary: 0,
        usedtimetables: []
      }
      schedules.forEach(schedule => {
        let searchTimeTable = teacherResponse.usedtimetables.filter(used => {
          let date = `${schedule.date.getFullYear()}`
          if(schedule.date.getMonth() < 10){
            date += `-0${schedule.date.getMonth()+1}`
          }
          else
          {
            date += `-${schedule.date.getMonth()}`
          }
          if(schedule.date.getDate() < 10){
            date += `-0${schedule.date.getDate()}`
          }
          else
          {
            date += `-${schedule.date.getDate()}`
          }
          return used.id === schedule.TimeTable.id && used.date == date
        })
        let date = `${schedule.date.getFullYear()}`
        if(schedule.date.getMonth() < 10){
          date += `-0${schedule.date.getMonth()+1}`
        }
        else
        {
          date += `-${schedule.date.getMonth()}`
        }
        if(schedule.date.getDate() < 10){
          date += `-0${schedule.date.getDate()}`
        }
        else
        {
          date += `-${schedule.date.getDate()}`
        }
        let bufferTimeTable = {
          id: schedule.TimeTable.id,
          date: date,
          TimeTable: schedule.TimeTable,
          hours: 0,
          childs: 0,
          Childrens: []
        }
        if (searchTimeTable.length === 0) {
          if (schedule.TimeTable.timelong === '1.5') {
            if (bufferTimeTable.Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              bufferTimeTable.Childrens.push(schedule.Childschedule.Child)
            }
            bufferTimeTable.childs = bufferTimeTable.Childrens.length
            bufferTimeTable.hours = 2
          }
          if (schedule.TimeTable.timelong === '3') {
            if (bufferTimeTable.Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              bufferTimeTable.Childrens.push(schedule.Childschedule.Child)
            }
            bufferTimeTable.childs = bufferTimeTable.Childrens.length
            bufferTimeTable.hours = 4
          }
          teacherResponse.usedtimetables.push(bufferTimeTable)
        } else {
          if (schedule.TimeTable.timelong === '1.5') {
            if (searchTimeTable[searchTimeTable.length-1].Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              searchTimeTable[searchTimeTable.length-1].Childrens.push(schedule.Childschedule.Child)
            }
            searchTimeTable[searchTimeTable.length-1].childs = searchTimeTable[searchTimeTable.length-1].Childrens.length
            bufferTimeTable.hours = 2
          }
          if (schedule.TimeTable.timelong === '3') {
            if (searchTimeTable[searchTimeTable.length-1].Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              searchTimeTable[searchTimeTable.length-1].Childrens.push(schedule.Childschedule.Child)
            }
            searchTimeTable[searchTimeTable.length-1].childs = searchTimeTable[searchTimeTable.length-1].Childrens.length
            bufferTimeTable.hours = 4
          }
        }
      })
      trials.forEach(trial => {
        let searchTimeTable = teacherResponse.usedtimetables.filter(used => {
          let date = `${trial.date.getFullYear()}`
          if(trial.date.getMonth() < 10){
            date += `-0${trial.date.getMonth()+1}`
          }
          else
          {
            date += `-${trial.date.getMonth()}`
          }
          if(trial.date.getDate() < 10){
            date += `-0${trial.date.getDate()}`
          }
          else
          {
            date += `-${trial.date.getDate()}`
          } 
          return used.id === trial.TimeTableId && used.date == date
        })
        let date = `${trial.date.getFullYear()}`
        if(trial.date.getMonth() < 10){
          date += `-0${trial.date.getMonth()+1}`
        }
        else
        {
          date += `-${trial.date.getMonth()}`
        }
        if(trial.date.getDate() < 10){
          date += `-0${trial.date.getDate()}`
        }
        else
        {
          date += `-${trial.date.getDate()}`
        } 
        let bufferTimeTable = {
          id: trial.TimeTable.id,
          date: date,
          TimeTable: trial.TimeTable,
          hours: 0,
          childs: 0,
          Childrens: []
        }
        if (searchTimeTable.length === 0) {
          if (bufferTimeTable.Childrens.filter(child => child.id === trial.ChildId).length === 0) {
            let tr = {
              id: trial.id,
              name: `${trial.name} ${trial.parentname}`,
              surname: trial.surname,
              status: 'Пробное занятие'
            }
            bufferTimeTable.Childrens.push(tr)
          }
          if(bufferTimeTable.TimeTable.timelong == '1.5')
          bufferTimeTable.hours = 2
          bufferTimeTable.childs = bufferTimeTable.Childrens.length
          teacherResponse.usedtimetables.push(bufferTimeTable)
        } else {
          if (searchTimeTable[0].Childrens.filter(child => child.id === trial.ChildId).length === 0) {
            let tr = {
              id: trial.id,
              name: `${trial.name} ${trial.parentname}`,
              status: 'Пробное занятие'
            }
            searchTimeTable[0].Childrens.push(tr)
          }
          searchTimeTable[0].childs = searchTimeTable[0].Childrens.length
        }
      })
      const payHours = req.body.payhours
      const payChilds = req.body.paychilds
      teacherResponse.usedtimetables.sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
      })
      let buffer = {
        data: null,
        added: 0
      }
      teacherResponse.usedtimetables.forEach(timetable => {
        if (timetable.hours == 4 || timetable.hours == 0)
        if (buffer.data == null) {
          buffer.data = timetable
          buffer.added = 1
        }
        else
        {
          if(buffer.data.date == timetable.date) {
            buffer.added++
            if(buffer.added == 1) {
              buffer.data.hours = 4
            } else if(buffer.added == 2) {
              let search = teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              })
              search.forEach(tt => {
                tt.hours = 0
              })
              if(search.length == 2) {
                console.log(search[0].TimeTable.timestart)
                console.log(search[1].TimeTable.timestart)
                if(search[0].TimeTable.timestart == '13:30' && search[1].TimeTable.timestart == '17:00')
                buffer.data.hours = 7.5
                else if(search[0].TimeTable.timestart == '10:00' && search[1].TimeTable.timestart == '13:30')
                buffer.data.hours = 7.5
                else if(search[0].TimeTable.timestart == '10:00' && search[1].TimeTable.timestart == '17:00')
                buffer.data.hours = 8
              }
            } else if(buffer.added == 3) {
              teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              }).forEach(tt => {
                if (tt.TimeTable.timelong == 3)
                tt.hours = 0
              })
              buffer.data.hours = 11
            }
          } else {
            if(buffer.added == 1) {
              buffer.data.hours = 4
            } else if(buffer.added == 2) {
              teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              }).forEach(tt => {
                if (tt.TimeTable.timelong == 3)
                tt.hours = 0
              })
              buffer.data.hours = 7.5
            } else if(buffer.added == 3) {
              teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              }).forEach(tt => {
                tt.hours = 0
              })
              buffer.data.hours = 11
            }
            buffer.data = timetable
            buffer.added = 1
          }
        }
      })

      teacherResponse.usedtimetables.forEach(timetable => {
        console.log(timetable.id)
        teacherResponse.salary += timetable.hours * payHours + timetable.childs * payChilds
      })
      res.json({schedules: schedules, trials: trials, teacherResponse: teacherResponse})
    } catch (error) {
      next(error)
    }

    /*if (req.body.bot != undefined && req.body.bot == true)
    {
      return {schedules: schedules, trials: trials, teacherResponse: teacherResponse}
    }
    else
    {
      res.send({schedules: schedules, trials: trials, teacherResponse: teacherResponse})
    }*/
  }
  async getteacherpay (req, res, next) {
    try {
      const timestart = new Date(req.body.timestart)
      const timefinish = new Date(req.body.timefinish)
      const trials = await trialService.getTrialsByTime(req.body.id, timestart, timefinish)
      const schedules = await scheduleService.getSchedulesByTime(req.body.id, timestart, timefinish)
      const teacherResponse = {
        id: req.body.id,
        salary: 0,
        usedtimetables: []
      }
      console.log(schedules)
      schedules.forEach(schedule => {
        let searchTimeTable = teacherResponse.usedtimetables.filter(used => {
          let date = `${schedule.date.getFullYear()}`
          if(schedule.date.getMonth() < 10){
            date += `-0${schedule.date.getMonth()+1}`
          }
          else
          {
            date += `-${schedule.date.getMonth()}`
          }
          if(schedule.date.getDate() < 10){
            date += `-0${schedule.date.getDate()}`
          }
          else
          {
            date += `-${schedule.date.getDate()}`
          }
          return used.id === schedule.TimeTable.id && used.date == date
        })
        let date = `${schedule.date.getFullYear()}`
        if(schedule.date.getMonth() < 10){
          date += `-0${schedule.date.getMonth()+1}`
        }
        else
        {
          date += `-${schedule.date.getMonth()}`
        }
        if(schedule.date.getDate() < 10){
          date += `-0${schedule.date.getDate()}`
        }
        else
        {
          date += `-${schedule.date.getDate()}`
        }
        let bufferTimeTable = {
          id: schedule.TimeTable.id,
          date: date,
          TimeTable: schedule.TimeTable,
          hours: 0,
          childs: 0,
          Childrens: []
        }
        if (searchTimeTable.length === 0) {
          if (schedule.TimeTable.timelong === '1.5') {
            if (bufferTimeTable.Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              bufferTimeTable.Childrens.push(schedule.Childschedule.Child)
            }
            bufferTimeTable.childs = bufferTimeTable.Childrens.length
            bufferTimeTable.hours = 2
          }
          if (schedule.TimeTable.timelong === '3') {
            if (bufferTimeTable.Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              bufferTimeTable.Childrens.push(schedule.Childschedule.Child)
            }
            bufferTimeTable.childs = bufferTimeTable.Childrens.length
            bufferTimeTable.hours = 4
          }
          teacherResponse.usedtimetables.push(bufferTimeTable)
        } else {
          if (schedule.TimeTable.timelong === '1.5') {
            if (searchTimeTable[searchTimeTable.length-1].Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              searchTimeTable[searchTimeTable.length-1].Childrens.push(schedule.Childschedule.Child)
            }
            searchTimeTable[searchTimeTable.length-1].childs = searchTimeTable[searchTimeTable.length-1].Childrens.length
            bufferTimeTable.hours = 2
          }
          if (schedule.TimeTable.timelong === '3') {
            if (searchTimeTable[searchTimeTable.length-1].Childrens.filter(child => child.id === schedule.Childschedule.Child.id).length === 0) {
              searchTimeTable[searchTimeTable.length-1].Childrens.push(schedule.Childschedule.Child)
            }
            searchTimeTable[searchTimeTable.length-1].childs = searchTimeTable[searchTimeTable.length-1].Childrens.length
            bufferTimeTable.hours = 4
          }
        }
      })
      trials.forEach(trial => {
        let searchTimeTable = teacherResponse.usedtimetables.filter(used => {
          let date = `${trial.date.getFullYear()}`
          if(trial.date.getMonth() < 10){
            date += `-0${trial.date.getMonth()+1}`
          }
          else
          {
            date += `-${trial.date.getMonth()}`
          }
          if(trial.date.getDate() < 10){
            date += `-0${trial.date.getDate()}`
          }
          else
          {
            date += `-${trial.date.getDate()}`
          } 
          return used.id === trial.TimeTableId && used.date == date
        })
        let date = `${trial.date.getFullYear()}`
        if(trial.date.getMonth() < 10){
          date += `-0${trial.date.getMonth()+1}`
        }
        else
        {
          date += `-${trial.date.getMonth()}`
        }
        if(trial.date.getDate() < 10){
          date += `-0${trial.date.getDate()}`
        }
        else
        {
          date += `-${trial.date.getDate()}`
        } 
        let bufferTimeTable = {
          id: trial.TimeTable.id,
          date: date,
          TimeTable: trial.TimeTable,
          hours: 0,
          childs: 0,
          Childrens: []
        }
        if (searchTimeTable.length === 0) {
          if (bufferTimeTable.Childrens.filter(child => child.id === trial.ChildId).length === 0) {
            let tr = {
              id: trial.id,
              name: `${trial.name} ${trial.parentname}`,
              surname: trial.surname,
              status: 'Пробное занятие'
            }
            bufferTimeTable.Childrens.push(tr)
          }
          if(bufferTimeTable.TimeTable.timelong == '1.5')
          bufferTimeTable.hours = 2
          bufferTimeTable.childs = bufferTimeTable.Childrens.length
          teacherResponse.usedtimetables.push(bufferTimeTable)
        } else {
          if (searchTimeTable[0].Childrens.filter(child => child.id === trial.ChildId).length === 0) {
            let tr = {
              id: trial.id,
              name: `${trial.name} ${trial.parentname}`,
              status: 'Пробное занятие'
            }
            searchTimeTable[0].Childrens.push(tr)
          }
          searchTimeTable[0].childs = searchTimeTable[0].Childrens.length
        }
      })
      const payHours = req.body.payhours
      const payChilds = req.body.paychilds
      teacherResponse.usedtimetables.sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
      })
      let buffer = {
        data: null,
        added: 0
      }
      teacherResponse.usedtimetables.forEach(timetable => {
        if (timetable.hours == 4 || timetable.hours == 0)
        if (buffer.data == null) {
          buffer.data = timetable
          buffer.added = 1
        }
        else
        {
          if(buffer.data.date == timetable.date) {
            buffer.added++
            if(buffer.added == 1) {
              buffer.data.hours = 4
            } else if(buffer.added == 2) {
              let search = teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              })
              search.forEach(tt => {
                tt.hours = 0
              })
              if(search.length == 2) {
                if(search[0].TimeTable.timestart == '13:30' && search[1].TimeTable.timestart == '17:00')
                buffer.data.hours = 7.5
                else if(search[0].TimeTable.timestart == '10:00' && search[1].TimeTable.timestart == '13:30')
                buffer.data.hours = 7.5
                else if(search[0].TimeTable.timestart == '10:00' && search[1].TimeTable.timestart == '17:00')
                buffer.data.hours = 8
              }
            } else if(buffer.added == 3) {
              teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              }).forEach(tt => {
                if (tt.TimeTable.timelong == 3)
                tt.hours = 0
              })
              buffer.data.hours = 11
            }
          } else {
            if(buffer.added == 1) {
              buffer.data.hours = 4
            } else if(buffer.added == 2) {
              teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              }).forEach(tt => {
                if (tt.TimeTable.timelong == 3)
                tt.hours = 0
              })
              buffer.data.hours = 7.5
            } else if(buffer.added == 3) {
              teacherResponse.usedtimetables.filter(timetable => {
                return timetable.date == buffer.data.date
              }).forEach(tt => {
                tt.hours = 0
              })
              buffer.data.hours = 11
            }
            buffer.data = timetable
            buffer.added = 1
          }
        }
      })
      teacherResponse.usedtimetables.forEach(timetable => {
        teacherResponse.salary += timetable.hours * payHours + timetable.childs * payChilds
      })
      res.json({schedules: schedules, trials: trials, teacherResponse: teacherResponse})
    } catch (error) {
      next(error)
    }
  }
  async alluserinfo (req, res, next) {
    try {
      console.log(req.body.id)
      const user = await userService.allUserFullInfo(req.body.id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async allusers (req, res, next) {
    try {
      const users = await userService.getAllUsersFyllInfo()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
  async allteachers(req, res, next) {
    try {
      const users = await userService.allTeachersFullInsfo()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
  async kickschedule(req, res, next) {
    try {
      const childTable = await childTableService.updateChildTable(null, req.body.id)
      res.json(childTable)
    } catch (error) {
      next(error)
    }
  }
  async alladmins(req, res, next) {
    try {
      const users = await userService.allAdmins()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
  async createparent(req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 3)
      req.body.isActivated = true
      const user = await userService.createUser(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async createteacher(req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 3)
      req.body.isTeacher = true
      req.body.isActivated = true
      const user = await userService.createUser(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async createadmin(req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 3)
      req.body.isAdmin = true
      req.body.isActivated = true
      const user = await userService.createUser(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async updateschedule(req, res, next) {
    try {
      console.log(req.body)
      const sch = await scheduleService.getSchedule(req.body.id)
      console.log(sch)
      await scheduleService.updateScheduleUser({
        check: req.body.check,
        UserId: req.body.UserId,
        TimeTableId: req.body.TimeTableId,
        date: new Date()
      }, req.body.id)
      const result = await scheduleService.getSchedule(req.body.id)
      res.json(result)
    } catch(error) {
      next(error)
    }
  }
  async updatingscheduleotrab(req, res, next) {
    try {
      await scheduleService.updateScheduleFull({
        check: req.body.status,
        date: req.body.date,
        TimeTableId: req.body.TimeTableId,
        id: req.body.ScheduleId
      })
      const result = await miningService.updateMining({ 
        TimeTableId: req.body.TimeTableId,
        ScheduleId: req.body.id,
        date: req.body.date,
        status: req.body.status,
        time: req.body.time,
        MiningId: req.body.MiningId
      })
      
      res.json(result)
    } catch(error) {
      next(error)
    }
  }
  async updatescheduleotrab(req, res, next) {
    try {
      await scheduleService.updateScheduleFull(req.body)
      await miningService.createMining({
        TimeTableId: req.body.TimeTableId,
        ScheduleId: req.body.id,
        status: 'Назначена отработка',
        date: req.body.date,
        time: req.body.time
      })
      const result = await scheduleService.getSchedule(req.body.id)
      res.json(result)
    } catch(error) {
      next(error)
    }
  }
  async updateuser (req, res, next) {
    try {
      await userService.fullUpdateUser(req.body)
      const hashPassword = await bcrypt.hash(req.body.password, 3)
      if (req.body.password) {
        await userService.passwordUpdate(hashPassword, req.body.id)
      }
      const user = await userService.getUser(req.body.id)
      res.json(user)
    } catch(error) {
      next(error)
    }
  }
  async allmining(req, res, next) {
    try {
      console.log('getAllMinings')
      const result = await miningService.getAllMinings()
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AdminController()

/*async createchild(req, res, next) {
  let userPhone = await User.findOne({ where: {phone: req.body.phone} })
  if (!userPhone) {
    let userNew = await User.create(req.body)
    res.send(userNew)
  } else {
    res.send({error: 'Пользователь с таким номером уже существует'})
  }
}*/