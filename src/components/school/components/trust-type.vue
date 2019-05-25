<template>
    <div class="trust-detail" v-if="trustList">
        <div class="outer-box">
            <ul class="content">
                <li class="item" v-for="(item,index) in trustList" @click="attendanceType(item)" :key="index">
                    <span class="name">{{item.name}}</span>
                    <span class="times">{{item.time}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "trust--type",
        props:{
            trustList:{
                type:Array
            }
        },
        methods:{
            attendanceType(item){
                this.$emit("attendanceType", { item });
            }
        }
    }
</script>

<style scoped lang="less">
    .trust-detail{
        width: 100%;
        font-size: 0;
        background-color: #fff;
        overflow: hidden;
        .outer-box{
            width: 3.75rem;
            height: 0.7rem;
            overflow-x: scroll;

            .content{
                width: 4.44rem;
                overflow: hidden;
                .item{
                    float: left;
                    width: 0.95rem;
                    height: 0.55rem;
                    border: 0.01rem solid #EDEDED;
                    border-radius: 0.03rem;
                    box-shadow:0 0.01rem 0.02rem 0 rgba(0,0,0,0.08);
                    padding: 0.07rem 0;
                    margin-left: 0.16rem;
                    box-sizing: border-box;
                    span{
                        display: block;
                        text-align: center;
                        font-size: 0.14rem;
                        line-height: 0.2rem;
                    }
                    .name{
                        color: #666;
                    }
                    .times{
                        color: #84C225;
                    }
                }
            }
        }
    }
</style>