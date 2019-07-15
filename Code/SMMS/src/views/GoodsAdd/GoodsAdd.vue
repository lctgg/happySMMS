<template>
    <div class="goods-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
               <h3>添加商品</h3>
            </div>
                
            <div>
               <el-form :model="goodsAddForm" 
                   status-icon 
                   :rules="rules"
                    ref="goodsAddForm"
                    label-width="100px"
                    style="width:315px"
                     >
                   <!-- 1.所属分类 -->
                       <el-form-item label="所属分类" prop="category">
                            <el-select v-model="goodsAddForm.category" placeholder="----选择分类----">
                            <el-option label="电子类" value="电子类"></el-option>
                            <el-option label="食品类" value="食品类"></el-option>
                            <el-option label="烟酒类" value="烟酒类"></el-option>
                            <el-option label="服装类" value="服装类"></el-option>
                            <el-option label="蔬菜类" value="蔬菜类"></el-option>
                            </el-select>
                        </el-form-item>

                       <!-- 2.商品条形码 -->
                   <el-form-item label="商品条形码" prop="barCode">
                        <el-input v-model="goodsAddForm.barCode" autocomplete="off"
                         style="width:300px">
                        </el-input>
                        <el-button type="success">生成条行码</el-button>
                    </el-form-item>
                    <!-- 3.商品名称 -->
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input  v-model="goodsAddForm.goodsName" autocomplete="off"></el-input>
                    </el-form-item>
                      <!--4. 商品进价  -->
                    <el-form-item label="商品进价" prop="costPrice">
                        <el-input @blur="autoPrice" v-model="goodsAddForm.costPrice" autocomplete="off"></el-input>
                    </el-form-item>

                      <!-- 5.商品售价 -->
                    <el-form-item label="商品售价" prop="salePrice">
                        <el-input v-model="goodsAddForm.salePrice" autocomplete="off"></el-input>
                    </el-form-item>

                      <!-- 6.市场价 -->
                    <el-form-item label="市场价" prop="marketPrice ">
                        <el-input v-model="goodsAddForm.marketPrice" autocomplete="off"></el-input>
                        <p>默认市场价</p>
                    </el-form-item>

                      <!-- 7.入库数量 -->
                    <el-form-item label="入库数量" prop="stockCount">
                        <el-input  v-model="goodsAddForm.stockCount" autocomplete="off"></el-input>
                        <p>记重商品单位千克</p>
                    </el-form-item>

                      <!-- 8.商品重量 -->
                    <el-form-item label="商品重量" prop="goodsWeight">
                        <el-input  v-model="goodsAddForm.goodsWeight" autocomplete="off"></el-input>
                    </el-form-item>

                      <!--9. 商品单位 -->
                    <el-form-item label="商品单位" prop="goodsUnit">
                        <el-input  v-model="goodsAddForm.goodsUnit" autocomplete="off"></el-input>
                    </el-form-item>

                      <!-- 10.会员优惠 -->
                   <el-form-item label="会员优惠" prop="vipDiscount">
                        <el-radio-group v-model="goodsAddForm.vipDiscount">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                      <!-- 11.是否促销 -->
                     <el-form-item label="是否促销"  prop="promotion">
                        <el-radio-group v-model="goodsAddForm.promotion">
                        <el-radio label="促销"></el-radio>
                        <el-radio label="不促销"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                      <!-- 12.商品简介 -->
                     <el-form-item label="商品简介"  prop="goodsDesc">
                        <el-input type="textarea" v-model="goodsAddForm.goodsDesc"></el-input>
                    </el-form-item>
                        
                        <!-- 提交 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">添加</el-button>
                    </el-form-item>
            </el-form>  
              
            </div>
            </el-card>
    </div>
</template>

<script>
//引入账号管理 添加账号请求
import {goodsAdd} from '@/api/goods'

export default {
    data() {
        return{
           goodsAddForm:{
               //所属分类 --1
               category:'',
               //商品条形码 --2
               barCode:'',
               //商品名称 --3
               goodsName:'',
               //商品进价 --4
               costPrice:'',
               //商品售价 --5
               salePrice:'',
               //市场价 --6
               marketPrice:'',
               //入库数量 --7
               stockCount:'',
               //商品重量 --8
               goodsWeight :'',
               //商品单位 --9
               goodsUnit:'',
               //会员优惠 --10
                vipDiscount: '',
                //是否促销 --11
                promotion:'',
                //商品简介 --12
                goodsDesc:'',

           },
           rules:{
                //所属分类 --1
               category:[
                     { required: true, message: '请输入所属分类', trigger: 'change' },
               ],
                //商品条形码 --2
               barCode:[
                    { required: true, message: '请输入商品条形码', trigger: 'blur' },
               ],
               //商品名称  --3
               goodsName:[
                   { required: true, message: '请输入商品名称', trigger: 'blur' },
               ],
                //商品进价 --4
               costPrice:[
                      { required: true, message: '请输入商品进价', trigger: 'blur' },
               ],
               //商品售价 --5
                 salePrice:[
                       { required: true, message: '请输入商品售价', trigger: 'blur' },
                 ],
                 //市场价 --6
               marketPrice:[
                     { required: true, message: '请输入商品市场价', trigger: 'blur' },
               ],
                //入库数量 --7
               stockCount:[
                   {required:true, message:'请输入库数量', trigger:'blur'  }
               ],
               //商品重量 --8
               goodsWeight :[
                   {required:true, message:'请输入商品重量', trigger:'blur'  }
               ],
               //商品单位 --9
               goodsUnit:[
                   {required:true, message:'请输入商品单位', trigger:'blur'  }
               ],
               //会员优惠 --10
                vipDiscount: [
                    {required:true, message:'不能为空', trigger:'change'  }
                ],
                //是否促销 --11
                promotion:[
                    {required:true, message:'不能为空', trigger:'change'  }
                ],
                //商品简介 --12
                goodsDesc:[
                    {required:true, message:'不能为空', trigger:'blur'  }
                ], 

           }  
        }
    },
    methods:{
       //自动补齐商品售价和市场价
       autoPrice(){
         this.goodsAddForm.salePrice =   (parseFloat( this.goodsAddForm.costPrice * 1.5 ) ).toFixed(2) //商品售价是商品进价的1.5倍
         this.goodsAddForm.marketPrice =  (parseFloat( this.goodsAddForm.costPrice *2 ) ).toFixed(2) //市场价是 商品进价的 2 倍  
        
       },

        //添加
        submitForm () {
            this.$refs.goodsAddForm.validate((valid) =>{ // 所有前端验证通过 valid:true, 否则valid: false
                if(valid) {
                    //收集参数
                    let params = {
                        //所属分类
                        category:this.goodsAddForm.category,
                        //商品条形码
                        barCode:this.goodsAddForm.barCode,
                        //商品名称
                        goodsName:this.goodsAddForm.goodsName,
                        //商品进价 
                        costPrice:this.goodsAddForm.costPrice,
                        //商品售价
                        salePrice:this.goodsAddForm.salePrice,
                        //市场价
                        marketPrice:this.goodsAddForm.marketPrice,
                        //入库数量
                        stockCount:this.goodsAddForm.stockCount,
                        //商品重量
                        goodsWeight :this.goodsAddForm.goodsWeight,
                        //商品单位
                        goodsUnit:this.goodsAddForm.goodsUnit,
                        //会员优惠
                        vipDiscount: this.goodsAddForm.vipDiscount,
                        //是否促销
                        promotion:this.goodsAddForm.promotion,
                        //商品简介
                        goodsDesc:this.goodsAddForm.goodsDesc
                    }  
                     //发送post 给后端
                 goodsAdd(params)
                       .then(res =>{ //成功
                        //   console.log(res);
                        //接收参数
                         let {code, reason} =res;
                         //判断
                         if(code === 0) { //成功
                             this.$message({
                                 type:'success',
                                 message: reason
                             })
                             this.$router.push('/home/CommodityManagement')
                         } else if(code === 1) { //失败
                             this.$message.error(reason);
                         }
                       })
                       .catch(err =>{ //失败
                           console.log(err)
                       })        
                } else{
                    console.log('前端验证不通过')
                    return false; //阻止提交
                }
            }) 
        },
    }            
    
}
</script>

<style lang="less">
      .goods-add{
           .el-card__header{
          background-color: #f1f1f1;
           }
           .el-card__body{
               .el-form-item:nth-child(2){
                     
                        & > .el-form-item__content{
                            
                            .el-button{
                                position: absolute;
                                right: -205px;
                                top: 0px
                            }
                        }
                 
               }
              
           }
         
      }
    

</style>
