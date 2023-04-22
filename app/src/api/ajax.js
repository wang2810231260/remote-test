// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start:进度条开始 done：进度条结束

//在当前模块中引入store
import store from '@/store/index' 


// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests其实就是axios
const requests=axios.create({
    // 配置对象
    // 基础路径，发送请求的时候，路径中会出现api
    baseURL:'/api',
    // 代表请求超时的时间
    timeout:4000,
    
})

// 请求拦截器,在发请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象中有一个属性很重要，header请求头
    // 进度条开始动
    nprogress.start()

    // 携带UUID
   if(store.state.detail.uuid_token){
    // 给请求头添加一个字段userTempId：和后台商量好了
    config.headers.userTempId=store.state.detail.uuid_token
   }
    // 携带token
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器的数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
        nprogress.done()
      return res.data
},(error)=>{
    // 响应失败的回调函数
   return Promise.reject(new Error('faile'))
})

// 对外暴露
export default requests