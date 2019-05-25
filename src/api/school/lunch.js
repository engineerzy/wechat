import request from '@/utils/request'

// 午休与用餐-教师/园长端
export function getSiestaStudentList() {
  return request({
    url: `/api/common/siesta/performance`,
    method: 'get',
  })
}

// 返回评语
export function getCommentList(type) {
  return request({
    url: `/api/common/siesta/${type}/comment`,
    method: 'get',
  })
}

// 提交学生午休与用餐表示
export function submit(type, stuIds, commentids) {
  return request({
    url: `/api/common/siesta/performance`,
    method: 'post',
    data: {
      type, stuIds, commentids
    }
  })
}

// 获取状态管理
export function getStatusList() {
  return request({
    url: `/api/common/siesta/commentManage`,
    method: 'get',
  })
}

// 新增状态
export function createStatus(type, category, comment) {
  return request({
    url: `/api/common/siesta/comment`,
    method: 'post',
    data: {
      type, category, comment,
    }
  })
}

// 修改状态
export function modifyStatus(commentId, type, category, comment) {
  return request({
    url: `/api/common/siesta/comment`,
    method: 'put',
    data: {
      commentId, type, category, comment,
    }
  })
}

// 删除状态
export function deleteStatus(commentId) {
  return request({
    url: `/api/common/siesta/${commentId}/comment`,
    method: 'delete',
  })
}

// 获取详情
export function getLunchDetails() {
  return request({
    url: `/api/common/siesta/detaile`,
    method: 'get',
  })
}

// 获取学生的午休与用餐详情
export function getStudentLunchDetails(stuId, date) {
  return request({
    url: `/api/common/siesta/student/detaile`,
    method: 'get',
    params: {
      stuId, date
    }
  })
}
