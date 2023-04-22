<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <rank></rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>   
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

import {mapState} from 'vuex'
export default {
name:'Home',
 components:{
  ListContainer,Recommend,Rank,Like,Floor,Brand
 },
 mounted(){
  // 派发action,获取floor组件的数据
        this.$store.dispatch('getFloorList')
    
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }

}
</script>

<style>

</style>