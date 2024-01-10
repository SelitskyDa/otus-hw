import axios from 'axios'

const api = axios.create({
  timeout: 20000,
  params: {}
})

export default api
