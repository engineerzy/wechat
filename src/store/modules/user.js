import { getToken, setToken, removeToken } from '@/utils/auth'
import { param2Obj, param, isWeixinBrowser } from '@/utils'
import request from '@/utils/request'

let token
const params = param2Obj(location.href)
if (params.token) {
  token = params.token
  setToken(token)
} else {
  token = getToken()
}
token = handleToken(token)

function handleToken(token) {
  if (typeof token !== 'string') {
    return token
  }
  if (!token.startsWith('Bearer ')) {
    if (token.toLowerCase().startsWith('bearer ')) {
      token = token.slice(7)
    }
    token = 'Bearer ' + token
  }

  return token
}

const user = {
  state: {
    token,
    roleType: undefined, // 家长30, 教师41, 校长42, 代理50, 品牌60, 新师路角色99
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      token = handleToken(token)
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN: (state) => {
      state.token = ''
      removeToken()
    },

    // 设置当前登录的是哪个用户端
    UPDATE_ROLE_TYPE(state, roleType) {
      if ([30, 41, 42, 50, 60, 99].includes(roleType)) {
        state.roleType = roleType
      } else {
        console.error('无效的 role type ', roleType)
      }
    },
  },

  actions: {
    Login({ state, commit }) {
      commit('REMOVE_TOKEN')

      console.log('跳转页面进行微信授权重新登录', location.search)

      const params = param2Obj(location.search)
      const data = {
        redirect: location.href,
      }
      if (params['i']) {
        data['i'] = params['i']
      }
      if (params['s']) {
        data['s'] = params['s']
      }
      if (state.roleType) {
        data['rt'] = state.roleType
      }

      if (isWeixinBrowser()) {
        location.href = '/api/login?' + param(data)
      } else {
        // location.href = '/api/login/qrcode?' + param(data)
      }
      request('/api/login?username=ccym&password=123456') // TODO 编译时记得将这里注释掉
    },
  },
}

export default user
