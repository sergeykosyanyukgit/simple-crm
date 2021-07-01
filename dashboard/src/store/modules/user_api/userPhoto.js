import UserService from '../../../services/UserService'

export default {
  actions: {
    async thisUserPhotoLike (ctx, photo) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisUserPhotoLike(photo)
          ctx.commit('likePhoto', photo.id)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  }
}
