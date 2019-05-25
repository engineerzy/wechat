
<template>

 <div>
     <van-nav-bar
             title="新师路"
             left-text="返回"
             right-text="切换账号"
             left-arrow
             @click-left="onClickLeft"
             @click-right="onClickRight"
     />
     <div class="van-tabs_div">
         <van-tabs type="card" custom-class="tag">
             <van-tab title="人数报表"><population  :populationmes="populationmes"></population></van-tab>
             <van-tab title="收费报表"><Pay :fee="fee"></Pay></van-tab>
             <van-tab title="数据统计"><datasta :statistics="statistics"></datasta></van-tab>
         </van-tabs>
     </div>
 </div>
</template>

<script>
    import population from './population-list'
    import Pay from './paytable-list'
    import datasta from './date-list'
    import { NavBar } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { Populationreport } from '@/api/new-concept/new-concept';
    import { FeeReport } from '@/api/new-concept/new-concept';
    import { Statistics } from '@/api/new-concept/new-concept';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                populationmes:[],
                fee:[],
                statistics:[]

            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            population:population,
            datasta:datasta,
            Pay:Pay

            //someComponent
        },
        methods:{
            onClickLeft(){
                this.$router.push(-1)
            },
            onClickRight(){
                this.$router.push(-1)
            },
            GetPopulationreport(){
                Populationreport().then(res => {
                                    this.populationmes = res.data.data;
                                    console.log(this.populationmes);
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },

            GetStatistics(){
                 Statistics().then(res => {
                                    this.statistics = res.data.data;
                                    // console.log(this.statistics);
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },

            GetFeeReport(){
                FeeReport().then(res => {
                                    this.fee = res.data.data;
                                    // console.log(this.fee);
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },




        },
        mounted(){
            this.GetPopulationreport()
            this.GetStatistics()
            this.GetFeeReport()
            // console.log(this.populationmes)
        }
    }
</script>


<style scoped>
    .van-nav-bar{
        background-color: #3770FB;
    }
    .van-nav-bar__title{
        color: #ffffff;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-nav-bar .van-icon{
        color: white;
    }


    .van-tabs_div>>>.van-tabs__nav--card .van-tab.van-tab--active {
        background-color: #3770fb;
        color: white;
    }
    .van-tabs_div>>>.van-tabs__nav--card {
        border: 1px solid #3770fb;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab{
        color: #3770fb;
        border-right: 1px solid #3770fb;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab:last-child{
        border-right: none;
    }
    .van-tabs_div>>>.van-tabs--card>.van-tabs__wrap{
        margin-top:0.15rem;
    }
    .van-tabs_div>>>.van-tabs__content{
        margin-top:0.2rem;
    }


</style>
