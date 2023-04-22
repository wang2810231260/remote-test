<template>
  <div>
   <Header></Header>
   <!-- 路由组件展示的地方 -->
   <router-view></router-view>
   <!-- 在home、search显示的，在login、register隐藏 -->
   <Footer v-show="isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  data(){
    return{

    }
  },
  computed:{
    // 当路由路径发生变化时，控制footer显示或者隐藏
    isShow(){
      return this.$route.meta.show
    }
  },
  mounted(){
     //派发一个action||获取商品三级列表的数据
     this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
