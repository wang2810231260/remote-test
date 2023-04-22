import { reqAddress,reqOrderInfo } from "@/api";
const state={
    address:[],
    orderInfo:{}
}
const mutations={
    // 将用户地址信息存储到仓库
    GETUSERADDRESS(state,address){
        state.address=address
    },
    // 将商品信息存储到仓库
    GETORDERINFO(state,orderInfo){
         state.orderInfo=orderInfo
    }
}
const actions={
    // 获取用户地址信息
  async  getUserAddress(context){
        let result=await reqAddress()
        if(result.code===200){
          context.commit('GETUSERADDRESS',result.data)
        }

    },
    // 获取商品清单数据
    async getOrderInfo(context){
        let result=await reqOrderInfo()
        if(result.code===200){
         context.commit('GETORDERINFO',result.data)
        }
    }
}
const getters={}
export default{
    state,mutations,actions,getters
}