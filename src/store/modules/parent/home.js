import { getHomepageData, getEducationPageData, getMyPageData } from '@/api/parent/home'
import homeModule from '@/utils/store-module-home-generate'

const restAsyncPageDataFetchMethods = [
  {
    target: 'ParentHomeIndex',
    getterName: 'getParentHomeIndexData',
  },
  {
    target: 'ParentHomeEducation',
    fetchMethod: getEducationPageData,
    actionName: 'fetchEducationPageData',
    getterName: 'getParentHomeEducationData',
  },
  {
    target: 'ParentHomeMy',
    fetchMethod: getMyPageData,
    actionName: 'fetchMyPageData',
    getterName: 'getParentHomeMyData',
  },
]

const home = new homeModule(getHomepageData, restAsyncPageDataFetchMethods)

export default home
