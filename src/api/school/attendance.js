import request from '@/utils/request'

// 获取今日未签到的学生
export function unsignedStudent(attendanceTypeId, classId, type) {
  return request({
    url: `/api/common/attendance/unsigned`,
    method: 'get',
    params: {
      attendanceTypeId, classId, type
    }
  })
}

// 执行签到
export function signed(id) {
  return request({
    url: `/api/common/attendance/signin`,
    method: 'post',
    params: {
      id
    }
  })
}
