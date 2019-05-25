import request from '@/utils/request'

export function getHomepageData() {
  return request({
    url: '/api/common/teacher/home',
    method: 'get'
  })
}

export function getWorkbenchPageData() {
  return request({
    url: '/api/common/teacher/home/workbench',
    method: 'get'
  })
}

export function getSearchPageData() {
  return request({
    url: '/api/common/teacher/home/search',
    method: 'get'
  })
}

export function getMyPageData() {
  return request({
    url: '/api/common/teacher/home/my',
    method: 'get'
  })
}
