import Vue from 'vue'
import App from './App.vue'

// 注册全局三级联动组件
import TypeNav from './components/TypeNav'
Vue.component('TypeNav',TypeNav)
// 注册全局轮播图组件
import Carousel from './components/Carousel'
Vue.component('Carousel',Carousel)
// 注册分页器全局组件
import Pagination from './components/Pagination'
Vue.component('Pagination',Pagination)

// 引入Elementui
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
// elementui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 引入路由
import router from './router/index'

// 关闭生产提示
Vue.config.productionTip = false

// 引入vuex
import store from './store/index'

// 引入mockSeve.js
import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'
// 

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'

import gif from './assets/1.gif'
// 引入插件 图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  // 懒加载的默认图片
  loading:gif ,
})

// 引入表单校验插件
import "@/plugins/velidate"

new Vue({
  el:'#app',
   // 注册路由
  router,
  render: h => h(App),
   // 注册仓库
   store,
   beforeCreate(){
    Vue.prototype.$bus=this//安装全局事件总线
    Vue.prototype.$API=API
   }
})
