<template>
  <div id="replace-teacher">
    <!--教师列表-->
    <div class="go-back">
      <van-nav-bar title="更换主教师" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="teacher-list" v-if="teacherListArr.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-radio-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in teacherListArr"
              :key="index"
              clickable
              @click="result=item.id"
            >
              <van-row>
                <van-col span="4">
                  <div class="awator">
                    <img :src="item.image" alt="">
                  </div>
                </van-col>
                <van-col span="18">
                  <div class="info">
                    <span class="name">{{item.name}}</span>
                    <span class="main-class">主班级：未分配</span>
                    <span class="num">{{item.cardNo}}</span>
                  </div>
                  <div class="info">
                    <span class="account">账号：{{item.account}}</span>
                    <span class="bind">绑定状态：{{item.isBind ? '已绑定':'未绑定'}}</span>
                  </div>
                  <div class="info">
                    <span class="vice-class">副班级：</span>
                  </div>
                </van-col>

                <van-col span="2">
                  <span class="radio-box">
                    <van-radio :name="item.id"/>
                  </span>

                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, List, RadioGroup, Radio, Cell, CellGroup, Row, Col, Toast } from "vant";
import FooterBtn from '../../common/footer-operate-btn'
import { replaceTeacher } from '@/api/school/class-manage'
import { getTeacherList } from '@/api/school/teacher-manage'

export default {
  name: "replace-teacher",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
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
          title: '更换主教师',
        },
      ],
      page: 1,//当前页
      pageSize: 20,//每页数据
      totalPage: 0,//保存总页数
      teacherListArr: [],
      result: '',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    //获取教师列表
    selectTeacherList() {

      getTeacherList({ page: 0 })
        .then(res => {
        //console.log(res);

        if (res.data.meta && res.data.meta.code === 0) {
          let d = res.data.data.list;
          for (let item of d) {
            if (!item.class) {
              this.teacherListArr.push(item)
            }
          }
        }
      }).catch(() => {

        throw new Error("异常！")
      })
    },
    onLoad() {
      this.selectTeacherList();
      this.loading = false;
      this.finished = true;
    },
    operateBtn() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定选择当前的教师做主教师？',
      }).then(() => {
        // on confirm
        this.replaceTeacher();
      }).catch(() => {
        // on cancel
      });
    },
    //更换主教师
    replaceTeacher() {

      replaceTeacher(this.$route.params.id, { id: this.result })
        .then(res => {

          if (res.data.meta && res.data.meta.code === 0) {
            Toast.success("更换主教师成功");
            this.$router.push({ name: 'ClassManageClassDetail', params: { id: this.$route.params.id } })
          } else {
            Toast.fail("更换主教师失败")
          }
        }).catch(() => {

        throw new Error("异常！")
      })
    },
  },
}
</script>

<style scoped lang="less">
#replace-teacher {
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

  .teacher-list {
    position: relative;

    .awator {
      width: 0.5rem;
      height: 0.5rem;
      margin-top: 0.1rem;

      img {
        width: 100%;
        height: 100%;
        float: left;
      }
    }

    .info {
      display: flex;

      span {
        flex: 1;
        font-size: 0.12rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .name {
        color: #333;
      }

      .num, .bind {
        text-align: right;
      }
    }

    .radio-box {
      text-align: right;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
