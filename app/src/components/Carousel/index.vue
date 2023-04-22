<template>
    <div class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
    
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
      name:'Carsouel',
      props:['list'],
      watch:{
        list:{
        // immediate立即监听：不管数据有没发生变化，一上来就监听
        // 为什么watch监听不到floor，因为这个数据从没有发生变化(数据时父组件给的，给的时候就是个对象，对象里面该有的数据都是有的)
        immediate:true,
        handler(){
            // 只能监听到数据以及有了，但是v-for动态渲染的结构还是不能确定有没有
            this.$nextTick(function(){
                var mySwiper = new Swiper ('.swiper-container', {
        //   direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项
          autoplay: true,//可选选项，自动滑动
          
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          
        })        
            })
        }
    }
   },
}
</script>

<style>

</style>