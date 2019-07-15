/* 
  工具函数用于验证密码的正则
 
*/
export function pwdReg (value) {
   
    //定义正则表达式
    let reg = /^[A-Za-z0-9]+$/;
    return reg.test(value)
}