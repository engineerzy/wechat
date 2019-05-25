<template>
  <div class="detail-box">
    <div class="go-back">
      <van-nav-bar title="新学生入班" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="tab">
      <div class="item">
        <span>全部年级</span>
        <span class="fonticon" @click="show=true">
          <van-icon name="arrow-down"/>
        </span>
      </div>
      <div class="item">
        <span>全部类型</span>
        <span class="fonticon">
          <van-icon name="arrow-down"/>
        </span>
      </div>
    </div>
    <div class="empty-box"></div>
    <div class="student">
      <p class="total">共{{student.length}}位学生</p>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list-content" v-if="student">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell @click="toggle(index)" v-for="(item,index) in student" :key="index">
                <div class="item">
                  <div class="lt">
                    <img :src="item.src" alt>
                    <span>
                      <span class="name">{{item.name}}</span>
                      <br>
                      <span class="num">分班：未分班</span>
                    </span>
                  </div>
                  <div class="rt">
                    <p class="grade">
                      <span class="text">{{item.grade}}</span>
                      <span class="num">{{item.cardNo}}</span>
                    </p>
                    <span class="type">类型：{{item.attendanceTypes}}</span>
                  </div>
                  <div class="chk">
                    <van-checkbox :name="item.id" ref="checkboxes"/>
                  </div>
                </div>

              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </van-list>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    <!--上拉菜单-->
    <van-actionsheet
      v-model="show"
      cancel-text="取消"
      :actions="actions"
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { NavBar, Icon, Actionsheet, List, Checkbox, CheckboxGroup, Cell, CellGroup, Toast } from "vant";
import FooterBtn from '../../common/footer-operate-btn'
import { distriStudent, divideClass } from '@/api/school/class-manage'

export default {
  name: "class-detail-box",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Actionsheet.name]: Actionsheet,
    [List.name]: List,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      loading: false,
      finished: false,
      show: false,
      result: [],//保存选择的学生id
      btnText: [{ type: 1, title: '确定入班' }],
      actions: [
        /*{
          name: "一年级",
          type: 1
        },
        {
          name: "二年级",
          type: 2
        }*/
      ],
      student: [
        {
          id: 1,
          src: require("../../../assets/img/parents/index/banner2.png"),
          name: "小三",
          classes: "第一班",
          grade: "一年级",
          attendanceTypes: "午托",
          cardNo: "2134",
        },
        {
          id: 2,
          src: require("../../../assets/img/parents/index/banner2.png"),
          name: "小三",
          classes: "第一班",
          grade: "一年级",
          attendanceTypes: "午托",
          cardNo: "2134",
        },
        {
          id: 3,
          src: require("../../../assets/img/parents/index/banner2.png"),
          name: "小三",
          classes: "第一班",
          grade: "一年级",
          attendanceTypes: "午托",
          cardNo: "2134",
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    operateBtn() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定选择学生入班',
      }).then(() => {
        // on confirm
        this.distributionStudent(this.result)
      }).catch(() => {
        // on cancel
      });

    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onSelect() {
      this.show = false;
      // alert(item.type);
    },
    onLoad() {
      this.loading = false;
      this.selectStudent();
      this.finished = true;
    },
    onCancel() {
      this.show = false;
    },
    //获取未分班的学生列表
    selectStudent() {

      divideClass()
        .then(res => {

        if (res.data.meta && res.data.meta.code === 0) {
          if (res.data.data.length > 0) {
            this.student = res.data.data
          }
        }
      }).catch(() => {

        throw new Error("异常！")
      })
    },
    //分配学生
    distributionStudent(stu) {

      distriStudent(this.$route.params.id, { students: stu })
        .then(res => {

          if (res.data.meta && res.data.meta.code === 0) {
            Toast.success("分配成功");
            this.selectStudent();
          } else {
            Toast.success("分配失败")
          }
        }).catch(() => {

        throw new Error("异常！")
      })
    },
  },
};
</script>

<style scoped lang="less">
.detail-box {
  font-size: 0;

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

  .tab {
    display: flex;
    overflow: hidden;
    padding: 0.12rem 0.16rem;
    background-color: #fff;
    box-sizing: border-box;

    .item {
      flex: 1;
      text-align: center;
      font-size: 0.14rem;
      color: #666;
      line-height: 0.2rem;

      .fonticon {
        position: relative;
        top: 0.02rem;
        left: 0.05rem;
      }
    }

    .item:first-child {
      margin-left: 0;
    }
  }

  .empty-box {
    width: 100%;
    height: 0.1rem;
    background-color: #f3f7f8;
  }

  .student {
    padding: 0 0 0.42rem;
    background-color: #fff;
    box-sizing: border-box;

    .total {
      font-size: 0.14rem;
      color: #666;
      text-align: center;
      padding: 0.14rem 0 0.16rem;
      margin: 0 0.16rem;
      line-height: 0.2rem;
      box-sizing: border-box;
      border-bottom: 0.02rem solid #eee;
    }

    .item {
      width: 100%;
      height: 0.69rem;
      padding: 0.08rem 0;
      box-sizing: border-box;
      border-bottom: 0.02rem solid #eee;
      position: relative;

      .lt {
        float: left;
        width: 1.45rem;
        height: 0.5rem;
        border-right: 0.02rem solid #eee;
        box-sizing: border-box;

        img {
          float: left;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.25rem;
          margin-right: 0.11rem;
        }

        .name {
          display: inline-block;
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          margin-top: 0.05rem;
        }

        .num {
          font-size: 0.12rem;
          color: #999;
          line-height: 0.16rem;
        }
      }

      .rt {
        float: left;
        width: 1.7rem;
        padding-left: 0.17rem;
        height: 0.5rem;
        box-sizing: border-box;

        .grade {
          width: 1.7rem;
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          margin-top: 0.05rem;
          overflow: hidden;

          .text {
            float: left;
          }

          .num {
            margin-left: 0.19rem;
          }
        }

        .type {
          font-size: 0.12rem;
          color: #999;
          line-height: 0.16rem;
        }
      }

      .chk {
        float: right;
        width: 0.3rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }

  .fixed-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    background-color: #3770fb;

    .sure-classes {
      float: left;
      width: 100%;
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.14rem;
      color: #fff;
    }
  }
}
</style>
