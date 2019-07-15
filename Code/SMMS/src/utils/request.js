/* 
  axios 发送请求函数分装
*/

//引入 axios
import axios from 'axios';

//引入qs
import qs from 'qs';


//设置请求默认地址
axios.defaults.baseURL ='http://127.0.0.1:666'

/* 
    在axios的请求发送出去之前，头部携带token
*/
// 请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    let token = window.localStorage.getItem('user_token')

    // 给头部携带token
    config.headers.authorization = `Bearer ${token}` 
    return config
})


export default {
    get(url, params = {}){
       return new Promise((resolve, reject) =>{
           axios.get(url,{ params })
                .then( response => { //成功
                   resolve(response.data)
                })
                .catch(err =>{  //失败
                    reject(err)
                })
       })
    },

    post(url, params = {}){
        return new Promise((resolve, reject) =>{
            axios.post(url, qs.stringify( params ))
                 .then( response => { //成功
                      resolve(response.data)
                 })
                 .catch( err =>{ // 失败
                      reject(err)   
                 })
        })
    }
}