<template>
  <div class="student_paginate bgfff">
    <p class="top">
      <van-row type="flex" justify="center" align="center">
        <van-col span="8" class="left">
          <van-icon class="icon" :name="!$store.state.lunch.isShowGradeName ? 'closed-eye' : 'eye-o'" />
          <span @click="$store.commit('lunch/toggleShowGrade')">{{ $store.state.lunch.isShowGradeName ? '隐藏年级' : '显示年级' }}</span>
        </van-col>
        <van-col span="16">
          <van-button class="button selectAllStudent" :class="{ active: isAllStudentSelected }" type="primary" @click="selectAllStudent">
            一键选中本年级全部学生
          </van-button>
        </van-col>
      </van-row>
    </p>

    <no-data v-if="isEmpty(studentList)"/>

    <div
      class="pages"
      ref="pages"
      :style="{ width: `${pageCount + 1}00vw`, transform: `translate(-${currPage-1}00vw)` }"
      @click="selectStudent">
      <div class="page" v-for="(page, index1) in renderArray" :key="index1">
        <span class="item" v-for="(item, index2) in page" :key="index2">
          <button
            class="button"
            :class="{ active: selectedStudentIdList.includes(item.stuId) }"
            :data-student_id="item.stuId">
            <span>{{ item.stuName }}</span>
            <span v-show="$store.state.lunch.isShowGradeName">{{ item.gradeName }}</span>
            <span
              v-if="currentAction === 0 && item.isSiesta > 0 || currentAction === 1 && item.isDining > 0"
              class="badge" ></span>
          </button>
        </span>
      </div>
    </div>

    <p :style="{ opacity: pageCount > 1 ? 1 : 0 }" class="bottom">
      <span :style="{ opacity: currPage > 1 ? 1 : 0 }" class="color999">&lt;&lt;向左滑动</span>
      <span>{{ currPage }}/{{ pageCount }}</span>
      <span :style="{ opacity: currPage < pageCount ? 1 : 0 }" class="color999">向右滑动&gt;&gt;</span>
    </p>
  </div>
</template>
<script>
import { isEmpty } from '@/utils'
import { addTouchDirectionEvent, removeTouchDirectionEvent } from '@/utils/touch-event'
import { Row, Col, Button, Icon } from 'vant'
import noData from '@/components/common/no-data.vue'

export default {
  name: 'lunch_student_paginate',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: false,
    },
    studentList: {
      type: Array,
      default: () => [],
    },

  },
  data() {
    return {
      isInit: false,
      currPage: 1,
      pageCount: 1,
      itemPrePage: 18,
      renderArray: [],

      touchEventHandle: undefined,
    }
  },
  components: {
    noData,
    vanRow: Row,
    vanCol: Col,
    vanButton: Button,
    vanIcon: Icon,
  },
  computed: {
    selectedStudentIdList() {
      return this.$store.getters['lunch/selectedStudentIdList']
    },
    isAllStudentSelected() {
      return this.studentList.every(student => this.selectedStudentIdList.includes(student.stuId))
    },
    currentAction() {
      return this.$store.getters['lunch/currentAction']
    },
  },
  watch: {
    show() {
      this.init()
    },
    studentList() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.show || this.isInit) {
        return
      }
      this.isInit = true

      this.currPage = 1
      this.pageCount = 1
      this.renderArray = []
      this.initItemPrePage()
      this.initData(this.studentList)
    },
    initItemPrePage() {
      if (
        typeof this.$store.state.lunch.studentPaginateItemPrePage === 'number' &&
        this.$store.state.lunch.studentPaginateItemPrePage > 0
      ) {
        this.itemPrePage = this.$store.state.lunch.studentPaginateItemPrePage
        return
      }
      let el = this.$refs['pages']
      let d1 = el.scrollHeight
      let d2 = window.rem * 0.6 // 0.6 是每个按钮的高度
      if (d1 <= 0 || d2 <= 0) {
        return
      }
      this.itemPrePage = 3 * Math.floor(d1 / d2) // 3是每行3个按钮; Math.floor(d1 / d2) 是总共多少行
      this.$store.commit('lunch/setStudentPaginateItemPrePage', this.itemPrePage)
    },
    initData(studentList) {
      if (this.renderArray.length > 0) {
        return
      }
      let renderArray = []
      let itemPrePage = this.itemPrePage <= 0 ? 18 : this.itemPrePage
      let pageCount = Math.ceil(studentList.length / itemPrePage)
      for (let i = 0; i < pageCount; i++) {
        renderArray.push(studentList.slice(i * itemPrePage, (i + 1) * itemPrePage))
      }

      this.pageCount = renderArray.length
      this.renderArray = renderArray
      this.initTouchEvent()
    },
    initTouchEvent() {
      if (this.pageCount <= 1) {
        return
      }
      let el = this.$refs['pages']
      if (this.touch_event_handle !== undefined) {
        removeTouchDirectionEvent(el, this.touch_event_handle)
      }
      this.touch_event_handle = addTouchDirectionEvent(el, {
        left: this.nextPage,
        right: this.prevPage,
      })
    },
    prevPage() {
      if (this.currPage > 1) {
        this.currPage -= 1
      } else {
        this.currPage = 1
      }
    },
    nextPage() {
      if (this.currPage < this.pageCount) {
        this.currPage += 1
      } else {
        this.currPage = this.pageCount
      }
    },
    selectAllStudent() {
      if (!this.isAllStudentSelected) {
        this.$store.commit('lunch/selectAllStudent', this.index)
      } else {
        this.$store.commit('lunch/uncheckAllStudent', this.index)
      }
    },
    selectStudent(event) {
      let target = event.target
      if (target.nodeName.toLowerCase() !== 'button') {
        if (target.parentNode.nodeName.toLowerCase() === 'button') {
          target = target.parentNode
        } else {
          return
        }
      }

      const stuId = parseInt(target.dataset['student_id'])
      if (isEmpty(stuId)) {
        this.$toast('发生异常, 学生ID为空')
      }
      if (!this.selectedStudentIdList.includes(stuId)) {
        this.$store.commit('lunch/selectStudent', [this.index, stuId])
      } else {
        this.$store.commit('lunch/uncheckedStudent', stuId)
      }
    }
  },
}
</script>
<style scoped lang="less">
.student_paginate * {
  box-sizing: border-box;
}
.student_paginate {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: .4rem; // switcher3 的高度
  font-size: .16rem;
}

.button {
  border-radius: 4px;
  text-align: center;
  position: relative;
  color: #666;
  border: 1px solid #999;
  background: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: .3rem;

  & > span {
    display: block;
  }
  &.selectAllStudent {
    padding: 0 .16rem;
    line-height: .32rem;
    height: .32rem;
  }

  &.active {
    color: #fff;
    background: #3770fb;
    border: 1px solid #3770fb;
  }

  .badge {
    background: #f66;
    font-size: 80%;
    position: absolute;
    border-radius: 4px;
    top: 0;
    right: 0;
    min-width: 8px;
    min-height: 8px;
    padding: 2px 0;
  }
}

.pages {
  transition: .6s;
  min-width: 100vw;
  flex-grow: 1;

  .page {
    width: 100vw;
    height: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;

    .item {
      width: 33.3%;
      /*padding: .08rem .08rem;*/
      display: inline-flex;
      justify-content: center;
      align-items: center;
      max-height: .8rem;
      height: .6rem;

      .button {
        width: 100%;
        margin: .08rem;
      }
    }
  }
}

.top {
  text-align: center;
  margin: .08rem 0;
  flex-shrink: 0;

  .left {
    border-right: 1px solid #eee;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #666;

    .icon {
      font-size: 150%;
      color: #3770fb;
    }
  }
}

.bottom {
  font-size: 80%;
  text-align: center;
  flex-shrink: 0;

  span {
    margin: 0 .1rem;
  }
}
</style>
