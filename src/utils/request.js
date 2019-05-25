import axios from 'axios'
import { Notify } from 'vant'
import store from '@/store'
import { param2Obj } from '@/utils'

const baseURL = '/index.php'
// const baseURL = 'http://l/' // TODO

const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 10000 // request timeout
})

// 拦截JWT TOKEN
service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      let authorization = response.headers.authorization
      if (authorization.startsWith('Bearer ') || authorization.startsWith('bearer ')) {
        store.commit('SET_TOKEN', authorization)
      }
    }

    if (response.data && response.data.meta && response.data.meta.success === false) {
      return Promise.reject(response)
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    // 401 错误, 重新登录获取token
    if (error.response && error.response.status === 401) {
      store.dispatch('Login')
    }

    console.log('error', error)
    const errMsg = getErrMsg(error)
    console.error('Axios 拦截器 ' + errMsg)
    Notify({
      message: errMsg,
      background: '#ff4444',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

service.interceptors.request.use(
  config => {
    const params = param2Obj(location.href)
    if (params['i']) {
      config.headers['X-INFO-I'] = params['i']
    }
    if (params['s']) {
      config.headers['X-INFO-S'] = params['s']
    }

    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

function getErrMsg(err) {
  if (err && err.data && err.data.meta) {
    return err.data.meta.message
  }
  if (err && err.response && err.response.data && err.response.data.meta) {
    return err.response.data.meta.message
  }
  return err
}
export default service
