<template>
  <div class="select_comment_area bgfff">

    <div class="part"
         v-for="(commentGroup, commentGroupIndex) in data"
         :key="commentGroupIndex">
      <p class="title">
        <button class="add_comment" @click="addComment(commentGroupIndex, commentGroup.name)">+</button>
        <span>{{ commentGroup.name }}</span>
      </p>
      <no-data v-if="isEmpty(commentGroup.comments)" />
      <comment-paginate :action="action" :comment-group-index="commentGroupIndex" :comments="commentGroup.comments" />
    </div>

    <add-comment ref="add_comment"/>

  </div>
</template>
<script>
import noData from '@/components/common/no-data.vue'
import commentPaginate from './comment-paginate.vue'
import addComment from './add-comment.vue'

export default {
  name: 'lunch_select_comment_area',
  props: {
    action: {
      type: Number,
      default: 0,
    },
  },
  components: {
    commentPaginate,
    noData,
    addComment,
  },
  computed: {
    data() {
      return this.$store.getters['lunch/commentData_' + this.action]
    }
  },
  methods: {
    addComment(commentGroupIndex, commentTypeName) {
      this.$refs['add_comment'].add(this.action, commentGroupIndex, commentTypeName)
    },
  },
}
</script>
<style scoped lang="less">
.select_comment_area * {
  font-size: .16rem;
  box-sizing: border-box;
}

.select_comment_area {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .part {
    height: 50%;
    flex-shrink: 0;
    flex-grow: 1;
    color: #666;
    display: flex;
    flex-direction: column;
    background: #fff;

    .title {
      .add_comment {
        border-radius: 50%;
        background: #3770fb;
        color: #fff;
        width: .2rem;
        height: .2rem;
        display: inline-block;
        border: 0;
        line-height: .2rem;
        text-align: center;
        margin-left: .08rem;
        margin-right: .16rem;
        padding: 0;
      }
    }
  }
}
</style>
