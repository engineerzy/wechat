<template>
  <div>
    <van-nav-bar
      title="红花排行榜"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="$router.back()"
    />

    <div class="van-tabs_div">
      <van-tabs type="card" @click="getRankData">
        <van-tab title="总排行">
          <Rankingmes :ranke="totalRank"></Rankingmes>
        </van-tab>
        <van-tab title="本月排行">
          <Rankingmes :ranke="monthRank"></Rankingmes>
        </van-tab>
        <van-tab title="本周排行">
          <Rankingmes :ranke="weekRank"></Rankingmes>
        </van-tab>

      </van-tabs>
    </div>


  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
import Rankingmes from './components/ranking'
import { Tab, Tabs } from 'vant';
import { Tag } from 'vant';
import { NavBar } from 'vant';
import { getSafflowerRank } from '@/api/school/safflower'
//import someComponent from './someComponent'
export default {
  name: "",
  data() {
    return {
      arr: [{ title: '查看历史月份', type: 1 }],
      totalRank: {},//总排行榜
      monthRank: {},//月排行榜
      weekRank: {},//周排行榜
      type: 1,
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [NavBar.name]: NavBar,
    Rankingmes: Rankingmes,
    //someComponent
  },
  methods: {
    onclickLeft() {
      this.$router.back(-1);
    },
    getRankData(index) {
      this.type = index + 1;
      if (this.type === 1 && JSON.stringify(this.totalRank) === '{}') {
        this.selectData()
      } else if (this.type === 2 && JSON.stringify(this.monthRank) === '{}') {
        this.selectData()
      } else if (this.type === 3 && JSON.stringify(this.weekRank) === '{}') {
        this.selectData()
      }
    },
    selectData() {
      this.$loading()
      getSafflowerRank(this.type)
        .then(res => {
          this.$loadingHide()
          if (res.status === 200) {
            if (this.type === 1) {
              this.totalRank = res.data.data
            } else if (this.type === 2) {
              this.monthRank = res.data.data
            } else if (this.type === 3) {
              this.weekRank = res.data.data
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
  },
  created() {
    this.selectData();
  },
}
</script>

<style scoped>
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: white;
}

.van-nav-bar {
  background-color: #3770FB;
}

.van-nav-bar__title {
  font-size: 0.16rem;
  color: white;
}


.van-tabs {
  margin-top: 0.15rem;
}

.van-tabs_div {
  margin-bottom: 0.1rem;
}

.van-tabs_div >>> .van-tabs__nav--card .van-tab.van-tab--active {
  background-color: #3770fb;
  color: white;
}

.van-tabs_div >>> .van-tabs__nav--card {
  border: 1px solid #3770fb;
}

.van-tabs_div >>> .van-tabs__nav--card .van-tab {
  color: #3770fb;
}

.van-tabs_div >>> .van-tabs__nav--card .van-tab {
  border-right: none;
}

.van-tabs_div >>> .van-tab:nth-child(2) {
  border-left: 1px solid;
  border-right: 1px solid;
}

.acline {
  width: 100%;
  height: 1rem;
  background-color: #F3F7F8;
}

.changetab {

}
</style>
