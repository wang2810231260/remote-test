// 当前这个模块：API接口进行统一管理

import requests from "./ajax";

import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList=()=>{
//    发请求:axios发送请求返回的是promise对象
      return  requests({
            url:'/product/getBaseCategoryList',
            method:'GET',
         })
}
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner（首页轮播图数据)
export const reqGetBannerList=()=>{
      return mockRequests({
            url:'/banner',
            method:'GET'
      })
}
// 获取floor组件的数据
export const reqFloorList=()=>{
      return mockRequests({
            url:'/floor',
            method:'GET'
      })
}

// 获取search模块数据  请求需要带参数
//当前这个接口，给服务器传递参数，至少是一个空对象
export const reqGetSearchInfo=(params)=>{
      return requests({
            url:'/list',
            method:'POST',
            data:params
      })
}

// 获取商品详情模块数据，请求需要带参数
export const reqGoodsInfo=(skuId)=>{
      return requests({
            url:`/item/${skuId}`,
            method:'GET',
            
      })
}

// 将商品添加到购物车中或者更新某一个产品的个数
export const reqAddOrUpdates=(skuId,skuNum)=>{
      return requests({
            url:`cart/addToCart/${skuId}/${skuNum}`,
            method:'POST'
      })
}

// 获取购物车商品数据列表
export const reqShopCart=()=>{
      return requests({
            url:'/cart/cartList',
            method:'GET'
      })
}
// 删除购物车商品 delete类型
export const reqDeleteCartById=(skuId)=>{
      return requests({
            url:`/cart/deleteCart/${skuId}`,
            method:'delete'
      })
}

// 修改商品的选中状态
export const reqUpdateChecked=(skuID,isChecked)=>{
      return requests({
            url:`/cart/checkCart/${skuID}/${isChecked}`,
            method:'get'
      })
}

// 获取注册验证码
export const reqGetCode=(phone)=>{
      return requests({
            url:`/user/passport/sendCode/${phone}`,
            method:"get"
      })
}
// 发起注册
export const reqUserRegister=(data)=>{
 return requests({
        url:'/user/passport/register',
        method:'post',
        data
 })
} 
// 登录 /api/user/passport/login  POST phone，password
export const reqUserLogin=(data)=>{
      return requests({
            url:'user/passport/login',
            method:'post',
            data
      })
}
//获取用户信息  /api/user/passport/auth/getUserInfo   get
export const reqUserInfo=()=>{
      return requests({
            url:'/user/passport/auth/getUserInfo',
            method:'get'
      })
}
// 退出登录  /api/user/passport/logout  get
export const reqUserLogOut=()=>{
      return requests({
            url:'/user/passport/logout',
            method:'get'
      })
}
// 获取用户地址信息
export const reqAddress=()=>{
      return requests({
            url:'/user/userAddress/auth/findUserAddressList',
            method:'get'
      })
}
// 获取订单交易页数据 /api/order/auth/trade   get
export const reqOrderInfo=()=>{
      return requests({
            url:'/order/auth/trade',
            method:'get'
      })
}
// 提交订单的接口
export const reqSubmitOrder=(tradeNo,data)=>{
      return requests({
            url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
            method:'post',
            data
      })
}
// 获取支付信息
export const reqPayInfo=(orderId)=>{
      return requests({
            url:`/payment/weixin/createNative/${orderId}`,
            method:'get'
      })
}
// 获取支付订单状态
export const reqPayStatus=(orderId)=>{
      return requests({
            url:`/payment/weixin/createNative/${orderId}`,
            method:'get',
      })
}
// 获取我的订单列表
export const reqMyorderList=(page,limit)=>{
      return requests({
            url:`/order/auth/${page}/${limit}`,
            method:'get'
      })
}
