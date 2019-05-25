// 新师路专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'

export default [
    {
        name: 'BrandRole',
        path: '/BrandRole',
        component: EmptyRouterView,
        children: [
            {
                name: 'BrandRoleDataStatistics',
                path: 'BrandRoleDataStatistics',
                component: () => import('@/components/brand/data-statistics'),
            },
            {
                name: 'PrincipalManagement',
                path: 'PrincipalManagement',
                component: () => import('@/components/brand/principal-management'),
            },
        ]
    }
]
