<template>
  <div class="home">
       <!-- 布局容器 -->
      <el-container>
          <!-- 左侧栏-->
    <el-aside width="200px">
          <!-- 使用组件 -->
         <LeftNav></leftNav>
    </el-aside>
    <!-- 右侧栏-->
    <el-container>
        <!-- 头部 -->
        <el-header>
          <!--使用右侧头部 -->
          <RightHeader ref="rightheader"></RightHeader>
        </el-header>
        <!-- 中间 -->
        <el-main>
              <!-- 路由出口 -->
            <router-view @transmit="fn"></router-view>
        </el-main>
          <!-- 尾部 -->
        <el-footer>
          <!-- 使用右侧底部 -->
           <RightFooter></RightFooter>
        </el-footer>
    </el-container>
    </el-container>
  </div>
    
</template>
<script>
  //引入组件
  import LeftNav from '@/components/LeftNav/LeftNav.vue';
  //引入右侧底部
  import RightFooter from '@/components/RightFooter/RightFooter.vue';
  //引入右侧顶部部
  import RightHeader from '@/components/RightHeader/RightHeader.vue';

export default {

    //注册组件
    components:{
        LeftNav,
        RightHeader,
        RightFooter

    },
    methods:{
      fn(){
         this.$refs.rightheader.getUserInfo()
      }
    }

}
</script>
<style lang="less">
  .home{
     height: 100%;
       //布局容器
     .el-container{
          height: 100%;

         
    //左侧栏
  .el-aside {
       background-color: rgb(48, 65, 86);
    }
     //右侧栏
     .el-container{
                //头部
        .el-header {
            line-height: 60px;
              } 
            //中间
          
            //尾部
          .el-footer {
           
            line-height: 60px;
        }

     }
  }   
}
  

</style>
