// home模块的仓库 

import {reqCategoryList,reqGetBannerList,reqFloorList} from "@/api/index"

export default {
   
    actions:{
        // reqCategoryList返回的是一个promise对象
        // 需要用await接收成功的结果,await和async一起使用
     async  categoryList(context){
     let result=await reqCategoryList()
        
       if(result.code===200){
       context.commit('CATEGORYLIST',result.data)
       }
       },
    //    获取首页轮播图的数据
      async getBannerList(context){
        let result=await reqGetBannerList()
       if(result.code===200){
        context.commit('BANNERLIST',result.data)
       }
       },
    // 获取floor数据
       async getFloorList(context){
     let result=await reqFloorList()
     if(result.code===200){
          context.commit('GETFLOORLIST',result.data)
     }
      }
    },
    mutations:{
        // 把三级分类数据存储到仓库里
        CATEGORYLIST(state,categoryList){
            state.categoryList=categoryList
        },
        // 把首页轮播图数据存储到仓库里
        BANNERLIST(state,bannerList){
            state.bannerList=bannerList
        },
        // 把floor的数据存储到仓库中
        GETFLOORLIST(state,floorList){
            state.floorList=floorList
        }
    },
    state:{
        // state中的默认初始数据别乱写
        categoryList:[],
        // 轮播图数据
        bannerList:[],
        // floor数据
        floorList:[]
    },
    getters:{
       
    }
}
