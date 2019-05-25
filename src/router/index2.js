import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
//家长端首页
import ParentsIndex from '@/components/parents/index'
import ParentsMain from '@/components/parents/parents'
import ParentsHabit from '@/components/parents/habit'
import ParentsEducation from '@/components/parents/education'
import ParentsPersonCenter from '@/components/parents/person-center'
import FocusDegree from '@/components/parents/focus-degree'
//家长端 互动社区
import ParentsCommunity from '@/components/parent/community'
//校园角色
import SchoolDetail from '@/components/school/class-manage/school-class-detail'
import SchoolDetailBox from '@/components/school/class-manage/class-detail-box'
import UnsignedStatistical from '@/components/school/unsign-statistical'
import AttendanceTime from '@/components/school/attendance-manage'
import Attendancesheet from '@/components/school/attendance-sheet'
import ReplaceTeacher from '@/components/school/class-manage/replace-teacher'
import ClassManageDel from '@/components/school/class-manage/class-manage-del'
import ClassManagePopups from '@/components/school/class-manage/class-manage-popups'
import AttendanceUpdate from '@/components/school/attendance-time-manage/attendance-update'
import AttendanceDel from '@/components/school/attendance-time-manage/attendance-del'
import AssociatedStudent from '@/components/school/class-manage/associated-student'
import AttendanceStatistics from '@/components/school/attendance-statistics'
//校园角色 社区
import PermissionsManagement from '@/components/school/community/permissions-management'
import Audit from '@/components/school/community/audit'
import SchooleCommunityIndex from '@/components/school/community/community-index'
import SchooleTypeManagement from '@/components/school/community/type-management'
import SchoolAddManagement from '@/components/school/community/add-community'
//红花评分
import SafflowerScore from '@/components/school/flower-management/safflower-score'
import SafflowerMechanism from '@/components/school/flower-management/safflower-mechanism'
import EvaluationManagement from '@/components/school/flower-management/evaluation-management'
import CommentaryTypes from '@/components/school/flower-management/commentary-types'
import SafflowerShare from '@/components/school/flower-management/safflower-share'
import CommentLibrary from '@/components/school/flower-management/comment-library'
//智能收费
import ChargeList from '@/components/school/intelligent-charging/charge-list'
import ChargeConfirmation from '@/components/school/intelligent-charging/charge-confirmation'
import DissentObjection from '@/components/school/intelligent-charging/dissent-objection'
import StopService from '@/components/school/intelligent-charging/stop-service'
//园长管理
import SchoolRoleList from '@/components/school/director-manage/director-list'
import SchoolRoleAdd from '@/components/school/director-manage/director-add'
import SchoolRoleDel from '@/components/school/director-manage/director-del'
import SchoolRoleMdf from '@/components/school/director-manage/director-mdf'
import SchoolRoleDetails from '@/components/school/director-manage/director-details'
//教师管理
import ClassDirectorList from '@/components/school/teacher-manage/teacher-list'
import ClassDirectorAdd from '@/components/school/teacher-manage/teacher-add'
import ClassDirectorDel from '@/components/school/teacher-manage/teacher-del'
import ClassDirectorMdf from '@/components/school/teacher-manage/teacher-mdf'
import ClassDirectorDetails from '@/components/school/teacher-manage/teacher-details'
//学生管理
import StudentList from '@/components/school/student-manage/student-list'
import StudentAdd from '@/components/school/student-manage/student-add'
import StudentDel from '@/components/school/student-manage/student-del'
import StudentMdf from '@/components/school/student-manage/student-mdf'
import StudentDetails from '@/components/school/student-manage/student-details'
//教师端首页
import TeachersIndex from '@/components/teachers/index'
import TeachersMain from '@/components/teachers/teachers'
import TeachersSearch from '@/components/teachers/Search'
import TeachersWorkbench from '@/components/teachers/Workbench'
import TeachersAchievement from '@/components/teacher/achievement'
import Teachersmine from '@/components/teachers/mine'
// 教师端 社区
import AddCommunity from '@/components/teacher/interactive-community/add-community'
import WaitAudit from '@/components/teacher/interactive-community/wait-audit'
import CommunityIndex from '@/components/teacher/interactive-community/community-index'
import MyCommunity from '@/components/teacher/interactive-community/my-community'
import ReadDetail from '@/components/teacher/interactive-community/read-detail'
import ModifyCommunity from '@/components/teacher/interactive-community/modify-community'
//作业完成通知
import Face from '@/components/homework/face'
import Wxface from '@/components/homework/wxface'
import Parentsface from '@/components/parent/homework'
import Teacher_hw from '@/components/teacher/homework'
import Teacher_unread from '@/components/teacher/homework/unread'
import Teachercomment from '@/components/teacher/homework/comment'
//午休用餐页面
import Administration from '@/components/school/lunch/administration'
import ChangeAdmin from '@/components/school/lunch/change-administration'
import NoonbreakMeals from '@/components/parent/lunch'
import SeNoonbreakMeals from '@/components/school/lunch/se-lunch-break-meals'
//微官网
import Homeoage from '@/components/parent/trusteeship/homepage'
import Officialwebsite from '@/components/school/trusteeship/official-website'
import Editpage from '@/components/school/trusteeship/editpage'
import Share from '@/components/school/trusteeship/share-official'
import Consultation from '@/components/school/trusteeship/consultation'

// import changeaccout from '@/components/teachers/changeaccout'
//红花排行榜-总排行
import Ranking from '@/components/parent/safflower/ranking'
//月指数页面
import Monthlyindex from '@/components/school/monthly-index/monthly-index'
import Briefing from '@/components/school/monthly-index/briefing'
//新师路角色
import DataStatistics from '@/components/new-concept/data-statistics'

Vue.use(Router);
// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.commit('setToken', localStorage.getItem('token'))
}
const router = new Router({
  // mode: 'history',
  routes: [
    // {
    //         path: '*',
    //         redirect:'/Teachers/TeachersMain',
    // 	meta: { requireAuth: true, }
    //     },
    // 	{
    //         path: '/Teachers/TeachersMain',
    //         component: TeachersMain,
    //         redirect: '/Teachers/TeachersIndex',
    //         name: '教师端首页',
    //         children:[
    //             {
    //                 path: '/Teachers/TeachersIndex',
    //                 component: TeachersIndex,
    //                 name: '教师端首页',
    //                 meta: {
    //                     keepAlive: true
    //                 },
    //             },
    //             {
    //                 path: '/Teachers/TeachersWorkbench',
    //                 component: TeachersWorkbench,
    //                 name: '教师端工作台',
    //                 meta: {
    //                   keepAlive: true
    //                 },
    //             },
    //              {
    //                 path: '/Teachers/TeachersSearch',
    //                 component: TeachersSearch,
    //                 name: '教师端查找',
    //                  meta: {
    //                    keepAlive: true
    //                  },
    //             },
    //             {
    //                 path: '/Teachers/Teachersmine',
    //                 component: Teachersmine,
    //                 name: '教师端我的',
    //                 meta: {
    //                   keepAlive: true
    //                 },
    //             }
    //         ]
    //     },
    //   {
    //     path: '/Teachers/TeachersAchievement',
    //     component: TeachersAchievement,
    //     name: '教师端成就'
    //   },
    //   {
    //     path: '/Teachers/changeaccout',
    //     component: changeaccout,
    //     name: '教师端首页',
    //     meta: {
    //       keepAlive: true
    //     },
    //   },

    // {
    //     path: '/Parents',
    //     component: ParentsMain,
    //     redirect: '/Parents/ParentsIndex',
    //     name: '家长首页',
    //     children:[
    //         {
    //             path: '/Parents/ParentsIndex',
    //             component: ParentsIndex,
    //             name: '家长端首页'
    //         },
    //       {
    //         path:'/ParentsCommunity',
    //         component:ParentsCommunity,
    //         name:"ParentsCommunity"
    //
    //       },
    //         {
    //             path: '/Parents/ParentsHabit',
    //             component: ParentsHabit,
    //             name: '家长端习惯页'
    //         },
    //         {
    //             path: '/Parents/ParentsEducation',
    //             component: ParentsEducation,
    //             name: '家长端教育页'
    //         },
    //         {
    //             path: '/Parents/ParentsPersonCenter',
    //             component: ParentsPersonCenter,
    //             name: '家长端我的页'
    //         }
    //     ]
    // },
    // {
    //     path:'/FocusDegree',
    //     component:FocusDegree,
    //     name:'关注程度详情'
    // },
    // {
    //     path:'/SchoolDetail',
    //     component:SchoolDetail,
    //     name:'SchoolDetail'
    // },
    // {
    //     path:'/SchoolDetailBox',
    //     component:SchoolDetailBox,
    //     name:'SchoolDetailBox'
    // },
    // {
    //     path:'/UnsignedStatistical',
    //     component:UnsignedStatistical,
    //     name:'校园角色-考勤功能-未到考勤统计'
    // },
    // {
    //     path: '/Attendancesheet',
    //     component: Attendancesheet,
    //     name: 'Attendancesheet'
    // },
    // {
    //     path:'/AttendanceTime',
    //     component:AttendanceTime,
    //     name:'校园角色-考勤类型与时间'
    // },
    // {
    //     path:'/AttendanceUpdate',
    //     component:AttendanceUpdate,
    //     name:'AttendanceUpdate'
    // },
    // {
    //     path:'/AttendanceDel',
    //     component:AttendanceDel,
    //     name:'AttendanceDel'
    // },
    // {
    //     path: '/ClassManage',
    //     component: ClassManage,
    //     name: 'ClassManage'
    // },
    // {
    //     path:'/ReplaceTeacher',
    //     component:ReplaceTeacher,
    //     name:'ReplaceTeacher'
    // },
    // {
    //   path:'/ClassManageDel',
    //   component:ClassManageDel,
    //   name:'ClassManageDel'
    // },
    // {
    //     path: '/ClassManagePopups',
    //     component: ClassManagePopups,
    //     name: 'ClassManagePopups'
    // },
    // {
    //     path:'/AssociatedStudent',
    //     component:AssociatedStudent,
    //     name:'AssociatedStudent'
    // },
    // {
    //   path: '/PermissionsManagement',
    //   component: PermissionsManagement,
    //   name: 'PermissionsManagement',
    // },
    // {
    //   path: "/AddCommunity",
    //   component: AddCommunity,
    //   name: 'AddCommunity',
    // },
    // {
    //   path: "/WaitAudit",
    //   component: WaitAudit,
    //   name: 'WaitAudit',
    // },
    // {
    //      path:"/CommunityIndex",
    //      component:CommunityIndex,
    //      name:'CommunityIndex'
    // },
    // {
    //   path: "/MyCommunity",
    //   component: MyCommunity,
    //   name: 'MyCommunity',
    // },
    // {
    //   path: "/ReadDetail",
    //   component: ReadDetail,
    //   name: 'ReadDetail',
    // },
    // {
    //   path: "/ModifyCommunity",
    //   component: ModifyCommunity,
    //   name: 'ModifyCommunity',
    // },
    // {
    //   path: '/Audit',
    //   component: Audit,
    //   name: 'Audit',
    // },
    // {
    //   path: "/SchooleCommunityIndex",
    //   component: SchooleCommunityIndex,
    //   name: 'SchooleCommunityIndex',
    // },
    // {
    //   path: "/SchooleTypeManagement",
    //   component: SchooleTypeManagement,
    //   name: 'SchooleTypeManagement',
    // },
    // {
    //   path: "/SchoolAddManagement",
    //   component: SchoolAddManagement,
    //   name: 'SchoolAddManagement',
    // },
    // {
    //   path: '/AttendanceStatistics',
    //   component: AttendanceStatistics,
    //   name: "AttendanceStatistics",
    // },
    // {
    //   path: '/SafflowerScore',
    //   component: SafflowerScore,
    //   name: "SafflowerScore",
    //
    // },
    // {
    //   path: '/SafflowerMechanism',
    //   component: SafflowerMechanism,
    //   name: "SafflowerMechanism",
    // },
    // {
    //   path: '/EvaluationManagement',
    //   component: EvaluationManagement,
    //   name: "EvaluationManagement",
    // },
    // {
    //   path: '/CommentaryTypes',
    //   component: CommentaryTypes,
    //   name: "CommentaryTypes",
    // },
    // {
    //   path: '/ChargeList',
    //   component: ChargeList,
    //   name: "ChargeList",
    // },
    // {
    //   path: '/ChargeConfirmation',
    //   component: ChargeConfirmation,
    //   name: "ChargeConfirmation",
    // },
    // {
    //   path: '/DissentObjection',
    //   component: DissentObjection,
    //   name: "DissentObjection",
    // },
    // {
    //   path: '/SafflowerShare',
    //   component: SafflowerShare,
    //   name: "SafflowerShare",
    // },
    // {
    //   path: '/CommentLibrary',
    //   component: CommentLibrary,
    //   name: 'CommentLibrary',
    // },
    // {
    //   path: '/Lunch/Administration',
    //   component: Administration,
    //   name: '午休用餐-状态',
    // },
    // {
    //   path: '/Homework/Face',
    //   component: Face,
    //   name: '作业通知-导航',
    // },
    // {
    //   path: '/Homework/WxFace',
    //   component: Wxface,
    //   name: '作业通知-WX端口首页入口',
    // },
    // {
    //   path: '/Homework/Parentsface',
    //   component: Parentsface,
    //   name: '作业通知-家长端-首页',
    // },
    // {
    //   path: '/Homework/Teacher_hw',
    //   component: Teacher_hw,
    //   name: '作业通知-教师端&园长端-作业完成通知',
    // },
    // {
    //   path: '/Homework/Teacher_unread',
    //   component: Teacher_unread,
    //   name: '作业通知-教师端&园长端-详情未阅',
    // },
    // {
    //   path: '/Homework/Teachercomment',
    //   component: Teachercomment,
    //   name: '作业通知-教师端&园长端-评语管理',
    // },
    // {
    //   path: '/modify-grade-pop',
    //   name: '/modify-grade-pop',
    //   component: () => import('@/components/school/score-manage/modify-grade-pop'),
    // },
    // {
    //   path: '/results-home',
    //   component: () => import('@/components/school/score-manage/results-home'),
    // },
    // {
    //   path: '/echarts',
    //   component: () => import('@/components/school/score-manage/echarts'),
    // },
    // {
    //   path: '/score-archives',
    //   component: () => import('@/components/school/score-manage/score-archives'),
    // },
    // {
    //   path: '/revise-score',
    //   component: () => import('@/components/school/score-manage/revise-score'),
    // },
    // {
    //   path: '/unit-management',
    //   component: () => import('@/components/school/score-manage/unit-management'),
    // },
    // {
    //   path: '/SchoolRoleList',
    //   component: SchoolRoleList,
    //   name: 'SchoolRoleList'
    // },
    // {
    //   path: '/SchoolRoleAdd',
    //   component: SchoolRoleAdd,
    //   name: 'SchoolRoleAdd'
    // },
    // {
    //   path: '/SchoolRoleDel',
    //   component: SchoolRoleDel,
    //   name: 'SchoolRoleDel'
    // },
    // {
    //   path: '/SchoolRoleMdf',
    //   component: SchoolRoleMdf,
    //   name: 'SchoolRoleMdf'
    // },
    // {
    //   path: '/SchoolRoleDetails',
    //   component: SchoolRoleDetails,
    //   name: 'SchoolRoleDetails'
    // },
    // {
    //   path: '/ClassDirectorList',
    //   component: ClassDirectorList,
    //   name: 'ClassDirectorList'
    // },
    // {
    //   path: '/ClassDirectorAdd',
    //   component: ClassDirectorAdd,
    //   name: 'ClassDirectorAdd'
    // },
    // {
    //   path: '/ClassDirectorDel',
    //   component: ClassDirectorDel,
    //   name: 'ClassDirectorDel'
    // },
    // {
    //   path: '/ClassDirectorMdf',
    //   component: ClassDirectorMdf,
    //   name: 'ClassDirectorMdf'
    // },
    // {
    //   path: '/ClassDirectorDetails',
    //   component: ClassDirectorDetails,
    //   name: 'ClassDirectorDetails'
    // },
    // {
    //   path: '/StudentDetails',
    //   component: StudentDetails,
    //   name: 'StudentDetails'
    // },
    // {
    //   path: '/StudentList',
    //   component: StudentList,
    //   name: 'StudentList'
    // },
    // {
    //   path: '/StudentAdd',
    //   component: StudentAdd,
    //   name: 'StudentAdd'
    // },
    // {
    //   path: '/StudentDel',
    //   component: StudentDel,
    //   name: 'StudentDel'
    // },
    // {
    //   path: '/StudentMdf',
    //   component: StudentMdf,
    //   name: 'StudentMdf'
    // },
    // {
    //   path: '/StudentDetails',
    //   component: StudentDetails,
    //   name: 'StudentDetails'
    // },
    // {
    //   path: '/StopService',
    //   component: StopService,
    //   name: "StopService",
    // },
    // {
    //   path: '/Lunch/ChangeAdmin',
    //   component: ChangeAdmin,
    //   name: '午休用餐-状态 弹窗',
    // },
    // {
    //   path: '/Lunch/NoonbreakMeals',
    //   component: NoonbreakMeals,
    //   name: '午休用餐-午休与用餐',
    // },
    // {
    //   path: '/Lunch/SeNoonbreakMeals',
    //   component: SeNoonbreakMeals,
    //   name: '午休用餐-午休与用餐1',
    // },
    // {
    //   path: '/Trusteeship/Consultation',
    //   component: Consultation,
    //   name: '咨询列表',
    // },
    // {
    //   path: '/Trusteeship/Shareofficial',
    //   component: Share,
    //   name: '匠托管-分享页面',
    // },
    // {
    //   path: '/Trusteeship/Editpage',
    //   component: Editpage,
    //   name: '匠托管-编辑页面',
    // },
    // {
    //   path: '/Trusteeship/Officialwebsite',
    //   component: Officialwebsite,
    //   name: '匠托管-微官网',
    // },
    // {
    //   path: '/Trusteeship/Homeoage',
    //   component: Homeoage,
    //   name: '匠托管-找托管家长-首页',
    // },
    // {
    //   path: 'safflower/Ranking',
    //   component: Ranking,
    //   name: '红花排行榜-总排行',
    // },
    // {
    //   path: 'Monthlyindex/Monthlyindex',
    //   component: Monthlyindex,
    //   name: '月总指数',
    // },
    // {
    //   path: 'Monthlyindex/Briefing',
    //   component: Briefing,
    //   name: '教师统计详情',
    // },
    // {
    //   path: '/Newconcept/Data-statistics',
    //   component: DataStatistics,
    //   name: '新师路角色',
    // },
  ],

});
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {//如果 token 不存在
      //调用接口获取 用户名 和 密码  然后 在调用登录接口 获取token
      let getIndexInfo = (username, password) => {
        this.axios.get(`/api/login?username=${username}&password=${password}`).then((response) => {
          store.commit('setToken', response.headers.authorization);//保存token
          if (store.state.token) {
            this.$router.push(this.$route.path)
          }
        })
      };
      getIndexInfo('teacher', '123456');
    }
  } else {
    next();
  }

});
export default router
