<template>
  <div>
    <van-dialog
      v-model="isShow"
      title="新增状态"
      show-cancel-button
      confirm-button-text="新增并选中"
      overlay
      @confirm="submit"
      @cancel="isShow = false"
      :before-close="beforeClose">

      <div class="add_comment">
        <div class="info">

          <p class="line">
            <span class="color999 key">午休用餐: </span>
            <span class="color666">{{ formText_0 }}</span>
          </p>
          <p class="line">
            <span class="color999 key">状况纪律: </span>
            <span class="color666">{{ formText_1 }}</span>
          </p>

        </div>

        <text-input
          class="input_comment"
          placeholder="请输入状态"
          v-model="comment"
          :showCounter="true"
          :max="15"/>

      </div>

    </van-dialog>
  </div>

</template>
<script>
import { isEmpty } from '@/utils'
import textInput from '@/components/common/text-input.vue'
import { createStatus } from '@/api/school/lunch'

export default {
  name: 'lunch_add_comment',
  components: {
    textInput,
  },
  data() {
    return {
      action: 0,
      formText_0: '',
      formText_1: '',
      isShow: false,

      ftype: 0,
      category: 0,
      comment: '',
      container: () => this.$el
    }
  },
  methods: {
    add(action, commentGroupIndex, commentTypeName) {
      this.action = action
      this.formText_0 = action === 0 ? '午休表现' : '用餐情况'
      this.formText_1 = commentTypeName

      this.ftype = action === 0 ? 1 : 2
      this.category = (this.ftype-1)*2+commentGroupIndex+1
      this.comment = ''

      this.isShow = true
    },

    submit() {
      if (isEmpty(this.comment)) {
        this.$toast('请输入状态')
        return
      }

      this.$loading()
      createStatus(this.ftype, this.category, this.comment)
        .then(response => {
          if (response.data.meta.success) {
            this.$store.commit('lunch/addNewCommentAndSelect', [this.action, response.data.data])
            this.isShow = false
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },

    beforeClose(action, done) {
      done(false)
    }
  },
}
</script>
<style scoped lang="less">
.add_comment {
  padding: .16rem;
  font-size: .16rem;

  .title {
    text-align: center;
    color: #666;
    margin-bottom: .08rem;
    font-size: 120%;
  }

  .input_comment {
    margin: .08rem 0;
    padding: .1rem 2px;
  }

  .info {
    .line {
      margin: .08rem 0;

      .key {
        margin-right: .08rem;
      }
    }

    .input_worth_line {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow: hidden;

      .key,
      .desc {
        flex-shrink: 0;
      }

      .input_worth {
        border: 1px solid #c9c9c9;
        position: relative;
        width: 3rem;
        margin-right: 4px;
        padding: 2px;
      }

      .right_text {
        color: #999;
      }
    }
  }
}
</style>
