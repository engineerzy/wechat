<template>
  <div class="content">
    <van-loading v-show="$store.getters['schoolHome/isLoadingData']" class="loading"/>

    <div class="bar_mas">
      <div>
        <van-nav-bar
          right-text="切换账号"
          @click-right="$router.push({ name: 'SwitchAccount' })"/>
      </div>
      <img class="mas_head_img" :src="accountInfo.image" alt=""/>
      <div class="mas_name_div">
        <p class="mas_name">
          {{accountInfo.name}}
          <br>
        </p>
        <p class="mas_name_b">
          {{accountInfo.schoolName}}
        </p>
        <p></p>
      </div>
      <div class="bind_button">
        <p>绑定新账号</p>
      </div>
    </div>
    <van-cell title="账号：" :value="accountInfo.account" size="large"/>
    <van-cell title="身份：" :value="accountInfo.roleTypeText" size="large"/>
    <div class="b_list">
      <van-cell v-for="(item,index) in links" :key="index" :title="item.name" is-link
                @click="go(item.target)">
        <icon slot="icon" :name="item.icon" style="margin-right: .1rem;" />
      </van-cell>
    </div>
  </div>

</template>

<script>
import { Cell, NavBar, Loading } from 'vant'
import { handleRouteTarget } from '@/utils'
import icon from '@/components/common/icon'

export default {
  name: 'SchoolHomeMy',
  components: {
    vanNavBar: NavBar,
    vanCell: Cell,
    vanLoading: Loading,
    icon,
  },
  computed: {
    data() {
      return this.$store.getters['schoolHome/getSchoolHomeMyData']
    },
    accountInfo() {
      return this.data && this.data.accountInfo ? this.data.accountInfo : {}
    },
    links() {
      return this.data && this.data.links ? this.data.links : []
    },
  },
  methods: {
    go(target) {
      handleRouteTarget(this.$router, target)
    },
  },
  created() {
    this.$store.dispatch('schoolHome/fetchMyPageData')
  },
}
</script>

<style scoped>
.content {
  background-color: #f3f7f8;
}

.bar_mas {
  width: 100%;
  height: 1.8rem;
  background: linear-gradient(
    180deg,
    rgba(55, 112, 251, 1) 0%,
    rgba(104, 169, 253, 1) 100%
  );
}

.van-cell:not(:last-child)::after {
  right: 0.15rem;
}

/*导航栏样式*/
.van-icon-arrow-left:before {
  color: #ffffff;
}

.van-nav-bar__text {
  color: #ffffff;
}

.van-hairline--bottom::after {
  border: none;
}

.van-nav-bar {
  background-color: rgba(255, 255, 255, 0);
}

/*头像及信息样式*/
.mas_name_div {
  margin: 0.35rem 0 0 0.1rem;
  float: left;
}

.mas_name_div p {
}

.mas_name {
  font-size: 0.16rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.22rem;
}

.mas_name_b {
  margin: 0.1rem 0 0 0;
  height: 0.2rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.2rem;
}

.mas_head_img {
  border-radius: 100%;
  margin: 0.4rem 0 0 0.15rem;
  border-radius: 100%;
  width: 0.6rem;
  height: 0.6rem;
  float: left;
}

.bindnew {
  border: solid;
}

.van-button--plain {
  background-color: rgba(255, 255, 255, 0);
}

.van-button--primary {
  border-radius: 0.05rem;
  border: solid 0.01rem white;
}

.van-button--plain.van-button--primary {
  color: white;
}

.bind_button {
  margin: 0.4rem 0.15rem 0 0.3rem;
  float: left;
  border: solid 0.01rem white;
  width: 0.9rem;
  height: 0.2rem;
  border-radius: 0.05rem;
}

.bind_button p {
  text-align: center;
  height: 0.2rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.2rem;
}

.b_list {
  margin: 0.1rem 0 0 0;
}

.loading {
  margin: 10px auto;
}
</style>
