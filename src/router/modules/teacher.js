// 教师端专有的路由
import EmptyRouterView from '@/components/common/empty-router-view'
import HomePage from '@/components/teacher/home/home-page'

export default [
  {
    name: 'Teacher',
    path: '/Teacher',
    redirect: {
      name: 'TeacherHomeIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'TeacherHome',
        path: 'Home',
        component: HomePage,
        meta: {
          title: '首页 - 教师中心',
          keepAlive: true
        },
        children:[
          {
            name: 'TeacherHomeIndex',
            path: 'Index',
            component: () => import('@/components/teacher/home'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'TeacherHomeWorkbench',
            path: 'Workbench',
            component: () => import('@/components/teacher/home/workbench'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'TeacherHomeSearch',
            path: 'Search',
            component: () => import('@/components/teacher/home/search'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'TeacherHomeMy',
            path: 'My',
            component: () => import('@/components/teacher/home/my'),
            meta: {
              keepAlive: true
            },
          },
        ]
      },
      {
        name: 'TeacherAchievement',
        path: 'Achievement',
        component: () => import('@/components/teacher/achievement'),
      },
      {
        name: 'TeacherHomework',
        path: 'Homework',
        component: EmptyRouterView,
        meta: {
          keepAlive: true
        },
        children:[
          {
            name: 'TeacherHomeworkIndex',
            path: 'Index',
            component: () => import('@/components/teacher/homework'),
          },
          {
            name: 'TeacherHomeworkUnread',
            path: 'Unread',
            component: () => import('@/components/teacher/homework/unread'),
          },
          {
            name: 'TeacherHomeworkComment',
            path: 'Comment',
            component: () => import('@/components/teacher/homework/comment'),
          },
          {
            name: 'TeacherHomeworkHistory',
            path: 'History',
            component: () => import('@/components/teacher/homework/history-record'),
          }
        ]
      },
      {
        name: 'TeacherCommunity',
        path: 'Community',
        component: EmptyRouterView,
        children: [
          {
            name: 'TeacherCommunityIndex',
            path: '',
            component: () => import('@/components/teacher/interactive-community/community-index'),
          },
          {
            name: 'TeacherCommunityWaitAudit',
            path: 'WaitAudit',
            component: () => import('@/components/teacher/interactive-community/wait-audit'),
          },
          {
            name: 'TeacherCommunityAddCommunity',
            path: 'AddCommunity',
            component: () => import('@/components/teacher/interactive-community/add-community'),
          },
          {
            name: 'TeacherCommunityModifyCommunity',
            path: 'ModifyCommunity',
            component: () => import('@/components/teacher/interactive-community/modify-community'),
          },
          {
            name: 'TeacherCommunityReadDetail',
            path: 'ReadDetail',
            component: () => import('@/components/teacher/interactive-community/read-detail'),
          },
          {
            name: 'TeacherCommunityMyCommunity',
            path: '/MyCommunity',
            component: () => import('@/components/teacher/interactive-community/my-community'),
          },
        ]
      },
      {
        name:'TeacherMall',
        path:'Mall',
        component: EmptyRouterView,
        children:[
          {
            name: 'TeacherMallExchangePrize',
            path: 'ExchangePrize',
            component: () => import('@/components/teacher/mall/exchange-prize'),
          },
          {
            name: 'TeacherMallFlowerMall',
            path: 'FlowerMall',
            component: () => import('@/components/teacher/mall/flower-mall'),
          },
          {
            name: 'TeacherMallFlowerExchange',
            path: 'FlowerExchange',
            component: () => import('@/components/teacher/mall/flower-exchange'),
          }
        ]
      }
    ]
  },

]
