<template>
    <div class="parents-index">
        <div class="main">
            <ul class="adver">
                <li class="list">
                    {{adver}}
                </li>
            </ul>
            <img src="@/assets/img/parents/index/banner2.png" alt="">
        </div>
        <div class="content">
            <div style="background-color: #fff;padding-bottom: 0.07rem">
                <p class="title">今日在“美育家教园-东厦北校区”的情况</p>
            </div>
            <div class="list">
                 <IconTitle icon-class="icon-kaoqin #3770fb" content="考勤信息"></IconTitle>
                <div class="detail">
                    <Attendance :attendance-list="attendanceList"></Attendance>
                </div>
            </div>
            <div class="list">
                <IconTitle icon-class="icon-yinshi #3770fb" content="食谱饮食"></IconTitle>
                <Diet :diet-list="dietList"></Diet>
            </div>
            <div class="list homework-content">
                <div id="icon-title">
                    <p class="theme">
                        <i class="icons icon-homework"><i class="path1"></i><i class="path3"></i><i class="path2"></i></i>
                        <span class="text">作业完成情况</span>
                    </p>
                </div>
                <Homework  :homework-list="homeworkList" :width="homeWidth"></Homework>
                <div class="teacher-check" v-if="teacherChecked">
                    <span class="left">
                        <i class="icons icon-complete"><i class="path1"></i><i class="path3"></i><i class="path2"></i></i>
                    </span>
                    <span class="left check-text">{{teacherChecked}}</span>
                    <span class="right">{{teacherTime}}</span>
                </div>
            </div>
            <div class="list flower-content">
                <IconTitle icon-class="icon-honghua #3770fb" content="红花奖惩情况"></IconTitle>
                <div class="flower-main">
                    <div class="reward-flower" v-if="rewardFlower">
                        <div class="flower">
                            <span v-for="(item, index) in rewardFlower" :key="index">
                                <i class="iconfont icon-honghua" :class="index==0 ? 'highlight' : 'lowlight'"></i>
                            </span>
                        </div>
                        <span class="flower-text">奖励{{rewardFlower}}朵</span>
                    </div>
                    <div class="punishment-flower" v-if="punishmentFlower">
                        <div class="flower">
                            <span v-for="(item, index) in punishmentFlower" :key="index">
                                <i class="iconfont icon-honghua" :class="index==0 ? 'highlight' : 'lowlight'"></i>
                            </span>
                        </div>
                        <span class="flower-text">扣除{{punishmentFlower}}朵</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { NoticeBar } from 'vant';
    import { Icon } from 'vant';
    import IconTitle from '@/components/common/icon-title'
    import Attendance from './components/attendance-list'
    import Diet from './components/diet-list'
    import Homework from './components/homework-situation'

    export default {
        name: "index",
        components:{
            [NoticeBar.name]:NoticeBar,
            IconTitle:IconTitle,
            Attendance:Attendance,
            Diet:Diet,
            Homework:Homework,
            [Icon.name]:Icon,
        },
        data(){
            return {
                adver:'',//公告
                rewardFlower:0,
                punishmentFlower:0,
                attendanceList:[
                    {
                        type:0,
                        time:null
                    },
                    {
                        type:1,
                        time:null
                    },
                    {
                        type:2,
                        time:'13:00'
                    },
                    {
                        type:3,
                        time:'15:40'
                    },
                    {
                        type:4,
                        time:'16:00'
                    },
                    {
                        type:5,
                        time:'17:00'
                    }
                ],
                dietList:[
                    {
                        src:require('@/assets/logo.png'),
                        title:'小笼包',
                        info:''
                    },
                    {
                        src:require('@/assets/logo.png'),
                        title:'土鸡汤',
                        info:''
                    },
                    {
                        src:require('@/assets/logo.png'),
                        title:'水果拼盘',
                        info:''
                    }
                ],
                //作业完成情况
                homeWidth:{},
                teacherChecked:'',
                teacherTime:'',
                homeworkList:[]
            }
        },
        methods:{
            drawing(){
              for (let item of this.homeData){
                if (item.type === 'schoolInfo'){//公告
                  this.adver = item.extra.notice
                }else if (item.type === 'attendance'){//考勤
                  this.attendanceList = item.extra
                }else if (item.type === 'homework'){//作业完成情况
                  let hm = item.extra;
                  this.teacherChecked =hm.msgs.length > 0 ? hm.msgs[0].content:"";
                  this.teacherTime = hm.msgs.length > 0 ? hm.msgs[0].time:"";
                  let arr = [];
                  for (let item of hm.situation){
                    //console.log(item)
                    arr.push({
                      src:require('@/assets/logo.png'),
                      title:item[0],
                      type:item[1] === '已完成'? 1 : 2
                    })
                  }
                  this.homeworkList = arr;
                  this.homeWidth = {width:arr.length*1.07+'rem'}
                }else if (item.type === 'safflower'){//红花奖惩
                  this.rewardFlower = item.extra.award;
                  this.punishmentFlower = item.extra.deduct;
                }
              }
            }
        },

        created(){
          if (this.homeData.length>0){
            this.drawing()
          }else {
            let timer = setInterval(()=>{
              if (this.homeData.length>0){
                clearInterval(timer);
                this.drawing()
              }
            },500)
          }

        },
        mounted(){
           
        },
        computed:{
          homeData() {
            return this.$store.getters["parentHome/getParentHomeIndexData"]
          }
        }
    }
</script>

<style scoped lang="less">
    .parents-index{
        margin-bottom: 0.58rem;
        .main{
            font-size: 0;
            text-align: center;
            width: 100%;
            margin-bottom: 0.17rem;
            background: url('../../../../src/assets/img/parents/index/bg.png') no-repeat center ;
            background-size: cover;
            border-top: solid transparent;
            img {
                width: 100%;
                padding: 0 0.12rem;
                margin-bottom: 0.05rem;
                box-sizing: border-box;
            }
            .adver{
                height: 0.2rem;
                width: 100%;
                margin: 0.14rem auto 0.12rem;
                padding: 0 0.13rem;
                overflow: hidden;
                box-sizing: border-box;
                .list{
                    float: left;
                    font-size: 0.14rem;
                    margin-right: 0.1rem;
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .content{
            font-size: 0;
            background-color: #F3F7F8;
            .title{
                font-size: 0.14rem;
                line-height: 0.28rem;
                margin: 0 0.45rem 0;
                text-align: center;
                border-radius: 1rem;
                color: #fff;
                background-color: #3770FB;
                box-sizing: border-box;
            }
            .list{
                padding: 0.16rem 0.15rem;
                background-color: #fff;
                margin-bottom: 0.1rem;
                box-sizing: border-box;
                #icon-title{
                    display: inline-block;
                    margin-bottom: 0.15rem;
                    .theme{
                        line-height: 0.22rem;
                        .icons{
                            font-size: 0.16rem;
                            position: relative;
                            top: 2px;
                        }
                        .text{
                            font-size: 0.16rem;
                            font-weight: 500;
                            margin-left: 0.08rem;
                            color: #333;
                        }
                    }
                }
            }
            .list:last-child{
                margin-bottom: 0;
            }
            .homework-content{
                .teacher-check{
                    margin-top:0.33rem;
                    overflow: hidden;
                    line-height: 0.2rem;
                    .left{
                        float: left;
                        font-size: 0.14rem;
                    }
                    .check-text{
                        color: #666;
                        margin-left: 0.04rem;
                    }
                    .right{
                        float: right;
                        font-size: 0.14rem;
                        color: #999;
                    }
                }
            }
            .flower-content{
                .flower-main{
                    overflow: hidden;
                    .reward-flower{
                        float: left;
                        width: 50%;
                        box-sizing: border-box;
                        .flower{
                            word-wrap:break-word;
                            width: 100%;
                            margin-bottom: 0.15rem;
                            padding-right: 0.24rem;
                            border-right: 0.01rem solid #f1f1f1;
                            box-sizing: border-box;
                            span{
                                font-size: 0.16rem;
                                margin-left: 0.02rem;
                                .highlight{
                                    font-size: 0.16rem;
                                    color: #D80000;
                                }
                                .lowlight{
                                    font-size: 0.16rem;
                                    color: #FF8700;
                                }
                            }

                        }
                        .flower-text{
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            padding-left: 0.02rem;
                        }
                    }
                    .punishment-flower{
                        float: left;
                        width: 50%;
                        box-sizing: border-box;
                        .flower{
                            word-wrap:break-word;
                            width: 100%;
                            margin-bottom: 0.15rem;
                            padding-left: 0.25rem;
                            box-sizing: border-box;
                            span{
                                font-size: 0.16rem;
                                margin-left: 0.02rem;
                                .highlight{
                                    font-size: 0.16rem;
                                    color: #5F5F5F;
                                }
                                .lowlight{
                                    font-size: 0.16rem;
                                    color: #ADADAD;
                                }
                            }
                        }
                        .flower-text{
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            padding-left: 0.28rem;
                        }
                    }
                }

            }
        }
        .icon-list{
            .icon-f{
                font-size: 0.16rem;
                color: #f00;
            }
        }
    }
</style>
