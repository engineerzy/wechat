<template>
  <div id="archives-detail">
  <!-- 档案详情-->
    <div class="go-back">
      <van-nav-bar title="档案详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
      <div class="content">
        <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB">
          <van-tab title="成长分析">
            <div class="growth-analysis"  >
              <div class="basic-info">
                <div class="student-info" v-if="JSON.stringify(basic)!=='{}'">
                  <div class="img-info">
                    <div class="awator">
                      <img :src="basic.avater" alt="" class="">
                    </div>
                    <span class="name">{{basic.studentName}}</span>
                  </div>
                  <div class="total">
                    <span class="flower">总红花数 <span class="cr">{{basic.saffflowerNum}}</span> 朵</span>
                    <span class="more-than">超上一名需要{{basic.removingNum}}红花</span>
                  </div>
                  <div class="total">
                    <span class="flower">可兑奖红花 <span class="cr">{{basic.safflowerCashNum}}</span> 朵</span>
                    <span class="more-than">已兑换{{basic.convertNum}}次奖品</span>
                  </div>
                  <div class="rank">
                    <router-link :to="{name:'SafflowerRanking'}">
                      <span class="view-btn">查看排行榜</span>
                    </router-link>
                  </div>
                </div>
                <div class="info-chart">
                  <div class="echart-sheet" id="echart-sheet" :style="{width: '2rem', height: '1.6rem'}" ref="radars"></div>
                  <p>{{assessment}}</p>
                </div>
              </div>
              <div class="mounth-flower">
                <div class="month-tab">
                  <div class="prev-month month" v-if="active !== month.length-1" @click="prev">
                    <van-icon name="arrow-left" />
                  </div>
                  <div class="month-content month">
                    <span v-for="(items,indexs) in month" :key="indexs" v-if="active===indexs">{{items.mSty}}</span>
                  </div>
                  <div class="next-month month" v-if="active !== 0" @click="next">
                    <van-icon name="arrow" />
                  </div>
                </div>
                <div class="line-ecahert">
                  <div class="hide-scroll" :style="{height:'2rem',overflow:'hidden'}">
                    <div class="hiden-box" :style="{width: '3.43rem',overflowX:'scroll',height:'2.15rem'}">
                      <div class="echart-line" id="echart-line" :style="{height: '2rem',paddingTop:'0.1rem',boxSizing:'border-box'}"></div>
                    </div>
                  </div>
                  <div class="summary">
                    <span class="name">本月：</span>
                    <span class="reward">奖励 <span class="num">{{awardNum}}</span> 朵</span>
                    <span class="deduct">扣除 <span class="num">{{deductNum}}</span> 朵</span>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="评分详情">
            <div class="wait-reply" >
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div class="reply-list" v-for="(item,index) in detailList" :key="index">
                  <div class="top-box">
                    <!--                  <div class="left-info">-->
                    <!--                    <span class="name">{2222}</span>-->
                    <!--                    <span class="cls">{233333}</span>-->
                    <!--                  </div>-->
                    <div class="left-info">
                      <span class="time">{{item.date}}</span>
                    </div>
                  </div>
                  <div class="section-box">
                    <div class="summary">
                  <span class="flower-total-w" v-if="item.type === 1">
                    <i class="font-io"><van-icon name="setting" /></i>
                    奖励 {{item.safflowerNum}} 朵
                  </span>
                  <span class="flower-total-d" v-if="item.type === 2">
                    <i class="font-io"><van-icon name="warning-o" /></i>
                    扣除 {{item.safflowerNum}} 朵
                  </span>
                      <span class="comm-person" v-if="item.schoolmaster===1">园长亲评</span>
                    </div>
                    <div class="score-detail">
                      <p class="items" v-for="(val, idx) in item.comment" :key="idx">
                        <span class="score-w" v-if="item.type === 1">+ {{val.worth}}</span>
                        <span class="score-d" v-if="item.type === 2">- {{val.worth}}</span>
                        <span class="text">{{val.text}} ({{val.category}})</span>
                      </p>
                    </div>
                    <div class="img-list">
                      <div class="img-tab" v-for="(val,idx) in item.imgurl" :key="idx" @click="preview(item.imgurl, idx)">
                        <img :src="val" alt="">
                      </div>
                    </div>
                    <div class="operate-obj">
                      <span class="time">{{item.date}}</span>
                      <span class="name">{{item.ismyself===1?'由我奖励':item.rewarderName}}</span>
                    </div>
                  </div>
                  <div class="comment-area">
                    <div class="comment-list" v-if="JSON.stringify(item.review)!=='{}'">
                      <div class="comment-box" >
                        <span class="name">{{item.review.reviewName}}评论：</span>
                        <span class="comment-content">{{item.review.content}}</span>
                      </div>
                      <div class="time-box">
                        <span class="time">{{item.review.date}}</span>
                      </div>
                    </div>
                    <div class="comment-list" v-if="JSON.stringify(item.replyReview)!=='{}'">
                      <div class="comment-box" >
                        <span class="name">{{item.replyReview.replyName}}回复：</span>
                        <span class="comment-content">{{item.replyReview.content}}</span>
                      </div>
                      <div class="time-box">
                        <span class="time">{{item.replyReview.date}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>

            </div>
          </van-tab>
        </van-tabs>
      </div>
  </div>
</template>

<script>
  import { NavBar, Icon, Tab, Tabs,Field,Actionsheet,Toast,List,ImagePreview } from "vant";
  /*import SchooleRoleApi from '../api/school-role-api'*/
  import { studentGrowthAnay, monthEchartsAnay, waitReplyList } from '@/api/school/safflower'
  export default {
    name: "archives-detail",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Field .name]:Field,
      [Actionsheet.name]:Actionsheet,
      [Toast.name]:Toast,
      [List.name]:List,
    },
    data(){
      return{
        loading:false,
        finished:false,
        stuId:this.$route.params.id,
        basic:{},
        awardNum:0,//月份奖励红花数量
        deductNum:0,//月份扣除红花数量
        month:[],
        active:0,
        page:1,
        detailList:[],
        assessment:'',
        histogramWidth:{},
        dates:'',
        awd:'',
        dwd:''
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      prev(){
        if (this.active !== this.month.length - 1) {
          this.active = this.active + 1;
          this.monthChartData(this.month[this.active].ySty)
        }
      },
      next(){
        if (this.active !== 0) {
          this.active = this.active - 1;
          this.monthChartData(this.month[this.active].ySty)
        }
      },
      studentGrowth(){
        this.$loading();
        studentGrowthAnay(this.stuId)
          .then(res=>{
            this.$loadingHide();
            if (res.status === 200) {
              let d = res.data.data;
              this.basic = d;
              let ay = d.radarChart;
              let indicator = [];
              let value = [];
              for (let i = 0; i < ay.name.length; i++) {
                indicator.push({
                  text:`${ay.name[i]}${ay.percentage[i]}`,
                  max:100
                });
                value.push(parseFloat(ay.percentage[i].slice(0,-1)))
              }
              this.drawEchart(indicator, value);
              this.assessment = ay.assessment;
              this.deductNum = d.monthChart.deduct_num;
              this.awardNum = d.monthChart.award_num;
              let date = [];
              let aNum = [];
              let dNum = [];
              date=d.monthChart.award.date;
              aNum=d.monthChart.award.num;
              dNum=d.monthChart.deduct.num;
              this.drawLine(date,aNum,dNum);
            }
        }).catch(()=>{
          throw new Error('异常！')
        })
      },
      drawEchart(indicator, value){
        let echartSheet = this.echarts.init(
          document.getElementById("echart-sheet")
        );

        echartSheet.setOption({
          tooltip: {
            trigger: "axis"
          },
          radar: [
            {
              indicator: indicator,
              radius: 50,
              center: ["50%", "50%"],
              nameGap:1,
              //shape:'circle',
             // splitNumber:10
              splitArea : {
                show : true,
                areaStyle : {
                  color: ['#3770FB', '#7BA2FF','#99c736', '#75813b', '#7AA1FF',]
                  // 图表背景网格的颜色
                }
              },
            }
          ],
          series: [
            {
              type: "radar",
              radarIndex: 0,
              data: [{
                value: value,
                name: '学生成长分析',
                itemStyle: {
                  normal: {
                    color: '#E5CB9C',
                    lineStyle: {
                      color: '#E5CB9C',
                    },
                  },
                },
              }]
            }
          ]
        });
      },
      drawLine(date,aNum,dNum){
        if (this.dates !== date.toString() || this.awd !== aNum.toString() || this.dwd !== dNum.toString()){
          let echartLine = this.echarts.init(
            document.getElementById("echart-line")
          );
          echartLine.setOption({

            tooltip : {
              trigger: 'none'
            },
            legend: {
              left:'15%',
              data:['奖励','扣除']
            },
            grid:{
              left: '20',
              right:'40',
              // top:'4%',
            },
            calculable : true,
            xAxis: {
              show:true,                  //---是否显示
              position:'bottom',          //---x轴位置
              offset:0,                   //---x轴相对于默认位置的偏移
              type:'category',            //---轴类型，默认'category'
              name:'日期',              //---轴名称
              nameLocation:'end',         //---轴名称相对位置
              nameTextStyle:{             //---坐标轴名称样式
                color:"#999",
                padding:[5,0,0,-5], //---坐标轴名称相对位置
              },
              nameGap:15,                 //---坐标轴名称与轴线之间的距离
              //nameRotate:270,           //---坐标轴名字旋转

              axisLine:{                  //---坐标轴 轴线
                show:true,                  //---是否显示

                //------------------- 箭头 -------------------------
                symbol:['none'],   //---是否显示轴线箭头

                //------------------- 线 -------------------------
                lineStyle:{
                  color:'#999',
                  width:1,
                  type:'solid',
                },
              },
              axisTick:{                  //---坐标轴 刻度
                show:true,                  //---是否显示
                inside:true,                //---是否朝内
                lengt:3,                    //---长度
                lineStyle:{
                  //color:'red',          //---默认取轴线的颜色
                  width:1,
                  type:'solid',
                },
              },
              axisLabel:{                 //---坐标轴 标签
                show:true,                  //---是否显示
                inside:false,               //---是否朝内
                rotate:0,                   //---旋转角度
                margin: 5,                  //---刻度标签与轴线之间的距离
                //color:'red',              //---默认取轴线的颜色
              },
              splitLine:{                 //---grid 区域中的分隔线
                show:false,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                lineStyle:{
                  //color:'red',
                  //width:1,
                  //type:'solid',
                },
              },
              splitArea:{                 //--网格区域
                show:false,                 //---是否显示，默认false
              },
              data: date,//内容
            },

            //----------------------  y轴  ------------------------
            yAxis: {
              show:true,                  //---是否显示
              position:'left',            //---y轴位置
              offset:0,                   //---y轴相对于默认位置的偏移
              type:'value',           //---轴类型，默认'category'
              name:'朵数',              //---轴名称
              nameLocation:'end',         //---轴名称相对位置value
              nameTextStyle:{             //---坐标轴名称样式
                color:"#999",
                padding:[5,0,0,5],  //---坐标轴名称相对位置
              },
              nameGap:15,                 //---坐标轴名称与轴线之间的距离
              //nameRotate:270,           //---坐标轴名字旋转

              axisLine:{                  //---坐标轴 轴线
                show:true,                  //---是否显示

                //------------------- 箭头 -------------------------
                symbol:['none'],   //---是否显示轴线箭头

                //------------------- 线 -------------------------
                lineStyle:{
                  color:'#999',
                  width:1,
                  type:'solid',
                },
              },
              axisTick:{                  //---坐标轴 刻度
                show:false,                  //---是否显示
                inside:true,                //---是否朝内
                lengt:3,                    //---长度
                lineStyle:{
                  //color:'red',          //---默认取轴线的颜色
                  width:1,
                  type:'solid',
                },
              },
              axisLabel:{                 //---坐标轴 标签
                show:false,                  //---是否显示
                inside:false,               //---是否朝内
                rotate:0,                   //---旋转角度
                margin: 8,                  //---刻度标签与轴线之间的距离
                //color:'red',              //---默认取轴线的颜色
              },
              splitLine:{                 //---grid 区域中的分隔线
                show:false,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle:{
                  color:'#666',
                  width:1,
                  type:'solid',          //---类型
                },
              },
              splitArea:{                 //--网格区域
                show:false,                 //---是否显示，默认false
              }
            },
            series : [
              {
                name:'奖励',
                type:'bar',
                barGap: 0,
                itemStyle:{                 //---图形形状
                  //
                  normal: {
                    color:'#3770FB',
                    label: {
                      show: true,		//开启显示
                      position: 'top',	//在上方显示
                      textStyle: {	    //数值样式
                        color: '#3770FB',
                        fontSize: 12
                      }
                    }
                  }
                },
                data:aNum,
              },
              {
                name:'扣除',
                type:'bar',
                itemStyle:{                 //---图形形状
                  //
                  normal: {
                    color:'#D80000',
                    label: {
                      show: true,		//开启显示
                      position: 'top',	//在上方显示
                      textStyle: {	    //数值样式
                        color: '#D80000',
                        fontSize: 12
                      }
                    }
                  }
                },
                data:dNum,
              }
            ]
          });
          // let chartName = this.$echarts.init(document.getElementById("myChart1"));
          const autoWeight = date.length * 0.4 < 3.43 ? 3.43 : date.length * 0.4;
          echartLine.getDom().style.width = autoWeight +'rem';
          echartLine.getDom().childNodes[0].style.width = autoWeight +'rem';
          echartLine.getDom().childNodes[0].childNodes[0].setAttribute("width",autoWeight);
          echartLine.getDom().childNodes[0].childNodes[0].style.width = autoWeight +'rem' ;
          echartLine.getDom().style.height = '2rem';
          echartLine.getDom().childNodes[0].style.height = '2rem';
          echartLine.getDom().childNodes[0].childNodes[0].setAttribute("height",'2rem');
          echartLine.getDom().childNodes[0].childNodes[0].style.height = '2rem';
          echartLine.resize();
          this.dates = date.toString();
          this.awd = aNum.toString();
          this.dwd = dNum.toString();
        }
      },
      monthfun(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let arr = [];
        for (let i = year; i >= 2015; i--) {
          if (i === year) {
            for (let v = month; v >= 1; v--) {
              arr.push({
                mSty:`${year}年${v}月`,
                ySty:`${year}-${v}`
              })
            }
          }else {
            for (let v = 12; v >= 1; v--) {
              arr.push({
                mSty:`${i}年${v}月`,
                ySty:`${i}-${v}`
              })
            }
          }
        }
       // console.log(arr)
        this.month=arr
      },
      //月份图表分析
      monthChartData(date){
        monthEchartsAnay(this.stuId,date)
          .then(res=>{
            if (res.status === 200) {
              let d = res.data.data;
              this.deductNum = d.deduct_num;
              this.awardNum = d.award_num;
              let date = [];
              let aNum = [];
              let dNum = [];
              date=d.award.date;
              aNum=d.award.num;
              dNum=d.deduct.num;
              this.drawLine(date,aNum,dNum);
            }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      onLoad(){
        waitReplyList(this.stuId,this.page)
          .then(res=>{
            if (res.status === 200) {
              let d = res.data.data;
              if (d.length >= 10) {
                this.loading = false;
                this.finished = false;
                this.page = this.page + 1;
              }else {
                this.loading = false;
                this.finished = true;
              }
              this.detailList = d;
            }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //图片预览
      preview(imgArr, index) {
        ImagePreview({
          images: imgArr,
          startPosition: index ? index : 0,
          lazyLoad: false
        });
      },
    },
    created() {
      this.studentGrowth();
      this.monthfun();
    }
  }
</script>

<style scoped lang="less">
 #archives-detail{
   font-size: 0;
   background-color: #fff;
   /*position: relative;*/
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
   .content{
     padding: 0.14rem 0.16rem ;
     /deep/ .van-tabs__nav.van-tabs__nav--card{
       margin: 0;
     }
     .growth-analysis{
       .basic-info{
         width: 100%;
         padding: 0.16rem 0;
         margin-bottom: 0.1rem;
         overflow: hidden;
         .student-info{
           float: left;
           width: 1.41rem;
           padding-left: 0.15rem;
           border-right: 1px solid #eee;
           box-sizing: border-box;
           .img-info{
             padding: 0.04rem 0;
             box-sizing: border-box;
             overflow: hidden;
             .awator{
               width: 0.3rem;
               height: 0.3rem;
               border-radius: 50%;
               float: left;
               overflow: hidden;
               img{
                 width: 100%;
                 height: 100%;
                 float: left;
               }
             }
             .name{
               float: left;
               font-size: 0.14rem;
               color: #666;
               margin-left: 0.08rem;
               line-height: 0.3rem;
             }
           }
           .total{
             margin-top: 0.16rem;
             .flower{
               display: block;
               font-size: 0.14rem;
               color: #666;
               line-height: 0.2rem;
               .cr{
                 color: #84C225;
               }
             }
             .more-than{
               font-size: 0.12rem;
               color: #999;
               line-height: 0.18rem;
             }
           }
           .rank{
             margin-top: 0.16rem;
             padding-bottom: 0.08rem;
             .view-btn{
               display: inline-block;
               width: 1rem;
               font-size: 0.12rem;
               color: #3770fb;
               height: 0.24rem;
               line-height: 0.22rem;
               text-align: center;
               border: 1px solid #3770FB;
               border-radius: 0.05rem;
               box-sizing: border-box;
             }
           }
         }
         .info-chart {
           float: left;
           width: 2rem;
           font-size: 0.12rem;
           /*height: 1.88rem;*/
           color: #999;
           p {
             line-height: 0.48rem;
             color: #666;
             font-size: 0.16rem;
             text-align: center;
           }
         }
       }
       .mounth-flower{
          .line-ecahert{
            width: 100%;
            font-size: 0.12rem;
            overflow: hidden;
            .summary{
              font-size: 0.14rem;
              color: #666;
              .name{
                margin-right: 0.15rem;
              }
              .reward{
                .num{
                  color: #3770FB;
                }
              }
              .deduct{
                margin-left: 0.3rem;
                .num{
                  color: #D80000;
                }
              }
            }
          }
         .month-tab{
           line-height: 0.48rem;
           border-bottom: 1px solid #eee;
           text-align: center;
           .month{
             display: inline-block;
             font-size: 0.14rem;
             color: #666;
           }
           .month-content{
             width: 1rem;
             margin-right: 0.35rem;
             margin-left: 0.35rem;
           }
         }
       }
     }
     .wait-reply{
       width: 100%;
       padding: 0 0.16rem 0.16rem;
       box-sizing: border-box;
       .reply-list{
         width: 100%;
         margin-bottom: 0.1rem;
         .top-box{
           overflow: hidden;
           line-height: 0.2rem;
           margin-bottom: 0.1rem;
           margin-top: 0.16rem;
           .left-info{
             float: left;
             font-size: 0.14rem;
             color: #666;
             font-weight: 500;
             .name{
               margin-right: 0.16rem;
             }
           }
           .right-info{
             float: right;
             font-size: 0.14rem;
             color: #999;
           }
         }
         .section-box{
           .summary{
             font-size: 0.14rem;
             line-height: 0.2rem;
             margin-bottom: 0.1rem;
             overflow: hidden;
             .flower-total-d,.flower-total-w{
               float: left;
               .font-io{
                 font-size: 0.16rem;
                 margin-right: 0.12rem;
                 position: relative;
                 top: 0.03rem;
               }
             }
             .flower-total-d{
               color: #D80000;
             }
             .flower-total-w{
               color: #3770fb;
             }
             .comm-person{
               float: right;
               color: #333;
             }
           }
           .score-detail{
             margin-bottom: 0.1rem;
             .items{
               font-size: 0.14rem;
               line-height: 0.2rem;
               color: #999;
               .score-d{
                 color: #D80000;
                 margin-right: 0.08rem;
               }
               .score-w{
                 color: #3770fb;
                 margin-right: 0.08rem;
               }
             }
           }
           .img-list{
             width: 100%;
             overflow: hidden;
             margin-left: 0.18rem;
             margin-bottom: 0.1rem;
             .img-tab{
               float: left;
               width: 0.7rem;
               height: 0.7rem;
               margin-left: 0.12rem;
               margin-bottom: 0.12rem;
               img{
                 float: left;
                 width: 100%;
                 height: 100%;
               }
             }
           }
           .operate-obj{
             font-size: 0.12rem;
             color: #666;
             line-height: 0.18rem;
             margin-top: 0.1rem;
             .time{
               margin-right: 0.1rem;
             }
           }
         }
         .comment-area{
           .comment-list{
             padding: 0.05rem 0;
             .comment-box{
               font-size: 0.14rem;
               line-height: 0.2rem;
               .name{
                 color: #3770fb;
               }
               .comment-content{
                 color: #999;
               }
             }
             .time-box{
               font-size: 0.12rem;
               color: #999;
               line-height: 0.18rem;
               text-align: right;
             }
           }
         }
         .reply-btn{
           display: flex;
           font-size: 0.14rem;
           height: 0.4rem;
           padding: 0.08rem 0;
           text-align: center;
           color: #fff;
           background-color: #53ACF8;
           box-sizing: border-box;
           .btn{
             flex: 1;
           }
           .simple-reply{
             border-right: 1px solid #fff;
           }
         }
       }
     }
   }
 }
</style>