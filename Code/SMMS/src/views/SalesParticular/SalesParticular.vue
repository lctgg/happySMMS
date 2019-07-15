<template>
    <div class="sales-particular">
         <!-- 卡片头部 -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
               <h3>销售明细</h3>
            </div>
                <div class="top-time">
                    <!-- 开始的时间 -->
                    <div class="block">
                    <span class="demonstration">时间：</span>
                    <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                  </div> 
               </div>
            <div class="box-input">
                     关键字：
                        <!-- 输入款 -->
                <el-input v-model="input" style="width:300px">
                    
                </el-input>
                 <span class="name">商品名称，订当号</span>
                <!-- 按钮 -->
                <el-button type="success">提交</el-button>
            </div>
                  <!-- 销售明细表格 -->
                    <el-table
                ref="sellTable"
                :data="sellTable"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <!-- 选择款 -->
                <el-table-column type="selection" width="30"></el-table-column>

                <!-- 订当号 -->
                <el-table-column prop="orderNumber" label="订当号"></el-table-column>

                <!-- 名称 -->
                <el-table-column prop="name" label="名称"></el-table-column>
                
                <!-- 数量 -->
                <el-table-column prop="quantity"  label="数量"></el-table-column>

                <!-- 实际售价 -->
                <el-table-column prop="priceActual" label="实际售价"></el-table-column>

                <!-- 优惠（促销/会员） -->
                <el-table-column prop="discounts"  label="优惠（促销/会员）"></el-table-column>

                <!-- 退款 -->
                <el-table-column prop="refund" label="退款"></el-table-column>

                <!-- 销售时间 -->
                <el-table-column prop="time" label="销售时间"></el-table-column>

            </el-table>
          </el-card>

              <!-- 分页 -->
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 3, 5, 10, 20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                ></el-pagination>
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          //时间  
        date: "",
        //关键字输入框
        input: "",

        //库存管理表格参数
        sellTable: [
            {
            //订当号
            orderNumber: "6911989622",
            // 名称
            name: "海飞丝去屑洗发露",
            //数量
            quantity:'3',
            //实际售价
            priceActual: "24",
            //优惠（促销/会员）
            discounts: "2.00元",
            //退款
            refund: "无退款",
            //销售时间
            time: "2019-6-17",
            },
        
        ],
        currentPage: 1, //当前页
        pageSize: 5, //每页条数
        total: 15 //总条数
        };
    },
    methods: {
        // pageSize（每页条数）改变
        handleSizeChange() {},
        // currentPage（当前页）改变
        handleCurrentChange() {}
    }    

}
</script>
<style lang="less">
   .sales-particular{

        .el-card__header{
              background-color: #f1f1f1;
           }
           .el-card__body{
            .top-time{
                margin-bottom: 10px;
            }
            .box-input{
                border-bottom: 2px solid #ccc;
                .name { 
                    margin-left: 5px;
                    margin-right: 5px;
                }
                .el-button{
                    margin-bottom: 20px;
                }
            }
        }     
   }
</style>
