<template>
  <div id="class-director-add">
    <!--考勤关联教师-->
    <div class="go-back">
      <van-nav-bar title="修改教师信息" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-from">
      <van-field v-model="teacherName" label="教师名称：" maxlength="20"  placeholder="请输入教师名称" border/>/>
      <van-field v-model="teacherId" label="教师ID：" type="number"  maxlength="16" placeholder="请输入教师ID" border/>/>
      <van-field
        v-model="primaryClass"
        label="教师主班级："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click-right-icon="openPrimaryClassSlecte"
      />
      <van-field
        v-model="ancillaryClass"
        label="教师副班级："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click-right-icon="openAncillaryClassSlecte"
      />
    </div>
    <div class="select-menu">
      <van-actionsheet
        v-model="showprimaryClass"
        :actions="primaryClassList"
        @select="onPrimaryClassSlecte"
      />
    </div>
    <van-popup v-model="showAncillaryClass" position="bottom">
      <div class="btn">
        <span class="cancel" @click="cancelAncillaryClass">取消</span>
        <span class="confirm" @click="confirmAncillaryClass">确定</span>
      </div>
      <van-checkbox-group v-model="checkAncillaryClass">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in AncillaryClassList"
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
  Toast
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { classList } from '@/api/school/class-manage'
import { getTeacherInfo, updateTeacher } from '@/api/school/teacher-manage'

export default {
  name: "class-director-add",
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
      showprimaryClass: false, //主班级列表默认隐藏
      showAncillaryClass: false, //副班级列表默认隐藏
      teacherName: "", //教师名称
      teacherId: "", //教师id
      btnText: [
        {
          type: 1,
          title: "确定"
        },
        {
          type: 2,
          title: "取消"
        }
      ],
      primaryClassList: [], //主班级列表
      primaryClassId: null, //选中的主班级id
      primaryClass: "", //选中主班级显示
      ancillaryClass: "", //选中副班级显示
      AncillaryClassList: [], //副班级列表回显
      checkAncillaryClass: [] //副班级列表选中项
    };
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    //主班级选择显示
    openPrimaryClassSlecte() {
      this.showprimaryClass = true;
    },
    //主班级选择
    onPrimaryClassSlecte(item) {
      this.showprimaryClass = false;
      this.primaryClass = item.name;
      this.primaryClassId = item.id;
    },
    //主班级选择显示
    openAncillaryClassSlecte() {
      this.showAncillaryClass = true;
    },
    //副班级选择取消
    cancelAncillaryClass() {
      this.showAncillaryClass = false;
    },
    //副班级选择确认
    confirmAncillaryClass() {
      this.showAncillaryClass = false;
      let check = [];

      for (let i of this.checkAncillaryClass) {
        for (let v of this.AncillaryClassList) {
          if (i === v.id) {
            check.push(v.name);
          }
        }
      }

      this.ancillaryClass = check.join(",");
    },
    operateBtn(type) {
      if (type === 1) {
        this.mdfTeacher();
      } else if (type === 2) {
        this.$router.push({ name: "TeacherManage" });
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
    //获取教师信息
    getTeacherInfo() {
      let id = this.$route.query.id;
      return new Promise((resolve, reject) => {
        getTeacherInfo(id)
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
    //修改教师
    mdfTeacher() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认修改该教师信息！"
        })
        .then(() => {
          this.$loading();
          let id = this.$route.query.id;
          updateTeacher(id, {
            name: this.teacherName,         //学生教师
            cardNo: this.teacherId, //教师ID
            mainClass: this.primaryClassId,  //主班级ID
            viceClasses: this.checkAncillaryClass //副班级ID数组
          })
            .then(res => {
              if (res.data.meta && res.data.meta.code === 0) {
                this.$loadingHide();
                Toast.success({
                  duration: 0, // 持续展示 toast
                  forbidClick: true, // 禁用背景点击
                  loadingType: "success",
                  position:'middle',
                  message: "修改教师成功"
                });
                const timer = setInterval(() => {
                  clearInterval(timer);
                  Toast.clear();
                  this.$router.push({ name: "TeacherManage" });
                }, 2000);
              } else {
                this.$dialog
                  .alert({
                    message: "修改异常！"
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
  },
  created() {
    Promise.all([
      this.selectClassList(),
      this.getTeacherInfo(),
    ]).then(res => {
      this.$loadingHide();
      //班级列表数据处理
      if (res[0].length > 0) {
        this.classNameList = [];
        for (let item of res[0]) {
          if (item.id) {
            this.AncillaryClassList.push({
              id: item.id,
              name: item.name
            });
            this.primaryClassList.push({
              id: item.id,
              name: item.name
            });
          }
        }
      }
      //教师个人信息数据处理
      if (res[1]) {
        this.teacherName = res[1].name;
        this.teacherId = res[1].cardNo;
        if (res[1].class) {
          this.primaryClassId = res[1].class.id;
          this.primaryClass = res[1].class.name;
        }
        for (let item of res[1].viceClasses) {
          this.checkAncillaryClass.push(item.id);
        }
        let check = [];

        for (let i of this.checkAncillaryClass) {
          for (let v of this.AncillaryClassList) {
            if (i === v.id) {
              check.push(v.name);
            }
          }
        }
        this.ancillaryClass = check.join(",");
        if (this.checkAncillaryClass.length == 0) {
          this.ancillaryClass = null;
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
#class-director-add {
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
}
</style>
