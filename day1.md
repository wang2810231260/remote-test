1.vue-cli脚手架初始化项目

node_modules文件夹：项目依赖文件

public文件夹：一般放置一些静态资源(图片)，需要注意，放置在public文件夹中的静态资源，webpack进行打包的时候，会原封不动的打包到
dist文件夹

src文件夹(程序员源代码文件夹)
assets文件夹：一般也放置静态资源(一般放置多个组件公用的静态资源)，需要注意，放置在assets文件夹里面的静态资源，在
webpack打包的时候，webpack会把静态资源当作一个模块打包到js文件里
components文件夹：一般放置的是非路由组件(全局组件)

App.vue唯一的根组件
main.js程序文件入口，也是整个程序当中最先执行的文件

babel.config.js：配置文件（和babel相关）
package.json文件：认为项目的身份证
package-lock.json:缓存性文件
README.md:说明性文档

2.项目的其他配置
2.1项目运行起来浏览器自动打开
---package.json
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

  2.2eslint校验功能关闭
  --vue.config.js
   lintOnSave:false//关闭语法检查

2.3src文件夹的简写方式，配置别名；
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },

3.项目路由分析
注意：项目是上中下结构

路由组件：home首页组件、search路由组件、login登录路由、register注册路由
非路由组件：Header【首页、搜索页】
Footer(在首页、搜索页，但是在登录|注册页面是没有的)

4.完成非路由组件header和footer业务
项目中，不再以css和html为主
在开发项目的时候
1.书写静态页面
2.拆分组件
3.获取服务器的数据动态展示
4.完成相应的动态业务逻辑

注意1：创建组件的时候，组件结构+组件的样式+图片资源
注意2：项目采用的less样式，浏览器不识别less样式，需要通过less、less-loader进行处理less
4.1使用组件的步骤
-创建或者定义
-引入
-注册
-使用

5.路由组件的搭建
在上面分析的时候，路由组件应该有四个：Home,Search,Login,Register
-components文件夹：经常放置非路由组件
-pages文件夹：经常放置路由组件
5.1配置路由
项目中的路由一般放置在router文件夹中
5.2总结
路由组件与非路由组件的区别
1.路由组件一般放置在pages文件夹中，非路由组件一般放置在components文件夹中
2.路由组件一般在router文件夹中注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式展示
3.注册完路由，不管路由组件，还是非路由组件身上都有$router和$route

$route:一般获取路由信息【路径、query、params等等】
$router:一般进行编程式导航路由跳转【push|replace】

5.3路由的跳转？
路由的跳转一般有三种形式：声明式导航router-link，可以进行路由的跳转
编程式导航push|replace可以进行路由的跳转

编程式导航：声明式导航能做的编程式导航都可以做，但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑

6.footer组件的显示与隐藏
显示或者隐藏组件:v-if|v-show
Footer组件在Home，Search显示Footer
Footer组件在登陆或者在注册时隐藏的

6.1我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer的显示与隐藏
6.2配置路由的时候，可以给路由添加路由的元信息【meta】，路由需要配置对象，他的key不能随便写


7.路由传参
7.1路由的跳转方式
比如：A->B
声明式导航：router-link(务必有to属性)，可以实现路由的跳转
编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转(可以书写自己的业务逻辑)
7.2:路由传参，参数有几种写法
params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query参数：不属于路径中的一部分，类似于Ajax中的queryString /home?a=1&b=2  不需要占位

8.路由传参相关面试题
1.路由传递参数(对象写法)path是否可以结合params参数一起使用？
2.如何指定params参数可传可不传
比如：配置路由的时候，已经占位了params参数，但是路由跳转的时候就不传递
路径就会出现问题
http://localhost:8080/?#/?k=abc
http://localhost:8080/?#/search?k=abc

3.params参数可以传递也可以不传递，但是如果传递的是一个空串，如何解决
4.路由组件能不能传递props数据

