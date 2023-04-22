// 配置路由的地方

import Vue  from "vue";
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 引入routes
import routes from './routes'

import store from '@/store'

// 先把VueRouter原型对象的push，先保存一份
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
// console.log(originPush)

// 重写push|replace方法
// 第一个参数：告诉原来push方法，你往哪里跳转，以及传递哪些参数
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
     if(resolve&&reject){
        // call与apply区别：相同点都可以调用函数一次，都可以篡改函数上下文对象
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
     }else{
        originPush.call(this,location,()=>{},()=>{})
     }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
       // call与apply区别：相同点都可以调用函数一次，都可以篡改函数上下文对象
       // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
       originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router= new VueRouter({
      routes,
    
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {y:0}
      },
})
// 全局前置路由守卫
router.beforeEach(async (to,from,next)=>{
   
    // 用户登陆了,才会有token,没有登陆,就没有token
    let token=store.state.user.token
    // 用户信息
    let name=store.state.user.userInfo.name
    // 用户已经登陆了
    if(token){
    // 用户已经登陆了还想去登录页面不可能,就停留在首页
    if(to.path=='/login'){
        next('/')
    }else{
        // 登录了,但是去的不是login,可能是home search detail
        if(name){
        //    如果用户名已有
            next()
        }else{
            // 如果没有用户信息
            // 派发action，获取用户信息,展示
         try {
            // 获取用户信息成功
            await store.dispatch('getUserInfo')
            next()
         } catch (error) {
            // token过期了,获取不到用户信息,重新登陆
            // 清除原来的token和用户信息
          await  store.dispatch('userLogOut')
          next('/login')
         }
        }
       
    }

    }else{
        // 未登录 不能去交易相关的，不能去支付相关的，不能去订单个人中心
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/paysucccess')!=-1|| toPath.indexOf('/center')!=-1 ){
            // 把未登录的时候想去而没有去成的地方，存储与地址栏中
            next('/login?redirect='+toPath)
        }else{
            // 取得不是上面这些路由
            next()
        }
    }
})


export default router

