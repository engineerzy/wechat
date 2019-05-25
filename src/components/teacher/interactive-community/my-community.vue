<template>
  <div id="my-community">
    <div class="go-back">
      <van-nav-bar
        title="我的动态"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-if="communityListes.length>0">
          <div class="community-list" v-for="(item,i) in communityListes" :key="i">
            <div v-for="(items,index) in item.communityList" :key="index">
              <div class="detail">
                <div class="top-t">
                  <span class="title">{{items.year}} {{items.month}}  {{items.day}}  {{items.time}}</span>
                  <span class="type">{{items.type}}</span>
                </div>

                <div class="desc">
                  <div class="text" :class="setClass?'active':''">
                    <div class="ct" ref="element">{{items.content}}</div>
                  </div>
                  <span class="all" v-if="show" @click="showAllText">{{showText}}</span>
                </div>
                <div class="list" v-if="items.imgUrl.length>0">
                  <div class="items" v-for="(list,ind) in items.imgUrl" :key="ind">
                    <img :src="list" alt="" @click="preview(items.imgUrl, ind)">
                  </div>
                </div>
                <div class="video" v-if="items.video">
                  <div class="items" @click="playerVideo(items.video)">
                    <video :src="items.video">您的浏览器不支持 video 标签。</video>
                    <span class="play-video"><van-icon name="play-circle-o"/></span>
                  </div>
                </div>
                <div class="dips">
                  <div class="read-info">
                    <router-link
                      :to="{name:'ReadDetail',params:{id:items.communityId,read:items.readNum,unRead:items.unReadNum}}">
                      <span class="no-read">{{items.unReadNum}}人未阅读</span>/
                      <span class="read">{{items.readNum}}人已阅读</span>
                    </router-link>
                  </div>
                  <div class="view-scoped">
                    <div class="cl-list">
                      <span class="title">可见范围：</span>
                      <div class="li-con" v-if="items.range.length>0">
                        <p class="text">{{scopedClassLists(items.range)}}</p>
                      </div>
                      <span class="operate" @click="toggle(items.likeShow,indexes,index)"><van-icon
                        name="ellipsis"/></span>
                      <transition name="show">
                        <div class="show" v-show="transShow">
                          <span @click="likes(indexes,index,items.communityId)"><van-icon name="like-o"/> {{val.isLike?'取消':'赞'}}</span>
                          <span v-if="commentsType>0" style="margin-left: 0.5rem" @click.prevent="getIptFocus"><label
                            for="ipt-comm">评论</label></span>
                          <span class="triangle"></span>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
                <div class="give-like">
                  <div class="like-box">
                    <span class="iocn"><van-icon name="like-o"/></span>
                    <span class="person" v-for="(list, ind) in items.like" :key="ind" style="margin-right: 0.05rem">{{list.name}}</span>

                  </div>
                  <!--todo 评论后期迭代-->
                  <!--<div class="comments">
                    <div class="list">
                      <span class="name">eee：</span>
                      <span class="com-content">3333可是当你看到室内当你看到你发的进口奶粉的烦恼的开发阶段奶粉肯定能发快递妇科内防腐剂</span>
                    </div>
                    <div class="list">
                      <span class="name">eee</span>
                      回复
                      <span class="name-f">似懂非懂：</span>
                      <span class="com-content">3333</span>
                    </div>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>

      </van-list>
    </div>
    <!--视频播放-->
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" v-if="palyerShow"></Player>
  </div>
</template>

<script>
import { NavBar, Icon, Field, List, ImagePreview } from 'vant';
import Player from '../../common/player'
import { likes, myCommunity } from '@/api/school/community'

export default {
  name: "my-community",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [List.name]: List,
    Player: Player,
  },
  data() {
    return {
      commentsType: 0,//社区评论是否开启 0 关闭
      palyerShow: false,//弹框视频播放
      videoUrl: "",//视频播放地址
      page: 1,//当前页
      type: 0,//查询类型
      loading: false,
      finished: false,
      show: false,
      showText: '全文',
      setClass: false,
      transShow: false,
      communityMseeage: '',//评论内容
      iptshow: false,
      //保存列表数据
      communityListes: [
        {
          "weekCount": 5,
          "monthCount": 10,
          "communityList": [
            {
              "communityId": 1,
              "content": "内容",
              "imgUrl": [
                "http://img.com",
                "http://img.com",
              ],
              "readNum": 1,
              "unReadNum": 10,
              "year": "2019",
              "month": "2月",
              "day": "22",
              "time": "12:00",
              "range": [
                "一班",
                "二班",
              ],
              "like": [
                {
                  "id": 1,
                  "name": "林小白家长",
                },
                {
                  "name": "林小黑家长",
                },
              ],
              "comments": [
                {
                  "userId": 1,
                  "name": "周大白家长",
                  "content": "评论内容",
                },
              ],
            },
          ],
        },
      ],
      //保存类型
      listType: [
        {
          value: 0,
          name: '全部',
        },
      ],
      //配置
      config: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    showAllText() {
      if (this.setClass) {
        this.setClass = false;
        this.showText = '全文'
      } else {
        this.setClass = true;
        this.showText = '收起'
      }
    },
    //点赞
    likes(idx, index, id) {
      this.communityList[index].communitys[idx].likeShow = false;
      likes(id)
        .then(res => {
          if (res.status === 200) {
            if (res.data.data.like === 1) {//点赞
              this.communityList[index].communitys[idx].isLike = 1;
              this.communityList[index].communitys[idx].like.push({
                id: res.data.data.uid,
                name: res.data.data.realname,
              })
            } else if (res.data.data.like === 0) {//取消
              this.communityList[index].communitys[idx].isLike = 0;
              //let index = this.communityList[index].communitys[idx].like.indexOf()
              for (let i = 0; i < this.communityList[index].communitys[idx].like.length; i++) {
                if (this.communityList[index].communitys[idx].like[i].id === res.data.data.uid) {
                  this.communityList[index].communitys[idx].like.splice(i, 1)
                }
              }
            }

          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    toggle(show, idx, index) {
      if (show) {
        this.communityList[index].communitys[idx].likeShow = false
      } else {
        for (let val of this.communityList) {
          for (let key of val.communitys) {
            key["likeShow"] = false;
          }
        }
        this.communityList[index].communitys[idx].likeShow = true
      }
    },
    getIptFocus() {
      //
      //console.log(this.$refs)
      this.transShow = false;
      this.iptshow = true;
      //this.$refs.iptFocus.focus()
    },
    onLoad() {
      this.$loading()
      myCommunity(this.page, this.$route.params.uid, this.$route.params.utype)
        .then(res => {
          this.$loadingHide()
          if (res.status === 200) {
            if (res.data.data.communityList.length > 0) {
              this.page = this.page + 1;
              for (let item of res.data.data.communityList) {
                //加个属性
                for (let i of item.communitys) {
                  i["likeShow"] = false;
                }
                this.communityList.push(item);
              }
              if (res.data.data.communityList.length < 10) {
                this.loading = false;
                this.finished = true;
              }
            } else {
              this.loading = false;
              this.finished = true;
            }
            this.listType = [...this.listType, ...res.data.data.type];
            //this.config = res.data.data.config;
          }
          //console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      });
    },
    //图片预览
    preview(imgArr, index) {
      ImagePreview({
        images: imgArr,
        startPosition: index ? index : 0,
        lazyLoad: false,
      });
    },
    //关闭视频
    hidePlay(bl) {
      this.palyerShow = bl
    },
    //播放视频
    playerVideo(url) {
      this.videoUrl = url;
      let timer = setTimeout(() => {
        this.palyerShow = true;
        clearTimeout(timer)
      }, 500)
    },
  },
  mounted() {

    //获取元素内联样式值
    //console.log(this.$refs)

  },
  updated() {
    if (this.$refs.element) {
      let heightStyle = this.$refs.element.clientHeight;
      //console.log(this.$refs);
      if (heightStyle > 60) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  computed: {
    scopedClassLists() {
      return (listArr) => {
        let jArr = listArr.join(', ');
        return jArr
      }
    },
  },
}
</script>

<style scoped lang="less">
#my-community {
  font-size: 0;
  width: 100%;

  .go-back {
    .van-nav-bar {
      background-color: #3770FB;

      .van-icon {
        font-size: 0.22rem;
        color: #fff;
      }

      .van-nav-bar__text {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #fff;
        font-weight: 400;
      }

      .van-nav-bar__title {
        color: #fff;
        font-weight: 400;
      }
    }
  }

  .content {
    width: 100%;
    padding: 0.2rem 0.16rem 0;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .community-list {
      overflow: hidden;
      border-bottom: 0.02rem solid #eee;
      padding-bottom: 0.14rem;

      .detail {
        float: left;
        width: 100%;

        .top-t {
          overflow: hidden;
          line-height: 0.22rem;
          margin-bottom: 0.04rem;

          .title {
            float: left;
            font-size: 0.16rem;
            color: #333;
          }

          .type {
            float: right;
            font-size: 0.14rem;
            color: #666;
          }
        }

        .desc {
          width: 100%;
          margin-bottom: 0.1rem;

          .text {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            max-height: 0.6rem;
            overflow: hidden;
          }

          .text.active {
            max-height: initial;
            overflow: auto;
          }

          .all {
            font-size: 0.14rem;
            color: #7588B1;
            line-height: 0.2rem;
          }
        }

        .list {
          width: 100%;
          margin-left: -0.1rem;
          overflow: hidden;

          .items {
            float: left;
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 0 0.1rem 0.1rem;

            img {
              width: 100%;
              height: 100%;
              float: left;
            }
          }
        }

        .video {
          width: 100%;
          /*margin-left: -0.1rem;*/
          overflow: hidden;

          .items {
            position: relative;
            float: left;
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 0.1rem 0.1rem 0;

            video {
              width: 100%;
              height: 100%;
              float: left;
            }

            .play-video {
              font-size: 0.16rem;
              color: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 0.18rem;
              height: 0.18rem;
            }
          }
        }

        .dips {
          width: 100%;
          /*margin-bottom: 0.1rem;*/
          /*overflow: hidden;*/

          .read-info {
            font-size: 0.12rem;
            color: #999;
            line-height: 0.18rem;
            margin-bottom: 0.03rem;

            .no-read {
              font-size: 0.12rem;
              color: #d00000;
            }

            .read {
              font-size: 0.12rem;
              color: #3770fb;
            }
          }

          .time {
            font-size: 0.12rem;
            color: #999;
            line-height: 0.18rem;
            margin-bottom: 0.03rem;
          }

          .view-scoped {
            width: 100%;
            position: relative;

            .cl-list:after {
              content: '';
              display: block;
              clear: both;
            }

            .cl-list {

              /*overflow: hidden;*/

              .title {
                float: left;
                font-size: 0.12rem;
                color: #999;
                line-height: 0.18rem;
              }

              .li-con {
                float: left;
                max-width: 1.9rem;
                font-size: 0.12rem;
                color: #999;
                line-height: 0.18rem;
              }

              .operate {
                position: absolute;
                right: 0;
                bottom: 0;
                height: 0.14rem;
                font-size: 0.14rem;
                color: #53ACF8;
                padding: 0 0.08rem;
                border-radius: 0.05rem;
                background-color: #e7e7e7;
                overflow: hidden;

                i {
                  float: left;
                  width: 100%;
                  text-align: center;
                }
              }

              .show {
                position: absolute;
                bottom: -0.1rem;
                right: 0.4rem;
                padding: 0.1rem 0.1rem;
                background-color: #000;
                font-size: 0.12rem;
                color: #fff;
                border-radius: 0.05rem;
                box-sizing: border-box;
                /*width: 0;*/

                .triangle {
                  border: 0.07rem solid transparent;
                  border-left-color: #000;
                  position: absolute;
                  right: -0.12rem;
                  top: 0.1rem;
                }
              }

              .show.show-enter-active, .show.show-leave-active {
                transition: all 1s;
              }

              .show.show-enter {
                opacity: 0;
              }

              .show.show-leave-to {
                opacity: 0;
              }

              .show.show-enter-to {
                opacity: 1;
              }

              .show.show-leave {
                opacity: 1;
              }
            }
          }
        }

        .give-like {
          width: 100%;
          font-size: 0.12rem;
          color: #7588B1;
          line-height: 0.17rem;
          padding: 0.06rem 0.12rem;
          box-sizing: border-box;

          .iocn {
            margin-right: 0.09rem;
          }
        }

        .comments {
          border-top: 0.01rem solid #ddd;
          padding-top: 0.05rem;

          .list {
            font-size: 0.12rem;
            color: #999;
            line-height: 0.18rem;

            .name, .name-f {
              color: #53ACF8;
            }
          }
        }
      }
    }
  }
}
</style>
