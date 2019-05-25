import request from '@/utils/request'

// 获取考勤类型和时间
export function getAttendanceType() {
  return request({
    url: `/api/common/manage/attendance/type`,
    method: 'get',
  })
}

// 创建考勤类型
export function addAttendanceType(data) {
  return request({
    url: `/api/common/manage/attendance/type`,
    method: 'post',
    data
  })
}

// 更新考勤类型
export function updateAttendanceType(id, data) {
  return request({
    url: `/api/common/manage/attendance/type/${id}`,
    method: 'put',
    data
  })
}

// 更新考勤类型
export function deleteAttendanceType(id) {
  return request({
    url: `/api/common/manage/attendance/type/${id}`,
    method: 'delete',
  })
}

// 获取考勤类型的关联的学生
export function attendanceStudent(id, page, pageSize) {
  return request({
    url: `/api/common/manage/attendance/type/${id}/student`,
    method: 'get',
    params: {
      page, pageSize
    }
  })
}
