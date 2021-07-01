const courseService = require('../services/course-service')

class CourseController {
    async createCourse (req, res, next) {
      try {
        const course = await courseService.createCourse(req.body)
        res.json(course)
      } catch (error) {
        next(error)
      }
    }
    async updateCourse (req, res, next) {
      try {
        await courseService.updateCourse(req.body)
        const course = await courseService.getCourseById(req.body.id)
        res.json(course)
      } catch (error) {
        next(error)
      }
    }
    async getAllCourses (req, res, next) {
      try {
        const courses = await courseService.getAllCourses()
        res.json(courses)
      } catch (error) {
        next(error)
      }
    }
  async deleteCourse (req, res, next) {
    try {
      const result = await courseService.deleteCourse(req.body.id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new CourseController()