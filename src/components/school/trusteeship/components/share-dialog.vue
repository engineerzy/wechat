<template>
    <div class="dialog_div">
        <img src="@/assets/img/trusteeship/head.jpg">
        <div class="midtext">Curabitur suscipit, arcu ut interdum fringilla, dui lacus dignissim urna, sed lacinia dui metus sed ipsum. Mauris placerat nisl id eros viverra congue. Nullam tempus pellentesque mollis. Duis dolor tellus, ornare eu augue sed, consectetur tincidunt eros. Quisque molestie a felis vel volutpat. Etiam interdum lacus eget erat porttitor, et tristique massa ultricies. Sed lacinia nec metus at semper. Sed condimentum risus congue, consectetur tellus sed, aliquet est. Sed pharetra in turpis ac efficitur. Morbi non dui urna. Donec ut nisl ac lacus scelerisque lacinia. Etiam eu diam in tortor venenatis finibus pharetra maximus quam. Sed non leo fringilla, consequat nisi eu, facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div class="wechat">
            <div class="sharetext"><span>长按将图片分享给盆友</span></div>
            <div class="shareimg">
                <img src="@/assets/img/trusteeship/head.jpg" >
            </div>
            <!--<img src="@/assets/img/trusteeship/head.jpg" >-->
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style scoped>
    .dialog_div{
        padding: 0.15rem;
        /*height: 5rem;*/
        /*overflow:scroll;*/
    }
    .midtext{
        margin: 0.1rem 0;
        height: 2rem;
        overflow:scroll;
    }
    .dialog_div img{
        width: 100%;
        height: 1rem;
    }
    .wechat{
        height: 1rem;
    }
    .wechat span{
        line-height: 1rem;
    }
    .wechat img{
        width: 1rem;
        height: 1rem;
    }
    .sharetext{
        font-size: 0.14rem;
        float: left;
        width: 50%;
    }
    .shareimg{
        width: 50%;
        float: left;
        text-align: right;
    }

</style>
