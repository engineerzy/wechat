<template>
  <div id="grade-detail">
    <div class="go-back">
      <van-nav-bar
        title="班级详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="basci-info">
      <div class="b-left info">
        <p>班级名称： <span>{{detail.name}}</span></p>
        <p>主教师： <span><img src="../../../assets/img/parents/index/banner2.png" alt=""> {{detail.mainTeacher ? detail.mainTeacher.name : '暂无'}}</span>
        </p>
      </div>
      <div class="b-right info">
        <p>学生数量： <span>{{studentList.length}}位学生</span></p>
        <p>副教师： <span>{{teacherName(detail.viceTeachers)}}</span></p>
      </div>
    </div>
    <div class="interval-box"></div>
    <div class="all-grade-list">
      <div class="c-search">
        <div class="according-scope">显示范围： <span>全部年级 <van-icon name="arrow-down"/></span></div>
        <div class="search-box">
          <van-search
            v-model="searchVal"
            placeholder=""
            @search="onSearch"
          />
          <!--<span><van-icon name="search" size="0.12rem"/></span>
          <input type="text">-->
          <!--<van-cell-group>
              <van-field
                      v-model="searchVal"
                      clearable
                      border
                      left-icon="search"
              />
          </van-cell-group>-->
        </div>
      </div>
      <SchoolList :student-list="studentList"></SchoolList>
    </div>

    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Field, Icon, Search } from 'vant';
import SchoolList from '../components/student-list';
import FooterBtn from '../../common/footer-operate-btn'
import { selectClassDetail } from '@/api/school/class-manage'

export default {
  name: "school-class-detail",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Field.name]: Field,
    SchoolList: SchoolList,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      searchVal: "",
      btnText: [
        {
          type: 1,
          title: '新学生入班',
        },
        {
          type: 2,
          title: '更换教师',
        },
      ],
      detail: {},
      studentList: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    onSearch() {
      //alert(1)
    },
    operateBtn(type) {
      if (type === 1) {
        this.$router.push({ name: 'ClassManageClassDetailBox', params: { id: this.$route.params.id } })
      } else if (type === 2) {
        this.$router.push({ name: 'ClassManageReplaceTeacher', params: { id: this.$route.params.id } })
      }
    },
    //获取班级详情
    selectClassDetail() {
      this.$loading()
      //${this.$route.params.id}
      selectClassDetail(this.$route.params.id)
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            this.detail = res.data.data;
            this.studentList = res.data.data.students;
            this.$loadingHide()
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
  },
  created() {
    //console.log(this.$route)
    this.selectClassDetail()
  },
  computed: {
    teacherName() {
      return (teacher) => {
        let aName = [];
        if (teacher && teacher.length > 0) {
          for (let i of teacher) {
            aName.push(i.name)
          }
          return aName.join(',')
        } else {
          return '';
        }
      }
    },
    studentNum() {
      return this.detail.students.length
    },
  },
}
</script>

<style scoped lang="less">
@font14: 0.14rem;
@font16: 0.16rem;
@lineH: 0.2rem;
@color999: #999;
@color666: #666;
@colorfff: #fff;
@bgfff: #fff;
@bg: #F3F7F8;
#grade-detail {
  .go-back {
    .van-nav-bar {
      background-color: #3770FB;

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

  .basci-info {
    overflow: hidden;
    padding: @font16 0 @font14 0;
    box-sizing: border-box;
    background-color: #fff;

    .b-left {
      width: 1.72rem;
      padding-left: @font16;
      box-sizing: border-box;

      img {
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.1rem;

      }
    }

    .b-right {
      width: 2.03rem;
    }

    .info {
      float: left;

      p {
        font-size: @font14;
        color: @color666;
        line-height: @lineH;

        span {
          color: @color999;
        }
      }

      p:first-child {
        margin-bottom: 0.07rem;
      }
    }
  }

  .interval-box {
    background-color: @bg;
    width: 100%;
    height: 0.1rem;
  }

  .all-grade-list {
    padding: 0 0 0.41rem @font16;
    background-color: #fff;
    box-sizing: border-box;

    .c-search {
      margin-bottom: 0.26rem;
      overflow: hidden;

      .according-scope {
        float: left;
        padding: 0.1rem 0;
        font-size: @font14;
        line-height: 0.34rem;
        color: @color666;
        box-sizing: border-box;
      }

      .search-box {
        float: right;
        width: 1.76rem;
        font-size: 0;
        position: relative;
        /*input{
            width: 100%;
            height: 0.24rem;
            line-height: 0.22rem;
            border: 0.01rem solid #bcbcbc;
            border-radius:0.04rem ;
            padding-left: 0.2rem;
            background-color: #fff;
            box-sizing: border-box;
        }
        >span{
            position: absolute;
            top: 0.06rem;
            left: 0.06rem;
        }*/
      }
    }
  }

  .bot-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770FB;
    box-sizing: border-box;

    a {
      float: left;
      width: 50%;
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.24rem;
      color: #fff;
    }

    .add-grade {
      border-right: 0.01rem solid #fff;
      box-sizing: border-box;
    }
  }
}
</style>
