import request from '@/utils/request'

export function getAccountList(all) {
  return request({
    url: '/api/common/account',
    method: 'get',
    params: {
      all: all ? 1 : 0
    }
  })
}

export function switchAccount(data) {
  return request({
    url: '/api/common/account',
    method: 'post',
    data
  })
}

export function getUploadOssUrl(fileType, functionType, numbers) {
  return request({
    url: '/api/common/misc/oss/url',
    method: 'get',
    params: {
      fileType, functionType, numbers
    }
  })
}

// 获取当前学校的所有班级的基本信息
export function getAllClass(all) {
  return request({
    url: '/api/common/misc/school/all_class',
    method: 'get',
    params: {
      all
    }
  })
}
