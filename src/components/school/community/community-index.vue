<template>
  <div id="community-index-school">
    <!--园长角色首页-->
    <div class="go-back">
      <van-nav-bar
        title="互动社区"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="bars" slot="right"/>
      </van-nav-bar>
      <div class="downmenu" v-show="manageshow">
        <i></i>
        <router-link :to="{name:'SchoolAddManagement'}"><span class="add">新增动态</span></router-link>
        <router-link :to="{name:'SchooleTypeManagement'}"><span class="type-manage">类型管理</span></router-link>
        <router-link :to="{name:'PermissionsManagement'}"><span class="permiss-manage">权限管理</span></router-link>
      </div>
    </div>
    <!--banner-->
    <div class="banner">
      <img src="../../../assets/img/parents/index/banner2.png" alt="">
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-if="communityList.length>0">
          <div class="community-list" v-for="(item, index) in communityList" :key="index">
            {{item.year}}
            <div v-for="(items,indexes) in item.communitys" :key="indexes">
              <div class="avator" @click="enterMyCommunity(items.utype,items.uid)">
                <img :src="items.avator" alt="">
              </div>
              <div class="detail">
                <div class="top-t">
                  <span class="title" @click="enterMyCommunity(items.utype,items.uid)">{{items.name}}</span>
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
                    <span class="no-read">{{items.unReadNum}}人未阅读</span>/
                    <span class="read">{{items.readNum}}人已阅读</span>
                  </div>
                  <div class="time">
                    <span>{{items.date}} {{items.time}}</span>
                  </div>
                  <div class="view-scoped">
                    <div class="cl-list">
                      <span class="title">可见范围：</span>
                      <div class="li-con" v-if="items.range.length>0">
                        <p class="text">{{scopedClassList(items.range)}}</p>
                      </div>
                      <span class="operate" @click="toggle(items.likeShow,indexes,index)"><van-icon
                        name="ellipsis"/></span>
                      <transition name="show">
                        <div class="show" v-show="items.likeShow">
                          <span @click="likes(indexes,index,items.communityId)"><van-icon name="like-o"/> {{items.isLike ? '赞':'取消'}}</span>
                          <span v-if="commentsType>0" style="margin-left: 0.5rem"><label
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
                    <span class="person" v-for="(list, ind) in items.like" :key="ind">{{list.name}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </van-list>
    </div>
    <div class="bg" :style="bgheight" v-show="bgshow" @click="operateBg"></div>

    <!--审核按钮-->
    <div class="audit" v-if="auditNumber>0">
      <router-link :to="{name:'Audit'}">
        <span class="btn">审核管理 <strong>{{auditNumber}}</strong></span>
      </router-link>
    </div>
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" v-if="palyerShow"></Player>
  </div>
</template>

<script>
import { NavBar, Icon, Field, List, ImagePreview } from 'vant';
import Player from '../../common/player'
import { getCommunityIndexData, likes } from '@/api/school/community'

export default {
  name: "community-index",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [List.name]: List,
    Player: Player,
  },
  data() {
    return {
      loading: false,
      finished: false,
      /* transShow:false,//显示点赞*/
      setClass: false,
      show: false,//是否显示全文按钮
      showText: '全文',
      manageshow: false,//显示功能管理
      bgshow: false,//显示背景
      page: 1,//当前页
      type: 0,//类型
      commentsType: 0,//社区评论是否开启 0 关闭
      auditNumber: 0,//等待审核动态条数
      communityList: [],//列表数据
      palyerShow: false,//弹框视频播放
      videoUrl: "",//视频播放地址
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    enterMyCommunity(utype, uid) {
      this.$router.push({ name: 'CommunityMyCommunity', params: { utype: utype, uid: uid } })
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
    onClickRight() {
      //this.$router.push({name: 'AddCommunity'})
      this.manageshow = true;
      this.bgshow = true;
    },
    operateBg() {
      this.manageshow = false;
      this.bgshow = false;
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
    //获取园长端社区首页列表
    selectList() {

      getCommunityIndexData(this.page, this.type)
        .then(res => {

        //console.log(res);
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
          this.auditNumber = res.data.data.checkCount;
          //有待审核数据时提示
          if (this.auditNumber > 0 && this.page === 2) {
            this.$dialog.confirm({
              title: '提示',
              message: '您有待审核的动态，是否需要去审核？',
            }).then(() => {
              // on confirm
              this.$router.push({ name: 'CommunityAudit' })
            }).catch(() => {
              // on cancel
            });
          }
        }
      }).catch(() => {
        throw new Error("异常！")
      })
    },
    onLoad() {
      this.selectList();
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
  updated() {
    if (this.$refs.element) {
      let heightStyle = this.$refs.element.clientHeight;
      //let boxHeight = this.$refs.boxheight.clientHeight;
      //console.log(this.$refs);
      if (heightStyle > 60) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  mounted() {
  },
  computed: {
    bgheight: {
      get() {
        let height = document.documentElement.clientHeight;
        return { height: `${height}px` }
      },
    },
    scopedClassList() {
      return (listArr) => {
        let jArr = listArr.join(', ');
        return jArr
      }
    },
  },
}
</script>

<style scoped lang="less">
#community-index-school {
  font-size: 0;
  width: 100%;

  .bg {
    background-color: #ddd;
    opacity: .4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .go-back {
    position: relative;

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

    .downmenu {
      position: absolute;
      top: 0.42rem;
      right: 0.1rem;
      z-index: 11;
      width: 1rem;
      background-color: #fff;
      padding: 0 0.1rem;
      border-radius: 0.03rem;
      box-sizing: border-box;

      span {
        display: block;
        font-size: 0.12rem;
        color: #666;
        border-bottom: 0.01rem solid #ddd;
        padding: 0.08rem 0;
        text-align: center;
      }

      span:last-child {
        border-bottom-width: 0;
      }

      i {
        position: absolute;
        top: -0.09rem;
        right: 0.1rem;
        border: 0.05rem solid transparent;
        border-bottom-color: #fff;
      }
    }
  }

  .banner {
    width: 100%;
    overflow: hidden;

    img {
      float: left;
      width: 100%;
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

      .avator {
        float: left;
        margin-right: 0.1rem;
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 0.05rem;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          float: left;
        }
      }

      .detail {
        float: left;
        width: 2.89rem;

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

  .audit {
    width: 0.5rem;
    height: 0.5rem;
    position: fixed;
    bottom: 0.15rem;
    right: 0.26rem;
    border-radius: 50%;
    background-color: #3770FB;
    padding: 0.04rem 0.08rem;
    text-align: center;
    box-sizing: border-box;

    .btn {
      position: relative;
      font-size: 0.14rem;
      color: #fff;

      strong {
        position: absolute;
        top: -0.15rem;
        left: 0.2rem;
        font-size: 0.12rem;
        color: #fff;
        padding: 0.01rem 0.03rem;
        border-radius: 0.1rem;
        background-color: #D80000;
      }
    }
  }
}
</style>
