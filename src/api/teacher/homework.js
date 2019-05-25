import request from '@/utils/request'

export function homeworkNotice() {
  return request({
    url: `api/mobile/work`,
    method: 'get'
  })
}

//提交作业通知
 export function submitNotice(data) {
   return request({
     url: `api/mobile/work`,
     method: 'post',
     data
   })
 }

 // 获取评语
export function commentsList() {
  return request({
    url: `api/mobile/work/comment`,
    method: 'get'
  })
}

// 新增评语
export function addCommentsConfirm(data) {
  return request({
    url: `/api/mobile/work/comment`,
    method: 'post',
    data
  })
}
// 修改评语
export function modifyCommentsSub(id, data) {
  return request({
    url: `/api/mobile/work/${id}/comment`,
    method: 'put',
    data
  })
}
//删除评语
export function deleteCommentsSub(id) {
  return request({
    url: `/api/mobile/work/${id}/comment`,
    method: 'delete'
  })
}

// 确定录入作业
export function confirmRecordHomework(data) {
  return request({
    url: `/api/mobile/work`,
    method: 'post',
    data
  })
}
//获取 某个日期下的 历史作业记录
export function dateHistoryHomework(date) {
  return request({
    url: `api/mobile/work/${date}/history`,
    method: 'get'
  })
}
//查询详情
export function detailInfo(id, date) {
  return request({
    url: `api/mobile/work/${id}/${date}/detail`,
    method: 'get'
  })
}


















