<template>
  <div class="content">
    <div class="list flower-content">
      <IconTitle icon-class="icon-zuoye #3770fb" :content="title"></IconTitle>
      <div class="flower-main">
        <div class="reward-flower">
          <div class="flower">
              <span>
                <span class="flower-text" v-if="extra!=null">已完成：{{extra.finished}}人</span>
              </span>
          </div>
        </div>
        <div class="punishment-flower">
          <div class="flower">
              <span>
                <span class="flower-text" v-if="extra!=null">未完成：{{extra.unfinished}}人</span>
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTitle from '@/components/common/icon-title';

export default {
  name: 'Homework',
  components: {
    IconTitle,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => {
      },
      type: Object,
    },
  },
}
</script>

<style scoped lang="less">
.content {
  font-size: 0;
  background-color: #f3f7f8;
  text-align: left;
  padding-bottom: .1rem;
  /*margin: 0.32rem 0 0 0;*/

  .title {
    font-size: 0.14rem;
    line-height: 0.28rem;
    margin: 0 0.45rem 0;
    text-align: center;
    border-radius: 1rem;
    color: #fff;
    background-color: #3770fb;
    box-sizing: border-box;
  }

  .list {
    padding: 0.16rem 0.15rem;
    background-color: #fff;
    margin-bottom: 0.1rem;
    box-sizing: border-box;

    #icon-title {
      display: block;
      margin-bottom: 0.15rem;
      text-align: left;

      .theme {
        line-height: 0.22rem;

        .icons {
          font-size: 0.16rem;
          position: relative;
          top: 0.02rem;
        }

        .text {
          font-size: 0.16rem;
          font-weight: 500;
          margin-left: 0.08rem;
          color: #333;
        }
      }
    }
  }

  .list:last-child {
    margin-bottom: 0;
  }

  .homework-content {
    .school-check {
      margin-top: 0.33rem;
      overflow: hidden;
      line-height: 0.2rem;

      .left {
        float: left;
        font-size: 0.14rem;
      }

      .check-text {
        color: #666;
        margin-left: 0.04rem;
      }

      .right {
        float: right;
        font-size: 0.14rem;
        color: #999;
      }
    }
  }

  .flower-content {
    .flower-main {
      overflow: hidden;

      .reward-flower {
        float: left;
        width: 50%;
        box-sizing: border-box;

        .flower {
          word-wrap: break-word;
          width: 100%;
          margin-bottom: 0.15rem;
          border-right: 0.01rem solid #f1f1f1;
          padding-right: .24rem;
          box-sizing: border-box;

          span {
            font-size: 0.16rem;
            margin-left: 0.02rem;

            .highlight {
              font-size: 0.16rem;
              color: #d80000;
            }

            .lowlight {
              font-size: 0.16rem;
              color: #ff8700;
            }
          }
        }

        .flower-text {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          padding-left: 0.02rem;
        }
      }

      .punishment-flower {
        float: left;
        width: 50%;
        box-sizing: border-box;

        .flower {
          word-wrap: break-word;
          width: 100%;
          margin-bottom: 0.15rem;
          padding-left: 0.28rem;
          box-sizing: border-box;

          span {
            font-size: 0.16rem;
            margin-left: 0.02rem;

            .highlight {
              font-size: 0.16rem;
              color: #5f5f5f;
            }

            .lowlight {
              font-size: 0.16rem;
              color: #adadad;
            }
          }
        }

        .flower-text {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          padding-left: 0.28rem;
        }
      }
    }
  }
}

.icon-list {
  display: block;
  text-align: left;
  .icon-f {
    font-size: 0.16rem;
    color: #f00;
  }
}
.transparent {
  opacity: 0;
}
</style>
