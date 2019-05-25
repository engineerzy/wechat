<template>
  <div class="teacher">
    <component
      v-for="(item, index) in data"
      :key="index"
      :is="item.type"
      :title="item.name"
      :extra="item.extra" />
  </div>
</template>

<script>
import SchoolInfo from './components/school-info'
import Achievement from './components/achievement'
import MyStudent from './components/my-student'
import StudentBirthday from './components/student-birthday'
import Attendance from './components/attendance'
import Homework from './components/homework'
import SafflowerComment from './components/safflower-comment'
import GuestConsult from './components/guest-consult'
import GuestConsultThisWeek from './components/guest-consult-this-week'
import LatestCommunity from './components/latest-community'

export default {
  name: 'TeacherHomeIndex',
  components: {
    SchoolInfo,
    Achievement,
    MyStudent,
    StudentBirthday,
    Attendance,
    Homework,
    SafflowerComment,
    GuestConsult,
    GuestConsultThisWeek,
    LatestCommunity,
  },
  computed: {
    data() {
      const availableComponents = Object.keys(this.$options.components)
      let data = this.$store.getters['teacherHome/getTeacherHomeIndexData']
      data = data.filter(item => {
        item.type = item.type.substring(0, 1).toUpperCase() + item.type.substring(1)
        return availableComponents.includes(item.type)
      })
      return data
    }
  }
};
</script>

<style scoped lang="less">
.teacher {
  margin-bottom: 0.58rem;
  font-size: 0;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  background: url('../../../../src/assets/img/parents/index/bg.png') no-repeat center;
  background-size: cover;
  border-top: solid transparent;
  background-size: 100% 2.2rem;
  background-position: 0 0;

  .content {
    /*margin: 0.32rem 0 0 0;*/
    font-size: 0;
    background-color: #f3f7f8;
    .title {
      font-size: 0.14rem;
      line-height: 0.28rem;
      margin: 0 0.45rem 0;
      text-align: center;
      border-radius: 1rem;
      color: #fff;
      background-color: #3770fb;
      box-sizing: border-box;
    }
    .list {
      padding: 0.16rem 0.15rem;
      background-color: #fff;
      margin-bottom: 0.1rem;
      box-sizing: border-box;
      #icon-title {
        display: inline-block;
        margin-bottom: 0.15rem;
        .theme {
          line-height: 0.22rem;
          .icons {
            font-size: 0.16rem;
            position: relative;
            top: 0.02rem;
          }
          .text {
            font-size: 0.16rem;
            font-weight: 500;
            margin-left: 0.08rem;
            color: #333;
          }
        }
      }
    }
    .list:last-child {
      margin-bottom: 0;
    }
    .homework-content {
      .teacher-check {
        margin-top: 0.33rem;
        overflow: hidden;
        line-height: 0.2rem;
        .left {
          float: left;
          font-size: 0.14rem;
        }
        .check-text {
          color: #666;
          margin-left: 0.04rem;
        }
        .right {
          float: right;
          font-size: 0.14rem;
          color: #999;
        }
      }
    }
    .flower-content {
      .flower-main {
        overflow: hidden;
        .reward-flower {
          float: left;
          width: 50%;
          box-sizing: border-box;
          .flower {
            word-wrap: break-word;
            width: 100%;
            margin-bottom: 0.15rem;
            padding-right: 0.24rem;
            border-right: 0.01rem solid #f1f1f1;
            box-sizing: border-box;
            span {
              font-size: 0.16rem;
              margin-left: 0.02rem;
              .highlight {
                font-size: 0.16rem;
                color: #d80000;
              }
              .lowlight {
                font-size: 0.16rem;
                color: #ff8700;
              }
            }
          }
          .flower-text {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            padding-left: 0.02rem;
          }
        }
        .punishment-flower {
          float: left;
          width: 50%;
          box-sizing: border-box;
          .flower {
            word-wrap: break-word;
            width: 100%;
            margin-bottom: 0.15rem;
            padding-left: 0.25rem;
            box-sizing: border-box;
            span {
              font-size: 0.16rem;
              margin-left: 0.02rem;
              .highlight {
                font-size: 0.16rem;
                color: #5f5f5f;
              }
              .lowlight {
                font-size: 0.16rem;
                color: #adadad;
              }
            }
          }
          .flower-text {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
            padding-left: 0.28rem;
          }
        }
      }
    }
  }
  .icon-list {
    .icon-f {
      font-size: 0.16rem;
      color: #f00;
    }
  }
}
.transparent {
opacity: 0;
}
</style>
