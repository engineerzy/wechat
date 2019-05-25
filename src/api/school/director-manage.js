import request from '@/utils/request'

// 获取园长列表
export function getDirectorList(params) {
  return request({
    url: `/api/common/manage/director`,
    method: 'get',
    params
  })
}

// 添加园长
export function addDirector(data) {
  return request({
    url: '/api/common/manage/director',
    method: 'post',
    data
  })
}

// 更新园长信息
export function updateDirector(id, data) {
  return request({
    url: `/api/common/manage/director/${id}`,
    method: 'put',
    data
  })
}

// 删除
export function deleteDirector(id) {
  return request({
    url: `/api/common/manage/director/${id}`,
    method: 'delete',
  })
}

// 查询园长个人信息
export function getDirectorInfo(id) {
  return request({
    url: `/api/common/manage/director/${id}`,
    method: 'get',
  })
}
