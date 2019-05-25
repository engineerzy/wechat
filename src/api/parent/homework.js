import request from '@/utils/request'

export function stuHomework(page) {
  return request({
    url: `api/mobile/work/stuWork/${page}`,
    method: 'get'
  })
}