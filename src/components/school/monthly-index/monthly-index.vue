<template>
    <div>
        <van-nav-bar
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onclickLeft"
                @click-right="onclickRight"
        >
            <div name="search" slot="title" >
                {{years}}年{{months}}月指数
            </div>
        </van-nav-bar>

        <div class="van-tabs_div">
            <van-tabs type="card">
                <van-tab title="月总指数">
                        <Monthlyindex></Monthlyindex>
                </van-tab>
                <van-tab title="月教师指数">
                        <Teacher></Teacher>
                </van-tab>
            </van-tabs>
        </div>

        <Footer :event-arr="arr" v-on:commenEvent="parent">  </Footer>

        <van-dialog
                v-model="show"
                :show-cancel-button=false
                :show-confirm-button=false
                :close-on-click-overlay="true"
        >
            <div>
                <div style="text-align: center;font-size: 0.16rem;line-height: 0.5rem;">
                    <span><van-icon name="arrow-left" @click="Upward" /> </span><span style="margin: 0 0.7rem"> {{years}}</span><span> <van-icon name="arrow" @click="down"/> </span>
                </div>
                <div>
                    <div class="test">
                        <div class="addleft"
                             :class="{clickaddleft:leftchangebgc == index }"
                             v-for="(item,index) in leftlist" :key="index"
                             @click="changeleft(index)"
                             @click.stop="getdate()">
                            {{item.con}}
                        </div>
                    </div>
                </div>
            </div>
            <div> <hr style="width: 90%;margin: 0.1rem 0.15rem 0 0.15rem;"></div>
            <div @click="jumptothis" v-if="this.year=new Date().getFullYear()" class="jump" style="color: #6699FF;font-size: 0.14rem;text-align: center;line-height: 0.4rem;">跳转至本月</div>

            <div v-else style="color: #999999;font-size: 0.14rem;text-align: center;line-height: 0.4rem">请选择</div>
        </van-dialog>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import Footer from './components/footer-operate-btn';
    import Monthlyindex from './components/monthly-index';
    import Teacher from './components/teacher-monthlyindex';
    import { Tab,Tabs } from 'vant';
    import { Tag } from 'vant';
    import { NavBar } from 'vant';
    import { Dialog } from 'vant';
    import { Icon } from 'vant';


    //import someComponent from './someComponent'
    export default {
        name: "",
        inject:["reload"],
        data() {
            return {
                arr:[{title:'查看历史月份',type:1}],
                // year:new Date().getFullYear(),
                // month:new Date().getMonth(),
                // bbq:'12',

                years:new Date().getFullYear(),
                months:new Date().getMonth()+1,

                leftlist:[
                    {con:"本月"},{con:"二月"},{con:"三月"},{con:"四月"},
                    {con:"五月"},{con:"六月"},{con:"七月"},{con:"八月"},
                    {con:"九月"},{con:"十月"},{con:"十一月"},{con:"十二月"},
                ],
                show:false,
                leftchangebgc:-1,

            }
        },
        components: {
            // Navbar:Navbar,
            Monthlyindex:Monthlyindex,
            Teacher:Teacher,
            Footer:Footer,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Tag.name]:Tag,
            [NavBar.name]:NavBar,
            [Dialog.name]:Dialog,
            [Icon.name]:Icon,
            //someComponent
        },
        methods:{
            jumptothis(){
                this.years = new Date().getFullYear(),
                    this.months = new Date().getMonth()+1
                this.$router.push({path: 'Monthlyindex', query: {date: this.years + '-' + '0' + this.months}})
                console.log(this.years + '-' + '0' + this.months)
                this.reload()

            },
            parent(){
                this.show = !this.isShow;
            },
            onclickLeft(){

            },
            onclickRight(){

            },
            changeleft(index){

                // this.$router.go(0)

                if (index<9){
                    {
                        this.months = index + 1
                        this.$router.push({path: 'Monthlyindex', query: {date: this.years + '-' + '0' + this.months}})
                        console.log(this.years + '-' + '0' + this.months)
                        this.reload()


                    }
                    // this.$router.go(0)
                }
                else {
                    this.months = index+1
                    console.log(this.year+'-'+this.months)
                    this.$router.push({ path:'Monthlyindex',query:{date:this.years+'-'+this.months} })
                    this.reload()
                }
                this.leftchangebgc = index;
            },
            getdate(){
                // this.year = new Date().getFullYear();
                // this.month = new Date().getMonth();
                // this.$router.push({ path:'MonthlyIndex',query:{date:this.year+'-'+this.month} })
                // console.log(this.year +'-'+ '0'+this.month)
            },
            Upward(){
                this.years--
            },
            down(){
                this.years++
            }
        },
        mounted(){
            // console.log(this.month)
                // this.changeleft(index);
            // if (localStorage['xxxIsFinish'] == 1){
            //     this.getdate();
            // } return;
            }

    }
</script>

<style scoped>
    .van-nav-bar .van-icon ,.van-nav-bar__text{
        color: white;
    }
    .van-nav-bar{
        background-color:#3770FB ;
    }
    .van-nav-bar__title{
        font-size: 0.16rem;
        color: white;
    }


    .van-tabs{
        margin-top:0.15rem;
    }
    .van-tabs_div{
        margin-bottom: 1rem;
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
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab{
        border-right: none;
    }

    .acline{
        width:100%;
        height: 1rem;
        background-color: #F3F7F8;
    }



    .test{
        font-size:0.14rem;
        width: 3.5rem;
        margin: 0 auto;
        float: left;
        padding-bottom: 0.15rem;
    }
    .addleft{
        float: left;
        margin: 0 0.14rem;
        color: #666666;
        text-align: center;
        line-height:0.3rem;
        width:0.5rem;
        height:0.3rem;
        background:white;
        border-radius:0.03rem;
        /*border: solid 1px #666666;*/
    }
    .clickaddleft{
        /*border: solid 1px #3770FB;*/
        color: white;
        background-color:#3770FB;}

    >>>.van-button--large{
        height: 0.4rem;
        font-size: 0.14rem;
        line-height: 0.4rem;
    }

</style>
