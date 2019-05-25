<template>
  <div id="class-manage-popups">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="新增班级" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-from">
      <van-field v-model="className" label="班级名称：" placeholder="请输入班级名称" border/>
      <van-field v-model="theirTeacherInfo.name" label="主教师：" placeholder="请输入主教师" border
                 readonly
                 right-icon="arrow"
                 @click-right-icon="onActivateSlecteTeacher"/>
      <van-field
        v-model="classStudents"
        label="学生入班："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click-right-icon="onActivateSlecte"
      />
    </div>
    <div class="select-menu">
      <van-actionsheet v-model="showTeacher" :actions="teacherArr" @select="onSelectTeacher"/>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="btn">
        <span class="cancel" @click="cancelStudent">取消</span>
        <span class="confirm" @click="confirmStudent">确定</span>
      </div>
      <van-checkbox-group v-model="checkStudent">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in studentsArr"
            clickable
            :key="item.id"
            :title="`${item.name}`"
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
  Toast,
} from "vant";
import FooterBtn from '../../common/footer-operate-btn';
import { getTeacherList } from '@/api/school/teacher-manage'
import { getStudentList } from '@/api/school/student-manage'
import { addClass } from '@/api/school/class-manage'

export default {
  name: "class-manage-popups",
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
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      show: false,//学生菜单显示
      showTeacher: false,//教师上拉菜单显示
      className: "",//保存班级名称
      //保存选择的教师信息
      theirTeacherInfo: {
        id: "",
        name: "",
      },
      classStudents: "",//显示选择的学生
      btnText: [
        {
          type: 1,
          title: "确定",
        },
        {
          type: 2,
          title: "取消",
        },
      ],
      //所有教师列表
      teacherArr: [],
      //所有学生 列表
      studentsArr: [],
      checkStudent: [],//保存选中的学生的id
    };
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onActivateSlecte() {
      this.show = true;
    },
    cancelStudent() {
      this.show = false;
    },
    confirmStudent() {
      this.show = false;
      let check = [];
      for (let i of this.checkStudent) {
        for (let v of this.studentsArr) {
          if (i === v.id) {
            check.push(v.name)
          }
        }
      }
      this.classStudents = check.join(',');
    },
    onSelectTeacher(item) {
      this.showTeacher = false;
      this.theirTeacherInfo.name = item.name;
      this.theirTeacherInfo.id = item.id;
    },
    //显示教师菜单
    onActivateSlecteTeacher() {
      this.showTeacher = true
    },
    operateBtn(type) {
      if (type === 1) {
        this.addClass()
      } else if (type === 2) {
        this.$router.push({ name: "ClassManage" });
      }
    },
    //获取 学生列表
    selectStudentList() {
      getStudentList({ page: 0 })
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.list.length > 0) {
              this.studentsArr = [];
              for (let item of res.data.data.list) {
                if (item.classId) {
                  this.studentsArr.push({
                    id: item.id,
                    name: item.name,
                  })
                }
              }
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //获取 教师列表
    selectTeacherList() {
      getTeacherList({ page: 0 })
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {

            if (res.data.data.list.length > 0) {
              this.teacherArr = [];
              for (let item of res.data.data.list) {
                let bool = true;
                if (item.class) {
                  bool = true
                } else {
                  bool = false
                }
                this.teacherArr.push({
                  name: item.name,
                  id: item.id,
                  disable: bool,
                })
              }
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //新增班级
    addClass() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认新增班级！',
      }).then(() => {

        addClass({
          name: this.className,
          mainTeacher: this.theirTeacherInfo.id,
          students: this.checkStudent,
        })
          .then(res => {
            if (res.data.meta && res.data.meta.code === 0) {

              Toast.success({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'success',
                message: '新增班级成功',
              });
              const timer = setInterval(() => {
                clearInterval(timer);
                Toast.clear();
                this.$router.push({ name: "ClassManage" });
              }, 2000);
            } else {
              this.$dialog.alert({
                message: '新增异常！',
              }).then(() => {
                // on close
              });
            }
          }).catch(() => {
          throw new Error("异常！")
        })
      }).catch(() => {
        // on cancel
      });
    },
  },
  created() {
    //alert(this.$route.params.id)
    this.selectTeacherList();
    this.selectStudentList();
  },
};
</script>

<style scoped lang="less">
#class-manage-popups {
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
}
</style>
