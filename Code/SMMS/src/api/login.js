/*
  登录模块相关的请求
 */

// 引入封装好的 request.js
import req from '@/utils/request';

export function checkLogin (params ){
    return  req.post('/login/checklogin', params )
}