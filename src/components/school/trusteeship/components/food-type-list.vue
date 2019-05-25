<template>

  <div class="father">
    <div class="son" v-for="(item,index) in list" :key="index">
      <img :src=item.img>
      <div class="foodname"><span>{{item.name}}</span></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "diet",
    props:{

    },
    data(){
      return {
        list:[
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'小笼包'},
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'汉堡包'},
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'草莓蛋糕'},
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'香蕉牛奶'},
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'终极鱿鱼'},
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'西兰花'},
          {img:require("../../../../assets/img/trusteeship/head.jpg"),name:'萝卜'},
                ]
      }
    }
  }
</script>

<style scoped lang="less">
  .topimg{
  }
  img{
    border-radius:0.03rem;
    width: 0.86rem;
    height: 0.66rem;
  }
  .father{
    margin: 0.2rem 0.15rem;
    width: 3.45rem;
    height: 100%;
    float: left;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
  .son{
    text-align: center;
    margin-right: 0.1rem;
    width: 0.86rem;
    height: 0.66rem;
    position: relative;
    display: inline-block;
  }
  .foodname{
    margin-top: 0.05rem;
  }

</style>
