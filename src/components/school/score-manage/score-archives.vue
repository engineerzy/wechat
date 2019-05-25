<!-- 成绩档案-->
<template>
    <div class="score-archives">
        <nav-bar :title="'成绩档案'" :leftText="'返回'" :rightText="''" :id="''"></nav-bar>
        <div class="chooseClass">
            <!-- 班级选择 -->
            <cls-title @classGrade='classGrade'></cls-title>
        </div>
        <div class="chooseSubject">
            <span class="active">语文</span>
            <span>数学</span>
            <span>英语</span>
        </div>
        <div class="" style="height: 0.1rem;background-color: #F3F7F8;"></div>
        <div id="barChart" class="barCharts">

        </div>
        <div class="" style="height: 0.1rem;background-color: #F3F7F8;"></div>
        <div class="score-table">
            <p class="table-thead">
                <span style="width: 15%;">姓名</span>
                <span style="width: 32%;">最新分数</span>
                <span style="width: 25%;">类别</span>
                <span style="width: 28%;">录入日期</span>
            </p>
            <p class="table-body" @click="$router.push({name: 'ScoreManageEcharts'})">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
            <p class="table-body">
                <span style="width: 15%;">陈佳琪</span>
                <span style="width: 32%;">98</span>
                <span style="width: 25%;">第二单元</span>
                <span style="width: 28%;">2019-02-27</span>
            </p>
        </div>
        <div>
            <span class="chakan" @click="$router.push({name: 'ScoreManageEcharts'})">查看详情</span>
        </div>
        <div class="bott_yi">
            <van-button size="large" @click="$router.push({name: 'ScoreManageReviseScore'})">修改成绩</van-button>
        </div>
    </div>
</template>
<script>
import { Button } from "vant";
import navBar from "../../common/nav-bar";
import clsTitle from "./components/clas-title-list";
export default {
  components: {
    [Button.name]: Button,
    navBar,
    clsTitle
  },
  data() {
    return {
      active: 2
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    // 点击班级,子组建传过来的
    classGrade(val) {
      this.classTypeId = val.id;
      // console.log(val.id,"子组件班级传来的");
    },

    initCharts() {
      let echartId = document.getElementById("barChart");
      let barChart = this.echarts.init(echartId);
      let option = {
        legend: {
          orient: "vertical",
          top: "middle",
          bottom: 10,
          right: 60,
          data: ["100-81", "80-61", "60-41", "40-21", "20-0"]
        },
        color: ["#1890FF", "#8543E0", "#223273", "#FACC14", "#2FC25B"],
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["35%", "50%"],
            // 隐藏标题
            label: {
              normal: {
                show: false
              }
            },
            // 隐藏指示线
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 300, name: "20-0" },
              { value: 535, name: "40-21" },
              { value: 510, name: "60-41" },
              { value: 634, name: "80-61" },
              { value: 735, name: "100-81" }
            ]
          }
        ]
      };
      barChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
@import "performance";
</style>


