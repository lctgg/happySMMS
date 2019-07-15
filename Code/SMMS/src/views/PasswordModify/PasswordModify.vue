<template>
    <div class="password-modify">
            <el-card class="box-card">
                 <div slot="header" class="clearfix">
                   <h3>修改账号密码</h3>
                 </div>

                <div>
                    <!-- 修改密码 -->
                   <el-form :model="changePasswordForm" 
                      status-icon 
                      :rules="rules"
                      ref="changePasswordForm"
                      label-width="100px"
                      style="width:350px"
                      >
                               <!--原密码  -->
                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input type="text" v-model="changePasswordForm.oldPassword" autocomplete="off"></el-input>
                          </el-form-item>
                              <!-- 新密码 -->
                          <el-form-item label="新密码" prop="newPassword">
                            <el-input type="text" v-model="changePasswordForm.newPassword" autocomplete="off"></el-input>
                          </el-form-item>
                                  <!-- 新密码 -->
                          <el-form-item label="新密码" prop="checkPass">
                            <el-input type="text" v-model="changePasswordForm.checkPass" autocomplete="off"></el-input>
                          </el-form-item>

                          <el-form-item>
                            <el-button type="primary" @click="submitForm()">修改</el-button>
                            <el-button @click="resetForm()">重置</el-button>
                          </el-form-item>
                  </el-form>
                </div>
           </el-card>
    </div>
</template>

<script>
import { pwdReg } from '@/utils/reg.js'

//引入工具请求函数
import{ checkOldPass, passwordModify } from '@/api/account'
export default {

    data () {
        //自定义验证函数
        const checkOldPwd = (rule, value, callback) =>{
          if(value === ''){
             callback(new Error ('原密码不能为空'))

          } else {
             //把原密码发送给后端
              checkOldPass({oldPwd: value})
                 .then(res =>{
                  //  console.log(res)
                  //接收参数
                  let { code, reason } = res;
                   //判断
                   if(code === 1) {
                     callback(new Error(reason))
                   } else if(code === 0) {
                     callback() //成功
                   }
                  })
                 .catch(err =>{
                   console.log(err)
                 })
          }
        }

      //自定义验证函数 新密码
      const checkNewPwd=(rule, value, callback) =>{
          //获取长度
          let len = value.length;
         if (value === ''){
           callback(new Error('密码不能为空')) //非空
         } else if( len < 3  || len > 7) {
           callback(new Error('密码长度 3 ~ 7 位')) //长度验证
         } else if(!pwdReg( value )){ 
           callback(new Error('只可以输入字母数字')) //正则验证
         } else{
              //新密码的确认 密码不为空 触发一致性
              if(this.changePasswordForm.checkPass !== ''){
                 this.$refs.changePasswordForm.validateField('checkpass')  //密码一致性的验证函数
              }
           callback() //成功
         }
      }

        //自定义函数   新密码的 确认密码    
   const confirmPwd = (rule, value, callback ) =>{
       if(value === '') {
         callback(new Error('新密码不能为空')) //非空验证
       }else if(value !== this.changePasswordForm.newPassword) { //一致性
            callback(new Error('两次密码不一致'))  
       } else {
         callback() //成功 
       }
   }  
      return  {
             //修改密码表单
           changePasswordForm:{
               oldPassword:'',  //原密码
               newPassword:'', //新密码
               checkPass:'', //新密码的 确认密码
           },
           //规则
           rules:{
               //原密码
                oldPassword:[
                  { required: true, validator: checkOldPwd, trigger: 'blur' } //非空验证
                  
                  ],  
                  //新密码
               newPassword:[
                 {required:true, validator:checkNewPwd,trigger:'blur' } //自定义验证
               ],
                //确认新密码
               checkPass:[
                 {required:true, validator:confirmPwd, trigger:'blur'} //自定义验证
               ]   
           }
            
      }
    },
    //方法
    methods:{
       //修改
       submitForm () {
         this.$refs.changePasswordForm.validate((valid) =>{ // 所有前端验证通过 valid:true, 否则valid: false
             if(valid) {
               //接收参数
               let params = {
                   newPassword:this.changePasswordForm.newPassword,
               }
               console.log(params)
               passwordModify(params)
                  .then(res =>{
                  //  console.log(res)
                  //接收参数
                  let { code, reason } =res;
                    //判断
                    if(code === 0) {
                      this.$message({
                        type:'success',
                        message: reason
                      })
                      //清除token 退出登录
                      window.localStorage.removeItem('user_token')
                      this.$router.push('/login')
                    } else{
                      this.$message.error(reason);
                    }
                  })
                  .catch(err =>{
                    console.log(err)
                  })
             }else{
               return false; //阻止提交
             }
         })
       },
      resetForm() {
        this.$refs.changePasswordForm.resetFields() //调用表单的重置方法
      }

    }

    
}
</script>

<style lang="less">
  .password-modify{
    
        .el-card__header{
          background-color: #f1f1f1;
      }
  }

</style>
