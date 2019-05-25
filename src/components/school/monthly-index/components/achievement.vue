<template>
    <div>
        <div class="ach_div">
            <div class="number">为   <span class="stu_number">{{eventArr.stuCount}}</span>    名学生录入成绩档案</div>
            <div class="students_div">
                <div class="students">
                    <div class="tab_list">
                        <div class="tab_mar">
                        <div class="Ytap_title">有记录学生</div>
                        <div class="Ytap"></div>
                        </div>
                    </div>
                    <div class="tab_list">
                        <div class="tab_mar">
                        <div class="Ntap_title">无记录学生</div>
                        <div class="Ntap"></div>
                        </div>
                    </div>
                </div>
                <div class="echarts" id="echarts" :style="{width: '2rem', height: '1.2rem'}">

                </div>
            </div>

            <div class="ac_line"><hr></div>

            <div class="register">共录入    <span class="stu_number">{{eventArr.number}}</span>    次</div>


            <div id="light" style="width: 3.5rem;height:2.2rem;">

            </div>

            <div style="height: 2.2rem;
                        text-align: center;
                        position: relative;
                        bottom: 2rem;
                        line-height: 2rem;"
                        v-if="eventArr.number==0">
                无数据
            </div>
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import echarts from 'echarts'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                students:'0',
                register:'0',
                habitSituation:[
                    {
                        value: this.eventArr.unexistStuCount,
                        name:'未录入'
                        /*color:'#2FC25B'-unexistStuCount*/
                    },
                    {
                        value: this.eventArr.existStuCount,
                        /*color:'#1890FF'*/
                        name:'已录入'
                    },
                    ],
                msg: "Hello Vue.js"
            }
        },
        components: {
            //someComponent
        },
        methods:{

        },
        props:{
            eventArr:{
                type:Array.Object
            }
        },
        mounted() {
            let bread = document.getElementById('echarts');
            let myChart = this.echarts.init(bread);
            // 绘制图表
            myChart.setOption({
                color:['#84C225', '#1890FF'],
                series: [{
                    type: 'pie',
                    radius: '70%',
                    center: ['50% ', ' 50%','',''],
                    // 设置值域的那指向线

                    // itemStyle : {
                    //     normal : {
                    //         label : {
                    //             show : true,
                    //             formatter: "{b}:  ({d}%)",//显示标签
                    //         },
                    //         labelLine : {
                    //             show : true,//显示标签线
                    //             // length:10
                    //         },
                    //
                    //         borderWidth:0, //设置border的宽度有多大1
                    //         borderColor:'#fff',
                    //
                    //     },
                    //
                    // },

                    labelLine: {
                        normal: {
                            length: 0,  // 改变标示线的长度
                            show: false,   // show设置线是否显示，默认为true，可选值：true ¦ false
                        },
                    },
                    // 设置值域的标签
                    label: {
                        normal: {
                            position: 'outside',
                            formatter: '{d}%' +'\n'+ '{c}人' ,
                        },
                        align: 'right',
                        lineHeight: 17,
                    },


                    data: this.habitSituation
                }]
            });

            var liketimes= [];
            for (let lt of this.eventArr.barChart) {
                liketimes.push(lt.date)
            }
            console.log(liketimes)

            // 基于准备好的dom，初始化echarts实例
            var Lflower = echarts.init(document.getElementById('light'));
            // var Bflower = echarts.init(document.getElementById('black'));
            // 指定图表的配置项和数据
            var option = {
                grid: {
                    top:'20%',
                    bottom:'15%',
                    left:'5%',
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
                    data: ["01","02","03","04","05","06","07"]
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
                    type: 'bar',
                    data: [0, 0, 0, 0, 0, 0,0],
                    itemStyle : {
                        normal : {
                            // label: {
                            //     show: true,
                            //     position: 'top',
                            //     textStyle: {
                            //         // color: '#DA0000'
                            //     }
                            // }
                        },
                    },
                    barWidth : 23
                }],
                dataZoom: [//给x轴设置滚动条
                    //下面这个属性是里面拖到
                    {
                        type: 'inside',
                        show: true,
                        xAxisIndex: [0],
                        startValue:0,
                        endValue:6
                    },
                ],
            };
//        另一个--------------------------------------------------------------------------

            // 使用刚指定的配置项和数据显示图表。
            Lflower.setOption(option);

        },
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    hr{
        color: #EEEEEE;
        border:solid 1px  #EEEEEE;
    }
    .number{

    }
    .stu_number{
        color:#84C225 ;
    }
    .students{
        margin: 0.2rem 0;
        float:left;
    }
    .students_div{
        margin-top: 0.1rem;
    }
    .echarts{
        margin-left:1.5rem;
    }
    .Ytap_title{
        float: left;
    }
    .Ytap{
        margin: 0.03rem;
        background-color: #3770FB;
        float: left;
        width: 0.45rem;
        height: 0.15rem;
    }
    .Ntap_title{
        float: left;
    }
    .Ntap{
        margin: 0.03rem;
        background-color: #84C225;
        float: left;
        width: 0.45rem;
        height: 0.15rem;
    }
    .tab_list{
        /*margin: 0.15rem 0;*/
    }
    .tab_mar{
        color: #999999;
        float: left;
        margin: 0.1rem 0;
    }
    .ach_div{
        margin: 0.15rem;
    }
    .register{
        margin-top: 0.1rem;
    }
</style>
