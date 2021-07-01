const feedBackService = require('../services/feedback-service')

class FeedbackController{
  async createFeedback (req, res, next) {
    try {
      const feedbackData = {
        UserId: req.body.UserId,
        topic: req.body.topic,
        description: req.body.description,
        stars: req.body.stars
      }
      const feedback = await feedBackService.createFeedback(feedbackData)
      res.json(feedback)
    } catch (error) {
      next(error)
    }
  }
  async deleteFeedback (req, res, next) {
    try {
      const feedback = await feedBackService.deleteFeedback(req.body.id)
      res.json(feedback)
    } catch (error) {
      next(error)
    }
  }
  async loadFeedbacksByUser (req, res, next) {
    try {
      const feedbacks = []
      const result = await feedBackService.loadFeedbacksByUser(req.user.id)
      result.rows.forEach(element => {
        feedbacks.push(element.dataValues)
      })
      res.json({feedbacks: feedbacks})
    } catch (error) {
      next(error)
    }
  }
  async allfeedbacks (req, res, next) {
    try {
      const feedbacks = await feedBackService.getAllFeedbacks()
      res.send({
        feedbacks: feedbacks
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FeedbackController()