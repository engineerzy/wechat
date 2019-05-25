import request from '@/utils/request'

export function getHomepageData() {
  return request({
    url: '/api/common/student/home',
    method: 'get'
  })
}

export function getEducationPageData() {
  return request({
    url: '/api/common/student/home/education',
    method: 'get'
  })
}

export function getMyPageData() {
  return request({
    url: '/api/common/student/home/my',
    method: 'get'
  })
}


export function getParentInfo() {
  return request({
    url: '/api/common/student/info',
    method: 'get'
  })
}

export function getStudentBindQrcode() {
  return request({
    url: '/api/common/student/qrcode/bind',
    method: 'get'
  })
}

export function getAttentionBasic() {
  return request({
    url: '/api/common/student/attention/basic',
    method: 'get'
  })
}

export function getAttention(year, month) {
  return request({
    url: '/api/common/student/attention',
    method: 'get',
    params: {
      year, month
    }
  })
}

export function getHabit() {
  return request({
    url: '/api/common/student/home/habit',
    method: 'get'
  })
}

