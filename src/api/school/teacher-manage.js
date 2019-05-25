import request from '@/utils/request'

// 获取教师列表
export function getTeacherList(params) {
  return request({
    url: `/api/common/manage/teacher`,
    method: 'get',
    params
  })
}

// 添加教师
export function addTeacher(data) {
  return request({
    url: '/api/common/manage/teacher',
    method: 'post',
    data
  })
}

// 更新教师信息
export function updateTeacher(id, data) {
  return request({
    url: `/api/common/manage/teacher/${id}`,
    method: 'put',
    data
  })
}

// 删除
export function deleteTeacher(id) {
  return request({
    url: `/api/common/manage/teacher/${id}`,
    method: 'delete',
  })
}

// 查询教师个人信息
export function getTeacherInfo(id) {
  return request({
    url: `/api/common/manage/teacher/${id}`,
    method: 'get',
  })
}
