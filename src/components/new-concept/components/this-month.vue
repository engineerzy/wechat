<template>
    <div class="month" >
        <div class="date_list">
            <i  class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span @click="Cymonth"> 2019年2月账单  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
        </div>

        <div class="titile_bottom"></div>

        <div class="month_list_first">
            <div class="flowermes f_mask">
                    <div class="gi_f">
                        <div>本月使用作业功能的次数</div>
                        <div>320</div>
                    </div>
            </div>
            <div class="f_mask">
                <div id="fir" style="width: 3.74rem;height:2.4rem;"></div>
            </div>
            <div class="b_hr"></div>
         </div>

        <div class="month_list">
            <div class="flowermes f_mask">
                <div class="gi_s">
                    <div>本月录入成绩的次数</div>
                    <div>320</div>
                </div>
            </div>
            <div class="f_mask">
                <div id="sec" style="width: 3.74rem;height:2.4rem;"></div>
            </div>
            <div class="b_hr"></div>
        </div>

        <div class="month_list">
                <div class="flowermes f_mask">
                    <div class="gi_t">
                        <div>本月发布的社区</div>
                        <div>320</div>
                    </div>
                </div>
                <div class="f_mask">
                    <div id="thi" style="width: 3.74rem;height:2.4rem;">
                    </div>
                </div>
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
    import echarts from 'echarts';
    import { Cell, CellGroup } from 'vant'
    import { BrokenlineDiagram } from '@/api/new-concept/new-concept';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                work:[],
                community:[],
                score:[],

                currentDate: new Date(),
                minDate: new Date(),

                Cdate: false,

            }
        },
        components: {
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
            //someComponent
        },
        methods:{
            GetBrokenlineDiagram(){
                BrokenlineDiagram().then(res => {
                    this.work = res.data.data.work;
                    this.score = res.data.data.score;
                    this.community = res.data.data.community;
                    console.log(this.community);
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
        mounted() {
            this.GetBrokenlineDiagram()


            // 基于准备好的dom，初始化echarts实例
            var Lflower = echarts.init(document.getElementById('fir'));
            var Bflower = echarts.init(document.getElementById('sec'));
            var Cflower = echarts.init(document.getElementById('thi'));
            // 指定图表的配置项和数据

            var workday= [];
            for (let wd of this.work){
                workday.push(wd.day)
                console.log(workday)
            }

            var worknumber= [];
            for (let wn of this.work){
                worknumber.push(wn.number)
                console.log(worknumber)
            }

            var scoreday= [];
            for (let sd of this.score){
                scoreday.push(sd.day)
            }

            var scorenumber= [];
            for (let sn of this.score){
                scorenumber.push(sn.number)
            }

            var communityday= [];
            for (let cd of this.community){
                communityday.push(cd.day)
            }

            var communitynumber= [];
            for (let cn of this.community){
                communitynumber.push(cn.number)
            }

            var option = {
                grid: {

                   top:'15%',
                    bottom:'15%',
                    right: '15%',  //距离右侧边距
                },
                color: ['#3770FB'],
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
                    data: workday
                },
                yAxis: {
                    name:'次数',
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
                    type: 'line',
                    data: worknumber,
                    barWidth : 23
                }]
            };
//        另一个--------------------------------------------------------------------------
            var Boption = {
                grid: {

                    top:'15%',
                    bottom:'15%',
                    right: '15%',  //距离右侧边距
                },
                color: ['#52C9C4'],
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
                    data: scoreday
                },
                yAxis: {
                    name:'数量',
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
                    type: 'line',
                    data: scorenumber,
                    barWidth : 23
                }]
            };
//第三个折线图表----------------------------------------------------------
            var Coption = {
                grid: {
                    top:'15%',
                    bottom:'15%',
                    right: '15%',  //距离右侧边距
                },
                color: ['#F6A500'],
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
                    data: communityday
                },
                yAxis: {
                    name:'数量',
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
                    type: 'line',
                    data: communitynumber,
                    barWidth : 23
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            Lflower.setOption(option);
            Bflower.setOption(Boption);
            Cflower.setOption(Coption);
        }

    }

</script>

<style scoped>
    .month{
        margin-top:0.1rem;
    }
    .month_list{
        margin-top:0.2rem;
    }
    .month_top{
        height:0.2rem;
        background-color: white;
    }
    .month{
        background-color: white;
    }
    .month_list_first{
        margin-top:0.2rem;
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
    .b_hr{
        margin:0 auto;
        width:90%;
        border:solid 0.01rem #EEEEEE;
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
    .gi_div{
        margin: 0 auto;
        width: 50%;
        height: 0.6rem;
    }
    .gi_f{
        color: #3770FB;
        text-align: center;
    }
    .gi_s{
        color:  #52C9C4;
        text-align: center;
    }
    .gi_t{
        color:  #F6A500;
        text-align: center;
    }


    .top_list{
        font-size: 0 ;
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
