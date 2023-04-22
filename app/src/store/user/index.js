import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogOut} from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";

const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations={
    // 将验证码存储到仓库中
    GETCODE(state,code){
        state.code=code
    },
    //存储token
    USERLOGIN(state,token){
        state.token=token
    },
    //存储用户信息
    GETUSERINFO(state,userInfo){
           state.userInfo=userInfo
    } ,
    // 清除本地数据
    CLEAR(state){
        // 清除仓库中用户信息
      state.token=''
      state.userInfo={}
    // 清除本地存储token
      removeToken()
     
    }  
}
const actions={
    // 获取验证码
   async  getCode(context,phone){
        let result=await reqGetCode(phone)
        // 获取验证码的接口是吧验证码返回，但是正常情况是后台把验证码发到用户的手机上
        if(result.code===200){
           context.commit('GETCODE',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册业务
   async UserRegister(context,user){
    let result=await reqUserRegister(user)
     console.log(result)
   if(result.code===200){
    return 'ok'
   }else{
    return Promise.reject(new Error('faile'))
   }
     
    },
    // 登录业务（token）
   async UserLogin(context,data){
        let result=await reqUserLogin(data)
        // 服务器下发token，用户唯一标识
        // 将来经常通过带token找服务器要用户信息机进行展示
       if(result.code===200){
        // 用户已经登陆成功，获取到token
        context.commit('USERLOGIN',result.data.token)
        // 持久化存储token
        setToken(result.data.token)
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    // 获取用户信息
    async getUserInfo(context){
        let result=await reqUserInfo()
        if(result.code===200){
            context.commit('GETUSERINFO',result.data)
           return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    
    },
    // 退出登录
    async userLogOut(context){
        // 只是向服务器发起一次请求,通知服务器清除token
        let result=await reqUserLogOut()
        if(result.code===200){
            context.commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
         
    }
}
const getters={}

export default{
    state,mutations,actions,getters
}