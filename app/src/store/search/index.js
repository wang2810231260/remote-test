// search模块的仓库 
import { reqGetSearchInfo } from "@/api"

const state={
    // 仓库初始状态
    searchList:{}
}
const mutations={
//   把search数据存储到仓库中
     GETSEARCHLIST(state,searchList){
        state.searchList=searchList
     }
}
const actions={
     async getSearchList(context,params){
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候至少传递一个参数(至少为一个空对象)
        // params是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
       
        let result =await reqGetSearchInfo(params)
        if(result.code===200){
            context.commit('GETSEARCHLIST',result.data)
        }
     }
}
//计算属性,在项目中是为了简化仓库中的数据为生
// 可以把将来我们在组件当中需要用的数据简化，好处，将来组件获取数据的时候方便
const getters={
       goodsList(state){
        // state.searchList.goodsList如果服务器数据回来了，是一个数组
        // 如果网络不给力，或者没有网络，state.searchList.goodsList返回的是一个undefined
        // 计算属性的属性值至少是一个空数组
       return state.searchList.goodsList||[]
    // if(state!=={}){
    //     return state.searchList.goodsList
    // }
       },
       trademarkList(state){
        return state.searchList.trademarkList||[]
       },
       attrsList(state){
        return state.searchList.attrsList||[]
       }
}
export default {
    state,actions,mutations,getters
}