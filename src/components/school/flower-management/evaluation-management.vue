<template>
  <div id="safflower-score">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar
        title="管理评语"
        left-text="返回"
        right-text="模版库"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="check-btn">
      <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB" @click="tabsReward">
        <van-tab title="奖励红花"></van-tab>
        <van-tab title="扣除红花"></van-tab>
      </van-tabs>
    </div>
    <div class="class-info">
      <div class="stat-list">
        <ClassTitleList :class-list="classListData" v-on:classGrade="tabClass"></ClassTitleList>
      </div>
    </div>
    <div class="type-tab">
      <van-tabs v-model="active" title-active-color="#3770FB" color="transparent" @click="commentTypeTabs">
        <van-tab :title="item.categoryName" v-for="(item,index) in category" :key="index"></van-tab>
      </van-tabs>
    </div>
    <div class="comment-box">
      <div class="tab-items" :style="{width:commentBoxWidth,transform:`translateX(${translateX}rem)`}" @touchstart="ctouchStartX" @touchmove="ctouchMoveX" @touchend="ctouchEndX">
        <div class="comment-content" v-for="(item,index) in currentData" :key="index">
          <span v-if="currentData.length===0||currentData[0].length===0" style="display:block;margin-top: 0.5rem;text-align: center;font-size: 0.2rem">暂无评语请新增</span>
          <van-row gutter="13" >
            <van-col span="24" v-for="(val, idx) in item" :key="idx" >
              <van-button type="default" @click="selectModifyinfo(val.commentId,val.worth)">
                <div class="btn-l">{{reward===0?'+':reward===1?'-':''}} {{val.worth?val.worth:0}}</div>
                <div class="btn-r">{{val.content}}</div>
              </van-button>
            </van-col>
          </van-row>
        </div>

      </div>
      <div class="pages">
        <span v-show="page<pageCount">&lt; &lt; 向左滑动</span>
        <span class="nums"><span>{{page}}</span>/<span>{{pageCount}}</span></span>
        <span v-show="page>1">向右滑动 &gt; &gt;</span>
      </div>
    </div>
    <p class="prompt">点击评语可修改或删除</p>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    <!--修改评语-->
    <van-dialog
        v-model="modify.comment"
        show-cancel-button
        confirm-button-text="确定修改"
        :before-close="submitModifyComment"
    >
      <div class="top-box">
        <span class="title">修改评语</span>
        <span class="del-btn" @click="delComment">删除评语</span>
      </div>
      <van-field v-model="modify.content" type="text" maxlength="15" placeholder="请输入评语内容" />
      <div class="modify-info">
        <div class="list specile-radio">
          <span class="c-title">评语范围：</span>
          <van-radio-group v-model="modify.reward">
            <van-radio name="0">奖励</van-radio>
            <van-radio name="1">扣除</van-radio>
          </van-radio-group>
        </div>
        <div class="list">
          <van-field
              v-model="modify.classString"
              label="评语范围："
              right-icon="arrow-down"
              placeholder="请选择班级"
              readonly
              @click-right-icon="chooseClass"
          />
        </div>
        <div class="list">
          <van-field
              v-model="modify.commentType"
              label="评语类型："
              right-icon="arrow-down"
              placeholder="请选择评语类型"
              readonly
              @click-right-icon="chooseCommentType"
          />
        </div>
      </div>
      <van-field
          v-model="modify.flower"
          type="number"
          maxlength="2"
          clearable
          :label="reward===0?'奖励分值':'扣除分值'"
          placeholder="请输入数字"
          error-message="不可超过99朵"
      >
        <!--<span slot="title" v-text="朵" ></span>-->
      </van-field>
    </van-dialog>
    <!-- 修改评语  班级选择弹出层-->
    <van-popup v-model="modify.classShow" position="bottom" :close-on-click-overlay="false">
      <div class="confirm-class">
        <span class="reject" @click="cancelClassChoose">取消</span>
        <span class="confirm" @click="confirmClassChoose">确定</span>
      </div>
      <van-checkbox-group v-model="modify.classArr">
        <van-cell-group>
          <van-cell
              v-for="(item, index) in classListData"
              clickable
              :key="index"
              :title="item.name"
              @click="toggle(index)"
          >
            <van-checkbox :name="item.id" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!--修改评语  评语类型弹出层  chooseCommentRadio(item.categoryId)-->
    <van-popup v-model="modify.commentTypeShow" position="bottom" >
      <van-radio-group v-model="modify.commentType" @change="chooseCommentRadio">
        <van-cell-group>
          <div class="" v-for="(item,index) in category" :key="index">
            <van-cell :title="item.categoryName" clickable @click="modify.commentType=item.categoryName" >
              <van-radio :name="item.categoryName" />
            </van-cell>
          </div>

        </van-cell-group>
      </van-radio-group>

    </van-popup>

    <!--新增评语-->
    <van-dialog
        v-model="add.comment"
        title="新增评语"
        show-cancel-button
        confirm-button-text="新增评语"
        :before-close="submitAddComment"
    >

      <van-field v-model="add.content" type="text" maxlength="15" placeholder="请输入评语内容" />
      <div class="modify-info">
        <div class="list specile-radio">
          <span class="c-title">评语范围：</span>
          <van-radio-group v-model="add.reward">
            <van-radio name="0">奖励</van-radio>
            <van-radio name="1">扣除</van-radio>
          </van-radio-group>
        </div>
        <div class="list">
          <van-field
              v-model="add.classString"
              label="评语范围："
              right-icon="arrow-down"
              placeholder="请选择班级"
              readonly
              @click-right-icon="addChooseClass"
          />
        </div>
        <div class="list">
          <van-field
              v-model="add.commentType"
              label="评语类型："
              right-icon="arrow-down"
              placeholder="请选择评语类型"
              readonly
              @click-right-icon="addChooseCommentType"
          />
        </div>
      </div>
      <van-field
          v-model="add.flower"
          type="number"
          maxlength="2"
          clearable
          :label="reward===0?'奖励分值':'扣除分值'"
          placeholder="请输入数字"
          error-message="不可超过99朵"
      >
        <!--<span slot="title" v-text="朵" ></span>-->
      </van-field>
    </van-dialog>
    <!--新增评语班级选择弹出层-->
    <van-popup v-model="add.classShow" position="bottom" :close-on-click-overlay="false">
      <div class="confirm-class">
        <span class="reject" @click="addCancelClassChoose">取消</span>
        <span class="confirm" @click="addConfirmClassChoose">确定</span>
      </div>
      <van-checkbox-group v-model="add.classArr">
        <van-cell-group>
          <van-cell
              v-for="(item, index) in classListData"
              clickable
              :key="index"
              :title="item.name"
              @click="toggle(index)"
          >
            <van-checkbox :name="item.id" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!--新增评语评语类型弹出层 -->
    <van-popup v-model="add.commentTypeShow" position="bottom" >
      <van-radio-group v-model="add.commentType" @change="addChooseCommentRadio">
        <van-cell-group>
          <div class="" v-for="(item,index) in category" :key="index">
            <van-cell :title="item.categoryName" clickable @click="add.commentType=item.categoryName" >
              <van-radio :name="item.categoryName" />
            </van-cell>
          </div>

        </van-cell-group>
      </van-radio-group>

    </van-popup>
  </div>
</template>

<script>
import { NavBar, Icon, Button, Row, Col, Tab, Tabs,RadioGroup, Radio,Popup,Checkbox, CheckboxGroup,Field,Cell,CellGroup,Toast } from "vant";
import ClassTitleList from "../components/class-list";
import FooterBtn from '../../common/footer-operate-btn'
import { addComment, deleteComment, getSelectComment, selectFixedCommment, updateComment } from '@/api/school/safflower'
import { getAllClass } from '@/api/common'
export default {
  name: "safflower-score",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Popup.name]:Popup,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Field.name]:Field,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Toast.name]:Toast,
    ClassTitleList: ClassTitleList,
    FooterBtn:FooterBtn,
  },
  data() {
    return {
      classListData:[],
      active:0,//评语类型 下标
      classActive:0,//当前班级下标
      reward:0,//默认奖励类型
      page:1,//滑动翻页 当前页
      pageCount:1,//滑动翻页 总页数
      startX:0,//记录 手指滑动开始 x 位置
      endX:0,//记录 手指滑动离开屏幕的x位置
      disX:0,//记录 滑动的 x 方向的距离
      translateX:0,//每次滑动 需要滑动的固定距离
      category:[],//保存评语类别
      comments:[],//保存 评语类别 对应的 评语列表 数据格式为 {reward:[],deduct:[]}
      currentData:[],//当前页面显示的评语列表
      limit:7,//每页显示数据条数
      btnText:[],//底部按钮
      modify:{
        comment:false,//修改评语
        commentId:null,//修改评语的id
        content:"",//需要修改的评语内容
        reward:'0',//修改范围
        flower:0,//修改的花朵
        classString:'',//选择的班级名称组合
        classArr:[],//选择的班级id
        classShow:false,//班级选择弹出层
        commentTypeShow:false,//评语类型弹出层
        commentType:'',//选择的评语
        conmentTypeId:null,
      },
      add:{//新增评语
        comment:false,
        content:'',
        reward:'0',
        flower:0,
        classString:'',//选择的班级名称组合
        classArr:[],//选择的班级id
        classShow:false,//班级选择弹出层
        commentTypeShow:false,//评语类型弹出层
        commentType:'',//选择的评语类型
        conmentTypeId:null,
      }

    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight(){
      let T = this.$route.params.type;
      this.$router.push({name:'SafflowerCommentLibrary',params:{type:T}})
    },
    tabClass(obj){
      if (this.classActive !== obj.active){
        this.classActive = obj.active;
        this.selectClassComment()
      }
    },
    // 切换 奖励与 扣除
    tabsReward(index){
      if (this.reward !== index){
        this.reward = index;
        this.selectCurrentPage();
      }
    },
    //评语类别切换
    commentTypeTabs(){
        this.selectCurrentPage();
    },
    //获取所有班级
    selectClassList(){
      // this.$route.params.type 1 为教师 2 为 园长
      let num = this.$route.params.type === 1 ? 0 : 1;

      getAllClass(num)
        .then(res=>{
        if (res.status === 200){
          this.classListData = res.data.data;
          //console.log(res)
          //初始化
          this.selectClassComment();
        }else {

        }
      }).catch(()=>{
        throw new Error("异常！")
      })
    },
    //根据 班级id 获取 评语
    selectClassComment(){
      //获取需要查询的班级 id
      this.category = [];
      this.comments = [];
      let classid = this.classListData[this.classActive].id;

      getSelectComment(classid)
        .then(res=>{
        if (res.status === 200){

          for (let item of res.data.data){
            this.category.push({
              categoryId:item.categoryId,
              categoryName:item.categoryName,
            });
            this.comments.push(item.comments)
          }
          this.selectCurrentPage()
        }
      }).catch(()=>{
        throw new Error("异常！")
      })
    },
    //获取当前页面显示的内容
    selectCurrentPage(){
      this.currentData = [];
      let oData = this.comments[this.active];
      this.page = 1;
      this.translateX = 0;
      if (this.reward === 0){
        let len = oData.reward.length;
        this.pageCount = Math.ceil(len/this.limit);
        for (let i=0; i<len; i=i+this.limit){
          //console.log(len);
          this.currentData.push(oData.reward.slice(i,i+this.limit))
        }
      }else if (this.reward === 1){
        let len = oData.deduct.length;
        this.pageCount = Math.ceil(len/this.limit);
        for (let i=0; i<len; i=i+this.limit){
          this.currentData.push(oData.deduct.slice(i,i+this.limit))
        }
      }
     // console.log(this.currentData)
    },
    //评语 左右滑动
    ctouchStartX(ev){
      this.startX = 0;
      ev = ev || event;
      if (ev.touches.length === 1) {
        this.startX = ev.touches[0].clientX;
      }
    },
    ctouchMoveX(ev){
      this.endX = 0;
      this.disX = 0;
      ev = ev || event;
      // console.log(ev);
      //保存最终的 x y
      if (ev.touches.length === 1) {
        this.endX = ev.changedTouches[0].clientX;
        this.disX = this.endX - this.startX;
      }
    },
    ctouchEndX(ev){
      ev = ev || event;
      if (ev.changedTouches.length === 1) {
        //左滑动
        if (this.disX < 0 && Math.abs(this.disX) > 30) {
          //如果可滑动
          if (this.page < this.pageCount){
            this.page = this.page + 1;
            this.translateX = this.translateX - 3.43
          }
        }else if (this.disX > 0 && Math.abs(this.disX) > 30) {//右滑动
          //如果可滑动
          if (this.page > 1){
            this.page = this.page - 1;
            this.translateX = this.translateX + 3.43
          }
        }
      }
    },
    //修改 删除评语
    delComment(){
      this.$dialog.confirm({
        title: '删除评语',
        message: '评语删除后无法撤回，是否确定删除？'
      }).then(() => {
        // on confirm
        this.$loading();
        deleteComment(this.modify.commentId)
          .then(res=>{
          this.$loadingHide();
          console.log(res);
          if (res.status === 200){
            Toast.success("删除成功");
            let timer = setTimeout(()=>{
              this.selectClassComment();
              clearTimeout(timer)
            },2900);
            this.modify.comment = false;
          }
        }).catch(()=>{
          throw new Error("异常！")
        });

      }).catch(() => {
        // on cancel
      });
    },
    //获取修改信息
    selectModifyinfo(id,warth){
      this.$loading();
      selectFixedCommment(id)
        .then(res=>{
        this.$loadingHide();
        if (res.status === 200){
          let d = res.data.data;
            this.modify.commentId=d.commentId;
            this.modify.content=d.text;
            this.modify.reward=d.fsafc_type==='1'?'0':'1';
            this.modify.flower=warth;
            this.modify.classArr=d.clsId;
            this.modify.conmentTypeId=d.categoryId;
          for (let item of this.category){
            if (item.categoryId === d.categoryId){
              this.modify.commentType = item.categoryName;
            }
          }
          this.confirmClassChoose();//班级选择显示框
          this.modify.comment = true;
        }else {
          Toast.fail("数据异常！")
        }
      }).catch(()=>{
        throw new Error("异常！")
      });
    },
    //提交修改评语
    submitModifyComment(action,done){
      if (action === 'confirm'){
        this.$loading();
        updateComment(this.modify.commentId, {
          categoryId:this.modify.conmentTypeId,
          clsId:this.modify.classArr,
          text:this.modify.content,
          worth:parseInt(this.modify.flower),
          type:this.modify.reward==='0'?1:2,
        })
          .then(res=>{
          this.$loadingHide();
          console.log(res);
          if (res.status === 200){
            done();
            Toast.success("修改成功");
            let timer = setTimeout(()=>{
              this.selectClassComment();
              clearTimeout(timer)
            },2900);
            /*this.modify.comment = false;*/
          }
        }).catch(()=>{
          throw new Error("异常！")
        });
      }else {
        done()
      }
    },
    //选择班级
    chooseClass(){
      this.modify.classShow = true;
    },
    //取消选择班级弹出框
    cancelClassChoose(){
      this.modify.classShow = false;
    },
    //确认选择班级
    confirmClassChoose(){
      let s = [];
      if (this.modify.classArr.length === 0){
        for (let val of this.classListData){
          this.modify.classArr.push(val.id)
        }
      }
      for (let item of this.modify.classArr){
        for (let val of this.classListData){
          if (item === val.id){
            s.push(val.name)
          }
        }
      }
      this.modify.classString = s.join(',');
      this.modify.classShow = false;
    },
    //选中评语类型
    chooseCommentType(){
      this.modify.commentTypeShow = true;
    },
    // 评语类型选择 保存id
    chooseCommentRadio(name){
      //console.log(name)
      for (let item of this.category){
        if (item.categoryName === name){
          this.modify.conmentTypeId = item.categoryId;
        }
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //提交新增评语 type 1  新增 2 是 跳转评语类型（园长角色存在）
    operateBtn(type){
      if (type === 1){
        this.add.comment = true;
      }else if (type === 2){
        this.$router.push({name:"SafflowerCommentaryTypes"})
      }
    },
    //新增评语 班级弹出层
    addChooseClass(){
      this.add.classShow = true;
    },
    //新增评语 取消选择班级弹出框
    addCancelClassChoose(){
      this.add.classShow = false;
    },
    //新增评语 确认选择班级
    addConfirmClassChoose(){
      let s = [];
      if (this.add.classArr.length === 0){
        for (let val of this.classListData){
          this.add.classArr.push(val.id)
        }
      }
      for (let item of this.add.classArr){
        for (let val of this.classListData){
          if (item === val.id){
            s.push(val.name)
          }
        }
      }
      this.add.classString = s.join(',');
      this.add.classShow = false;
    },
    //新增评语 选中评语类型
    addChooseCommentType(){
      this.add.commentTypeShow = true;
    },
    //新增评语 评语类型选择 保存id
    addChooseCommentRadio(name){
      //console.log(name)
      for (let item of this.category){
        if (item.categoryName === name){
          this.add.conmentTypeId = item.categoryId;
        }
      }
    },
    // 提交新增评语
    submitAddComment(action, done){
      if (action === 'confirm'){
        this.$loading();
        addComment({
          categoryId:parseInt(this.add.conmentTypeId),
          clsId:this.add.classArr,
          type:this.add.reward==='0'?1:2,
          text:this.add.content,
          worth:parseInt(this.add.flower)
        }).then(res=>{
          this.$loadingHide();
          if (res.status === 200){
            done();
            Toast.success("新增成功");
            let timer = setTimeout(()=>{
              this.selectClassComment();
              clearTimeout(timer)
            },2900);
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      }else {
        done()
      }

    }
  },
  created() {
    //alert(this.$route.params.id)
    this.selectClassList();
    if (this.$route.params.type === 1){
      this.btnText = [{type:1,title:'新增评语'}]
    }else {
      this.btnText = [
        {
          type:1,
          title:'新增评语'
        },
        {
          type:2,
          title:'评语类型'
        }
      ]
    }

  },
  computed:{
    commentBoxWidth:{
      get(){
        let len = this.pageCount;
        return `${3.75*len}rem`
      }
    },
  }
};
</script>

<style scoped lang="less">
#safflower-score {
  font-size: 0;
  background-color: #fff;
  /deep/ .van-tab{
    padding:0;
  }
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
  .prompt{
    position: fixed;
    left: 0;
    bottom: 0.5rem;
    line-height: 0.2rem;
    width: 100%;
    font-size: 0.12rem;
    color: #999;
    text-align: center;
  }
  .check-btn {
    /*padding: 0 0.15rem;*/
    padding-top: 0.13rem;
    .van-button--info {
      margin-left: 0.02rem;
      width: 50%;
      border-radius: 3px 0 0 3px;
      color: #fff;
      background-color: #3770fb;
    }
    .van-button--info + .van-button--info {
      margin-left: -0.04rem;
      background-color: #fff;
      color: #3770fb;
      border-radius: 0 3px 3px 0;
    }
  }
  .class-info {
    font-size: 0.14rem;
    .stat-list {
      padding: 0.05rem 0.16rem 0;
      background-color: #fff;
      box-sizing: border-box;
    }
  }
  .type-tab {
    padding: 0 0.16rem;
  }
  .comment-box{
    width: 100%;
    padding: 0 0.16rem;
    max-height: 3.15rem;
    overflow: hidden;
    box-sizing: border-box;
    .tab-items {
      transition: all 2s;
      overflow: hidden;
      .comment-content{
        float: left;
        width: 3.43rem;
        padding: 0 0.16rem;
        font-size: 0.14rem;
        max-height: 2.75rem;
        box-sizing: border-box;
        overflow: hidden;
        .van-row {
          width: 100%;
          box-sizing: border-box;
          max-height: 2.75rem;
          overflow: hidden;
          .van-col {
            padding-top: 0.13rem;
            .van-button--default {
              text-align: center;
              padding: 0;
              width: 100%;
              height: 0.26rem;
              line-height: 0.26rem;
              border-color: #999;
              border-radius: 3px;
              color: #666;
              .btn-l {
                display: inline-block;
                width: 0.32rem;
                height: 0.25rem;
                float: left;
                border-right: 1px solid #999;
              }
              .btn-r {
                display: inline-block;
                height: 0.25rem;
              }
            }
          }
        }
      }
    }
    .pages{
      margin-top: 0.1rem;
      overflow: hidden;
      text-align: center;
      font-size: 0.12rem;
      line-height: 0.3rem;
      color: #999;
      .nums{
        margin: 0 0.3rem;
      }
    }
  }
  .confirm-class{
    font-size: 0.14rem;
    color: #3770fb;
    overflow: hidden;
    padding: 0 0.16rem;
    line-height: 0.3rem;
    margin-bottom: 0.1rem;
    box-sizing: border-box;
    .reject{
      float: left;
    }
    .confirm{
      float: right;
    }
  }
  .top-box{
    overflow: hidden;
    text-align: center;
    padding:0.16rem;
    .title{

    }
    .del-btn{
      float: right;
      font-size: 0.12rem;
      color: #fff;
      padding: 0.02rem 0.05rem;
      border-radius: 0.08rem;
      background-color: #D80000;
    }
  }
  .modify-info{
    .specile-radio{
      padding: 0.1rem 0;
      .c-title{
        line-height: 0.26rem;
        font-size: 0.14rem;
        padding-left: 0.15rem;
        position: relative;
        top: -0.04rem;
      }
      .van-radio-group{
        display: inline-block;
        .van-radio{
          display: inline-block;
        }
      }
    }
  }
}
</style>
