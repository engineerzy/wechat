<template>
    <div class="bgc">
        <van-nav-bar
                title="阳扬家教园"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="$router.back()"
        />
        <div class="topimg"> <img src="../../../assets/img/trusteeship/banner.png"></div>

        <div class="component_explain">
            <div class="explain_div">
                <div class="title"><span>机构简介</span></div>
                <div class="explain">一对一到家辅导采用6v1专属服务体系,标准化授课加个性化需求,培养高效的学习能力,针对性强,及时查漏补缺不留疑问,教师最优匹配，新学期见证孩子改变。</div>
            </div>
        </div>

        <div class="component_team"><Teacheritem></Teacheritem></div>

        <div class="component_foodlist"><Foodlist></Foodlist></div>

        <div class="address">
            <div class="address_mar">
                <div class="addressmes"><span>{{address}}</span></div>
                <div class="morenews"><span>在地图定位</span><span class="morenews_mid">|</span><span>联系机构咨询</span></div>
                <div class="button" @click="signup">直接报名</div>
            </div>
        </div>

        <van-dialog
                v-model="show"
                show-cancel-button
                cancel-button-text="在考虑下"
                confirm-button-text="提交报名"
        >
            <div class="dialog_div">
                <Signup></Signup>
            </div>
        </van-dialog>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import Teacheritem from './components/teacher-team'
    import Signup from './components/signup-dialog'
    import Foodlist from './components/food-list'
    import { NavBar } from 'vant';
    import { Dialog } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                msg: "Hello Vue.js",
                address:'机构地址：深圳市福田区沙尾下沙村下沙二坊97-3对面',
                show:false

            }
        },
        components: {
            Teacheritem:Teacheritem,
            Foodlist:Foodlist,
            Signup:Signup,
            [NavBar.name]:NavBar,
            [Dialog.name]:Dialog,
            //someComponent
        },
        methods:{
            signup(){
                this.show = !this.isShow;
            }
        }
    }
</script>

<style scoped>
    .bgc{
        float: left;
        background-color:#F3F7F8;
    }

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


    .topimg{
        width: 100%;
        height: 1.5rem;
    }
    .topimg img{
        width: 100%;
        height: 100%;
    }

    .title{
        border-left: solid #3770FB;
        font-size: 0.16rem;
    }
    .title span{
        margin-left: 0.1rem;
    }
    .explain{
        margin-top: 0.1rem;
        font-size: 0.14rem;
        color:rgba(102,102,102,1);
        line-height:0.2rem
    }
    .explain_div{
        margin: 0.2rem 0.15rem;
    }
    .component_explain{
        background-color: white;
        float: left;
    }
    .component_team{
        margin-top: 0.1rem;
        background-color: white;
        float: left;
    }
    .component_foodlist{
        width: 100%;
        margin-top: 0.1rem;
        background-color: white;
        float: left;
    }
.address{
    margin-top: 0.1rem;
    float: left;
    width: 100%;
    background-color: white;
    text-align: center;
    font-size: 0.14rem;
}
.address_mar{
    margin: 0.1rem 0;
}
.addressmes{
    margin-bottom: 0.15rem;
}
    .morenews{
        margin-bottom: 0.15rem;
        color: #84C225;
    }
    .morenews_mid{
        margin: 0 0.25rem;
    }
    .button{
        margin: 0 auto;
        width: 2.5rem;
        height: 0.3rem;
        background-color: #3770FB;
        border-radius:0.03rem;
        color: white;
        text-align: center;
        line-height: 0.3rem;
    }
</style>
