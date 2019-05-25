import { getHomepageData, getWorkbenchPageData, getSearchPageData, getMyPageData } from '@/api/school/home'
import homeModule from '@/utils/store-module-home-generate'

const restAsyncPageDataFetchMethods = [
  {
    target: 'SchoolHomeIndex',
    getterName: 'getSchoolHomeIndexData',
  },
  {
    target: 'SchoolHomeWorkbench',
    fetchMethod: getWorkbenchPageData,
    actionName: 'fetchWorkbenchPageData',
    getterName: 'getSchoolHomeWorkbenchData',
  },
  {
    target: 'SchoolHomeSearch',
    fetchMethod: getSearchPageData,
    actionName: 'fetchSearchPageData',
    getterName: 'getSchoolHomeSearchData',
  },
  {
    target: 'SchoolHomeMy',
    fetchMethod: getMyPageData,
    actionName: 'fetchMyPageData',
    getterName: 'getSchoolHomeMyData',
  },
]

const home = new homeModule(getHomepageData, restAsyncPageDataFetchMethods)

export default home
