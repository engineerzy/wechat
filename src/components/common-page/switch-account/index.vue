<template>
  <div class="switch-account">
    <van-nav-bar
      class="nav"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />

    <van-list
      class="list"
      :loading="loading">
      <van-cell
        v-for="(account, index) in list"
        :key="index"
        clickable
        :title="account.name"
        :label="account | labelFilter"
        :value="account.isCurrent ? '✔' : ''"
        value-class="cell-value"
        @click="select(account)"
      />
    </van-list>

  </div>
</template>

<script>
import { NavBar, List, Cell } from 'vant';
import { getAccountList, switchAccount } from '@/api/common'
import { param2Obj, param } from '@/utils'

export default {
  name: 'SwitchAccount',
  data() {
    return {
      loading: false,
      list: [],
    }
  },
  components: {
    vanNavBar: NavBar,
    vanList: List,
    vanCell: Cell,
  },
  filters: {
    labelFilter(account) {
      let role
      switch(account.type) {
        case 1:
          role = '(家长)'
          break;
        case 2:
          role = '(教师)'
          break;
        case 3:
          role = '(校长)'
          break;
        case 4:
          role = '(代理)'
          break;
        case 5:
          role = '(品牌)'
          break;
        case 6:
          role = '(新师路角色)'
          break;
      }
      return (account.schoolName ? account.schoolName : '') + role
    }
  },
  methods: {
    select(account) {
      if (account.isCurrent) {
        return
      }
      this.$loading('切换中...')
      switchAccount({
        id: account.id,
        type: account.type,
      })
        .then(response => {
          if (response.data.meta.success) {
            this.resetCurrent(account)
            this.handleRedirect(account)
          }
        })
        .finally(() => { this.$loadingHide() })
    },
    resetCurrent(account) {
      this.list.forEach(item => item.isCurrent = false)
      account.isCurrent = true
    },
    handleRedirect(account) {
      let targetRouteName
      switch(account.type) {
        case 1:
          targetRouteName = 'ParentHomeIndex'
          break;
        case 2:
          targetRouteName = 'TeacherHomeIndex'
          break;
        case 3:
          targetRouteName = 'SchoolHomeIndex'
          break;
        case 4:
          targetRouteName = '' // TODO 补充路由名
          break;
        case 5:
          targetRouteName = '' // TODO 补充路由名
          break;
        case 6:
          targetRouteName = 'NewConceptIndex'
          break;

        default:
          targetRouteName = 'TeacherHomeIndex'
      }
      let targetRoute = this.$router.resolve({ name: targetRouteName }).href
      let search = location.search
      search = param2Obj(search)
      search.random = Math.random() // 只修改hash值, 浏览器不会刷新页面. 增加一个随机的search浏览器就会刷新页面
      search = '?' + param(search)

      location.href = location.origin + location.pathname + search + targetRoute
    },
  },
  created() {
    this.loading = true
    getAccountList(true) // TODO 这里应该为 false; false 表示只回去当前端的账号, true 则获取所有端的账号
      .then(response => {
        if (response.data.meta.success) {
          this.list = response.data.data
        }
      })
      .finally(() => { this.loading = false })
  }
}
</script>

<style scoped lang="less">
.switch-account {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .nav {
    flex-shrink: 0;
  }

  .list {
    flex-grow: 1;
    overflow: scroll;

    .cell-value {
      color: #84C225;
      font-size: .2rem;
      justify-content: flex-end;
      align-items: center;
      display: flex;
    }
  }
}
</style>
