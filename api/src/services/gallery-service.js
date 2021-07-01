const { User, Gallery, MiningTable, TeacherTable, Child, Childschedule, CourseTable, TrialCourse, Course, Schedule, TimeTable, Feedback, Trial, Task, Filial }
 = require('../services/db-service').models
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ApiError = require('../exceptions/api-error')

class GalleryService {
  async createGallery(data) {
    try {
      const gallery = await Gallery.create(data)
      return gallery
    } catch (error) {
      throw ApiError.BadRequest('Создать элемент галереии не удалось')
    }
  }
  async deleteGallery(id) {
    try {
      const result = await Gallery.destroy({where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Удалить элемент галереии не удалось')
    }
  }
  async getGalleryByChilds(childs) {
    try {
      const result = await Gallery.findAndCountAll({
        where: {
          childid: {
            [Op.or]: childs
          }
        }
      })
      return result
    } catch (error) {
      throw ApiError.BadRequest('Загрузить галереии не удалось')
    }
  }
  async getAllGallery() {
    try {
      const result = await Gallery.findAll({
        attributes: ['id', 'name', 'image', 'format', 'islike', 'description', 'updatedAt', 'createdAt'],
        include: [
          {
            model: TimeTable
          },
          {
            model: Course
          },
          {
            model: Child,
            attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage'],
            include: [
              {
                model: User,
                attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
              }
            ]
          }
        ]
      })
      return result
    } catch (error) {
      console.log(error)
      throw ApiError.BadRequest('Загрузить галереии не удалось')
    }
  }
  async likeGallery(id) {
    try {
      const result = await Gallery.update({islike: true},{where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Удалить элемент галереии не удалось')
    }
  }
}

module.exports = new GalleryService()