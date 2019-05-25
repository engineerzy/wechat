// 教师和园长端都有的路由
import EmptyRouterView from '@/components/common/empty-router-view'
import HomePage from '@/components/school/home/home-page'

export default [
  {
    name: 'School',
    path: '/School',
    redirect: {
      name: 'SchoolHomeIndex'
    },
    component: EmptyRouterView,
    children: [
      {
        name: 'SchoolHome',
        path: 'Home',
        component: HomePage,
        meta: {
          title: '首页 - 管理中心',
          keepAlive: true,
        },
        children:[
          {
            name: 'SchoolHomeIndex',
            path: 'Index',
            component: () => import('@/components/school/home'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'SchoolHomeWorkbench',
            path: 'Workbench',
            component: () => import('@/components/school/home/workbench'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'SchoolHomeSearch',
            path: 'Search',
            component: () => import('@/components/school/home/search'),
            meta: {
              keepAlive: true
            },
          },
          {
            name: 'SchoolHomeMy',
            path: 'My',
            component: () => import('@/components/school/home/my'),
            meta: {
              keepAlive: true
            },
          },
        ]
      },
      { // 班级管理
        path: 'ClassManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'ClassManage',
            path: '',
            component: () => import('@/components/school/class-manage'),
          },
          {
            name: 'ClassManageDel',
            path: 'Del',
            component: () => import('@/components/school/class-manage/class-manage-del'),
          },
          {
            name: 'ClassManagePopups',
            path: 'Popups',
            component: () => import('@/components/school/class-manage/class-manage-popups'),
          },
          {
            name: 'ClassManageReplaceTeacher',
            path: 'ReplaceTeacher',
            component: () => import('@/components/school/class-manage/replace-teacher'),
          },
          {
            name: 'ClassManageAssociatedStudent',
            path: 'AssociatedStudent',
            component: () => import('@/components/school/class-manage/associated-student'),
          },
          {
            name: 'ClassManageClassDetail',
            path: 'ClassDetail',
            component: () => import('@/components/school/class-manage/school-class-detail'),
          },
          {
            name: 'ClassManageClassDetailBox',
            path: 'ClassDetailBox',
            component: () => import('@/components/school/class-manage/class-detail-box'),
          },
        ]
      },
      { // 教师管理
        path: 'TeacherManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'TeacherManage',
            path: '',
            component: () => import('@/components/school/teacher-manage/teacher-list'),
          },
          {
            name: 'TeacherManageAdd',
            path: 'Add',
            component: () => import('@/components/school/teacher-manage/teacher-add'),
          },
          {
            name: 'TeacherManageDel',
            path: 'Del',
            component: () => import('@/components/school/teacher-manage/teacher-del'),
          },
          {
            name: 'TeacherManageMdf',
            path: 'Mdf',
            component: () => import('@/components/school/teacher-manage/teacher-mdf'),
          },
          {
            name: 'TeacherManageDetails',
            path: 'Details',
            component: () => import('@/components/school/teacher-manage/teacher-details'),
          },
        ]
      },
      { // 园长管理
        path: 'DirectorManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'DirectorManage',
            path: '',
            component: () => import('@/components/school/director-manage/director-list'),
          },
          {
            name: 'DirectorManageAdd',
            path: 'Add',
            component: () => import('@/components/school/director-manage/director-add'),
          },
          {
            name: 'DirectorManageDel',
            path: 'Del',
            component: () => import('@/components/school/director-manage/director-del'),
          },
          {
            name: 'DirectorManageMdf',
            path: 'Mdf',
            component: () => import('@/components/school/director-manage/director-mdf'),
          },
          {
            name: 'DirectorManageDetails',
            path: 'Details',
            component: () => import('@/components/school/director-manage/director-details'),
          },
        ]
      },
      { // 学生管理
        path: 'StudentManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'StudentManage',
            path: '',
            component: () => import('@/components/school/student-manage/student-list'),
          },
          {
            name: 'StudentManageAdd',
            path: 'Add',
            component: () => import('@/components/school/student-manage/student-add'),
          },
          {
            name: 'StudentManageDel',
            path: 'Del',
            component: () => import('@/components/school/student-manage/student-del'),
          },
          {
            name: 'StudentManageMdf',
            path: 'Mdf',
            component: () => import('@/components/school/student-manage/student-mdf'),
          },
          {
            name: 'StudentManageDetails',
            path: 'Details',
            component: () => import('@/components/school/student-manage/student-details'),
          },
        ]
      },
      { // 考勤时间管理
        path: 'AttendanceTimeManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'AttendanceTimeManage',
            path: '',
            component: () => import('@/components/school/attendance-time-manage'),
          },
          {
            name: 'AttendanceTimeManageDel',
            path: 'Del',
            component: () => import('@/components/school/attendance-time-manage/attendance-del.vue'),
          },
          {
            name: 'AttendanceTimeManageUpdate',
            path: 'Update',
            component: () => import('@/components/school/attendance-time-manage/attendance-update.vue'),
          },

        ]
      },
      { // 学生成绩管理
        path: 'ScoreManage',
        component: EmptyRouterView,
        children: [
          {
            name: 'ScoreManage',
            path: '',
            component: () => import('@/components/school/score-manage/score-archives'),
          },
          {
            name: 'ScoreManageModifyGradePop',
            path: 'ModifyGradePop',
            component: () => import('@/components/school/score-manage/modify-grade-pop'),
          },
          {
            name: 'ScoreManageResultsHome',
            path: 'ResultsHome',
            component: () => import('@/components/school/score-manage/results-home'),
          },
          {
            name: 'ScoreManageEcharts',
            path: 'Echarts',
            component: () => import('@/components/school/score-manage/echarts'),
          },
          {
            name: 'ScoreManageReviseScore',
            path: 'ReviseScore',
            component: () => import('@/components/school/score-manage/revise-score'),
          },
          {
            name: 'ScoreManageUnitManage',
            path: 'UnitManage',
            component: () => import('@/components/school/score-manage/unit-management'),
          },

        ]
      },
      { // 未到学生
        name: 'UnsignedStatistical',
        path: 'UnsignedStatistical',
        component: () => import('@/components/school/attendance-unsigned-statistical'),
      },
      { // 考勤报表
        name: 'AttendanceSheet',
        path: 'AttendanceSheet',
        component: () => import('@/components/school/attendance-sheet'),
      },
      { // 考勤统计
        name: 'AttendanceStatistics',
        path: 'AttendanceStatistics',
        component: () => import('@/components/school/attendance-statistics'),
      },
      { // 午休用餐
        path: 'Lunch',
        component: EmptyRouterView,
        children: [
          {
            name: 'Lunch',
            path: '',
            component: () => import('@/components/school/lunch/index/index.vue'),
            meta: {
              title: '午休与用餐',
            }
          },
          { // 详情
            name: 'LunchDetails',
            path: 'Details',
            component: () => import('@/components/school/lunch/details/index'),
            meta: {
              title: '详情',
            }
          },
          { // 学生详情
            name: 'LunchDetailsStudent',
            path: 'Details/Student',
            component: () => import('@/components/school/lunch/details/student-details'),
            meta: {
              title: '学生详情',
            }
          },

          { // 管理状态
            name: 'LunchStatusManage',
            path: 'StatusManage',
            component: () => import('@/components/school/lunch/status-manage'),
            meta: {
              title: '管理状态',
            }
          },
          { // 新增状态
            name: 'LunchStatusManageCreate',
            path: 'StatusManage/Create',
            component: () => import('@/components/school/lunch/status-manage/create'),
            meta: {
              title: '新增状态',
            }
          },
          { // 修改状态
            name: 'LunchStatusManageModify',
            path: 'StatusManage/Modify',
            component: () => import('@/components/school/lunch/status-manage/modify'),
            meta: {
              title: '修改状态',
            }
          },
        ]
      },
      { // 停服
        name: 'StopService',
        path: 'StopService',
        component: () => import('@/components/school/intelligent-charging/stop-service'),
      },
      { // 匠托管
        name: 'Trusteeship',
        path: 'Trusteeship',
        component: EmptyRouterView,
        children: [
          {
            name: 'TrusteeshipConsultation',
            path: 'Consultation',
            component: () => import('@/components/school/trusteeship/consultation'),
          },
          {
            name: 'TrusteeshipShareOfficial',
            path: 'ShareOfficial',
            component: () => import('@/components/school/trusteeship/share-official'),
          },
          {
            name: 'TrusteeshipEditPage',
            path: 'EditPage',
            component: () => import('@/components/school/trusteeship/editpage'),
          },
          {
            name: 'TrusteeshipOfficialWebsite',
            path: 'OfficialWebsite',
            component: () => import('@/components/school/trusteeship/official-website'),
          },

        ]
      },
      {//社区
        path: 'Community',
        component: EmptyRouterView,
        children: [
          {
            name: 'Community',
            path: '',
            component: () => import('@/components/school/community/community-index'),
          },
          {
            name: 'CommunityAudit',
            path: 'Audit',
            component: () => import('@/components/school/community/audit'),
          },
          {
            name: 'CommunityTypeManagement',
            path: "TypeManagement",
            component: () => import('@/components/school/community/type-management'),
          },
          {
            name: 'CommunityAddManagement',
            path: "AddManagement",
            component: () => import('@/components/school/community/add-community'),
          },
          {
            name: 'CommunityPermissionsManagement',
            path: '/PermissionsManagement',
            component: () => import('@/components/school/community/permissions-management'),
          },
          {
            name: 'CommunityMyCommunity',
            path: '/MyCommunity',
            component: () => import('@/components/teacher/interactive-community/my-community'),
          },
        ]
      },
      { // 月指数
        path: 'MonthlyIndex',
        component: EmptyRouterView,
        children: [
          {
            name: 'MonthlyIndex',
            path: '',
            component: () => import('@/components/school/monthly-index/monthly-index'),
          },
          {
            name: 'MonthlyIndexBriefing',
            path: 'Briefing',
            component: () => import('@/components/school/monthly-index/briefing'),
          },
        ]
      },
      { // 收费
        path: 'Charge',
        component: EmptyRouterView,
        children: [
          {
            name: 'Charge',
            path: '',
            component: () => import('@/components/school/intelligent-charging/index/index'),
            meta: {
              title: '收费名单',
            },
          },
          {
            name: 'ChargeFeedback',
            path: 'Feedback',
            component: () => import('@/components/school/intelligent-charging/feedback/index'),
            meta: {
              title: '提出异议',
            },
          },
          {
            name: 'ChargeFeedbackSubmit',
            path: 'Feedback/Submit',
            component: () => import('@/components/school/intelligent-charging/feedback/submit'),
            meta: {
              title: '确认提交异议',
            },
          },
          {
            name: 'ChargeConfirmBeforePay',
            path: 'Pay',
            component: () => import('@/components/school/intelligent-charging/pay/index'),
            meta: {
              title: '确认付费',
            },
          },
        ]
      },
      { // 红花
        name: 'Safflower',
        path: 'Safflower',
        component: EmptyRouterView,
        children: [
          {
            name: 'SafflowerScore',
            path: 'Score',
            component: () => import('@/components/school/flower-management/safflower-score'),
          },
          {
            name: 'SafflowerMechanism',
            path: 'Mechanism',
            component: () => import('@/components/school/flower-management/safflower-mechanism'),
          },
          {
            name: 'SafflowerEvaluationManagement',
            path: 'EvaluationManagement',
            component: () => import('@/components/school/flower-management/evaluation-management'),
          },
          {
            name: 'SafflowerCommentaryTypes',
            path: 'CommentaryTypes',
            component: () => import('@/components/school/flower-management/commentary-types'),
          },
          {
            name: 'SafflowerShare',
            path: 'Share',
            component: () => import('@/components/school/flower-management/safflower-share'),
          },
          {
            name: 'SafflowerCommentLibrary',
            path: 'CommentLibrary',
            component: () => import('@/components/school/flower-management/comment-library'),
          },
          {
            name:'SafflowerFlowerArchives',
            path:'FlowerArchives',
            component:() => import('@/components/school/flower-management/flower-archives')
          },
          {
            name:'SafflowerArchivesDetail',
            path:'ArchivesDetail',
            component:() => import('@/components/school/flower-management/archives-detail')
          },
          {
            name:'SafflowerFlowerInitialValue',
            path:'FlowerInitialValue',
            component:() => import('@/components/school/flower-management/flower-initial-value')
          },
          {
            name:'SafflowerFlowerMall',
            path:'FlowerMall',
            component:() => import('@/components/school/flower-mall/flower-mall')
          },
          {//todo 红花兑奖区 需要移除 在园长端不存在
            name:'SafflowerFlowerPrizeArea',
            path:'FlowerPrizeArea',
            component:() => import('@/components/school/flower-mall/flower-prize-area')
          },
          {
            name:'SafflowerPrizeManagement',
            path:'PrizeManagement',
            component:() => import('@/components/school/flower-mall/prize-management')
          },
          {
            name:'SafflowerTicketRecord',
            path:'TicketRecord',
            component:() => import('@/components/school/flower-mall/ticket-record')
          },
          {
            name:'SafflowerAddGift',
            path:'AddGift',
            component:() => import('@/components/school/flower-mall/add-gift')
          },
          {
            name:'SafflowerModifyGift',
            path:'ModifyGift',
            component:() => import('@/components/school/flower-mall/modify-gift')
          },
          {
            name:'SafflowerFlowerReset',
            path:'FlowerReset',
            component:() => import('@/components/school/flower-mall/flower-reset')
          }
        ]
      },
    ]
  },

]
