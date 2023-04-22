1.编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated错误
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这种问题，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候就有这种警告错误？
引入了promise
1.2通过给push方法传递相应的成功、失败回调函数，可以捕获到当前的错误，可以解决
1.3通过底部的代码，可以实现解决错误
 this.$router.push({ name:'search', params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()} },(res)=>{},(error)=>{console.log(error)})
 
 这种写法治标不治本，将来在别的组件中push|replace编程式导航还是有类似错误


 1.4
 this：当前组件实例(search)
 this.$router属性:当前的这个属性，属性值是VueRouter类的一个实例，
 push：VueRouter类的一个实例

 2.Home模块组件拆分
 --先把静态页面完成
 --拆分出静态组件
 --获取服务器的数据进行展示
 --动态业务

 3.三级联动组件完成
---由于三级联动在Home、Search、Detail，把三级联动注册为全局组件
好处：只需要注册一次，就可以在项目的任意地方使用

4.完成其余静态组件
HTML+CSS+图片资源---信息

5.POSTMAN测试接口
测试结果200，接口没问题

6.axiox的二次封装
6.1为什么需要二次封装axios？
请求拦截器、响应拦截器
请求拦截器：在发送请求之前处理一些业务
响应拦截器：当服务器数据返回以后，可以处理一些事情


6.2在项目当中，经常会出现一个API文件夹[axios]
接口当中：路径都带有/api
basrURL:'/url'

7.API接口统一管理

项目很小：完全可以在组件的生命周期中发送请求
项目很大：axios.get('')

7.1跨域问题
什么是跨域：协议、域名、端口号不同，
http://localhost:8080/#/home 前端本地服务器
http://gmall-h5-api.atguigu.cn 后台服务器

8.nprogress进度条的使用
start:进度条开始 done：进度条结束
进度条的颜色可以修改

9.vuex状态管理库
9.1vuex是什么
vuex是官方提供的一个插件，状态管理库，集中管理项目中组件公用的数据

9.2vuex基本使用

9.3vuex实现基本开发
如果项目过大，组件过多，项目也很多，数据也很多,可以让vuex实现模块化开发

10.完成TypeNav三级联动数据展示业务
