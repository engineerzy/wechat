<template>
  <div>
    <div v-for="(item, index) in data" :key="index">
      <p class="title">{{ item.name }}</p>
      <no-data v-if="isEmpty(item.comments)" />
      <div class="container">
        <router-link
          class="item"
          v-for="(item2, index2) in item.comments"
          append
          :key="index2"
          :to="{ name: 'LunchStatusManageModify', params: { ftype, category: index+1, comment: encodeURIComponent(item2.comment), cid: item2.cid } }">
          {{ item2.comment }}
        </router-link>
      </div>
      <div v-if="index < data.length-1" class="ac_line"></div>
    </div>
  </div>
</template>

<script>
import noData from '@/components/common/no-data.vue'

export default {
  name: 'status_manage_tab_card',
  components: {
    noData
  },
  props: {
    data: {
      type: Array,
      default: undefined
    },
    ftype: {
      type: Number,
      default: 1
    },
  },
}
</script>
<style scoped lang="less">
  .title {
    margin: 0.2rem 0.15rem;
    font-weight: 400;
    color: #333;
    font-size: 0.14rem;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.14rem;
    margin: 0.2rem 0.15rem;

    .item {
      width: calc(50% - .2rem);
      min-height: .3rem;
      text-align: center;
      text-decoration: none;
      margin: 0.05rem 0.1rem;
      flex-shrink: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: #3770FB;
      color: #fff;
      line-height: 0.3rem;
      border-radius: 0.03rem;
    }
  }
  .ac_line{
    height: 0.1rem;
    background-color: #F3F7F8;
    width: 100%;
    margin: 0.25rem 0 0.15rem 0;
  }
</style>
