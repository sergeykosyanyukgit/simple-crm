const galleryService = require('../services/gallery-service')

class GalleryController {
  async createGallery (req, res, next) {
    try {
      const gallery = await galleryService.createGallery(req.body)
      res.json(gallery)
    } catch (error) {
      next(error)
    }
  }
  async deleteGallery (req, res, next) {
    try {
      const gallery = await galleryService.deleteGallery(req.body.id)
      res.json(gallery)
    } catch (error) {
      next(error)
    }
  }
  async getGalleryByChilds (req, res, next) {
    try {
      const gallerys = []
      const result = await galleryService.getGalleryByChilds(req.body)
      result.rows.forEach(element => {
        gallerys.push(element.dataValues)
      })
      res.json(gallerys)
    } catch (error) {
      next(error)
    }
  }
  async allGallerys (req, res, next) {
    try {
      const gallerys = await galleryService.getAllGallery()
      res.json(gallerys)
    } catch (error) {
      next(error)
    }
  }
  async likeGallery (req, res, next) {
    try {
      await galleryService.likeGallery(req.body.id)
      res.json({
        id: req.body.id,
        return: 'like'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new GalleryController()