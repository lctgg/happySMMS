<template>
    <div class="system-info">
        <el-card class="box-card">
              <!-- 头部 -->
            <div slot="header" class="clearfix">
                <h3>系统信息</h3>
            </div>
            <!-- 身体 -->
            <div class="item">
                  <!-- 商品总数 -->
                 <el-alert
                    title="商品总数：5。已经销售的金额"
                    type="success"
                    show-icon>
                </el-alert>
                 <el-alert
                    title="导入数据"
                    type="info"
                    show-icon>
                </el-alert>
              
               <!-- 左右表格 -->
                <el-row :gutter="30">
                     <!-- 左边表格 -->
                    <el-col :span="12">
                      <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>销售排行</h3>
                            </div>
                            <div class="text item">
                                <el-table
                                        :data="saleRank"
                                        stripe
                                        style="width: 100%">
                                         <!-- 商品名称 -->
                                        <el-table-column
                                        prop="productName"
                                        label="商品名称"
                                         width="300"
                                        >
                                        </el-table-column>
                                         <!-- 销量 -->
                                        <el-table-column
                                        prop="saleName"
                                        label="销量"
                                       >
                                        </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                       <!-- 右边表格 -->
                    <el-col :span="12">
                      <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                 <h3>缺货的商品</h3>
                            </div>
                            <div class="text item">

                                    <el-table
                                    :data="stockoutCommodity"
                                    stripe
                                    style="width: 100%">
                                    <!-- 商品名称 -->
                                    <el-table-column
                                    prop="goodsName"
                                    label="商品名称"
                                    width="180">
                                    </el-table-column>
                                    <!-- 库存 -->
                                    <el-table-column
                                    prop="inventory"
                                    label="库存"
                                    width="180">
                                    </el-table-column>
                                    <!-- 操作  -->
                                    <el-table-column
                                    prop="operation"
                                    label="操作">
                                    </el-table-column>
                            </el-table>
                            </div>
                            </el-card>
                    </el-col>
                </el-row>

            </div>
      </el-card>
    </div>
</template>


<script>
export default {

    data () {
        return {
            //左表格数据
            saleRank:[
                 {    //商品名称 
                     productName: '海飞丝洗发露 ',
                     saleName: '8',  //销量 
                  
                 },
                   {
                     productName: '海飞丝洗发露 ',
                     saleName: '8',
                  
                 },
                   {
                     productName: '海飞丝洗发露 ',
                     saleName: '8',
                  
                 }
            ],
             //右侧表格 缺货的商品
          stockoutCommodity:[
              {  //商品名称
                 goodsName:'优乐美', //商品名称
                 inventory:'1',  //库存
                 operation:'入库' // 操作

              },
                {  //商品名称
                 goodsName:'优乐美', //商品名称
                 inventory:'1',  //库存
                 operation:'入库' // 操作

              }

          ]  

        }
    }
    
}
</script>


<style lang="less">
  .system-info{
      .el-card__header{
          background-color: #f1f1f1;
      }
      .el-card__body{
           .el-alert{
               margin: 20px auto;
           }
      }
  }

</style>
