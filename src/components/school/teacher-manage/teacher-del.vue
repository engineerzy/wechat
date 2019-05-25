<template>
  <div id="class-director-del">
    <div class="go-back">
      <van-nav-bar title="删除教师" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-director-select">
      <van-row>
        <van-col span="12">
          <div class="select-text">{{primaryClass}}</div>
          <van-icon name="arrow-down" @click="openPrimaryClassSlecte"/>
        </van-col>
        <van-col span="12">
          <div class="select-text">{{ancillaryClass}}</div>
          <van-icon name="arrow-down" @click="openAncillaryClassSlecte"/>
        </van-col>
      </van-row>
    </div>
    <div class="role-info">
      <van-row>
        <van-col span="6">共位{{totalNumber}}教师</van-col>
        <van-col span="18">
          <form action="/">
            <van-search
              v-model="value"
              placeholder="请输入搜索的教师名称"
              show-action
              @search="onSearch"
              @cancel="onCancel"
            />
          </form>
        </van-col>
      </van-row>
    </div>
    <div class="role-list">
      <ul>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-radio-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item,index) in teacherList"
                :key="index"
                clickable
                @click="result=item.id"
              >
                <li class="role-list-item">
                  <van-row>
                    <van-col span="4">
                      <img :src="item.image" alt>
                    </van-col>
                    <van-col span="18">
                      <van-row>
                        <van-col span="6" style=" overflow: scroll;white-space: nowrap;">
                          <span>{{item.name}}</span>
                        </van-col>
                        <van-col span="9">
                          主班级:
                          <span v-if="item.class">{{item.class.name}}</span>
                          <span v-if="!item.class">
                              <i class="active">未分配</i>
                            </span>
                        </van-col>
                        <van-col span="9" style="text-align:right">{{item.cardNo}}</van-col>
                      </van-row>
                      <van-row>
                        <van-col span="12">账号:{{item.phone}}</van-col>
                        <van-col span="12" style="text-align:right">
                          绑定状态:
                          <i :class="item.isBind?'':'active'">{{item.isBind ? "已绑定" : '未绑定'}}</i>
                        </van-col>
                      </van-row>
                      <van-row>
                        <van-col span="24">
                          副班级：
                          <span v-if="item.viceClasses.length==0">
                              <i class="active">未分配</i>
                            </span>
                          <span
                            v-for="(item1,index) in item.viceClasses"
                            :key="index"
                          >{{item1.name}}</span>
                        </van-col>
                      </van-row>
                    </van-col>
                    <van-col span="2">
                      <van-radio :name="item.id"/>
                    </van-col>
                  </van-row>
                </li>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-list>
      </ul>
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
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  List,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Row,
  Col,
  Search,
  Popup,
  Checkbox,
  CheckboxGroup,
  Actionsheet,
  Toast,
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { classList } from '@/api/school/class-manage'
import { deleteTeacher, getTeacherList } from '@/api/school/teacher-manage'

export default {
  name: "class-director-del",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      loading: false,
      finished: false,
      totalNumber: "",
      value: "",
      showprimaryClass: false, //主班级列表默认隐藏
      showAncillaryClass: false, //副班级列表默认隐藏
      primaryClassList: [], //主班级列表
      primaryClassId: null, //选中的主班级id
      primaryClass: "全部主班级", //选中主班级显示
      ancillaryClass: "全部副班级", //选中副班级显示
      AncillaryClassList: [], //副班级列表回显
      checkAncillaryClass: [], //副班级列表选中项
      teacherList: [], //教师列表
      btnText: [
        {
          type: 1,
          title: "删除教师",
        },
      ],
      page: 1, //当前页
      pageSize: 20, //每页数据
      totalPage: 0, //保存总页数
      classListArr: [],
      result: "",
    };
  },
  methods: {
    onLoad() {
      //this.page = this.page + 1;
      this.getTeacherList();
    },
    //搜索
    onSearch() {
      // this.studentList= [];
      this.page = 1;
      this.finished = false;
      this.teacherList = [];
      //this.getTeacherList();
    },
    //底部按钮
    operateBtn() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除当前选中的教师？",
        })
        .then(() => {
          // on confirm
          this.delTeacher(this.result);
        })
        .catch(() => {
          // on cancel
        });
    },
    //搜索取消
    onCancel() {
    },
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
      this.page = 1;
      this.finished = false;
      this.teacherList = [];
      //this.getTeacherList();
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
      if (this.checkAncillaryClass.length == 0) {
        this.ancillaryClass = "全部副班级";
      }
      this.page = 1;
      this.finished = false;
      this.teacherList = [];
      //this.getTeacherList();
    },
    //获取班级列表
    selectClassList() {
      classList({ page: 0, all: true })
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.list.length > 0) {
              this.AncillaryClassList = [];
              this.primaryClassList = [{ id: 0, name: "全部主班级" }];
              for (let item of res.data.data.list) {
                if (item.id) {
                  this.AncillaryClassList.push({
                    id: item.id,
                    name: item.name,
                  });
                  this.primaryClassList.push({
                    id: item.id,
                    name: item.name,
                  });
                }
              }
            }
          }
        })
        .catch(() => {
          throw new Error("异常！");
        });
    },
    //获取教师列表
    getTeacherList() {
      getTeacherList({
          page: this.page,
          pageSize: this.pageSize,
          query: this.teacherName,
          mainClass: this.primaryClassId,
          viceClasses: this.checkAncillaryClass,
      })
        .then(res => {
          if (res.data.meta && res.data.meta.code === 0) {
            this.totalNumber = res.data.data.paginate.total; //学生总数
            this.totalPage = res.data.data.paginate.totalPage;
            if (res.data.data.list.length > 0) {
              this.teacherList.push.apply(this.teacherList,res.data.data.list); //教师列表
              this.loading = false;
              if (this.page === this.totalPage) {
                this.finished = true;
              } else {
                this.page = this.page + 1;
              }

            }else if (res.data.data.list.length === 0) {
              this.loading = false;
              this.finished = true;
            }
          }
        })
        .catch(() => {
          throw new Error("异常！");
        });
    },
    //删除教师
    delTeacher(id) {
      this.$loading();
      deleteTeacher(id)
        .then(res => {
          this.$loadingHide();
          if (res.data.meta && res.data.meta.code === 0) {
            this.page = 1;
            this.finished = false;
            this.teacherList = [];
            //this.getTeacherList();
            Toast.success("删除成功");
          } else {
            Toast.success("删除失败");
          }
        })
        .catch(() => {
          this.$loading();
          throw new Error("异常！");
        });
    },
  },
  created() {
    //alert(this.$route.params.id)
    //this.statisticalInfo();
    this.selectClassList();
  },
  computed: {
    teacherNum() {
      return len => {
        return (parseInt(len) + 1).toFixed(0);
      };
    },
  },
};
</script>

<style scoped lang="less">
#class-director-del {
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

  .class-director-select {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .select-text {
      float: left;
      width: 62%;
      text-align: right;
      white-space: nowrap;
      overflow: auto;
    }

    .van-icon {
      left: -0.28rem;
    }
  }

  .role-info {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .van-search {
      padding: 0.06rem 0.16rem;
    }
  }

  .role-list {
    padding: 0 0.16rem 0.4rem;
    text-align: center;
    /*height: 0.48rem;*/
    /*line-height: 0.48rem;*/
    color: #666;

    .van-cell {
      text-align: center;
      padding: 0;
      line-height: 0.48rem;
      font-size: 0.12rem;

      .role-list-item {
        .van-row {
          padding: 0.1rem 0;
          border-bottom: 1px solid #f3f7f8;

          .van-col {
            /*height: 0.48rem;*/

            .van-row {
              padding: 0;
              padding-left: 0.1rem;
              border-bottom: 0;
              text-align: left;
              color: #999;

              .van-col {
                /*height: 0.17rem;*/

                span {
                  color: #333;
                }

                i {
                  font-style: normal;
                }

                i.active {
                  font-style: normal;
                  color: #d80000;
                }
              }

              .van-col:last-child {
                text-align: left;
              }
            }

            .van-row:first-child {
              color: #666;
            }

            img {
              width: 0.48rem;
              height: 0.48rem;
              border-radius: 50%;
              border: 1px solid #f3f7f8;
            }

            .van-radio {
              text-align: right;
              line-height: 0.48rem;
            }
          }

          .van-col:nth-child(2) {
            line-height: 0.16rem;
          }
        }
      }
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
