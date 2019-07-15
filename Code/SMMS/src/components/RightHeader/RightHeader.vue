<template>
    <div class="right-header">
    <el-row>
        <!-- 左 -->
        <el-col :span="12"><h2> <i class="el-icon-menu"></i> 华联超市管理系统</h2> </el-col>
        <!-- 右 -->
        <el-col :span="12">
           <el-row>
            <el-col :span="18">
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                   {{ userName }} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="6">
                 <div class="avatar">
                   <img :src="avatarUrl" alt="">
                </div>
            </el-col>
        </el-row>
        </el-col>
    </el-row>
    </div>
</template>
<script>
//引入请求函数
import { getInfo } from '@/api/account'
export default {
    data(){
     return{
         userName:'', //用户名
         avatarUrl:'', // 头像地址  
     }
    },
    methods:{
        handleCommand (command){
            if(command === 'logout'){ //退出系统
                // 1. 前端- 清除token
                window.localStorage.removeItem('user_token')
            // 2. 前端- 弹出提示信息
               this.$message({
                   type:'success',
                   message:'退出系统成功'
               })
            // 3. 前端- 跳转到登录页面
              setTimeout(() =>{
                  this.$router.push('/login')    

              },1000)

            } else if (command === 'personal'){ //个人中心
               this.$router.push('/home/Personal') //跳转个人中心
            }
        },

      
      getUserInfo() {
          //发送求情 获取账号信息
          getInfo()
            .then(res =>{
                // console.log(res);
              //接收参数
              let { data } =res;
              //获取账号
              let { account, avatarUrl } =data[0];
              //渲染页面
              this.userName = account; // 渲染账号
               this.avatarUrl = 'http://127.0.0.1:666' + avatarUrl; 
            })
            .catch(err =>{
             console.log(err);
            })
      }  
    },
    created(){
        this.getUserInfo()
    }
    
}
</script>
<style lang="less">
  .right-header{
      border-bottom: 2px solid #ccc;
     & > .el-row{
         &> .el-col{
              color:#2d3a4b;
              .el-row{
                  .el-col:first-child{
                      text-align: right;
                  }
                  .el-col:last-child{
                      text-align: center;
                       .avatar{
                           width: 50px;
                           height: 50px;
                           background-color: red;
                           border-radius: 50%;
                           margin-top: 5px;
                           margin-left: 20px;
                           img{
                               width: 100%;
                               height: 100%;
                               border-radius: 50%;
                           }
                       }
                  }
              }
          }
      }
  }

</style>
