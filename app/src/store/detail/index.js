// 
import { reqGoodsInfo,reqAddOrUpdates } from "@/api"

// 封装游客身份模块uuid--》生成一个随机的字符串(不能再变了)
import {getUUID} from '@/utils/uuid_token'

const state={
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODSINFO(state,goodInfo){
       state.goodInfo=goodInfo
    }
}
const actions={
    // 获取产品信息的action
   async getGoodsInfo(context,skuId){
        let result=await reqGoodsInfo(skuId)
          if(result.code===200){                     
            context.commit('GETGOODSINFO',result.data)
          } 
    },
    // 将产品添加到购购物车中
   async addOrUpdateShopCar(context,{skuId,skuNum}){
    // 加入购物车返回的解构
    // 加入购物车以后(发请求),前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，则代表本次请求成功
    // 因为服务器没有返回数据，因此不需要三连环存储数据
       let result =await reqAddOrUpdates(skuId,skuNum)
       
    //判断服务器假如购物车是是否成功
    if(result.code=200){
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    }
}
const getters={
    // 路径导航简化的数据
    categoryView(state){
        // 当前计算出的categoryView至少是一个空对象
       return state.goodInfo.categoryView||{}
    },
    // 简化商品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
   
}

export default{
    state,mutations,actions,getters
}