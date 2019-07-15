<template>
    <div class="account-adds">
       
        <el-card class="box-card">
             <div slot="header" class="clearfix">
                <h3>添加管理员账号</h3>
             </div>
             <div>
            <el-form :model="AccountAddFrom" 
                   status-icon 
                   :rules="rules"
                    ref="AccountAddFrom"
                    label-width="100px"
                    style="width:315px"
                     >
                   <!-- 账号 -->
                    <el-form-item label="用户名" prop="account">
                        <el-input type="text" v-model="AccountAddFrom.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="AccountAddFrom.password" autocomplete="off"></el-input>
                    </el-form-item>
                      <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="text" v-model="AccountAddFrom.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                 
                         <!-- 选择用户组 -->
                  <el-form-item label="选择用户组" prop="userGroup">
                        <el-select v-model="AccountAddFrom.userGroup" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                    </el-select>
                  </el-form-item>
                        <!-- 提交  -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
            </el-form> 
              
            </div>
    </el-card>
    </div>
</template>
<script>
 //引入工具函数 用于验证密码的正则
    import { pwdReg } from '@/utils/reg.js';

 //引入 账号管理请求
 import {accountAdd} from '@/api/account';
 

export default {
     data() {
       //自定义验证函数
        //验证密码
       const checkPwd = (rule, value, callback )=>{
            //获取长度
            let len = value.length;
              if (value === ''){ //非空验证
                  callback(new Error('密码不能为空')) //不能为空
              } else if (len < 3 || len > 7) {
                   callback(new Error('密码长度为 3 ~ 7 位')) //长度验证
              }  else if (!pwdReg( value ) ){
                  callback(new Error('只可以输入字母数字')) //正则验证
              } else {
                    //确认密码不为空  触发一致性
                  if(this.AccountAddFrom.checkPass !== '' ){
                        this.$refs.AccountAddFrom.validateField( 'checkPass' ) //密码一致性的验证函数
                  }
                  callback() //成功
              }
       }

        //确认密码
       const confirmPwd = (rule, value, callback) =>{
              if(value === '') {
                  callback(new Error ('请输入密码'))  //不能为空
              } else if ( value !== this.AccountAddFrom.password){ //一致性
                  callback(new Error('两次密码不一致'))
              } else{
                  callback() //成功
              }
       }


         return {
             AccountAddFrom:{
                 //表单数据
                    account:'', //账户
                    password:'', //密码
                    checkPass:'' ,//确认密码
                    userGroup:''// 用户组
             },
              rules:{
                     //账户
                 account:[
                     { required: true, message: '请输入账号', trigger: 'blur' }, // 非空验证
                     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证
                 ],
                 //密码
                 password:[
                     { required: true,validator:checkPwd, trigger:'blur' } //自定义验证
                 ],
                  //确认密码
                 checkPass:[
                     { required: true,validator:confirmPwd, trigger:'blur' } //自定义验证
                 ],
                 //用户组
                 userGroup:[
                       { required: true, message: '请选择活动区域', trigger: 'change' }  //非空验证
                 ]
              },
             
         } 
       
     },
    methods:{
        //登录
        submitForm () {
            this.$refs.AccountAddFrom.validate((valid) =>{ // 所有前端验证通过 valid:true, 否则valid: false
                if(valid) {
                    //收集参数
                    let params = {
                        account : this.AccountAddFrom.account,
                        password: this.AccountAddFrom.password,
                        userGroup: this.AccountAddFrom.userGroup
                    }  
                    // 发送给后端
                   accountAdd(params)
                        .then(res =>{
                            //接收后端响应的参数
                            let { code, reason} =res;
                            console.log(res)
                            if(code === 0) {
                                this.$message({ // 弹成功提示
                                    message: reason,
                                    type: 'success'
                                })
                                this.$router.push('/home/AccountManagement') //跳转到账号管理
                            }else if(code === 1) {
                                  this.$message.error(reason); // 弹失败提示
                            }
                        })
                        .catch(err =>{

                            console.log(err)
                        })
                     
                } else{
                    console.log('前端验证不通过')
                    return false; //阻止提交
                }
            }) 
        },
        //重置
        resetForm () {
        this.$refs.AccountAddFrom.resetFields() // 调用表单重置方法
        }

    }            
}
</script>

<style lang="less">
  .account-adds{
        .el-card__header{
          background-color: #f1f1f1;
      }
  }

</style>
