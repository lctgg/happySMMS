<template>
    <div class="goods-returm">

          <el-card class="box-card">
            <div slot="header" class="clearfix">
               <h3>商品退货</h3>
            </div>
                <div class="topbox">
                订当编号：
                    <!-- 输入款 -->
                <el-input v-model="input" style="width:300px">
                    
                </el-input>
                   <!-- 按钮 -->
              <el-button type="success">查询</el-button>
            </div>
          </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input:'',
        }
    }
    
}
</script>
<style lang="less">
   .goods-returm{
       .el-card__header{
          background-color: #f1f1f1;
           }
        .el-card__body{
            .topbox{
                .el-button{
                    margin-left: 5px;
                }
            }
        }   
   }
</style>
