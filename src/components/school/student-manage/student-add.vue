<template>
  <div id="student-add">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="新增学生" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-from">
      <van-field v-model="studentName" label="学生名称：" maxlength="10" placeholder="请输入学生名称" border/>/>
      <van-field v-model="studentIdCard" label="学生卡号：" placeholder="请输入学生学号" border/>/>
      <van-field v-model="studentNumber" label="内码：" placeholder="请输入内码" border/>/>
      <van-field v-model="studentId" label="学号：" maxlength="32" placeholder="请输入学号" border/>/>
      <van-field
        v-model="grade"
        label="学生年级："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click-right-icon="onGradeActionsheet"
      />
      <van-field
        v-model="className"
        label="学生班级："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click-right-icon="onClassNameActivateSlecte"
      />
      <van-field
        v-model="attendanceType"
        label="考勤类型："
        placeholder="请选择（多选）"
        border
        readonly
        right-icon="arrow"
        @click-right-icon="onAttendanceTypeActivateSlecte"
      />
    </div>
    <div class="select-menu">
      <!-- 年级选择下拉菜单 -->
      <van-actionsheet v-model="showGrade" :actions="gradeList" @select="onSelectGrade"/>
      <!-- 班级选择下拉菜单 -->
      <van-actionsheet
        v-model="showClassName"
        :actions="classNameList"
        @select="onSelectClassName"
      />
    </div>
    <!-- 考勤类型选择下拉菜单 -->
    <van-popup v-model="showAttendanceType" position="bottom">
      <!-- 弹窗确定按钮 -->
      <div class="btn">
        <span class="cancel" @click="cancelAttendanceType">取消</span>
        <span class="confirm" @click="confirmAttendanceType">确定</span>
      </div>
      <!-- 考勤类型复选框 -->
      <van-checkbox-group v-model="checkAttendanceType">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in attendanceTypeList"
            clickable
            :key="item.id"
            :title="`${item.name} ${item.entryTimeStart}~${item.entryTimeEnd}`"
            @click="toggle(index)"
          >
            <van-checkbox :name="item.id" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!--底部提交按钮-->
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Field,
  Actionsheet,
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Toast
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { getAttendanceType } from '@/api/school/attendance-type-manage'
// import { Promise } from "q";
// import { resolve } from "dns";
import { classList } from '@/api/school/class-manage'
import { addStudent } from '@/api/school/student-manage'

export default {
  name: "student-add",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Actionsheet.name]: Actionsheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn
  },
  data() {
    return {
      studentName: "", //学生姓名
      studentIdCard: "", //学生卡号
      studentNumber: "", //内码
      studentId:'',//学号
      grade: "", //选中的学生年级
      className: "", //选中的学生班级
      attendanceType: "", //选中的考勤类型
      showGrade: false, //年级下拉列表隐藏
      showClassName: false, //班级下拉列表隐藏
      showAttendanceType: false, //隐藏考勤类型复选框
      //学生年级
      gradeList: [
        {
          name: "一年级",
          id: 1
        },
        {
          name: "二年级",
          id: 2
        },
        {
          name: "三年级",
          id: 3
        },
        {
          name: "四年级",
          id: 4
        },
        {
          name: "五年级",
          id: 5
        },
        {
          name: "六年级",
          id: 6
        },
        {
          name: "初中",
          id: 7
        }
      ],
      //学生班级
      classNameList: [],
      //考勤类型列表
      attendanceTypeList: [],
      //选择的年级ID
      gradeId:null,
      //选择的班级ID
      classNameId:null,
      //选中的考勤类型id
      checkAttendanceType: [],
      //底部按钮
      btnText: [
        {
          type: 1,
          title: "确定"
        },
        {
          type: 2,
          title: "取消"
        }
      ]
    };
  },
  methods: {
    //考勤类型复选框
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //返回
    onClickLeft() {
      this.$router.back(-1);
    },
    //年级选择点击事件
    onGradeActionsheet() {
      this.showGrade = true;
    },
    //年级选择
    onSelectGrade(item) {
      this.showGrade = false;
      this.grade = item.name;
      this.gradeId =item.id
    },
    //班级选择点击事件
    onClassNameActivateSlecte() {
      this.showClassName = true;

    },
    //班级选择
    onSelectClassName(item) {
      this.showClassName = false;
      this.className = item.name;
       this.classNameId = item.id
    },
    //考勤类型弹窗关闭
    cancelAttendanceType() {
      this.showAttendanceType = false;
    },
    // 考勤类型弹窗确定
    confirmAttendanceType() {
      this.showAttendanceType = false;
      let check = [];
      for (let i of this.checkAttendanceType) {
        for (let v of this.attendanceTypeList) {
          if (i === v.id) {
            check.push(v.name);
          }
        }
      }
      this.attendanceType = check.join(" , ");
    },
    //显示考勤复选框
    onAttendanceTypeActivateSlecte() {
      this.showAttendanceType = true;
    },
    //确认添加
    operateBtn(type) {
      if (type === 1) {
        this.addStudent();
      } else if (type === 2) {
        this.$router.back();
      }
    },
    //获取班级列表
    selectClassList() {
      this.$loading();
      //
      return new Promise((resolve, reject) => {
        classList({ page: 0, all: true })
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.data.list);
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //获取考勤类型
    selectAttendanceType() {
      return new Promise((resolve, reject) => {
        getAttendanceType()
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.data);
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //新增学生
    addStudent() {
      if (!this.studentName){
        Toast('请输入学生姓名')
      }else if (!this.gradeId){
        Toast('请选择学生姓名')
      }else if (!this.studentId){
        Toast('请输入学生学号')
      }else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认新增学生！"
          })
          .then(() => {
            this.$loading();
            addStudent({
              name: this.studentName,         //学生姓名
              classId: this.classNameId,    //学生班级ID
              grade: this.gradeId,          //学生年级ID
              cardNo: this.studentIdCard, //卡号
              rfid: this.studentNumber,  //内码
              studentNumber:this.studentId,
              attendanceTypes: this.checkAttendanceType //考勤类型
            })
              .then(res => {
                if (res.data.meta && res.data.meta.code === 0) {
                  this.$loadingHide();
                  Toast.success({
                    duration: 0, // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: "success",
                    position:'middle',
                    message: "新增学生成功"
                  });
                  const timer = setInterval(() => {
                    clearInterval(timer);
                    Toast.clear();
                    this.$router.push({ name: "StudentManage" });
                  }, 2000);
                } else {
                  this.$dialog
                    .alert({
                      message: "新增异常！"
                    })
                    .then(() => {
                      // on close
                    });
                }
              })
              .catch(() => {
                throw new Error("异常！");
              });
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
  created() {
    Promise.all([this.selectClassList(), this.selectAttendanceType()]).then(
      res => {
        this.$loadingHide();

        if (res[1].length > 0) {
          this.attendanceTypeList = [];
          for (let item of res[1]) {
            this.attendanceTypeList.push({
              name: item.name,
              id: item.id,
              entryTimeEnd: item.entryTimeEnd,
              entryTimeStart: item.entryTimeStart
            });
          }
        }
        if (res[0].length > 0) {
          this.classNameList = [];
          for (let item of res[0]) {
            if (item.id) {
              this.classNameList.push({
                id: item.id,
                name: item.name
              });
            }
          }
        }
      }
    );
  }
};
</script>

<style scoped lang="less">
#student-add {
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
  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770fb;
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
  .btn {
    padding: 0 0.2rem;
    overflow: hidden;
    .cancel {
      padding: 0.1rem 0;
      float: left;
      font-size: 0.14rem;
      color: #3770fb;
    }
    .confirm {
      padding: 0.1rem 0;
      float: right;
      font-size: 0.14rem;
      color: #3770fb;
    }
  }
  .van-cell__value {
    line-height: 0.48rem;
  }
}
</style>
