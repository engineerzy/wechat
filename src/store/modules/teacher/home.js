import { getHomepageData, getWorkbenchPageData, getSearchPageData, getMyPageData } from '@/api/teacher/home'
import homeModule from '@/utils/store-module-home-generate'

const restAsyncPageDataFetchMethods = [
  {
    target: 'TeacherHomeIndex',
    getterName: 'getTeacherHomeIndexData',
  },
  {
    target: 'TeacherHomeWorkbench',
    fetchMethod: getWorkbenchPageData,
    actionName: 'fetchWorkbenchPageData',
    getterName: 'getTeacherHomeWorkbenchData',
  },
  {
    target: 'TeacherHomeSearch',
    fetchMethod: getSearchPageData,
    actionName: 'fetchSearchPageData',
    getterName: 'getTeacherHomeSearchData',
  },
  {
    target: 'TeacherHomeMy',
    fetchMethod: getMyPageData,
    actionName: 'fetchMyPageData',
    getterName: 'getTeacherHomeMyData',
  },
]

const home = new homeModule(getHomepageData, restAsyncPageDataFetchMethods)

export default home
