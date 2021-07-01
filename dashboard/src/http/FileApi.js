import axios from 'axios'
import config from '../config'
const HTTP = axios.create({
  withCredentials: true,
  baseURL: config.FILE_SERVER
})
HTTP.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

const FileApi = ({...data}) => new Promise((resolve, reject) => {
  try {
    // console.log(config.FILE_SERVER)
    if (data.method === 'load') {
      resolve(`${config.FILE_SERVER}${data.name}`)
    }
    if (data.method === 'upload') {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'name': data.name
      }
      let formData = new FormData()
      formData.append('sampleFile', data.file)

      HTTP.put(`upload`, formData, {headers: headers})
      .then(response => {
        console.log(response.data)
        resolve(response.data.path)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
    }
  } catch (error) {
    reject(error)
  }
})

export default FileApi
