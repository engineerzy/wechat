<template>
    <div id="unit-management">
        <nav-bar :title="'单元管理'" :leftText="'返回'" :rightText="''" :id="''"></nav-bar>
        <div class="anniu">
            <span class="xiu_gai">点击单元可进行修改或删除</span>
            <ul class="danyuan_ul">
                <!-- <li v-for="(item,index) in data" :key='index' v-text="item.name" @click="clickUnit(item)">
                </li> -->
                <li>第一单元</li>
                <li>第二单元</li>
            </ul>
        </div>
        <div class="bott_yi">
            <van-button size="large">新增单元</van-button>
        </div>
    </div>
</template>】
<script>
import navBar from "../../common/nav-bar";
import { Button } from "vant";
import { getUnit } from "@/api/school/score-manage";
export default {
  components: {
    navBar,
    [Button.name]: Button
  },
  data() {
    return {
      data: [] //单元列表
    };
  },
  created() {
    this.startUnit();
  },
  methods: {
    //   初始进来
    startUnit() {
      return getUnit().then(res => {
        // console.log(res.data.data);
        this.data = res.data.data;
      });
    },
    // 点击单元
    // clickUnit(item) {
    //   console.log(item);
    // }
  }
};
</script>
<style  lang="less">
@import "performance";
</style>

