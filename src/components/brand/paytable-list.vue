<template>
    <div class="backgrouncolor">

        <div class="date_list">
            <i  class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span @click="Cymonth"> {{year}}年{{month}}月账单  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" @click="nextmonth"><!----></i>
        </div>

        <div style="height: 0.1rem;background-color:#F3F7F8 "></div>

        <div>
            <div class="top_search">
                <div class="left">
                    <div class="date_top_list">
                        <van-cell title="校区" is-link arrow-direction="down"  @click="showcho" />
                    </div>
                    <div class="search_div">
                        <div><input type="text" class="search" placeholder="请输入校区名称"  v-model='search'></div>
                        <div> <i class="van-icon van-icon-search"><!----></i></div>
                    </div>
                </div>
                <img :src="settingpic">
            </div>
        </div>

        <div>
            <div style="float:left;width: 3.55rem;overflow-x: scroll;margin: 0 0 0.1rem 0.1rem;border:">

                <div class="testsilder" style="width: 3.55rem">
                    <div>
                        <div  class="firsttoptitle  toptitle"  >
                            <span>校区</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>类型</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>历史欠款</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>上月应付</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>合计应付</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>本次支付</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>本次结余</span>
                        </div>
                        <div  class="box toptitle lasttoptitle"  >
                            <span>操作</span>
                        </div>
                    </div>
                    <div v-if="searchData.length>0">
                        <div style="float:left;">
                               <div v-for="(itemfo,index) in searchData" :key="index">
                                   <div class="firschoolname"> {{itemfo.schoolname}}</div>
                                   <div style="float:left;">
                                       <div class="typebox">{{itemfo.type}}</div>
                                       <div class="numberbox">{{itemfo.historyOverdraft}}</div>
                                       <div class="numberbox">{{itemfo.lastMonthFee}}</div>
                                       <div class="numberbox">{{itemfo.totalFee}}</div>
                                       <div class="numberbox">{{itemfo.currentPay}}</div>
                                       <div class="numberbox">{{itemfo.surplus}}</div>
                                       <div class="numberbox lastnumberbox" v-if="itemfo.recharge==1">充值</div>
                                       <div class="numberbox lastnumberbox" v-else-if="itemfo.recharge==2">补交</div>
                                   </div>
                               </div>
                        </div>
                    </div>
                    <div class="notdate" v-else style="line-height: 1.2rem;text-align:center; border: solid #dcdcdc;
    border-width: 0 0.01rem 0.01rem 0.01rem;" >无数据</div>

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

        <van-popup v-model="showMonth" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="标题"
                    :columns="columnss"

            />
        </van-popup>

    </div>
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';

    export default {
        name: "",
        data(){
            return {
                search:'',
                show:true,
                columnss:[],
                showMonth: false,
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                Cdate: false,
                minDate: new Date(),
                currentDate: new Date(),

                settingpic: require("../../assets/img/newconcept/settingse.png"),

                                        listfo:[
                                            {
                                                schoolname:'断a小学',
                                                type:"微信支付",
                                                historyOverdraft:0,
                                                lastMonthFee:0,
                                                totalFee:0,
                                                currentPay:0,
                                                surplus:0,
                                                recharge:'1'
                                            },
                                            {
                                                schoolname:'大大小学',
                                                type:"微信支付",
                                                historyOverdraft:0,
                                                lastMonthFee:0,
                                                totalFee:0,
                                                currentPay:0,
                                                surplus:0,
                                                recharge:'2'
                                            },
                                            {
                                                schoolname:'爸爸了把小学',
                                                type:"微信支付",
                                                historyOverdraft:0,
                                                lastMonthFee:0,
                                                totalFee:0,
                                                currentPay:0,
                                                surplus:0,
                                                recharge:'2'
                                            },
                                        ],
            }
        },
        // props:{
        //     fee:{
        //         type:Array
        //     }
        // },
        components: {
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [icon.name]:icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
        },
        mounted() {
            // console.log(this.fee)
        },
        methods:{
            showcho(){
                var address= [];
                for (let ad of this.listfo){
                    address.push(ad.schoolname)
                }
                this.columnss = address
                this.showMonth = true

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
            nextmonth(){
               this.month++
            },
            Cymonth(){
                this.Cdate = true
            },
        },
        computed: {
            searchData: function() {
                var search = this.search;
                if (search) {
                    return this.listfo.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }

                return this.listfo;
            }
        }
    }
</script>

<style scoped>
    .top_list{
        margin:0 auto;
        width:1rem;
    }
    .van-cell__title{
        text-align: center;
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
        height: 0.2rem;
    }
    .titile_bottom{
        width:90%;
        margin:0 auto;
        border-bottom: 0.02rem solid #eee;
    }


    .date_list{
        height: 0.5rem;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.5rem
    }
    .date_list span{
        margin: 0 0.4rem;
    }


    .left{
        font-size:0.14rem;
        float: left;
        width: 3.12rem;
        height: 0.24rem;
        border: solid #BCBCBC 0.01rem;
        border-radius: 0.04rem;
    }
    .top_search{
        float: left;
        margin:0.15rem;
    }
    .top_search img{
        width:0.24rem;
        height:0.24rem;
        margin-left: 0.07rem;
        float: left;
    }
    .search_div{
        width:75%;
        margin-left:0.05rem;
        float: left;
        border-left: solid 1px #CCCCCC;
    }
    .search{
        float: left;
        width:90%;
        margin-left:0.05rem;
        border:solid 1px white;
    }
    .lation_mes{
        float: left;
        margin-top: 0.3rem;
    }
    .date_top_list{
        width:0.7rem;
        float: left;
    }
    .van-cell__title{
        flex:none;
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin-left:0.05rem;
        width:100%;
        padding: 0 ;
    }
    .van-icon {
        font-size: 0.16rem;
        line-height: 0.24rem;
    }





    div{
        /*border: solid 1px #dcdcdc;*/
        /*font-size: 0.12rem;*/
        /*margin: 0.05rem;*/
        font-size: 0.12rem;
        /*float: left;*/
        /*line-height: 0.3rem;*/
        /*border: solid #dcdcdc 0.01rem;*/

        /*box-sizing: border-box;*/
        text-align: center;
    }
    .box{
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0.01rem 0.01rem 0.01rem 0;
    }
    .toptitle{

        height: 0.4rem;
    }
    .firsttoptitle{
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0.01rem 0.01rem 0.01rem 0.01rem;
    }
    .lasttoptitle{
        width: 0.65rem;
    }
    .schoolname{
        width: 0.4rem;
        text-align: center;
        height: 0.4rem;
        /*line-height: 0.2rem;*/
        float: left;

        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0;
    }
    .firschoolname{
        width: 0.4rem;
        text-align: center;
        height: 0.4rem;
        /*line-height: 0.2rem;*/
        float: left;

        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0.01rem;
    }

    .numberbox{
        width: 0.4rem;
        height: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0;
        line-height: 0.4rem;
    }
    .typebox{
        width: 0.4rem;
        height: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0;
    }
    .lastnumberbox{
        width: 0.65rem;
    }
    .timebox{
        line-height: 0.4rem;
        width: 1.25rem;
        height: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .personbox{
        width:0.61rem ;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0;
    }
    .personbox .one{
        line-height: 0.45rem;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .firstsign{
        width: 1.25rem;
        line-height: 0.9rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .bind{
        line-height: 0.44rem;
        width: 0.3rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0  0.01rem 0 0;
    }
    .unbind{
        line-height: 0.44rem;
    }
    .address{
        height: 0.4rem;
        line-height: 0.2rem;
    }
</style>
