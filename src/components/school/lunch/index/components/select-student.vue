<template>
  <div class="lunch_select_student bgfff">

    <more-tabs class="scrollable" v-model="tabIndex" :list="tabList" :badge_list="tabBadgeList"/>

    <student-paginate
      v-for="(studentList, index) in studentList2dArray"
      :key="index"
      :index="index"
      v-show="tabIndex === index"
      :show="tabIndex === index"
      :student-list="studentList" />

  </div>
</template>
<script>
import moreTabs from '@/components/common/more-tabs.vue'
import studentPaginate from './student-paginate.vue'

const tabBadgeDotConfig = {
  style: {
    'width': '8px',
    'height': '8px',
    'display': 'block',
    'background': '#999',
    'position': 'absolute',
    'right': '-5px',
    'top': '8px',
    'border-radius': '50%',
    'border': '1px solid #666',
  },
  text: '',
}

export default {
  name: 'lunch_select_student',
  data() {
    return {
      tabIndex: 0,
      tabBadgeList: [],
    }
  },
  components: {
    moreTabs,
    studentPaginate,
  },
  computed: {
    tabList() {
      return this.$store.state.lunch.classNameList
    },
    selectedStudentNumber() {
      return this.$store.getters['lunch/selectedStudentNumber']
    },
    studentList2dArray() {
      return this.$store.state.lunch.studentList2dArray
    },
  },
  watch: {
    selectedStudentNumber() {
      let selectedClassIdList = this.$store.getters['lunch/selectedClassIdList']
      this.tabBadgeList = this.$store.state.lunch.classIdList.map(clsId => {
        return selectedClassIdList.includes(clsId) ? tabBadgeDotConfig : undefined
      })
    },
  },
}
</script>
<style scoped lang="less">
.lunch_select_student * {
  box-sizing: border-box;
}
.lunch_select_student {
  height: 100%;
  padding-bottom: 44px;
  box-sizing: border-box;
}
</style>
