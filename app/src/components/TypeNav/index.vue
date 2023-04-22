<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->

                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                    <!-- 利用事件委派+编程式导航能实现路由的跳转和传递参数 -->
                    <div class="all-sort-list2" @click="goSearch" >
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryID"
                            :class="{cur:cunrrentIndex===index}">
                            <h3 @mouseenter="changeInedx(index)">
                                <a  :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" v-show="cunrrentIndex===index">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryID">
                                    <dl class="fore">
                                        <dt>
                                            <a  :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryID">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em> 
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
                
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
// 引入方式：是吧lodash全部功能引入
// 最好的引入方式：按需加载
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data(){
        return{
            //存储用户鼠标移到哪一个一级分类
            cunrrentIndex:-1,
            show:true
        }
    },
    
    mounted() { 
        // 如果路由为search，show为false
        if(this.$route.path!=='/home'){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            // 对象的写法，右侧需要的是一个函数，当使用这个计算属性时，右侧函数会执行一次
            // 会获得一个参数state，其实即为大仓库中的数据
            categoryList:state=>state.home.categoryList.slice(0,16)
        })
    },
    methods:{
        // 鼠标进入，修改响应式数据currentIndex的数据
        changeInedx:throttle(function(index){
              // index:鼠标移到哪一个一级分类的索引值
            // 正常操作（用户操作很慢）：鼠标进入，每一个一级分类都会触发回调
            // 非正常操作（用户操作很快）：鼠标快速进入，本身应该触发所有回调，但实际上只有部分回调触发
            // 就是由于用户行为过快，导致了浏览器反应不过来，如果回调函数中有大量的业务逻辑，会导致浏览器卡顿
           
            this.cunrrentIndex=index            
        },50),
       
       
        goSearch(event){
            // 最好的解决方案：编程式导航+事件的委派
            // 利用事件委派存在的问题，1.点击的一定是a标签2.如何获取参数（1，2，3级分类产品的名字和id）
                    
            // 第一个问题，把子结点中a标签，加上自定义属性data-categoryName,其余的子节点是没有的
            let element=event.target
            // 1.获取到当前触发这个事件的节点（h1,a,dt,dl)，需要带有data-categoryName这样的节点一定是a标签
            // 节点有一个dataset属性，可以获得节点的自定义属性和属性值
           
            let {categoryname,category1id,category2id,category3id}=element.dataset
            // 如果标签身上有categoryname属性，一定是a标签
            if(categoryname){
                // 整理路由跳转的参数
                let location={name:'search'}
                let query={categoryName:categoryname}
                // 一级分类、二级分类、三级分类
                if(category1id){
                  query.category1Id=category1id
                }else if(category2id){
                    query.category2Id=category2id
                }else if(category3id){
                    query.category3Id=category3id
                }
                // 判断：如果路由跳转的时候带有params参数，也要捎带传递过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    // 整理参数
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                }

              
            }
        },
        // 当鼠标移入的时候，让商品列表展示
        enterShow(){
            this.show=true
        },
        // 鼠标移出
        leaveShow(){
            this.cunrrentIndex=-1

        // 判断如果是search路由组件的时候才执行
        if(this.$route.path!=='/home'){
           
            this.show=false
        }
        },
    }
}
</script>

<style scoped lang="less">
.type-nav {
     border-bottom: 2px solid #e1251b;

     .container {
         width: 1200px;
         margin: 0 auto;
         display: flex;
         position: relative;

         .all {
             width: 210px;
             height: 45px;
             background-color: #e1251b;
             line-height: 45px;
             text-align: center;
             color: #fff;
             font-size: 14px;
             font-weight: bold;
         }

         .nav {
             a {
                 height: 45px;
                 margin: 0 22px;
                 line-height: 45px;
                 font-size: 16px;
                 color: #333;
             }
         }

         .sort {
             position: absolute;
             left: 0;
             top: 45px;
             width: 210px;
             height: 461px;
             position: absolute;
             background: #fafafa;
             z-index: 999;

             .all-sort-list2 {
                 .item {
                     h3 {
                         line-height: 30px;
                         font-size: 14px;
                         font-weight: 400;
                         overflow: hidden;
                         padding: 0 20px;
                         margin: 0;

                         a {
                             color: #333;
                         }
                     }

                     .item-list {
                         display: none;
                         position: absolute;
                         width: 734px;
                         min-height: 460px;
                         background: #f7f7f7;
                         left: 210px;
                         border: 1px solid #ddd;
                         top: 0;
                         z-index: 9999 !important;

                         .subitem {
                             float: left;
                             width: 650px;
                             padding: 0 4px 0 8px;

                             dl {
                                 border-top: 1px solid #eee;
                                 padding: 6px 0;
                                 overflow: hidden;
                                 zoom: 1;

                                 &.fore {
                                     border-top: 0;
                                 }

                                 dt {
                                     float: left;
                                     width: 54px;
                                     line-height: 22px;
                                     text-align: right;
                                     padding: 3px 6px 0 0;
                                     font-weight: 700;
                                 }

                                 dd {
                                     float: left;
                                     width: 415px;
                                     padding: 3px 0 0;
                                     overflow: hidden;

                                     em {
                                         float: left;
                                         height: 14px;
                                         line-height: 14px;
                                         padding: 0 8px;
                                         margin-top: 5px;
                                         border-left: 1px solid #ccc;
                                     }
                                 }
                             }
                         }
                     }
                     &:hover{
                        .item-list{
                            display: block;
                        }
                     }
                 }
                 .cur{
                    background-color: skyblue;
                 }
             }
         }

        //  过渡动画的样式
        // 过渡动画进入的开始状态
        .sort-enter{
            height: 0;
        }
        // 过渡动画进入结束的状态
        .sort-enter-to{
            height: 461px;
        }
    //    定义进入动画的事件，速率
         .sort-enter-active{
            transition: linear .5s height;
         }
            // 过渡动画离开的起点
            .sort.leave{
                height: 461px;
            }
            // 过度动画离开的终点
            .sort-leave-to{
                height: 0;
            }
            // 过渡动画离开的事件
            .sort-leave-active{
                transition: .5s height linear;
            }
     }
 }

 
 

</style>