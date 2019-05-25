<template>
    <div v-if="ranke && JSON.stringify(ranke)!=='{}'">
        <div style="height:0.1rem;background-color: #F3F7F8;margin-top: 0.15rem;"></div>

        <div class="top_mes_div" v-if="ranke.stuInfo && JSON.stringify(ranke.stuInfo)!=='{}'">
            <div class="top_head_div">
                <img :src="ranke.stuInfo.avatar">
            </div>
            <div style="line-height: 0.18rem;">
                <span>{{ranke.stuInfo.stuName}}</span><br>
                <span >目前排名：第{{ranke.stuInfo.rankNum}}名</span><br>
                <span class="s_span">{{ranke.stuInfo.comment}}</span>
            </div>
        </div>

        <div style="height:0.1rem;background-color: #F3F7F8"></div>

        <div style="text-align:center">

            <div class="ranking_title" style="line-height: 0.45rem;border-bottom:solid 1px #F3F7F8">
                <van-row type="flex" justify="space-between">
                    <van-col span="4"><span>排名</span></van-col>
                    <van-col span="6"><span>学生</span></van-col>
                    <van-col span="6"><span>年级</span></van-col>
                    <van-col span="6"><span>总红花数</span></van-col>
                </van-row>
            </div>

            <div class="ranking_list_div"   v-for="(item,index) in ranke.rankList" :key="index">
                <van-row type="flex" justify="space-between">

                    <van-col span="4">
                        <span style="font-size: 0.18rem;color: #6699CC" class="ranking_number" v-if="item.stuName==='我'" >
                            {{index+1}}
                        </span>
                        <span style="font-size: 0.18rem;" class="ranking_number" v-else>
                            {{index+1}}
                        </span>
                    </van-col>
                    <van-col span="6" >
                        <div class="ranking_list_head">
                            <img :src=item.avatar >
                            <span v-if="item.name==='我'" style="color: #6699CC">{{item.stuName}}</span>
                            <span v-else>{{item.stuName}}</span>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <span>{{item.gradeName}}年级</span>
                        </van-col>
                    <van-col span="6">
                        <i class="icon-flower" style="color: red;font-size: 0.16rem"></i>
                        <span>{{item.safflowerNum}}</span>
                    </van-col>

                </van-row>
            </div>

        </div>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        props:{
          ranke:{
              type:Object
          }
        },
        data() {
            return {
                // msg: "Hello Vue.js",
                // myname:'周晓东',
                // myrank:'5',
                // exceed:'56',
                // list:[
                //     {rank:2,head:require('../../../assets/img/Redflowers/head.jpg'),name:'李小白',year:'1',flowers:'88'},
                //     {rank:3,head:require('../../../assets/img/Redflowers/head.jpg'),name:'我',year:'5',flowers:'58'},
                //     {rank:4,head:require('../../../assets/img/Redflowers/head.jpg'),name:'周小皇',year:'2',flowers:'99'},
                //     {rank:5,head:require('../../../assets/img/Redflowers/head.jpg'),name:'陈小蓝',year:'4',flowers:'8'},
                //     {rank:7,head:require('../../../assets/img/Redflowers/head.jpg'),name:'测试员',year:'6',flowers:'201'},
                //     {rank:7,head:require('../../../assets/img/Redflowers/head.jpg'),name:'测试员2',year:'6',flowers:'51'},
                //     {rank:7,head:require('../../../assets/img/Redflowers/head.jpg'),name:'测试员3',year:'6',flowers:'52'},
                //     {rank:7,head:require('../../../assets/img/Redflowers/head.jpg'),name:'测试员4',year:'6',flowers:'153'},
                //     {rank:7,head:require('../../../assets/img/Redflowers/head.jpg'),name:'测试员5',year:'6',flowers:'51'},
                //     ],
                // sortflowers:'flowers'
            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col
            //someComponent
        },


        //排名按照红花数量进行降序
        methods:{
            // range() {
            //     return this.list.sort((a,b)=>b.flowers-a.flowers);
            // },
        },
        mounted(){
            // this.range();

        },



    }
</script>

<style scoped>
    *{
        font-size: 62.5%;
    }
    span{
        font-size: 0.14rem;
    }
    .s_span{
        font-size: 0.12rem;
    }
    .top_mes_div{
       height: 0.7rem;
        width: 3rem;
        margin: 0 auto;
        padding: 0.1rem 0;
    }
    .top_head_div{
        padding: 0.075rem 0.2rem 0.075rem 0;
        width: 0.55rem;
        height: 0.55rem;
        float: left;
    }
    .top_head_div img {
        width: 100%;
        height: 100%;
        border-radius: 0.7rem;
    }

    .ranking_list_div{
        line-height: 0.45rem;
        border-bottom:solid 0.1px #F3F7F8;
    }
    /*//前三名排名颜色*/
    .ranking_list_div:nth-child(2)>>>.ranking_number{
        color: #FF6600;
    }
    .ranking_list_div:nth-child(3)>>>.ranking_number{
        color: #FF9900;
    }
    .ranking_list_div:nth-child(4)>>>.ranking_number{
        color:#FFCC00;
    }
    .ranking_list_head img{
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 0.7rem;
        float: left;
        margin: 0.05rem 0;
    }
</style>
