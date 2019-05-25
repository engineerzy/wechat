<template>
  <div id="class-manage">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="班级管理" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <div class="class-info">
      <van-row>
        <van-col span="6">共{{statistical.classNumber}}个班</van-col>
        <van-col span="9">{{statistical.inClassStudentNumber}}位学生已分班</van-col>
        <van-col span="9">{{statistical.notInClassStudentNumber}}位学生未分班</van-col>
      </van-row>
    </div>
    <div class="class-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div v-for="(item,index) in classListArr" :key="index">
          <van-row>
            <van-col span="2" class="posi">{{index+1}}</van-col>
            <van-col span="6" class="class-name posi">{{item.name}}</van-col>
            <van-col span="15" class="posi">
              <div class="class-profile">
                <h2>主教师：{{item.mainTeacher ? item.mainTeacher.name : '暂无'}}</h2>
                <p>
                  <span>{{item.studentCount}}位学生</span>
                  <span>{{teacherNum(item.viceTeachers.length)}}位老师</span>
                </p>
              </div>
            </van-col>
            <van-col span="1" class="posi">
              <router-link :to="{name:'ClassManageClassDetail',params:{id:item.id}}">
                <div class="icon-style">
                  <van-icon name="arrow"/>
                </div>
              </router-link>
            </van-col>
          </van-row>
        </div>

      </van-list>

    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, List, Toast } from "vant";
import FooterBtn from '../../common/footer-operate-btn'
import { classStatisticalInfo, selectClassList } from '@/api/school/class-manage'
/*import UnsignedList from "./components/Unsigned-List";*/
export default {
  name: "class-manage",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      loading: false,
      finished: false,
      btnText: [
        {
          type: 1,
          title: '删除班级',
        },
        {
          type: 2,
          title: '新增班级',
        },
      ],
      page: 1,//当前页
      pageSize: 20,//每页数据
      totalPage: 0,//保存总页数
      classListArr: [],
      statistical: {},//统计信息
    };
  },
  methods: {
    operateBtn(type) {
      if (type === 1) {
        this.$router.push({ name: 'ClassManageDel' })
      } else if (type === 2) {
        this.$router.push({ name: "ClassManagePopups" })
      }
    },
    //获取班级列表
    selectClassList() {

      selectClassList(this.page, this.pageSize)
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.totalPage = res.data.data.paginate.totalPage;
            this.loading = false;
            if (res.data.data.list) {
              if (this.page === this.totalPage) {
                this.finished = true;
              } else {
                this.page = this.page + 1;
              }
              let d = res.data.data.list;
              this.classListArr.push(...d);
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //获取班级统计信息
    statisticalInfo() {
      classStatisticalInfo()
        .then(res => {
          // console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            this.statistical = res.data.data
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    onLoad() {
      //this.page = this.page + 1;
      this.selectClassList()
    },

  },
  created() {
    //alert(this.$route.params.id)
    this.statisticalInfo()
  },
  computed: {
    teacherNum() {
      return (len) => {
        return (parseInt(len) + 1).toFixed(0)
      }
    },
  },
};
</script>

<style scoped lang="less">
#class-manage {
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

  .class-info {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .van-col:first-child {
      font-weight: 500;
    }

    .van-col:last-child {
      color: #3770fb;
    }
  }

  .class-list {
    padding: 0 0.16rem;
    text-align: center;
    /*height: 0.48rem;*/
    font-size: 0.14rem;
    line-height: 0.24rem;
    color: #666;
    box-sizing: border-box;
    .class-name{
      line-height: 0.24rem;
    }
    .van-row {
      padding: 0.08rem 0;
      border-bottom: 1px solid #EEE;

      .class-profile {
        text-align: left;
        padding-left: 0.1rem;

        h2 {
          font-size: 0.14rem;
          font-weight: 400;
        }

        p {
          /*line-height: 0;*/
          font-size: 0.12rem;
          color: #999;

          span:last-child {
            margin-left: 0.2rem;
          }
        }
      }

      .icon-style {
        width: 100%;
        text-align: right;
        /*line-height: 0.48rem;*/
      }

      .van-icon-arrow {
        .van-icon,
        .van-icon::before {
          text-align: right;
        }
      }
    }
  }

  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770FB;
    box-sizing: border-box;

    .van-col {
      font-size: 0.14rem;
      color: #fff;
      line-height: 0.24rem;
      text-align: center;
      border-right: 0.01rem solid #fff;
    }

    .van-col:last-child {
      border-right-width: 0;
    }
  }
}
</style>
