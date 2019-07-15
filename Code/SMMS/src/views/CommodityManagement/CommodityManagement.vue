<template>
  <div class="commodity-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商品管理</h3>
      </div>

      <div>
        <div class="searchForm">
          <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="所属分类" prop="category">
                  <el-select v-model="searchForm.category" placeholder="请选择分类">
                  <el-option label="全部分类" value="全部分类"></el-option>
                  <el-option label="电子类" value="电子类"></el-option>
                  <el-option label="食品类" value="食品类"></el-option>
                  <el-option label="烟酒类" value="烟酒类"></el-option>
                  <el-option label="服装类" value="服装类"></el-option>
                  <el-option label="蔬菜类" value="蔬菜类"></el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="关键字">
                  <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
              </el-form-item>
              
              <el-form-item>
                  <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
           </el-form>
        </div>

        <el-table
          ref="commodityTable"
          :data="commodityTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectChange"
        >
          <!-- 选择款 -->
          <el-table-column type="selection" width="30"></el-table-column>

          <!-- 商品条形码 -->
          <el-table-column prop="barCode" label="商品条形码" width="100px"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="goodsName" label="商品名称" width="100px"></el-table-column>

          <!-- 所属分类 -->
          <el-table-column prop="category" width="100px" label="所属分类"></el-table-column>

          <!-- 售价（元） -->
          <el-table-column prop="salePrice" width="80px" label="售价(元)"></el-table-column>

          <!-- 促销价 -->
          <el-table-column prop="promotion" width="90px" label="促销价(元)"></el-table-column>

          <!-- 市场价 -->
          <el-table-column prop="marketPrice" width="90px" label="市场价(元)"></el-table-column>

          <!-- 库存 -->
          <el-table-column prop="stockCount" width="80px" label="库存"></el-table-column>
          <!-- 日期 -->
          <el-table-column
            label="日期"
            style="width:70px"
            >
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

   <!-- 修改模态框 -->
           <el-dialog title="修改商品" width="420px"  :visible.sync="visible">
                <!-- 修改表单 -->
              <el-form ref="editForm" :model="editForm" style="width:320px" :rules="rules" >
                <!-- 商品条形码 -->
                <el-form-item label="商品条形码" prop="barCode" label-width="120px">
                  <el-input v-model="editForm.barCode" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 商品名称 -->
                <el-form-item label="商品名称" prop="goodsName" label-width="120px">
                  <el-input v-model="editForm.goodsName" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 所属分类 -->
                <el-form-item label="所属分类" prop="category" label-width="120px">
                  <el-select v-model="editForm.category" placeholder="请选择分类">
                     <el-option label="电子类" value="电子类"></el-option>
                      <el-option label="食品类" value="食品类"></el-option>
                      <el-option label="烟酒类" value="烟酒类"></el-option>
                      <el-option label="服装类" value="服装类"></el-option>
                      <el-option label="蔬菜类" value="蔬菜类"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 售价（元） -->
                <el-form-item label="售价（元）" prop="salePrice" label-width="120px">
                  <el-input v-model="editForm.salePrice" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 库存 -->
                <el-form-item label="库存" prop="stockCount" label-width="120px">
                  <el-input v-model="editForm.stockCount" autocomplete="off"></el-input>
                </el-form-item>
               
                  <!-- 修改表当按钮 -->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </div>
         </el-dialog>

         <!-- 批量删除 -->
             <div style="margin-top: 20px">
                <el-button @click="batchDel()" type="danger"  size="small">批量删除</el-button>
                <el-button @click="deselect()" type="primary" size="small">取消选择</el-button>
            </div>

  </div>
</template>

<script>
//引入时间格式化模块
import moment from 'moment';

//引入商品管理的 请求
import { getDataByPage, goodsEdit, goodsDel, saveEdit, goodsDelete } from '@/api/goods';

export default {
  data() {
    return {
      //选择分类的参数
         searchForm:{
           category: '',
           keyWord: ''
         },
      //商品管理表格参数
      commodityTable: [  ],
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      total: 15 ,//总条数
      visible:false,
      editId:'', //保存id 
      delIdArr:[], //批量删除的id
     //修改表当
      editForm :{
          barCode:'', //商品条形码
          goodsName:'', //商品名称
          category:'', //所属分类
          salePrice:'', //商品售价
          promotion:'', //促销价
          marketPrice:'', //市场价
          stockCount:'', //库存
      },
       rules: { // 验证规则
                //商品条形码 
               barCode:[
                 { required: true, message: '请输入商品条形码', trigger: 'blur' },
               ],
               //商品名称  
               goodsName:[
                 { required: true, message: '请输入商品名称', trigger: 'blur' },
               ],
              //  /所属分类 
               category:[
                     { required: true, message: '请输入所属分类', trigger: 'change' },
               ],
             
               //商品售价 
                 salePrice:[
                       { required: true, message: '请输入商品售价', trigger: 'blur' },
                 ],
                 //市场价 
               marketPrice:[
                     { required: true, message: '请输入商品市场价', trigger: 'blur' },
               ],
                //入库数量 
               stockCount:[
                   {required:true, message:'请输入库数量', trigger:'blur'  }
               ],
         }, 
    }
  },
  methods: {
   //批量删除
    batchDel() {
       //如果没有选中
          if(!this.delIdArr.length){
            this.$message.error('请选中要删除的文件');
            return;
          }
          this.$confirm('确定批量删除文件?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => { //成功
                //发送 id 给后端
                let params ={
                    idArr : this.delIdArr
                }
               goodsDelete( params )
                  //发送的参数 
                .then(res =>{
                   //接收参数
                   let { code, reason } = res;
                   if (code === 0){ //成功
                       this.$message({
                         type:'success',
                         message:reason
                       }) 
                       this.getData() // 刷新列表（重新请求一次数据）
                   } else if( code ===1 ){ //失败
                     this.$message.error(reason)
                   }
                })
                .catch(err =>{
     
                  console.log(err)
                })
            }).catch(() => { //失败
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            })
    },
  selectChange(selectData){
     this.delIdArr = selectData.map(v => v.id ) //循环选中的数据把每一页的id 取出来放入一个数组中
  },

    //取消选择
    deselect(){
     this.$refs.commodityTable.clearSelection();
    },
   //保存修改
   saveEdit() {
          this.$refs.editForm.validate((valid) =>{
             if( valid ){
              //隐藏模态框的状态
               this.visible = false;
               //收集参数
               let params = {
                      barCode : this.editForm.barCode,//商品条形码
                      goodsName : this.editForm.goodsName,//商品名称
                      category : this.editForm.category,//所属分类
                      salePrice : this.editForm.salePrice,//商品售价
                      stockCount : this.editForm.stockCount,//库存
                       id: this.editId
               }
             saveEdit( params )
                .then(res =>{
                  //接收参数
                  let { code, reason} = res;
                  //判断
                  if(code === 0){
                      this.$message({ //成功
                        type:'success',
                        message: reason
                      })
                      this.getData() //刷新商品列表
                   } else if(code === 1) { //失败
                     this.$message.error(reason);
                   }

                })
                .catch(err =>{
                  console.log(err)
                })     
             }
          })
   },
    //编辑
    handleEdit(id) {
      //弹出模态框
      this.visible= true;
      //保存id
      this.editId = id
        
        //发送get请求 发送要编辑的id 
       goodsEdit({id})
         .then(res =>{
          //  console.log(res)
          //接收参数
          let { data } =res;
           //回填表格
          this.editForm.barCode = data[0].barCode//商品条形码
          this.editForm.goodsName = data[0].goodsName//商品名称
          this.editForm.category = data[0].category//所属分类
          this.editForm.salePrice = data[0].salePrice//商品售价
          this.editForm.stockCount = data[0].stockCount//库存

         })
         .catch(err =>{
           console.log(err)
         })
      
      
    },
    //删除
    handleDelete(id) {
        //  删除优化
        this.$confirm('确定是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //确定走这里
              //  console.log('删除',id)
              goodsDel({id})
              .then(res=>{
                //接收参数
                let { code, reason} =res;
                //判断
                if(code === 0) { //成功
                  this.$message({
                    type:'success',
                    message:reason
                  }) 
                  // 刷新列表（重新请求一次数据）
                        this.getData()
                } else if (code === 1) { //失败
                  this.$message.error(reason)
                }
              })
              .catch(err=>{
                console.log(err);
              })
        }).catch(() => { //取消走这里
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
    })

    },
    // pageSize（每页条数）改变
    handleSizeChange(pageSize) {
      //  console.log('每页条数：',pageSize);
      this.pageSize = pageSize  //把用户选择的每页条数  赋值给 发送的参数中的的data
      this.getData() //调用分页函数
    },
    // currentPage（当前页）改变
    handleCurrentChange(currentPage) {
      // console.log('当前页：',currentPage);
      this.currentPage = currentPage //用户选择的当前页 赋值给 发送的 参数中的data
       this.getData() //调用分页函数
    },
    //查询
    search() {
     //调用分页查询
     this.getData(); 
       
    },

    //分页函数
    getData() {
      //收集参数
      let params = {
        pageSize : this.pageSize,
        currentPage : this.currentPage,
        category:this.searchForm.category,//所属分类
        keyWord:this.searchForm.keyWord //关键字
      }
      //发送get 请求
      // console.log(params)
      getDataByPage(params)
          .then(res =>{
            // console.log(res)
            //接收参数
            let { total, data } =res;
             console.log('total',total)
             console.log('data',data)
            //渲染
            this.total = total;
            this.commodityTable = data;

            //边界判断
            if(!data.length && this.currentPage !==1 ){
               this.currentPage -= 1;
               this.getDataByPage();
            }
          })
          .catch(err =>{

            consolelog(err)         
         })
    }
  },
  created () {
     this.getData() //调用分页函数  
  },
  filters:{
    filterCtime( ctime ) { //过滤时间
     return moment(ctime).format('YYYY-MM-DD')
    }
  }
};
</script>

<style lang="less">
.commodity-management {
  .el-card__header {
    background-color: #f1f1f1;
  }
  .el-card__body {
    .topbox {
      border-bottom: 2px solid #ccc;
      height: 65px;
      .el-select {
        margin-right: 5px;
      }
      .character {
        font-size: 14px;
        font-weight: bold;
      }
      .name {
        font-size: 14px;
        font-weight: bold;
        margin-right: 5px;
        margin-left: 5px;
      }
    }
     .el-table__body-wrapper {
        .el-table__body {
          .el-table__row {
            td:nth-child(5) {
              .cell {
                color: red;
              }
              
            }
            td:nth-child(8) {
              .cell {
                color: red;
              }
              
            }
            td:nth-child(9) {
              .cell {
                color: red;
              }
              
            }
            td:nth-child(10) {
              .cell {
                color: red;
              }
              
            }
          }
        }
      }
  }
}
</style>
