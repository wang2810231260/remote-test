1.开发search模块中TypeNav商品分类菜单（过渡动画效果）
过渡动画：前提组件|元素必须要与v-if或v-show指令，才可以进行过渡动画

2.现在咱们的商品分类三级列表可以进行那些优化？
在APP根组件中发送请求，因为根组件中的mounted只会执行一次

3.合params和query并参数
路由跳转时判断是否携带params|query参数，如果有，就携带过去

4.开发Home首页当中的ListContainer组件与Floor组件
但是这里需要知道一件事，服务器返回的数据只有商品菜单分类，对于这两个组件的数据服务器没有提供

mock(模拟)：如果你想mock数据，需要用到一个插件mode.js
使用步骤：
1.在项目当中src文件夹创建mock文件夹
2.准备json数据(mock文件夹下创建相应的json文件)--一定要格式化，别留有空格
3.把mock数据需要的图片放置到public文件夹中，public文件夹在打包的时候，会把相应的资源，原封不动的打包到dist文件夹
4.通过mockServe.js通过mockjs插件实现模拟数据
5.mockServe.js文件在入口文件引入（至少需要执行一次，才能模拟数据）

5.listContainer组件开发的重点？
安装swiper插件
