import request from '@/utils/request'

// 获取学生列表
export function getStudentList(params) {
  return request({
    url: `/api/common/manage/student`,
    method: 'get',
    params
  })
}

// 添加学生
export function addStudent(data) {
  return request({
    url: '/api/common/manage/student',
    method: 'post',
    data
  })
}

// 更新学生信息
export function updateStudent(id, data) {
  return request({
    url: `/api/common/manage/student/${id}`,
    method: 'put',
    data
  })
}

// 删除
export function deleteStudent(id) {
  return request({
    url: `/api/common/manage/student/${id}`,
    method: 'delete',
  })
}

// 查询学生个人信息
export function getStudentInfo(id) {
  return request({
    url: `/api/common/manage/student/${id}`,
    method: 'get',
  })
}
