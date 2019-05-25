<!-- 修改时间 -->
<template>
    <div class="resiveScore">
        <head-top :title="'修改成绩'" :rightText="''" :leftText="'取消修改'" :id="''"></head-top>
        <div class="chooseClass">
            <!-- 班级选择 -->
            <cls-title @classGrade='classGrade'></cls-title>
        </div>
        <section class="student-wrapper">
            <div class="all-student">
                <span class="active">王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
                <span>猫头鹰</span>
                <span>王子涵</span>
                <span>猫头鹰</span>
            </div>
            <p class="discription">向上滑动查看更多 ^</p>
        </section>
        <div class="" style="height: 0.1rem;background-color: #F3F7F8;"></div>
        <div class="term-tab">
            <van-tabs type="card">
                <van-tab title="上学期"></van-tab>
                <van-tab title="下学期"></van-tab>
            </van-tabs>
        </div>
        <section class="student-score">
            <p class="discription">该学生最后一次录入的成绩为：</p>
            <p class="subject">
                <span>科目：语文</span>
                <span>修改为 ></span>
            </p>
            <p class="unit">
                <span>单元：第一单元</span>
                <span>修改为 ></span>
            </p>
            <p class="score">
                <span>分数：100</span>
                <van-button type="info">点我改分</van-button>
            </p>
            <p class="input-time">该成绩录入时间：2019-02-27 15:20</p>
            <p class="edit-time">最近一次修改时间：2019-02-28 09:55</p>
            <p class="notify">须知：修改功能仅能修改，每位学生最后一次录入的成绩！</p>
        </section>
        <van-button type="info" class="modify-score">确认修改</van-button>
    </div>
</template>
<script>
import { Tab, Tabs, Button } from "vant";
import headTop from "../../common/nav-bar";
import clsTitle from "./components/clas-title-list";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    headTop,
    clsTitle
  },
  data() {
    return {};
  },
  methods: {
    // 点击班级,子组建传过来的
    classGrade(val) {
      this.classTypeId = val.id;
      // console.log(val.id,"子组件班级传来的");
    }
  }
};
</script>
<style lang="less">
@import "performance";
</style>
