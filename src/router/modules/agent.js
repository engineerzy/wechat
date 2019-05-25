// 新师路专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'

export default [
    {
        name: 'NewAgent',
        path: '/NewAgent',
        component: EmptyRouterView,
        children: [
            {
                name: 'NewAgentDataStatistics',
                path: 'AgentDataStatistics',
                component: () => import('@/components/agent/data-statistics'),
            },
        ]
    }
]
