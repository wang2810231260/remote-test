//引入发请求的函数
import { reqShopCart,reqDeleteCartById,reqUpdateChecked} from "@/api"


const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    // 获取购物车列表数据
    async getCartList(context){
     let result=await reqShopCart()
     if(result.code===200){
        context.commit('GETCARTLIST',result.data)
     }
    },
    // 删除购物车商品 
    async deleteCartListBySkuId(context,skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code===200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车中某一个产品的选中状态
    async updateCheckedById(context,{skuId,isChecked}){
        let result=await reqUpdateChecked(skuId,isChecked)
        if(result.code===200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedAcrt(context){
        // context：小仓库 commit：提交mutations修改state getters：计算属性 dispatch：派发action state：当前仓库数据
        // 获取购物车中的全部商品，是一个数组
        let promiseAll=[]
        context.getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked==1){
             let result=context.dispatch('deleteCartListBySkuId',item.skuId)
            //  将每一次返回的promise添加到数组中
            promiseAll.push(result)
            }           
        });
        // 只要全部的p1|p2..都成功，返回结果即为成功，如果有一个失败，返回结果则为失败结果
        return Promise.all(promiseAll)
    },
    // 修改全部产品的选中状态
    updateAllcartChecked(context,checked){
        let promiseAll=[]
    context.getters.cartList.cartInfoList.forEach(item=>{

      let promise=  context.dispatch('updateCheckedById',{skuId:item.skuId,isChecked:checked})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
    }
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    },
   
}
export default{
    state,mutations,actions,getters
}