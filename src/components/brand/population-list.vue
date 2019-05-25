<template>
    <div>
        <div class="top_search">
            <div class="left">
                <div class="date_top_list">
                    <van-cell title="校区" is-link arrow-direction="down"    @click="showcho"/>
                </div>
                <div class="search_div">
                   <div><input type="text" class="search" placeholder="请输入校区名称"  v-model='search ' ></div>
                    <div> <i class="van-icon van-icon-search"><!----></i></div>
                </div>
            </div>
            <img :src="settingpic">
        </div>

        <div>
            <div style="float:left; width: 3.55rem;border: solid 0.01rem #dcdcdc;overflow-x: scroll;margin: 0.1rem 0 0.1rem 0.1rem;">

                <div class="testsilder" style="width: 3.7rem">

                    <div style="float:left;">

                        <div  class="box toptitle"  >
                            <span>校区</span>
                        </div>

                        <div  class="personbox" >
                            <div  class="one">    <span>园长</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" >
                            <div  class="one">    <span> 教师</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" >
                            <div class="one" >    <span>学生</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div class="firstsign">
                            <span>首次启用</span>
                        </div>
                    </div>
                                        <div style="float:left;">

                                            <div v-if="searchData.length>0">
                                            <div v-for="(itemfo,index) in searchData" :key="index" style="float: left">

                                                <div class="schoolname"> {{itemfo.school}}</div>
                                                <div style="float:left;">
                                                    <div  class="numberbox">{{itemfo.number}}</div>
                                                    <div  class="numberbox">{{itemfo.number}}</div>
                                                    <div  class="numberbox">{{itemfo.number}}</div>
                                                    <div  class="numberbox">{{itemfo.number}}</div>
                                                    <div  class="numberbox">{{itemfo.number}}</div>
                                                    <div  class="numberbox">{{itemfo.number}}</div>
                                                    <div   class="timebox">{{itemfo.signdate}}</div>
                                                </div>
                                            </div></div>
                                            <div v-else style="float:left;line-height: 1rem;text-align: center; width: 3.55rem;">查无此次校区数据</div>
                                        </div>
                </div>
            </div>
        </div>
        <van-popup v-model="showMonth" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    title="标题"
                    :columns="columnss"
            />
        </van-popup>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Picker } from 'vant';
    import { Popup } from 'vant';

    import { Cell, CellGroup,icon } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        // props:{
        //     populationmes:{
        //         type:Array
        //     }
        // },
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
        },
        data(){
            return {

                columnss:[],
                showMonth: false,
                search:'',
                searchse:'',
                msg: "Hello Vue.js",
                settingpic: require("../../assets/img/newconcept/settingse.png"),
                                        listfo: [
                                            {school: '唧生小学', signdate:'2019-02-6',number: '1'},
                                            {school: '二分小学', signdate:'2019-02-6',number: '2'},
                                            {school: '士d 小学', signdate:'2019-02-6',number: '3'},
                                            {school: '士a 小学', signdate:'2019-02-6',number: '3'},
                                        ]
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [icon.name]:icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,

            //someComponent
        },
       methods:{
           showcho(){
               var address= [];
               for (let ad of this.listfo){
                   address.push(ad.school)
               }
               this.columnss = address
               this.showMonth = true

           },
       }
    }
</script>

<style scoped>
    .lation_mes table,td,th{
        border-collapse: collapse;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.17rem;
        border: solid 1px #DCDCDC;
    }
/*代理商------------------------------------------------------------------*/
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
        margin:0.15rem ;
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
        height: 0.2rem;
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
        border-width: 0 0.01rem 0.01rem 0;
    }
    .toptitle{
        line-height: 0.9rem;
        height: 0.9rem;
    }
    .schoolname{
        width: 0.4rem;
        text-align: center;
        /*height: 0.4rem;*/
        line-height: 0.2rem;
        float: left;

        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0;
    }
    .numberbox{
        line-height: 0.4rem;
        width: 0.3rem;
        height: 0.4rem;
        float: left;

        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem  0;
    }
    .timebox{
        line-height: 0.4rem;
        width: 1.35rem;
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
        width: 1.35rem;
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
