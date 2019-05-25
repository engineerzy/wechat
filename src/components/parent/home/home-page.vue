<template>
  <div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in data"
        :key="index"
        @click="go(item.target)">

        <icon slot="icon" :name="item.icon" :color="active === index ? '#1989fa' : 'gray'"/>
        {{ item.name }}

      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { handleRouteTarget } from '@/utils'
import icon from '@/components/common/icon'

export default {
  name: 'ParentHome',
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
    icon,
  },
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    data() {
      return this.$store.state.parentHome.homePageData
    },
  },
  created() {
    this.$loading(undefined, undefined, true)
    this.$store.dispatch('parentHome/fetchHomeData')
      .finally(() => {
        this.updateActive(this.$route)
        this.$loadingHide()
      })

    // 设置当前是家长端
    this.$store.commit('UPDATE_ROLE_TYPE', 30)

    this.$router.afterEach(to => {
      this.updateActive(to)
    })
  },
  methods: {
    go(target) {
      handleRouteTarget(this.$router, target, false)
    },
    updateActive(route) {
      const index = this.data.findIndex(item => item.target === route.name)
      if (Number.isInteger(index)) {
        this.active = index
      }
    },
  }
}
</script>
