<template>
  <div class="lunch">
    <div class="header">
      <nav-bar
        :title="$route.meta.title"
        left-text="返回"
        left-arrow
        @click-left="$router.back()">
        <div class="nav-bar-right-slot" slot="right">
          <router-link class="link" :to="{ name: 'LunchDetails' }">详情</router-link>
          <router-link class="link" :to="{ name: 'LunchStatusManage' }">状态管理</router-link>
        </div>
      </nav-bar>
    </div>

    <tabs
      class="header2"
      :value="currentAction"
      type="card"
      color="#3770fb"
      title-active-color="#fff"
      title-inactive-color="#666"
      @change="$store.commit('lunch/action', $event)">
      <tab title="午休表现"/>
      <tab title="用餐情况"/>
    </tabs>

    <template v-if="isDataReady">

      <div class="area">
        <select-student />
        <select-comment v-show="currentAction === 0" :action="0" ref="comment-picker-0"/>
        <select-comment v-show="currentAction === 1" :action="1" ref="comment-picker-1"/>
      </div>

    </template>

  </div>
</template>

<script>
import { addTouchDirectionEvent, removeTouchDirectionEvent } from '@/utils/touch-event'
import { NavBar, Tabs, Tab } from 'vant'
import selectStudent from './components/select-student.vue'
import selectComment from './components/select-comment.vue'
import { getSiestaStudentList } from '@/api/school/lunch'

export default {
  name: 'lunch',
  data() {
    return {
      touchEventHandle: undefined,
      isDataReady: false
    }
  },
  components: {
    NavBar,
    Tabs,
    Tab,
    selectStudent,
    selectComment,
  },
  computed: {
    currentAction() {
      return this.$store.getters['lunch/currentAction']
    },
  },
  mounted() {
    this.fetchData()
    this.initTouchEvent()
  },
  methods: {
    fetchData() {
      this.$loading();
      getSiestaStudentList()
        .then(response => {
          if (response.data.meta.success) {
            this.$store.commit('lunch/setStudentData', response.data.data)
            this.$store.commit('lunch/resetAll')
            this.isDataReady = true
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    initTouchEvent() {
      let el = this.$el
      if (this.touchEventHandle !== undefined) {
        removeTouchDirectionEvent(el, this.touchEventHandle)
      }
      let getHandle = () => {
        return this.currentAction === 0 ? this.$refs['comment-picker-0'] : this.$refs['comment-picker-1']
      }
      let expand = () => {
        getHandle().expand()
      }
      let shrink = () => {
        getHandle().shrink()
      }

      this.touchEventHandle = addTouchDirectionEvent(el, {
        preventMove: true,
        top: expand,
        bottom: shrink,
      })
    },
  },
}
</script>

<style scoped lang="less">
.lunch * {
  box-sizing: border-box;
}
.lunch {
  height: 100vh;
  position: relative;
  padding-top: 1rem;
  background: #fff;
  box-sizing: border-box;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  background: #f2f2f2;

  .van-nav-bar__right {
    height: 100%;
  }

  .nav-bar-right-slot {
    display: flex;
    line-height: 1;
    height: 100%;

    .link {
      margin-right: 0.1rem;
      color: #fff;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .link:last-child {
      margin-right: 0;
    }
  }
}

.header2 {
  position: fixed;
  top: .53rem;
  width: 100%;
  z-index: 4;
  margin: .1rem 0;
}

.area {
  height: 100%;
  position: relative;
  z-index: 4;
}

</style>
