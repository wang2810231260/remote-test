// 先引入mockjs
import Mock from 'mockjs'
// 把json数据格式引入进来[json数据没有暴露，但是可以引入进来]
// webpack默认暴露的：图片，json数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据:第一个参数请求地址  第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})//模拟首页的轮播图的数据
Mock.mock('/mock/floor',{code:200,data:floor})//