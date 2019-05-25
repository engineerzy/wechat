<template>
  <div id="statistical">
    <div class="go-back">
      <van-nav-bar
        :title="navTitle"
        left-text="返回"
        :right-text="navbtn"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="trust-box">
      <TrustList :trust-list="trustList" v-on:attendanceType="attendanceTypep"></TrustList>
    </div>
    <div class="stat-list">
      <ClassTitleList :class-list="classListData" v-on:classGrade="tabClass"></ClassTitleList>
      <UnsignedList :unsign-list="unsignList" v-on:updateRemark="updateList"></UnsignedList>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant';
import TrustList from '../components/trust-type';
import UnsignedList from '../components/unsigned-list'
import ClassTitleList from '../components/class-list'
import { getAttendanceType } from '@/api/school/attendance-type-manage'
import { classList } from '@/api/school/class-manage'
import { unsignedStudent } from '@/api/school/attendance'

export default {
  name: "statistical",
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    TrustList: TrustList,
    UnsignedList: UnsignedList,
    ClassTitleList: ClassTitleList,
  },
  data() {
    return {
      navTitle: '未进园学生统计',
      navbtn: '切换离园',
      currentClass: 0,
      type: 1,//当前页面的状态 1 进园 2 离园
      attendanceId: 0,//保存当前考勤类型的id
      currentClassId: 0,//保存当前选中班级的id
      trustList: [],//考勤类型
      unsignList: [],//查询的学生列表
      classListData: [],//班级列表
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    onClickRight() {
      if (this.navbtn === '切换离园') {
        this.navbtn = '切换进园';
        this.navTitle = '未离园学生统计';
        this.type = 2;
        this.getAttendanceType();
      } else if (this.navbtn === '切换进园') {
        this.navbtn = '切换离园';
        this.navTitle = '未进园学生统计';
        this.type = 1;
        this.getAttendanceType();
      }
    },
    //获取考勤类型与时间
    getAttendanceType() {

      getAttendanceType()
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.length > 0) {
              this.trustList = [];
              if (this.type === 1) {//进园
                for (let item of res.data.data) {
                  this.trustList.push({
                    id: item.id,
                    name: item.name,
                    time: `${item.entryTimeStart}-${item.entryTimeEnd}`,
                  })
                }
              } else if (this.type === 2) {//离园
                for (let item of res.data.data) {
                  this.trustList.push({
                    id: item.id,
                    name: item.name,
                    time: `${item.exitTimeStart}-${item.exitTimeEnd}`,
                  })
                }
              }
              this.attendanceId = this.trustList[0].id;
              //获取班级列表
              this.getClassList();
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //获取班级列表
    getClassList() {
      classList({ page: 0, all: true })
        .then(res => {
        //console.log(res);
        if (res.data.meta && res.data.meta.code === 0) {
          if (res.data.data.list.length > 0) {
            let list = res.data.data.list;
            for (let item = 0; item < list; item++) {
              list[item]["types"] = item
            }
            this.classListData = list;
            this.currentClassId = this.classListData[0].id;
            this.getStudentList(this.attendanceId, this.currentClassId, this.type)
          }
        }
      }).catch(() => {
        throw new Error("异常！")
      })
    },
    //获取 未进园，离园 的学生列表
    getStudentList(attendanceTypeId, classId, type, b) {
      unsignedStudent(attendanceTypeId, classId, type)
        .then(res => {
        //console.log(res);
        if (res.data.meta && res.data.meta.code === 0) {
          if (res.data.data.students.length > 0) {
            this.unsignList = res.data.data.students
          }
        }

      }).catch(() => {
        throw new Error("异常！")
      })
    },
    //根据班级id 获取学生列表
    tabClass(data) {
      this.currentClassId = data.id;
      this.currentClass = data.active;
      this.getStudentList(this.attendanceId, this.currentClassId, this.type, 1)
    },
    //切换考勤类型 获取数据
    attendanceTypep(item) {
      this.attendanceId = item.id;
      this.getStudentList(this.attendanceId, this.currentClassId, this.type, 1)
    },
    // 修改学生备注 更新列表
    updateList() {
      this.getStudentList(this.attendanceId, this.currentClassId, this.type, 1)
    },

  },
  created() {
    //初始页面获取 进园 类型
    this.getAttendanceType();
  },
}
</script>

<style scoped lang="less">
#statistical {
  font-size: 0;

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

  .trust-box {
    padding-top: 0.17rem;
    height: 0.72rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  .stat-list {
    padding: 0.05rem 0.16rem 0;
    background-color: #fff;
    box-sizing: border-box;
  }
}

</style>
