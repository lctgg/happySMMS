<template>
  <div class="stock-Management">
   <el-card class="box-card">
        <div slot="header" class="clearfix">
           <h3>商品入库</h3>
        </div>
        <div class="text item">
             <!-- 商品入库表单 -->
           <el-form :model="storageForm" status-icon 
           :rules="rules" 
           ref="ruleForm"
            label-width="100px"
            style="width:300px"
             >
                  <!-- 商品条形验证码 -->
                <el-form-item label="商品条形码" prop="stripType">
                    <el-input type="text" v-model="storageForm.stripType" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 数量 -->
                <el-form-item label="数量" prop="quantity">
                    <el-input type="text" v-model="storageForm.quantity" autocomplete="off"></el-input>
                    <p>计重商品单位千克</p>
                </el-form-item>
                <!-- 进价 -->
                <el-form-item label="进价" prop="price">
                    <el-input v-model.number="storageForm.price"></el-input>
                </el-form-item>

                 <!-- 添加按钮 -->
                <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
           storageForm:{
                //商品条形验证码
              stripType:'',
              //数量
              quantity:'',
              //进价
              price:'',

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
               //进价
                 price:[
                      { required: true, message: '请输入进价', trigger: 'blur' },
                 ]

           }
        }
       
    },
     methods :{
          //添加
         submitForm(){

           },
           //重置
           resetForm(){

           }
        }
    
}
</script>
<style lang="less">
 .stock-Management{
        .el-card__header{
          background-color: #f1f1f1;
         }
 }

</style>
