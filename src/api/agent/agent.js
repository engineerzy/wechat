import request from '@/utils/request'

//人数报表
export function AgentnumberPeopleReport(area,brand,school) {
    return request({
        url: '/api/mobile/agentRole/numberPeopleReport',
        method: 'get',
        params:{
            area,
            brand,
            school
        }
    })
}
// 财务报表
export function AgentFeeReport() {
    return request({
        url: '/api/mobile/agentRole/financeReport',
        method: 'get',
    })
}

// 账户管理
export function Account() {
    return request({
        url: '/api/mobile/agentRole/accountManage',
        method: 'get',
    })
}
//
// // 数据统计（折线图数据）
// export function BrokenlineDiagram() {
//     return request({
//         url: '/api/mobile/newConceptRole/{schoolId}/dataStatistics/{type}/chart/{year?}/{month?}',
//         method: 'get',
//     })
// }


//
