import request from '@/utils/request'

// 社区首页
export function getCommunityIndexData(page, type) {
  return request({
    url: '/api/mobile/community/communityManage',
    method: 'get',
    params: {
      page, type
    }
  })
}

// 发布社区消息
export function postCommunity(data) {
  return request({
    url: '/api/mobile/community',
    method: 'post',
    data
  })
}

// 修改社区消息
export function modifyCommunity(id, data) {
  return request({
    url: '/api/mobile/community/' + id,
    method: 'put',
    data
  })
}

// 我的动态列表
export function myCommunity(page, uid ,utype) {
  return request({
    url: '/api/mobile/community/personal',
    method: 'put',
    params: {
      page, uid ,utype
    }
  })
}

// 查询详情
export function readDetail(id) {
  return request({
    url: '/api/mobile/community/' + id + '/read',
    method: 'get',
  })
}

// 获取单条动态信息
export function dynamicInfo(id) {
  return request({
    url: '/api/mobile/community/' + id + '/show',
    method: 'get',
  })
}

// 撤回动态
export function undoInfo(id) {
  return request({
    url: '/api/mobile/community/' + id,
    method: 'delete',
  })
}

// 点赞
export function likes(id) {
  return request({
    url: '/api/mobile/community/' + id + '/like',
    method: 'get',
  })
}

// 获取新增页面的基本数据
export function basicInfoConfig() {
  return request({
    url: '/api/mobile/community/collection',
    method: 'get',
  })
}

// 审核列表（校长端）
export function auditList() {
  return request({
    url: '/api/mobile/community/check',
    method: 'get',
  })
}

// 消息模板-社区动态详情 从消息模板 到单条审核页面
export function singleAudit(id) {
  return request({
    url: `/api/mobile/community/${id}/details`,
    method: 'get',
  })
}

// 提交动态审核结果
export function submitResult(id) {
  return request({
    url: `/api/mobile/community/${id}/check`,
    method: 'put',
  })
}

// 社区 获取类型数据
export function selectTypeList() {
  return request({
    url: `/api/mobile/community/type`,
    method: 'get',
  })
}

// 社区 新增类型
export function addType(data) {
  return request({
    url: `/api/mobile/comment/type`,
    method: 'post',
    data
  })
}

// 社区 删除类型
export function deleteType(id) {
  return request({
    url: `/api/mobile/comment/${id}/type`,
    method: 'delete',
  })
}

// 社区 修改类型
export function modifyType(id, data) {
  return request({
    url: `/api/mobile/comment/${id}/type`,
    method: 'put',
    data
  })
}

// 社区 获取校区的权限
export function selectPersimissionList() {
  return request({
    url: `/api/mobile/community/config`,
    method: 'get',
  })
}

// 社区 修改权限管理
export function modifyPersimission(data) {
  return request({
    url: `/api/mobile/community/config`,
    method: 'post',
    data
  })
}

// 社区 发布社区 动态
export function addCommunityInfo(data) {
  return request({
    url: `/api/mobile/community`,
    method: 'post',
    data
  })
}
