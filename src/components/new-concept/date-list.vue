<template>
    <div>
        <div class="backgroundcolor">

            <div class="date_top_list" >
                <van-cell title="全部机构" is-link arrow-direction="down"   />
            </div>

            <timelist :statistics="statistics"></timelist>
            <!--<lightflower :brokenline="brokenline"></lightflower>-->

            <div class="bgc">
                <div class="date_list">
                    <i  class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
                    <span @click="Cymonth"> 2019年2月账单  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
                    <i data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
                </div>

                <div class="titile_bottom"></div>

                <div class="flowermes f_mask giflower">
                    <div class="gi_div">
                        <div class="gi_l" >
                            <div>奖励红花</div>
                            <div class="g_flower">{{brokenline.rewardCount}}</div>
                            <!--<div class="g_flower">123</div>-->
                        </div>
                        <div class="gi_r">
                            <div>扣除红花</div>
                            <div>{{brokenline.deductCount}}</div>
                            <!--<div>{123</div>-->
                        </div>
                    </div>
                </div>

                <div class="f_mask">
                    <div id="light" style="width: 3.74rem;height:2.4rem;">
                    </div>
                    <div class="lf_tab"><span>红花奖励统计图</span></div>
                </div>
                <div class="f_mask">
                    <div id="black" style="width: 3.74rem;height:2.4rem;">
                    </div>
                    <div class="lf_tab"><span>红花扣除统计图</span></div>
                </div>
                <div class="buttom"></div>
            </div>


            <thismonth  ></thismonth>
        </div>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :min-date="minDate"
                    :formatter="formatter"
                    @confirm="ondateConfirm"

            />
        </van-popup>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';
    //import someComponent from './someComponent'
    import { Cell, CellGroup } from 'vant';
    import timelist from './components/class-detail-box';
    // import lightflower from './components/light-flower';
    import thismonth from './components/this-month';
    import echarts from 'echarts'

    import { BrokenlineDiagram } from '@/api/new-concept/new-concept';


    export default {
        data() {
            return {
                brokenline:[],
                deduct:[],
                reward:[],
                currentDate: new Date(),
                minDate: new Date(),

                Cdate: false,
            }
        },
        props:{
            statistics:{
                type:Array.Object
            }
        },
        components: {
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,

            // lightflower:lightflower,
            thismonth:thismonth,
            timelist:timelist
            //someComponent
        },
        methods: {
            test(){
                // console.log(this.brokenlinese);

            },
            GetBrokenlineDiagram(){
                BrokenlineDiagram().then(res => {
                    this.brokenline = res.data.data.safflower;
                    this.reward = res.data.data.safflower.reward;
                    this.deduct = res.data.data.safflower.deduct;
                    console.log(this.brokenline);
                }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Cymonth(){
                this.Cdate = true
            },
            ondateConfirm() {
                this.Cdate = false;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
        },
        mounted(){

            this.GetBrokenlineDiagram()

            var gfnumber= [];
            for (let gn of this.reward){
                gfnumber.push(gn.number)
            }

            var gfday= [];
            for (let gd of this.reward){
                gfday.push(gd.day)
            }

            var lfday= [];
            for (let lfd of this.deduct){
                lfday.push(lfd.day)
            }

            var lfnumber= [];
            for (let lfn of this.deduct){
                lfnumber.push(lfn.number)
            }
            // 基于准备好的dom，初始化echarts实例

            var Gflower = echarts.init(document.getElementById('light'));

            // 指定图表的配置项和数据
            var Goption = {
                grid: {
                    top:'15%',
                    bottom:'15%',
                    right: '15%',  //距离右侧边距
                },
                color: ['#DA0000'],
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    textStyle:{
                        fontSize:12,
                        color:'#fff'
                    },
                    data:['']
                },
//                    取消Y轴刻度值
                xAxis: {
                    name:'日期',
                    splitLine:{
                        show:false
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#BFBFBF',//左边线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                    data:gfday
                },
                yAxis: {
                    name:'奖励',
                    splitLine :{
                        lineStyle:{
                            type:'dashed'
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#BFBFBF',//左边线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: gfnumber,
                    itemStyle : {
                        normal : {
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#DA0000'
                                }
                            }
                        },
                    },
                    barWidth : 23
                }]
            };
//        另一个--------------------------------------------------------------------------
            var Lflower = echarts.init(document.getElementById('black'));

            var Boption = {
                grid: {
                    top:'15%',
                    bottom:'15%',
                    right: '15%',  //距离右侧边距
                },
                color: ['#999999'],
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    textStyle:{
                        fontSize:12,
                        color:'#fff'
                    },
                    data:['']
                },
//                    取消Y轴刻度值
                xAxis: {
                    name:'日期',
                    splitLine:{
                        show:false
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#BFBFBF',//左边线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                    data: lfday
                },
                yAxis: {
                    name:'扣除',
                    splitLine :{
                        lineStyle:{
                            type:'dashed'
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#BFBFBF',//左边线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: lfnumber,
                    itemStyle : {
                        normal : {
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '##999999'
                                }
                            }
                        },
                    },
                    barWidth : 23
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            Gflower.setOption(Goption);
            Lflower.setOption(Boption);


        },
       }
</script>

<style scoped>
    .date_top_list{
        width:100%;
        background-color: white;
    }
    .date_top_list>>>.van-cell{
       line-height: 0.45rem;
    }
    .date_top_list>>>.van-icon{
       line-height: 0.45rem;
    }
    .van-cell__title{
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        margin:0 auto;
        width:1rem;
        padding: 0.15rem 0;
    }
    .date_message{
        border: solid white;
        background-color: white;
        margin-top:0.1rem;
    }
    .date_message_center{
        margin:0.1rem auto;
        width: 2.3rem;
        height: 0.3rem;
    }
    .leftcli{
        float: left;
        width:0.24rem;
        height:0.24rem;
    }
    .leftcli img {
        width: 0.24rem;
        height:0.24rem;
        float: left;
    }
    .middate{
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
        float: left;
        padding: 0 0.3rem;
    }
    .backgroundcolor{
        height:100%;
        background-color: #F3F7F8;
    }


    .bgc{
        margin-top:0.1rem;
        background-color: white;
    }
    .buttom{
        height:0.2rem;
        background-color: white;
    }
    #light, #black{
        background-color: white;
    }
    .flowermes{
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .f_mask{
        background-color: white;
    }
    .lf_tab{
        text-align: center;
        background-color: white;
        margin: 0 auto;
        width: 1rem;
        height:0.2rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .giflower{
        margin-top:0.1rem;
    }
    .gi_div{
        margin: 0 auto;
        width: 50%;
        height: 0.5rem;
    }
    .gi_l{
        text-align: center;;
        float: left;
    }
    .gi_r{
        text-align: center;;
        float: right;
    }
    .g_flower{
        color: #D80000;
    }


    .top_list{
        font-size: 0;
        margin: 0 auto;
        width: 2.2rem;
        padding:0.2rem;
    }
    .left_img{
        float: left;
    }
    .time_title{
        margin: 0 0.3rem;
        float: left;
    }
    .van-cell__title{
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin:0 auto;
        width:1.3rem;
        padding:0;
    }
    .titile_bottom{
        width:90%;
        margin:0 auto;
        border-bottom: 0.02rem solid #eee;
    }


    .date_list{
        height: 0.5rem;
        text-align: center;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.5rem
    }
    .date_list span{
        margin: 0 0.4rem;
    }
</style>
