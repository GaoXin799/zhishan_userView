import axios from "axios"

// create an axios instance
//创建axios实例
const http = axios.create({
    baseURL:'/api',  // url = base url + request url
    withCredentials:true,  // send cookies when cross-domain requests
    timeout:5000,  // request timeout
})

//请求拦截器
// http.interceptors.request.use(config =>{
//     //获取token
//     const token = sessionStorage.getItem("token")

//     if(token){
//         //有token，将token放入到header ： 
//         // config.headers.token = token
//         config.headers["token"] = token
//     }
//     return config

// })

export default http;