<template>
    <ul class="student-list">
        <li class="items">
            <div class="avator">
                <img src="../../../assets/img/parents/index/banner2.png" alt="">
            </div>
            <div class="info">
                <span class="name">2222</span>
                <span class="basic">111 <span class="grade">222</span></span>
            </div>
        </li>
        <li class="items">
            <div class="avator">
                <img src="../../../assets/img/parents/index/banner2.png" alt="">
            </div>
            <div class="info">
                <span class="name">2222</span>
                <span class="basic">111 <span class="grade">222</span></span>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "atendance-student-list",

    }
</script>

<style scoped lang="less">
    .student-list{
        overflow: hidden;
        .items{
            float: left;
            width: 1.65rem;
            height: 0.77rem;
            padding: 0.13rem 0.09rem 0.12rem;
            margin-left: 0.13rem;
            border: 0.01rem solid #DCDCDC;
            border-radius: 0.03rem;
            box-sizing: border-box;
            .avator{
                float: left;
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.12rem;
                img{
                    float: left;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .info{
                >span{
                    display: block;
                }
                .name{
                    font-size: 0.14rem;
                    color: #666;
                    line-height: 0.2rem;
                    margin-bottom: 0.08rem;
                }
                .basic{
                    font-size: 0.12rem;
                    color: #666;
                    line-height: 0.12rem;
                    .grade{
                        color: #999;
                        margin-left: 0.12rem;
                    }
                }
            }
        }
    }
</style>