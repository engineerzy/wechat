<template>
  <div id="attendance-statistics">
    <!--考勤关联学生-->
    <div class="top-banner">
      <img src="../../../assets/img/schoolRole/attendance_statistics_banner@2x.png" alt>
    </div>
    <div class="check-time">
       <TrustList :trust-list="trustList" v-on:attendanceType="attendanceTypep"></TrustList>
    </div>
    <div class="table-slecet">
      <van-row>
        <van-col span="6">共1条数据</van-col>
        <van-col span="6">
          全部班级
          <van-icon name="arrow-down"/>
        </van-col>
        <van-col span="6">
          全部年级
          <van-icon name="arrow-down"/>
        </van-col>
        <van-col span="6">
          全部来源
          <van-icon name="arrow-down"/>
        </van-col>
      </van-row>
    </div>
    <div class="table-head">
      <van-row>
        <van-col span="5">时间</van-col>
        <van-col span="5">姓名</van-col>
        <van-col span="5">班级</van-col>
        <van-col span="5">年级</van-col>
        <van-col span="4">来源</van-col>
      </van-row>
    </div>
    <div class="table-content">
      <van-row>
        <van-col span="5">2019-03-06</van-col>
        <van-col span="5">王雪瑞</van-col>
        <van-col span="5">2班</van-col>
        <van-col span="5">一年级</van-col>
        <van-col span="4">来源</van-col>
      </van-row>
       <van-row>
        <van-col span="5">2019-03-06</van-col>
        <van-col span="5">王雪瑞</van-col>
        <van-col span="5">2班</van-col>
        <van-col span="5">一年级</van-col>
        <van-col span="4">来源</van-col>
      </van-row>
       <van-row>
        <van-col span="5">2019-03-06</van-col>
        <van-col span="5">王雪瑞</van-col>
        <van-col span="5">2班</van-col>
        <van-col span="5">一年级</van-col>
        <van-col span="4">来源</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Tab, Tabs, Row, Col } from "vant";
import TrustList from '../components/trust-type';
export default {
  name: "attendance-statistics",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    TrustList:TrustList
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  },
  created() {
    //alert(this.$route.params.id)
  }
};
</script>

<style scoped lang="less">
#attendance-statistics {
  font-size: 0;
  background-color: #fff;
  .top-banner img {
    width: 3.75rem;
    height: 1.5rem;
  }
  .check-time{
    padding-top: 0.17rem;
    height: 0.72rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .table-slecet {
    font-size: 0.14rem;
    color: #666;
    padding: 0 0.16rem;
    line-height: 0.48rem;
    padding-top: 0.2rem;
    .van-row {
      text-align: right;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .van-col:first-child {
        text-align: left;
        color: #333;
      }
    }
  }
  .table-head {
    padding: 0 0.16rem;
    font-size: 0.14rem;
    padding-top: 0.06rem;
    color: #666;
    line-height: 0.38rem;
    .van-row{
      text-align: center;
    }
  }
  .table-content {
    padding: 0 0.16rem;
    font-size: 0.12rem;
    color: #999;
    line-height: 0.28rem;
     .van-row{
      text-align: center;
       .van-col:first-child {
        text-align: left;
      }
    }
  }
}
</style>
