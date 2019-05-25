import request from '@/utils/request'

// 社区 社区首页（家长端） get
export function selectCommunityList(page, type){
  return request({
    url: '/api/mobile/community/communityParent',
    method: 'get',
    params: {
      page, type
    }
  })
}
