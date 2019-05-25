<template>
    <div class="food">
        <div class="title"><span>食谱饮食</span></div>
        <div class="foodlist_mar">

            <div class="parents"><span >家长选票</span></div>
            <div>
            <van-tabs >
                <van-tab title="周一">
                    <Diet></Diet>
                </van-tab>
                <van-tab title="周二">
                    <Diet></Diet>
                </van-tab>
                <van-tab title="周三">
                    <Diet></Diet>
                </van-tab>
                <van-tab title="周四">
                    <Diet></Diet>
                </van-tab>
                <van-tab title="周五">
                    <Diet></Diet>
                </van-tab>
            </van-tabs>
            </div>
        </div>



    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import Diet from './food-type-list'
    import { Tab, Tabs } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {


            }
        },
        components: {
            Diet:Diet,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,

            //someComponent
        }
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    .title{
        margin: 0.15rem 0 0 0.15rem;
        border-left: solid #3770FB;
        font-size: 0.16rem;
    }
    .title span{
        margin-left: 0.1rem;
    }

    .test{
        overflow-x: scroll;
        height: 1.5rem;
    }

    .food>>>.van-tabs__wrap{
        height: 0.3rem;
        width: 2.8rem;
        left: 0.85rem;
     }
    .parents{
        /*left: 0.15rem;*/
        /*position: relative;*/
        /*top: 0.15rem;*/
        float: left;
        line-height: 0.15rem;
        margin-left: 0.15rem;
    }

    .food>>>.van-tabs__line{
        background-color: #3770FB;
    }
    .food>>>.van-tab--active{
       color:#3770FB;
    }
    .food>>>.van-tab{
        font-size: 0.14rem;
        line-height: 0.15rem;
     }
    .foodlist_mar{
        margin-top: 0.15rem;
    }
    .food>>>.van-tabs--line{
        padding-top: 0.2rem;
    }
    .food>>>.van-tab{
        flex-basis:21% !important;
    }

    .foodlist_mar>>>.van-hairline--top-bottom::after{
        border-width: 0 0 0 0;
    }


</style>
