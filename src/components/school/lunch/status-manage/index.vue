<template>
  <div class="status_manage">
    <nav-bar
      class="nav-bar"
      :title="$route.meta.title"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="$router.back()"
      fixed
      :zIndex="100"/>

    <div class="van-tabs_div">
      <tabs type="card">
        <tab title="午休表现">
          <tab-card :data="siesta" />
        </tab>
        <tab title="用餐情况">
          <tab-card :data="dining" />
        </tab>
      </tabs>
    </div>

    <div class="bottom">
      <p class="tip">点击评语可修改或删除</p>
      <router-link class="add_status" :to="{ name: 'LunchStatusManageCreate' }">新增状态</router-link>
    </div>

  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant';
import tabCard from './components/tab-card'
import { getStatusList } from '@/api/school/lunch'

export default {
  name: 'status_manage',
  data() {
    return {
      siesta: undefined,
      dining: undefined,
    }
  },
  components: {
    NavBar,
    Tab,
    Tabs,
    tabCard,
  },

  mounted() {
    this.$loading();
    getStatusList()
      .then(response => {
        if (response.data.meta.success) {
          this.siesta = response.data.data.siesta
          this.dining = response.data.data.dining
        }
      })
      .finally(() => { this.$loadingHide() })
  }
}
</script>

<style scoped>
.van-tabs {
  margin-top: 0.15rem;
}

.van-tabs_div {
  margin-bottom: 1rem;
}

.status_manage {
  padding-top: 44px;
  padding-bottom: .8rem;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

}
.bottom .tip {
  background-color: white;
  width: 100%;
  text-align: center;
  font-size: 0.12rem;
  color: rgba(153,153,153,1);
  line-height: 0.4rem;
  height: 0.4rem;
}
.bottom .add_status {
  width: 100%;
  height: 0.4rem;
  line-height: .4rem;
  background-color: #3770FB;
  font-size: 0.16rem;
  display: block;
  text-align: center;
  color: #fff;
}
</style>
