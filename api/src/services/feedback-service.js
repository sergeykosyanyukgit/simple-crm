const { Feedback } = require('../services/db-service').models
const ApiError = require('../exceptions/api-error')

class FidbackService {
  async createFeedback(feedbackData) {
    try {
      const feedback = await Feedback.create(feedbackData)
      return feedback
    } catch (error) {
      throw ApiError.BadRequest('Создать отзыв не удалось')
    }
  }
  async deleteFeedback(id) {
    try {
      const feedback = await Feedback.destroy({where: {id}})
      return feedback
    } catch (error) {
      throw ApiError.BadRequest('Удалить отзыв не удалось')
    }
  }
  async loadFeedbacksByUser(userid) {
    try {
      const feedbacks = await Feedback.findAndCountAll({where: {userid}})
      return feedbacks
    } catch (error) {
      throw ApiError.BadRequest('Загрузить отзывы не удалось')
    }
  }
  async getAllFeedbacks() {
    try {
      const feedbacks = await Feedback.findAll()
      return feedbacks
    } catch (error) {
      throw ApiError.BadRequest('Загрузить отзывы не удалось')
    }
  }
}

module.exports = new FidbackService()