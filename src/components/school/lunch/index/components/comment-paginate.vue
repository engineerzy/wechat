<template>
  <div class="comment_paginate bgfff">

    <div class="pages" ref="pages"
         :style="{ width: `${pageCount + 1}00vw`, transform: `translate(-${currPage-1}00vw)` }" @click="selectComment">
      <div class="page" v-for="(page, index1) in renderArray" :key="index1"
           :style="{ position: 'absolute', top: 0, bottom: 0, right: 0, left: `${index1 * 100}vw` }">
        <span class="item" :class="{ big: item.isBig, multi_line: item.renderType===3 }"
              :style="{ height: item.renderHeight+'px' }" v-for="(item, index2) in page" :key="index2">
          <button class="button" :class="{ active: selectedComment.includes(item.cid) }" :data-cid="item.cid">
            {{ item.comment }}
          </button>
        </span>
      </div>
    </div>

    <p class="bottom">
      <span :style="{ opacity: currPage > 1 ? 1 : 0 }">&lt;&lt;向左滑动</span>
      <span>{{ currPage }}/{{ pageCount }}</span>
      <span :style="{ opacity: currPage < pageCount ? 1 : 0 }">向右滑动&gt;&gt;</span>
    </p>
  </div>
</template>
<script>
import { addTouchDirectionEvent, removeTouchDirectionEvent } from '@/utils/touch-event'
import { isEmpty } from '@/utils'

// interface comment_item_render {
//   cid
//   comment
//   isBig: boolean
//   renderType
//   renderHeight
// }

export default {
  name: 'lunch_comment_paginate',
  props: {
    action: {
      type: Number,
      default: 0,
    },
    commentGroupIndex: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currPage: 1,
      pageCount: 1,
      linePrePage: 5,
      renderArray: [],

      touchEventHandle: undefined,
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    selectedComment() {
      return this.$store.getters['lunch/selectedComment']
    },
  },
  watch: {
    comments() {
      this.init()
    },
  },
  methods: {
    init() {
      // this.currPage = 1
      this.pageCount = 1
      this.renderArray = []
      this.initRenderData(this.comments)
      this.initTouchEvent()
    },
    initItemPrePage() {
      if (
        typeof this.$store.state.lunch.commentPaginateLinePrePage === 'number' &&
        this.$store.state.lunch.commentPaginateLinePrePage > 0
      ) {
        this.linePrePage = this.$store.state.lunch.commentPaginateLinePrePage
        return
      }

      let d1 = document.body.clientHeight - 4.16 * window.rem // 9.6 + .8 = 10.4; 当前页面的其他部分占据高度为10.4rem
      let d2 = window.rem * 0.48
      if (d1 <= 0 || d2 <= 0) {
        return
      }
      this.linePrePage = Math.floor(d1 / d2)
      this.$store.commit('lunch/setCommentPaginateLinePrePage', this.linePrePage)
    },
    initRenderData(comments) {
      let rem = window.rem
      let canvas2dContext
      let heightPrePage = ((document.body.clientHeight - ((1.3 + 1 + 0.8 + 1) / 2.5) * rem) / 2) - ((0.8 + 0.8) / 2.5) * rem // 当前可供进行滚动的区域大小 = 取整个屏幕的高度 - 其他元素占据的高度
      let currPageLeftHeight = heightPrePage
      let type1ContentMaxWidth = document.body.clientWidth / 2 - 0.4 * rem // 如果文字测量后长度小于这个值, 则认为该评语占据一列的宽度
      let type2ContentMaxWidth = document.body.clientWidth - 0.5 * rem // 占据两列的宽度
      let renderArray = []
      let renderCurrPage
      let smallItemCount = 0

      let nextPage = () => {
        renderCurrPage = []
        renderArray.push(renderCurrPage)
        currPageLeftHeight = heightPrePage
        smallItemCount = 0
      }

      let measureText = (text) => {
        if (canvas2dContext === undefined) {
          let canvas = document.createElement('canvas')
          canvas2dContext = canvas.getContext('2d')
          canvas2dContext.font = '.16rem Arial'
        }
        let width = canvas2dContext.measureText(text).width
        return Math.floor(width)
      }

      let getRenderType = (width) => {
        if (width < type1ContentMaxWidth) { // type 1 表示这个评语占一列
          return 1
        } else if (width < type2ContentMaxWidth) { // type 2 表示这个评语占两列
          return 2
        } else { // type 3 表示这个评语占两列, 并且是多行的
          return 3
        }
      }

      let getRenderHeight = (renderType, width) => {
        const minHeight = .3 * rem + 2 * .08 * rem
        if (renderType === 1 || renderType === 2) {
          return minHeight
        } else {
          return Math.ceil(width / type2ContentMaxWidth) * .3 * rem + 2 * .08 * rem
        }
      }

      let isNeedChangePage = (height) => {
        return currPageLeftHeight - height < 0
      }

      let isNeedChangeLine = (isBig) => {
        if (isBig) {
          smallItemCount = 0
          return true
        }
        if (smallItemCount === 0) {
          smallItemCount = 1
          return true
        }
        smallItemCount = 0
        return false
      }

      nextPage()
      comments.forEach(comment => {
        let renderComment = Object.assign({}, comment)
        let textWidth = measureText(renderComment.comment)
        let renderType = getRenderType(textWidth)
        let renderHeight = getRenderHeight(renderType, textWidth)
        renderComment.renderType = renderType
        renderComment.renderHeight = renderHeight
        renderComment.isBig = renderType !== 1
        if (isNeedChangeLine(renderComment.isBig)) {
          if (isNeedChangePage(renderHeight)) {
            nextPage()
          }
          currPageLeftHeight -= renderHeight
        }

        renderCurrPage.push(renderComment)
      })

      this.pageCount = renderArray.length
      this.renderArray = renderArray
    },

    initTouchEvent() {
      if (this.pageCount <= 1) {
        return
      }
      let el = this.$refs['pages']
      if (this.touchEventHandle !== undefined) {
        removeTouchDirectionEvent(el, this.touchEventHandle)
      }
      this.touchEventHandle = addTouchDirectionEvent(el, {
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

    selectComment(e) {
      let target = e.target
      if (target.nodeName.toLowerCase() !== 'button') {
        if (target.parentNode.nodeName.toLowerCase() === 'button') {
          target = target.parentNode
        } else {
          return
        }
      }

      let cid = parseInt(target.dataset['cid'])
      if (isEmpty(cid)) {
        this.$toast('发生异常, 评语ID为空')
        return
      }
      this.$store.commit('lunch/selectComment', [this.commentGroupIndex, cid])
    },
  },
}
</script>
<style scoped lang="less">
.comment_paginate * {
  font-size: .16rem;
  box-sizing: border-box;
}

.comment_paginate {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-grow: 1;
}

.button {
  border: 0;
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  box-sizing: content-box;
  justify-content: center;
  border-radius: 0.03rem;
  line-height: .3rem;
  color: #fff;
  background: rgba(214,214,214,1);

  &.active {
    color: #fff;
    background: #3770fb;
    border: 1px solid #3770fb;

    .worth {
      border-right-color: #fff;
    }
  }

  .worth {
    width: .4rem;
    height: .32rem;
    line-height: .32rem;
    display: inline-block;
    /*border-right: 1px solid #666;*/
    /*margin-right: 4px;*/
    white-space: nowrap;
    flex-shrink: 0;
  }

  .text {
    text-align: left;
    /*white-space: nowrap;*/
    line-height: .32rem;
    border-left: 1px solid;
    padding-left: 4px;
    word-break: break-all;
  }
}

.pages {
  transition: .6s;
  min-width: 100vw;
  flex-grow: 1;
  position: relative;

  .page {
    width: 100vw;
    height: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;

    .item {
      width: 50%;
      padding: 0.08rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      /*max-height: 2rem;*/
      /*height: 1.2rem;*/

      &.big {
        width: 100%;
      }

      &.multi_line {
        .text {
          line-height: .24rem;
        }
      }
    }
  }
}

.placeholder {
  opacity: 0;
  margin-bottom: 4px;
}

.bottom {
  font-size: 80%;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  line-height: .32rem;

  span {
    margin: 0 .1rem;
    font-size: .14rem;
    color: #999;
  }
}
</style>
