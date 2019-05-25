import request from '@/utils/request'

//人数报表
export function Populationreport() {
    return request({
        url: '/api/mobile/newConceptRole/numberPeopleReport',
        method: 'get',

    })
}
// 收费报表
export function FeeReport() {
    return request({
        url: '/api/mobile/newConceptRole/financeReport',
        method: 'get',
    })
}

// 数据统计
export function Statistics(schoolId) {
    return request({
        url: '/api/mobile/newConceptRole/'+ schoolId +'/dataStatistics/{year?}/{month?}/{day?}',
        method: 'get',
    })
}

// 数据统计（折线图数据）
export function BrokenlineDiagram(schoolId,type) {
    return request({
        url: '/api/mobile/newConceptRole/'+ schoolId +'/dataStatistics/'+ type +'/chart/{year?}/{month?}',
        method: 'get',
    })
}


//
