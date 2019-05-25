// 家长端专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'
import HomePage from '@/components/parent/home/home-page'

export default [
  {
    name: 'Parent',
    path: '/Parent',
    redirect: {
      name: 'ParentHomeIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'ParentHome',
        path: 'Home',
        component: HomePage,
        meta: {
          title: '首页 - 家长主页',
          keepAlive: true
        },
        children:[
          {
            name: 'ParentHomeIndex',
            path: 'Index',
            component: () => import('@/components/parent/home'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeHabit',
            path: 'Habit',
            component: () => import('@/components/parent/home/habit'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeEducation',
            path: 'Education',
            component: () => import('@/components/parent/home/education'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'ParentHomeMy',
            path: 'My',
            component: () => import('@/components/parent/home/my'),
            meta: {
              keepAlive: true
            },
          },
        ]
      },
      {
        name: 'ParentAttention',
        path: 'Attention',
        component: () => import('@/components/parent/attention'),
      },
      { // 作业完成通知
        name: 'ParentHomework',
        path: 'Homework',
        component: () => import('@/components/parent/homework'),
      },
      { // 午休用餐
        path: 'Lunch',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentLunch',
            path: '',
            component: () => import('@/components/parent/lunch'),
            meta: {
              title: '午休与用餐'
            }
          },
        ]
      },
      { // 匠托管
        name: 'Trusteeship',
        path: 'Trusteeship',
        component: EmptyRouterView,
        children: [
          {
            name: 'TrusteeshipHomePage',
            path: '',
            component: () => import('@/components/parent/trusteeship/homepage'),
          },
        ]
      },
      { // 红花
        name: 'Safflower',
        path: 'Safflower',
        component: EmptyRouterView,
        children: [
          {
            name: 'SafflowerRanking',
            path: 'Ranking',
            component: () => import('@/components/parent/safflower/ranking'),
          },
        ]
      },
      { // 社区
        name: 'ParentCommunity',
        path: 'Community',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentCommunityIndex',
            path: '',
            component: () => import('@/components/parent/community'),
          },
        ]
      },
      {
        // 红花商城
        name:'ParentFlowerMall',
        path:'FlowerMall',
        component: EmptyRouterView,
        children: [
          {
            name: 'ParentFlowerMallIndex',
            path: '',
            component: () => import('@/components/parent/mall/flower-mall'),
          },
        ]
      }
    ]
  },

]
