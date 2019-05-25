import EmptyRouterView from '@/components/common/empty-router-view'

const route = [
  {
    name: 'SwitchAccount',
    path: 'SwitchAccount',
    component: () => import('@/components/common-page/switch-account/index'),
    meta: {
      title: '切换账号',
    }
  },
]

export default [
  {
    name: 'Common',
    path: '/Common',
    component: EmptyRouterView,
    children: [
      ...route
    ]
  },
]
