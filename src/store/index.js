import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import app from './modules/app'
import user from './modules/user'

import schoolHome from './modules/school/home'
import teacherHome from './modules/teacher/home'
import parentHome from './modules/parent/home'

import lunch from './modules/school/lunch'
import charge from './modules/school/charge'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    schoolHome,
    teacherHome,
    parentHome,

    lunch,
    charge,
  },
  getters
})

export default store
