<template>
  <div id="my-center">
    <van-loading v-show="$store.getters['parentHome/isLoadingData']" class="loading"/>

    <div class="gradient">
      <div class="go-back">
        <van-nav-bar
          title="我的"
          right-text="切换"
          @click-right="$router.push({ name: 'SwitchAccount' })" />
      </div>
      <div class="user-info" v-if="JSON.stringify(accountInfo)!=='{}'">
        <div class="user-avator">
          <img :src="accountInfo.image ? accountInfo.image : '../../assets/logo.png'" alt="">
        </div>
        <div class="basic-info">
          <p class="title">
            <span class="name">{{accountInfo.name}}</span>
            <span class="grade">{{accountInfo.gradeName}}</span>
          </p>
          <p>{{accountInfo.schoolName}}-{{accountInfo.address}} </p>
          <p>第{{accountInfo.className}}</p>
        </div>
        <div class="add-member">
          <button type="button" class="invite-btn" @click="invitationFamily">邀请家长</button>
          <button type="button" class="add-btn">添加孩子</button>
        </div>
      </div>
    </div>
    <div class="user-content" v-if="centerFocus && JSON.stringify(centerFocus)!='{}'">
      <div class="family item" v-if="centerFocus.family && centerFocus.family.length>0">
        <div class="list">
          <FamilyList :family-list="centerFocus.family" :type="parentList" li-width="0.6rem" back-gauge="0.38rem"
                      :avator-w="{width:'0.51rem',height:'0.51rem'}"></FamilyList>
        </div>
      </div>
      <div class="attention item">
        <p class="title">
          <router-link to="/Parent/Attention">
            <van-icon name="question-o"/>
            本月家长对孩子的关注度
          </router-link>
        </p>
        <ul class="list" v-if="JSON.stringify(centerFocus.care)!='{}'">
          <li class="items">
                        <span class="sub-title">
                            <icon name="icon-xin #d80000" />
                            本月关注
                        </span>
            <span class="attention-num">{{centerFocus.care.thisMonth.value}}</span>
            <span class="up-down"><icon name="icon-xin" /></span>
            <span class="desc">
                            <span v-if="centerFocus.care.thisMonth.diffWithLastMonth>0">对比上月增加<br/>{{centerFocus.care.thisMonth.diffWithLastMonth}}关注值</span>
                        </span>
          </li>
          <li class="items">
                        <span class="sub-title">
                            <van-icon class-prefix="icon" name="graderanking"/>
                           年级排名
                        </span>
            <span class="attention-num">{{centerFocus.care.gradeRank.value}}</span>
            <span class="up-down"><van-icon class-prefix="icon" name="arrowsup"/></span>
            <span class="desc">
                            <span v-if="centerFocus.care.gradeRank.distanceToPreviousOne>0">超过上一名<br/>需{{centerFocus.care.gradeRank.distanceToPreviousOne}}关注值</span>
                        </span>
          </li>
          <li class="items">
                        <span class="sub-title">
                            <van-icon class-prefix="icon" name="schoolranking"/>
                            园内排名
                        </span>
            <span class="attention-num">{{centerFocus.care.schoolRank.value}}</span>
            <span class="up-down"><van-icon class-prefix="icon" name="arrowsup"/></span>
            <span class="desc">
                            <span v-if="centerFocus.care.schoolRank.distanceToPreviousOne>0">超过上一名<br/>需{{centerFocus.care.schoolRank.distanceToPreviousOne}}关注值</span>
                        </span>
          </li>
        </ul>
      </div>
      <div class="archive item">
        <van-cell is-link>
          <template slot="title">
            <van-icon class-prefix="icon" name="record"/>
            <span class="custom-text">孩子个人档案</span>
          </template>
        </van-cell>
        <van-cell is-link>
          <template slot="title">
            <van-icon class-prefix="icon" name="personInfo"/>
            <span class="custom-text">家长个人信息</span>
          </template>
        </van-cell>
      </div>
      <div class="version-info item">
        <van-cell is-link>
          <template slot="title">
            <van-icon class-prefix="icon" name="version"/>
            <span class="custom-text">版本信息</span>
          </template>
        </van-cell>
        <van-cell is-link>
          <template slot="title">
            <van-icon class-prefix="icon" name="news"/>
            <span class="custom-text">消息中心</span>
          </template>
        </van-cell>
      </div>
    </div>
    <DownMenu :actions="accountList" v-on:getIndex="tabsAccount"></DownMenu>
  </div>
</template>

<script>
import { NavBar, Icon, Cell, CellGroup, ImagePreview, Loading } from 'vant';
import FamilyList from '../components/family'
import DownMenu from '@/components/common/grade-List'
import { getAccountList, switchAccount } from '@/api/common'
import { getParentInfo, getAttentionBasic, getStudentBindQrcode } from '@/api/parent/home'
import icon from '@/components/common/icon'

export default {
  name: "person-center",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    FamilyList: FamilyList,
    DownMenu: DownMenu,
    vanLoading: Loading,
    icon
  },
  data() {
    return {
      //family data
      //组件 在我的页面需要传 true
      parentList: true,
      //账号信息
      accountInfo: {},
      //关注度
      centerFocus: {},
      //绑定账号列表
      accountList: [],
    }
  },
  methods: {
    getAllAccount() {

      //获取当前微信号绑定的所有账号
      getAccountList()
        .then(response => {
          console.log(response);
          if (response.data.meta && response.data.meta.code === 0) {
            let d = response.data.data;
            for (let item of d) {
              if (item.isCurrent) {
                item["disabled"] = true
              }
            }
            this.accountList = d;
            this.$store.commit('getShow');
          }
        })
    },
    //基本信息
    getAccountDetailInfo() {
      getParentInfo()
        .then(response => {
          //console.log(response);
          if (response.data.meta && response.data.meta.code === 0) {
            this.accountInfo = response.data.data;
          }
        })
    },
    //获取关注值
    getFocusInfo() {
      getAttentionBasic()
        .then(response => {
          //console.log(response);
          if (response.data.meta && response.data.meta.code === 0) {
            this.centerFocus = response.data.data
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //切换账号
    tabsAccount(data) {
      //console.log(data);
      switchAccount({ id: data.id, type: data.type }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          //先移除token
          this.$store.commit('delToken');
          //重新保存 token
          this.$store.commit('setToken', res.headers.authorization);
          if (data.type === 1) {//家长
            this.$router.push({ name: 'ParentHomeIndex' })
          } else if (data.type === 2) {//教师
            this.$router.push({ name: 'TeacherHomeIndex' })
          }
        }
      }).catch(() => {
        throw new Error("异常！")
      })
    },
    //邀请家人
    invitationFamily() {

      getStudentBindQrcode()
        .then(res => {
          //console.log(res);

          if (res.data.meta && res.data.meta.code === 0) {
            let imgaddr = res.data.data.image;
            ImagePreview([imgaddr]);
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //版本信息  todo 待做


  },
  created() {
    //console.log(this.myData)
    this.$store.dispatch('parentHome/fetchMyPageData')
      .finally(() => {
        //获取基本用户信息
        if (this.myData){
          this.accountInfo = this.myData.accountInfo
        }else {
          let timer = setInterval(()=>{
            if (this.myData){
              clearInterval(timer);
              this.accountInfo = this.myData.accountInfo
            }
          },500)
        }

        //this.getAccountDetailInfo();
        //获取关注值
        this.getFocusInfo();
      })
  },
  computed:{
    myData(){
      return this.$store.getters["parentHome/getParentHomeMyData"]
    }
  }

}
</script>

<style scoped lang="less">
#my-center {
  font-size: 0;
  margin-bottom: 0.58rem;

  .gradient {
    height: 2.5rem;
    background: linear-gradient(#3770FB, #68A9FD); /* 标准的语法 */

    .go-back {
      .van-hairline--bottom:after {
        border-bottom-width: 0
      }

      .van-nav-bar {
        background-color: transparent;

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

    .user-info {
      overflow: hidden;
      margin-top: 0.3rem;
      padding: 0 0.16rem;
      box-sizing: border-box;

      .user-avator {
        float: left;
        width: 0.6rem;
        height: 0.6rem;
        text-align: center;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .basic-info {
        float: left;
        width: 1.45rem;
        margin-left: 0.11rem;

        p {
          font-size: 0.14rem;
          color: #fff;
        }

        .title {
          margin-bottom: 0.01rem;

          .name {
            font-size: 0.16rem;
            font-weight: 500;
            margin-right: 0.13rem;
          }

          .grade {
            font-size: 0.14rem;
          }
        }
      }

      .add-member {
        float: right;
        width: 0.8rem;

        button {
          width: 0.8rem;
          height: 0.26rem;
          font-size: 0.14rem;
          color: #fff;
          outline: none;
          border: 0.01rem solid #fff;
          border-radius: 0.05rem;
          background-color: transparent;
        }

        .invite-btn {
          margin-bottom: 0.08rem;
        }
      }
    }
  }

  .user-content {
    background-color: #F3F7F8;
    position: relative;
    box-sizing: border-box;

    .item {
      margin-bottom: 0.1rem;
      background-color: #fff;
      padding: 0 0.16rem;
    }

    .family {
      height: 0.86rem;

      .list {
        width: 3.43rem;
        height: 1.36rem;
        background-color: #fff;
        position: absolute;
        top: -0.68rem;
        padding: 0.17rem 0 0.13rem;
        border-radius: 0.07rem;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.09);
        box-sizing: border-box;
      }
    }

    .attention {
      padding-top: 0.17rem;
      padding-bottom: 0.17rem;
      box-sizing: border-box;

      .title {
        text-align: center;
        font-size: 0.14rem;
        color: #84C225;
        line-height: 0.2rem;
        margin-bottom: 0.27rem;
      }

      .list {
        overflow: hidden;

        .items {
          float: left;
          margin-left: 0.15rem;
          padding-right: 0.2rem;
          border-right: 0.01rem solid #F1F1F1;
          box-sizing: border-box;

          > span {
            display: block;
            text-align: center;
          }

          .sub-title {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            margin-bottom: 0.11rem;
          }

          .attention-num {
            font-size: 0.16rem;
            color: #666;
            line-height: 0.22rem;
            margin-bottom: 0.15rem;
          }

          .up-down {
            font-size: 0.16rem;
            margin-bottom: 0.1rem;
          }

          .desc {
            font-size: 0.12rem;
            color: #999;
            line-height: 0.17rem;
          }
        }

        .items:last-child {
          border-right-width: 0;
        }
      }
    }

    .archive, .version-info {
      .van-cell {
        padding: 0.14rem 0;

        .custom-text {
          margin-left: 0.12rem;
        }
      }
    }
  }

}

.loading {
  margin: 10px auto;
}
</style>
