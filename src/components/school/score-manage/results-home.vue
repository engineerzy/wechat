<template>
  <div id="performance_yi">
    <div class="p_header">
      <span @click="getBack">
        <i class="icon_y" style="padding-right: 0.05rem;">&lt;</i>返回
      </span>
      <span class="two_yi">录入成绩</span>
      <span class="three_yi">
        <span @click="$router.push({name: 'ScoreManageUnitManage'})">单元管理</span>
        <span style="padding-left: 5px;" @click="$router.push({name: 'ScoreManageIndex'})">成绩档案</span>
      </span>
    </div>
    <div class="slect_yi">
      <div class="chooseSelect">
        <div class="group-select">
          <div class="item" @click="ShouTermPup">
            <span class="select">{{termValue}}</span>
          </div>
          <div class="item" @click="ShouSubjectPup">
            <span class="select">{{subjectValue}}</span>
          </div>
          <div class="item" @click="ShouUnitPup">
            <span class="select">{{unitValue}}</span>
          </div>
          <div class="add">
            <img :src="addImgPath" alt>
          </div>
        </div>
        <div>
          <van-popup v-model="show2" position="bottom" :overlay="true">
            <van-picker
              show-toolbar
              title="请选择"
              :columns="columns.name"
              @cancel="onCancel"
              @confirm="onConfirm"
              @change="onChange"
            />
          </van-popup>
          <van-dialog v-model="showDialog" title="标题" show-cancel-button></van-dialog>
        </div>
      </div>
    </div>
    <div class="blank_yi"></div>
    <div class="content_yi">
      <!-- 班级选择 -->
     <ClassList :class-list="classNameList" v-on:classGrade="getChangeIndex"></ClassList>
      <div class="tody_yi">
        <p class="p_flex">
          <span class="studs_yi">
            <i></i>今日未操作的学生
          </span>
          <span>
            <van-switch v-model="checked" size="0.2rem" @input="onInput"/>
            <span class="yincang">隐藏年级</span>
          </span>
        </p>
        <div class="name_yi">
          <ul>
            <li @click="modifiedGrades(item.id)" v-for="item in performance" :key="item.id">
              <p v-text="item.mingzi"></p>
              <p v-text="item.nianji" v-show="shownianji"></p>
            </li>
          </ul>
        </div>
        <p class="p_flex">
          <span class="studs_yi">
            <i></i>今日未操作的学生
          </span>
          <span></span>
        </p>
        <div class="name_yi sy_name_yi">
          <ul>
            <li>
              <p>王子涵</p>
              <p v-show="shownianji">一年级</p>
            </li>
            <li>
              <p>王子涵</p>
              <p v-show="shownianji">一年级</p>
            </li>
            <li>
              <p>王子涵</p>
              <p v-show="shownianji">一年级</p>
            </li>
            <li>
              <p>王子涵</p>
              <p v-show="shownianji">一年级</p>
            </li>
            <li>
              <p>王子涵</p>
              <p v-show="shownianji">一年级</p>
            </li>
          </ul>
        </div>
        <p class="color_6">涉及0个班级，本次共录入0个学生</p>
      </div>
    </div>
    <div class="bott_yi">
      <van-button size="large">确认提交</van-button>
    </div>
  </div>
</template>
<script>
import "./performance.less";
import { NavBar, Row, Col, Switch, Button, Popup, Picker, Dialog } from "vant";
import ClassList from "../components/class-list";
import { selectClassList } from "@/api/school/score-manage";
import { getCollection } from "@/api/school/score-manage";
import { getScoreStudent } from "@/api/school/score-manage";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    ClassList: ClassList
  },
  data() {
    return {
      classNameList: [],
      currentClaassId:[],
      showDialog: false,
      show: false,
      columns: [],
      shownianji: true,
      selectType: 1,
      addImgPath: require("@/assets/img/teachers/Mine/add.png"),
      termValue: "选择学期",
      subjectValue: "选择科目",
      unitValue: "选择单元",
      termArr: ["第一学期", "第二学期", "第三学期", "第四学期"],
      subjectArr: ["语文", "数学", "英语", "美术"],
      unitArr: ["第一单元", "第二单元", "第三单元", "第四单元"],
      show2: false,
      checked: false,
      classTypeId: "", //子组件当前点击的id
      performance: [
        {
          nianji: "一年级",
          id: "1",
          mingzi: "王子涵"
        },
        {
          nianji: "一年级",
          id: "2",
          mingzi: "王子涵"
        },
        {
          nianji: "一年级",
          id: "3",
          mingzi: "王子涵"
        },
        {
          nianji: "一年级",
          id: "4",
          mingzi: "王子涵"
        },
        {
          nianji: "一年级",
          id: "5",
          mingzi: "王子涵"
        }
      ]
    };
  },
  created() {
    this.getClassList();
    this.getCollection();

  },
  methods: {
    onload(){
      //this.getScoreStudent();
    },
    //年级显示隐藏
    onInput(checked) {
      this.shownianji = !checked;
    },
   // 切换班级重置
    getChangeIndex(obj) {
      if(obj.id!=this.activeId){
        this.currentClaassId = obj.id; 
         this.getScoreStudent();//更新数据
      }
    },
    // // 点击班级,父组建传过来的
    // classGrade(val) {
    //   this.classTypeId = val.id;
    //   // console.log(val.id,"子组件班级传来的");
    // },
    // 返回
    getBack() {
      this.$router.go(-1);
    },
    //获取班级列表
    getClassList() {
      return selectClassList(0, 0).then(res => {
        //班级列表数据处理
        if (res.data.meta.success) {
          this.classNameList = [];
          this.currentClaassId = res.data.data.list[0].id;
          console.log(this.currentClaassId);
          this.getScoreStudent();//获取页面学生列表
          for (let item of res.data.data.list) {
            if (item.id) {
              this.classNameList.push({
                id: item.id,
                name: item.name
              });
            }
          }
          
        }
      });
    },
    //获取下拉框内容
    getCollection() {
      return getCollection().then(res => {
        if (res.data.meta.success) {
          this.termArr = res.data.data.terms;
          this.subjectArr = res.data.data.subjectArr;
        }
      });
    },
    //获取学生列表
    getScoreStudent() {
      return getScoreStudent(this.currentClaassId).then(res => {
        if (res.data.meta.success) {
          this.termArr = res.data.data.terms;
          this.subjectArr = res.data.data.subjectArr;
        }
      });
    },
    unitManagement() {},
    // 跳到修改成绩弹框
    modifiedGrades(id) {
      this.$router.push({
        name: "ScoreManageModifyGradePop",
        query: {
          id: id
        }
      });
    },
    onChange(picker, value) {
      this.changeData(value);
    },
    onCancel() {
      this.show2 = false;
    },
    onConfirm(value) {
      this.changeData(value);
      this.show2 = false;
    },
    ShouTermPup() {
      this.show2 = true;
      this.columns = this.termArr;
      this.selectType = 1;
    },
    ShouSubjectPup() {
      this.show2 = true;
      this.columns = this.subjectArr;
      this.selectType = 2;
    },
    ShouUnitPup() {
      this.show2 = true;
      this.columns = this.unitArr;
      this.selectType = 3;
    },
    changeData(value) {
      switch (this.selectType) {
        case 1:
          this.termValue = value;
          break;
        case 2:
          this.subjectValue = value;
          break;
        case 3:
          this.unitValue = value;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style  scoped lang="less">
@import "performance";
</style>

