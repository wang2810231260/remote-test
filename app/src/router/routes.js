// 引入路由组件
// import Home from '../pages/Home/index'
// import Search from '../pages/Search/index'
// import Login from '../pages/Login/index'
// import Register from '../pages/Register/index'
// import Detail from '../pages/Detail'
// import AddCartSuccess from '../pages/AddCartSuccess'
// import ShopCart from '../pages/ShopCart'
// import Trade from '../pages/Trade'
// import Pay from '../pages/Pay'
// import PaySuccess from '../pages/PaySuccess'
// import Center from '../pages/Center'

// 引入二级路由组件
// import MyOrder from '../pages/Center/myOrder'
// import GroupOrder from '../pages/Center/groupOrder'

// const foo=()=>import('@/pages/Home')



// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就会更加高效。
export default [
    {
        // 主页路由
        name:'home',
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        // 搜索模块路由
        name:'search',
        path:'/search/:keyword?',
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        //路由组件能不能传递props数据 
        // 第一种：布尔值写法:只能传递params
        // props:true
        // 对象写法:额外的给路由组件传递一些props
        // props:{a:1,b:2}

        // 函数写法:可以把params参数、query参数传递给路由组件
        // props($route){
        //     return {keyWord:$route.params.keyWord,k:$route.query.k}
        // }

        // 
    },
    {
        // 登录模块路由
        name:'login',
        path:'/login',
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        // 注册模块路由
        path:'/register',
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        // 商品详情模块路由
        path:'/detail/:skuId',
        component:()=>import('@/pages/Detail')
    },
    {
        // 添加购物车成功模块路由跳转
        name:'addcardsuccess',
        path:'/addcardsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true},
    },
    {
        // 购物车模块路由
        name:'shopcart',
        path:'/shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true},
        
    },
    {
        // 结算模块路由
        name:'trade',
        path:'/trade',
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去结算模块，必须从购物车模块来，
            if(from.path==='/shopcart'){
                next()
            }else{
            //next(false) 中断当前的导航，如果浏览器的url改变了，那么url会重置到from路由对应的组件  从哪来到哪去
            next(false)
            }
        }
    },
    {
        // 订单支付模块路由
        name:'pay',
        path:'/pay',
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 去结算模块，必须从提交订单模块来，
            if(from.path==='/trade'){
                next()
            }else{
            //next(false) 中断当前的导航，如果浏览器的url改变了，那么url会重置到from路由对应的组件  从哪来到哪去
            next(false)
            }
        }
    },
    {
        // 订单支付成功模块路由
        name:'paysuccess',
        path:'/paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true},
    },
    {
        // 我的订单模块路由
        name:'center',
        path:'/center',
        component:()=>import('@/pages/Center'),
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder')
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
       
    },
    // 重定向,在项目跑起来的时候，访问/，立马定向到首页
    {
    path:'/',
    redirect:'/home'
    }
]