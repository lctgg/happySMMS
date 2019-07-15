<template>
    <div class="login">
        <!-- 登录表单容器 -->
        <div class="login-wrap">
                <!-- 标题 -->
            <h3 class="title">
                <i class="el-icon-s-custom"></i>
                超市管理系统-登录
            </h3>
            <!-- 登录表单 -->
             <el-form 
                :model="loginForm" 
                status-icon 
                :rules="rules"
                ref="loginForm"
                label-width="100px"
                >

                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>

            </el-form>
         </div>
    </div>
</template>

<script>
 //引入工具函数 正则
 import { pwdReg } from '@/utils/reg.js';

 //引入请求函数 
 import {checkLogin} from '@/api/login';

export default {
    data() {
         ///自定义验证函数
         //验证密码
       const checkPwd =(rule, value, callback) =>{
             //获取输入的长度
             const len = value.length
        
             if(value === ''){
                callback(new Error('密码不能为空'))  //不能为空
             }else if( len < 3 || len > 7  ) {
                 callback(new Error('密码长度为3 ~ 7位')) //长度
             } else if( !pwdReg( value ) ) {
                 callback(new Error('只可以输入字母数字'))  //正则验证
             } else{
                  //确认密码不为空  触发一致性
                 if (this.loginForm.checkPass !== ''){
                   this.$refs.loginForm.validateField('checkPass') // 触发确认密码的一致性验证
                 }
                 callback() //成功
             }
        }
       //验证确认密码
        const confirmPwd = (rule, value, callback) =>{
              if (value === '') {
                  callback(new Error('请再次输入密码')) //非空
              } else if (value !== this.loginForm.password) {
                  callback(new Error('两次密码不一致')) // 一致性
              }else{
                  callback() //成功
              }

        }
        return {
              // 登录表单数据
              loginForm:{
                  account: '', //账户
                  password:'',//密码
                  checkPass: '', //确认密码
              },
              //表单规则
              rules:{
                  //账户
                 account:[
                     { required: true, message: '请输入账号', trigger: 'blur' }, // 非空验证
                     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证
                 ],
                  //密码
                 password:[
                      { required: true, validator:checkPwd , trigger: 'blur' }, // 非空验证
                     
                 ],
                 //确认密码：
                 checkPass:[
                      { required: true, validator: confirmPwd,  trigger: 'blur' }, // 非空验证
                     
                 ]
                 
              }
        }
    },
    methods:{
        //登录
        submitForm() {
            this.$refs.loginForm.validate((valid) =>{
                if(valid) {
                      //收集参数
                      let params = {
                          account : this.loginForm.account,
                          password : this.loginForm.password
                      }
                      //把参数发给后端
                        checkLogin( params )
                             .then(res =>{ 
                                //接响应的收数据
                                let { code, reason, token} = res;
                                //  console.log('令牌',token)    
                                if(code === 0) { //成功
                                 //把token存入本地
                                 window.localStorage.setItem('user_token', token)
                                    this.$message({
                                        type:'success',
                                        message: reason,
                                    })
                                    this.$router.push('/home'); //跳转后端首页
                                } else if (code === 1 ){ //失败
                                   this.$message.error(reason)
                                }
                             })
                             .catch(err =>{
                                 console.log(err)
                             })
                    // console.log( params )
                } else{
                    console.log('前端验证不通过！')
                    return false; //阻止提交
                }
            })
        },
        //重置
        resetForm () {
            //获取了-form表单 调用内置方法
            this.$refs.loginForm.resetFields()
        }
    } 
}
</script>

<style lang="less">
   //引入样式
   @import './login.less';
</style>
