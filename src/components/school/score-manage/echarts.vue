<template>
    <div class="echarts">
        <head-top :title="'详情'" :rightText="''" :leftText="'成绩档案'"></head-top>
        <div class="score-name">
            <p class="score-item">
                <span>一年级</span>
                <span>小明</span>
            </p>
        </div>
        <div class="spaceing"></div>
        <div class="echarts-wrapper">
            <div class="time">
                <span class="name-before"></span>
                <span class="time-name">上学期</span>
            </div>
             <div id="mycharts">

            </div>
            <div style="margin-top: -20px;padding-bottom: 0.19rem;">
                <span>最高分：95</span>
                <span>平均分：90</span>
            </div>
        </div>
        <div class="" style="height: 0.16rem;background-color: #F3F7F8;"></div>
        <div class="echarts-wrapper">
            <div class="time">
                <span class="name-before"></span>
                <span class="time-name">下学期</span>
            </div>
             <div id="mycharts2">

            </div>
            <div style="margin-top: -20px;padding-bottom: 0.19rem;">
                <span>最高分：95</span>
                <span>平均分：90</span>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '../../common/nav-bar'

export default {
    components: {
        headTop
    },
    data() {
        return {
            staticData: [400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
        }
    },
    mounted() {
        this.initCharts()
    },
    methods: {
        initCharts() {
            let echartId = document.getElementById('mycharts')
            let lineChart = this.echarts.init(echartId)
            let echartId2 = document.getElementById('mycharts2')
            let lineChart2 = this.echarts.init(echartId2)
            let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
            data: ['成绩']
        },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['07-05','07-12','07-19','07-26','08-01','08-08']
    },
    yAxis: {
        //y轴刻度线
        axisTick:{
            show:false,
        },
        axisLine:{
            show: false,
        	lineStyle:{
        		type:['default','dashed']
        	}
        },
        //y坐标分割线样式
        splitLine:{
            show:true,
        	lineStyle:{
        		type:['default','dotted']
        	}
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            gt: 0,
            lte: 1,
            color: 'red'
        }, {
            gt: 1,
            lte: 2,
            color: 'red'
        },{
            gt: 2,
            lte: 3,
            color: 'green'
        }, {
            gt: 3,
            lte: 4,
            color: 'green'
        }, {
            gt: 4,
            lte: 5,
            color: 'red'
        }]
    },
    series: [
        {
            name:'成绩',
            type:'line',
            data: [90, 85, 80, 91, 98, 90],
            // 折线点上显示数值
            itemStyle : { normal: {label : {show: true}}}

        }
    ]
}
            let j = 0
            // for(let i=0;i<this.staticData.length-1;i++) {
            //     if(this.staticData[i] <= this.staticData[i+1]) {
            //         option.visualMap.pieces[j] =  {gt:i,lte:i+1,color:'red'};
            //     } else {
            //         option.visualMap.pieces[j] =  {gt:i,lte:i+1,color:'buue'};
            //     }
            //     j++
            // }
            lineChart.setOption(option)
            lineChart2.setOption(option)
        }
    }
}
</script>
<style lang="less" scoped>
    .echarts{
        font-size: 0.14rem;
        .select-group{
            display: flex;
            .chooseTerm{
                position: relative;
                width: 1rem;
                height: 0.54rem;
                select {
                    width: 1rem;
                    height: 0.54rem;
                    font-size: 0.14rem;
                    //清除select的边框样式
                    border: none;
                    //清除select聚焦时候的边框颜色
                    outline: none;
                    padding: 0.14rem 0 0.1rem 0.16rem;
                    //隐藏select的下拉图标
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                }
                img {
                    position: absolute;
                    width: 0.13rem;
                    height: 0.13rem;
                    top: 0.24rem;
                    right: 0.08rem;
                }
            }
        }
        .score-name{
            margin-top: 0.45rem;
            padding: 0.165rem 1.2rem;
            .score-item {
                display: flex;
                justify-content: space-between;
            }
        }
        .spaceing{
            margin: 0 0.16rem;
            height: 1px;
            background-color: #EEEEEE;
        }
        .echarts-wrapper{
            padding: 0 0.16rem;
            .time {
                padding-top: 0.18rem;
                .name-before {
                    padding-top: 0.16rem;
                    padding: 0.01rem 0.01rem;
                    background-color: #3770FB;
                    margin-right: 0.1rem;
                }
                .time-name {
                    font-weight: bold;
                }
            }
            #mycharts,#mycharts2 {
                height: 3rem;
            }
        }

    }
</style>
