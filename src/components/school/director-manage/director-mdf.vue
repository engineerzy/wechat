<template>
  <div id="school-role-mdf">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="修改园长" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-from">
      <van-field v-model="schoolRoleName" label="园长名称：" maxlength="20" placeholder="请输入园长名称" border/>
      />
      <van-field v-model="schoolRoleAccount" label="园长账号：" maxlength="20" type="number" placeholder="请输入园长账号" border/>
      />
    </div>
    <!--底部提交按钮-->
      <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, Field, Row, Col,Toast  } from "vant";
import FooterBtn from '../../common/footer-operate-btn';
import { getDirectorInfo, updateDirector } from '@/api/school/director-manage'

export default {
  name: "school-role-mdf",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]:Toast,
    FooterBtn:FooterBtn
  },
  data() {
    return {
      schoolRoleAccount: null,//园长账号
      schoolRoleName:null,//园长名称
      btnText:[
            {
                type:1,
                title:"确定"
            },
            {
                type:2,
                title:"取消"
            }
        ],
    };
  },
  methods: {

    onClickLeft() {
      this.$router.back(-1);
    },
    operateBtn(type){
      if (type === 1){
        this.mdfSchoolRole()
      }else if (type === 2){
        this.$router.push({name:"DirectorManage"});
      }
    },
    // 获取园长信息
      getSchoolRoleInfo() {
      let id = this.$route.query.id;
      getDirectorInfo(id)
          .then(res => {
            if (res.data.meta && res.data.meta.code === 0) {
               this.schoolRoleName =res.data.data.name;
               this.schoolRoleAccount = res.data.data.account;
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      },
    //修改园长
    mdfSchoolRole(){
      this.$dialog.confirm({
        title: '提示',
        message: '确认修改园长！'
      }).then(() => {

        let id = this.$route.query.id;
        updateDirector(id, {
          name: this.schoolRoleName,         //园长名称
          account: this.schoolRoleAccount,    //园长账号
        })
          .then(res=>{
          if (res.data.meta && res.data.meta.code === 0){

            Toast.success({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              loadingType: 'success',
              position:'middle',
              message: '修改园长成功'
            });
            const timer = setInterval(() => {
              clearInterval(timer);
              Toast.clear();
              this.$router.push({name:"DirectorManage"});
            }, 2000);
          }else {
            this.$dialog.alert({
              message: '修改异常！'
            }).then(() => {
              // on close
            });
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      }).catch(() => {
        // on cancel
      });
    }
  },
  created() {
    //alert(this.$route.params.id)
    this. getSchoolRoleInfo();
  }
};
</script>

<style scoped lang="less">
#school-role-mdf {
  font-size: 0;
  background-color: #fff;
  .go-back {
    .van-nav-bar {
      background-color: #3770fb;
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
  .class-from {
    padding-top: 25px;
    padding-right: 14px;
    .van-cell::after {
      content: " ";
      position: absolute;
      pointer-events: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      left: 15px;
      right: 0;
      bottom: 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      border-bottom: 1px solid #ebedf0;
    }
  }
  .footer-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.4rem;
            padding: 0.08rem 0;
            background-color: #3770FB;
            box-sizing: border-box;
            .van-col{
                font-size: 0.14rem;
                color: #fff;
                line-height: 0.24rem;
                text-align: center;
                border-right: 0.01rem solid #fff;
            }
            .van-col:last-child{
                border-right-width:0 ;
            }
        }
  .btn{
    padding: 0 0.2rem;
    overflow: hidden;
    .cancel{
      padding:0.1rem 0;
      float: left;
      font-size: 0.14rem;
      color: #3770fb;
    }
    .confirm{
      padding: 0.1rem 0;
      float: right;
      font-size: 0.14rem;
      color: #3770fb;
    }
  }
}
</style>
