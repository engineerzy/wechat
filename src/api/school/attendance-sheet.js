import request from '@/utils/request'



// 获取班级列表
export function selectClassList(page, pageSize) {
    return request({
      url: '/api/common/manage/class',
      method: 'get',
      params: {
        page, pageSize
      }
    })
  }
  // 获取班考勤报表
export function getSheetData(parameter) {
  return request({
    url: '/api/common/attendance/report',
    method: 'get',
    params:parameter
  })
}