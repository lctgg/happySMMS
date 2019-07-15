<template>
    <div class=" merchandise-sales">
        <!-- 卡片头部 -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
               <h3>商品销售</h3>
            </div>
                <div class="topbox">
                     <!-- 商品销售表单 -->
           <el-form :model="marketForm" status-icon 
           :rules="rules" 
           ref="marketForm"
            label-width="100px"
            style="width:300px"
             >
                  <!-- 商品条形验证码 -->
                <el-form-item label="商品条形码" prop="stripType">
                    <el-input type="text" v-model="marketForm.stripType" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 数量 -->
                <el-form-item label="数量" prop="quantity">
                    <el-input type="text" v-model="marketForm.quantity" autocomplete="off"></el-input>
                    <p>计重商品单位千克</p>
                </el-form-item>
               
                 <!-- 加入订单按钮 -->
                <el-form-item>
                <el-button type="success" size="mini" @click="submitForm('ruleForm')">加入订单</el-button>
                <el-button size="mini" @click="resetForm('ruleForm')">重新出库</el-button>
                </el-form-item>
         </el-form>
                <!-- 销售明细表格 -->
                    <el-table
                ref="commodityTable"
                :data="commodityTable"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <!-- 选择款 -->
                <el-table-column type="selection" width="30"></el-table-column>

                <!-- 名称 -->
                <el-table-column prop="name" label="名称"></el-table-column>
                
                <!-- 数量 -->
                <el-table-column prop="quantity"  label="数量"></el-table-column>

                <!-- 单价 -->
                <el-table-column prop="unitPrice" label="单价(元)"></el-table-column>

                <!-- 总价 -->
                <el-table-column prop="totalPrices"  label="总价"></el-table-column>

                <!-- 优惠总价 -->
                <el-table-column prop="discounts" label="优惠总价"></el-table-column>
               
            </el-table>
                
                                <!-- 会员卡表单 -->
                <el-form :model="memberForm" status-icon 
                    :rules="rules" 
                    ref="memberForm"
                    label-width="100px"
                    style="width:300px"
                    >
                  <!-- 会员卡号 -->
                <el-form-item label="会员卡号" prop="member">
                    <el-input type="text" v-model="marketForm.member" autocomplete="off"></el-input>
                     <p>填写会员卡号</p>
                </el-form-item>

                 <!-- 确认提交 -->
                <el-form-item>
                <el-button type="success" size="mini" @click="member('ruleForm')">确认提交</el-button>
                </el-form-item>
         </el-form>

               </div>
          </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
           marketForm:{
                //商品条形验证码
              stripType:'',
              //数量
              quantity:'',
             
           },
              //商品销售表格参数
                commodityTable: [
                    {
                  
                    // 名称
                    name: "",
                    //数量
                    quantity:'',
                    //单价
                    unitPrice: "",
                    //总价
                    totalPrices: "",
                    //优惠总价
                    discounts: "",
                   
                    },
                
                ],

                memberForm:  {     
                   //会员卡号
                     member:'',
                     },
                    
                
           rules:{
                //商品条形码
               stripType:[
                     { required: true, message: '请输入商品条形码', trigger: 'blur' },
               ],
               //数量
              quantity:[
                     { required: true, message: '请输入商品数量', trigger: 'blur' },
               ],
           }
        }
       
    },
     methods :{
          //加入订单
         submitForm(){

           },
           //重新出库
           resetForm(){

           },
           //会员卡号
           member(){

           }
        }
    
}
</script>
<style lang="less">
 .merchandise-sales{

     .el-card__header{
            background-color: #f1f1f1;
           }
    .el-card__body{
        .topbox{
           border-bottom: 2px solid #ccc;
        //    margin-bottom: 20px;
        }
    }     
 }
   
</style>
