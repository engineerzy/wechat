<template>
  <div id="community">
    <div class="go-back">
      <van-nav-bar
        title="互动社区"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"

    >
      <!--家长端社区-->
      <div class="content" v-if="communityList.length>0">
        <div v-for="(item, index) in communityList" :key="index">
          <div class="community-list" v-for="(val, ix) in item.communitys" :key="ix">
            <div class="avator" @click="enterMyCommunity(val.utype,val.uid)">
              <img :src="val.avatar" alt="">
            </div>
            <div class="detail">
              <div class="top-t">
                <span class="title" @click="enterMyCommunity(val.utype,val.uid)">{{val.name}}</span>
                <span class="type">{{val.type}}</span>
              </div>
              <!--<span class="title">111111</span>-->
              <div class="desc">
                <div class="text" :class="setClass?'active':''">
                  <div class="ct" ref="element">
                    {{val.content}}
                  </div>
                </div>
                <span class="all" v-if="show" @click="showAllText">{{showText}}</span>
              </div>
              <div class="list" v-if="val.imgUrl">
                <div class="items" v-for="(img,imgIndex) in val.imgUrl" :key="imgIndex">
                  <img :src="img" alt="" @click="preview(val.imgUrl, imgIndex)">
                </div>
              </div>
              <div class="video" v-if="val.video">
                <div class="items" @click="playerVideo(val.video)">
                  <video :src="val.video">您的浏览器不支持 video 标签。</video>
                  <span class="play-video"><van-icon name="play-circle-o"/></span>
                </div>
              </div>
              <div class="dips">
                <span class="time">{{val.date}} {{val.time}}</span>
                <!--<span class="comments">评论</span>-->
                <span class="praise" @click="likes(ix,index,val.communityId)"><van-icon name="like-o"/> <strong>{{val.isLike?'取消':'赞'}}</strong></span>
              </div>
              <div class="give-like">
                <div class="like-box">
                  <span class="iocn"><van-icon name="like-o"/></span>
                  <span class="person" v-for="(list, ind) in val.like" :key="ind">{{list.name}}</span>
                </div>
                <!--<span class="iocn">3333</span>
                <span class="person">444</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" v-if="palyerShow"></Player>
  </div>
</template>

<script>
import { NavBar, Icon, List, ImagePreview } from 'vant';
import Player from '../../common/player'
import { likes } from '../../../api/school/community'
import { selectCommunityList } from '@/api/parent/community'

export default {
  name: "community",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    Player: Player,
  },
  data() {
    return {
      loading: false,
      finished: false,
      show: false,
      setClass: false,
      showText: '全文',
      page: 1,//当前页
      type: 0,//查询类型 0 查询所有
      commentSwitch: 0,//评论是否开启 0 关闭 1 开启 todo 现在 关闭
      palyerShow: false,//弹框视频播放
      videoUrl: "",//视频播放地址
      communityList: [],//列表数据
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    showAllText() {
      //console.log(111);
      if (this.setClass) {
        this.setClass = false;
        this.showText = '全文'
      } else {
        this.setClass = true;
        this.showText = '收起'
      }
    },
    enterMyCommunity(utype, uid) {
      this.$router.push({ name: 'MyCommunity', params: { utype: utype, uid: uid } })
    },
    onLoad() {
      this.selectList();
    },
    selectList() {
      selectCommunityList(this.page, this.type)
        .then(res => {

          if (res.status === 200) {
            console.log(res);
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
          }
        }).catch(() => {
        throw new Error("异常！")
      })
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

  },
  updated() {
    //获取元素内联样式值
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
}
</script>

<style scoped lang="less">
#community {
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
    > div {
      width: 100%;
      padding: 0 0.16rem 0;
      box-sizing: border-box;
      background-color: #fff;
    }

    .community-list {
      overflow: hidden;
      border-bottom: 0.02rem solid #eee;
      padding-top: 0.14rem;
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
            color: #999;
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
          overflow: hidden;

          .time {
            float: left;
            font-size: 0.12rem;
            color: #999;
          }

          .comments {
            float: right;
            font-size: 0.12rem;
            color: #999;
            margin-left: 0.1rem;
          }

          .praise {
            float: right;
            font-size: 0.12rem;
            color: #3770FB;

            strong {
              color: #999;
              font-weight: 400;
              margin-left: 0.08rem;
            }

            i {
              position: relative;
              top: 0.02rem;
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
            margin-right: 0.04rem;
          }

          .person {
            margin-left: 0.05rem;
          }
        }
      }
    }
  }
}
</style>
