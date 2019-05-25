<template>
  <div class="lunch_select_comment" :style="{ top }"
       :class="[ action === 0 ? 'action_0' : 'action_1', isShow ? 'on' : 'off' ]">
    <div class="trigger" @click="toggle">
      {{ isShow ? '向下滑动返回选择学生环节 ↓' : '向上滑动进入状态反馈环节 ↑'}}
    </div>
    <template v-if="isDataReady">

      <div class="content">
        <select-comment-area class="select_comment_area" :action="action" />

        <p class="info">
          <span>
            <span>已选中</span>
            <span class="value">{{ $store.getters['lunch/selectedStudentIdList'].length }}</span>
            <span>个学生</span>
          </span>

          <span>
            <span>共涉及</span>
            <span class="value">{{ $store.getters['lunch/selectedClassIdList'].length }}</span>
            <span>个班级</span>
          </span>
        </p>

        <button class="submit" @click="submit">{{ action === 0 ? '提交午休情况' : '提交用餐情况' }}</button>
      </div>

    </template>
  </div>
</template>
<script>
import selectCommentArea from './select-comment-area'
import { isEmpty } from '@/utils'
import { getCommentList, submit } from '@/api/school/lunch'

export default {
  name: 'lunch_select_comment',
  props: {
    action: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      top: '100%',
      isShow: false,
      isDataReady: false,
    }
  },
  components: {
    selectCommentArea,
  },
  computed: {
    currentAction() {
      return this.$store.getters['lunch/currentAction']
    },
    ftype() {
      return this.action === 0 ? 1 : 2
    },
  },
  mounted() {
    this.top = (document.body.clientHeight - window.rem*.4) + 'px'
  },
  methods: {
    toggle() {
      if (!this.isShow) {
        this.expand()
      } else {
        this.shrink()
      }
    },
    shrink() {
      this.isShow = false
    },
    expand() {
      if (isEmpty(this.$store.getters['lunch/selectedStudentIdList'])) {
        this.$toast('请先选择学生')
        return
      }
      this.isShow = true
      if (!this.isDataReady || isEmpty(this.$store.getters['lunch/commentData_' + this.action])) {
        this.fetchData()
      } else {
        // 默认选中评语
        this.$store.commit('lunch/setCommentNormalSelect', this.action)
      }
    },
    fetchData() {
      this.$loading();
      getCommentList(this.ftype)
        .then(response => {
          if (response.data.meta.success) {
            const commentData = isEmpty(response.data.data) ? [] : response.data.data
            this.$store.commit('lunch/setCommentData', [this.action, commentData])

            // 默认选中评语
            this.$store.commit('lunch/setCommentNormalSelect', this.action)

            this.isDataReady = true
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },

    submit() {
      let checkResult = this.checkAndAsk()
      if (checkResult) {
        checkResult
          .then(isConfirm => {
            if (isConfirm) {
              this.submitData()
            }
          })
      }
    },
    checkAndAsk() {
      let selectedStudentIdList = this.$store.getters['lunch/selectedStudentIdList']
      if (isEmpty(selectedStudentIdList)) {
        this.$toast('未选择学生')
        return false
      }
      let selectedComment = this.$store.getters['lunch/selectedComment']
      if (!Array.isArray(selectedComment) || isEmpty(selectedComment)) {
        this.$toast('未选择状态')
        return false
      }
      if (selectedComment.some(id => id === 0)) {
        this.$toast('两种状态都需要各选一个')
        return false
      }
      return this.$dialog.confirm({
        title: '温馨提示',
        message: `共${selectedStudentIdList.length}个学生\n提交评分后无法撤回，是否确认提交？`,
        confirmButtonText: '确认',
        overlay: true,
      })
    },
    submitData() {
      this.$loading()

      const stuIds = this.$store.getters['lunch/selectedStudentIdList']
      const commentIds = this.$store.getters['lunch/selectedComment']

      submit(this.ftype, stuIds, commentIds)
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('评分成功')
            this.shrink()
            this.$store.commit('lunch/afterSubmitSuccess')
          } else {
            this.$toast(response.data.meta.message)
          }
        })
        .finally(() => { this.$loadingHide() })
    },
  },
}
</script>
<style scoped lang="less">
.lunch_select_comment * {
  font-size: .16rem;
  box-sizing: border-box;
}

.lunch_select_comment {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #F3F7F8;
  display: flex;
  flex-direction: column;
  transition: .6s;
  top: 0;
  z-index: 100;

  &.on {
    top: .5rem !important;
  }
}

.trigger {
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  background: #fff;
  font-size: .14rem;
  color: #84C225;
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .select_comment_area {
    flex-grow: 1;
  }

  .image_upload_area {
    margin-top: 0;
    margin-bottom: .08rem;
    padding: .08rem;
    background: #fff;
    flex-shrink: 0;
  }

  .info {
    text-align: center;
    color: #666;
    background: #fff;
    line-height: .4rem;
    flex-shrink: 0;
    margin-top: .1rem;

    & > span {
      margin: 0 .08rem;
    }

    span {
      font-size: .14rem;
    }
  }

  .submit {
    width: 100%;
    color: #fff;
    border: 0;
    height: .4rem;
    flex-shrink: 0;
  }
}

.action_0 {
  .content {
    .info {
      .value {
        color: #84C225;
      }
    }

    .submit {
      background: #3770fb;
    }
  }
}

.action_1 {
  .content {
    .info {
      .value {
        color: #84C225;
      }
    }

    .submit {
      background: #3770fb;
    }
  }
}
</style>
