<template>
    <div class="account-management">
       <!-- 账号管理 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
              <h3>账户管理</h3>
        </div>
           
        <div>
           <el-table
              ref="accountTableData"
              :data="accountTableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selectChange"
             >
                 <!-- 选择框 -->
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
                 <!-- 用户名称 -->
              <el-table-column
                prop="account"
                label="用户名称"
               >
              </el-table-column>

              <!-- 用户组 -->
              <el-table-column
                prop="userGroup"
                label="用户组"
                >
              </el-table-column>
              <!-- 日期 -->
              <el-table-column
                label="日期"
               >
                <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
              </el-table-column>
               
                <!-- 操作 -->
              <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.row.id)">
                        <i class="el-icon-edit"></i>
                      编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.row.id)">
                      <i class="el-icon-delete"></i>
                      删除</el-button>
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
                  :total="total">
                </el-pagination>
         </div>

         <!-- 修改模态框 -->
           <el-dialog title="修改账号" width="420px"  :visible.sync="visible">
                <!-- 修改表单 -->
              <el-form ref="editForm" :model="editForm" style="width:320px" :rules="rules" >
                <!-- 账号 -->
                <el-form-item label="账号" prop="account" label-width="120px">
                  <el-input v-model="editForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 用户组 -->
                <el-form-item label="用户组" prop="userGroup" label-width="120px">
                  <el-select v-model="editForm.userGroup" placeholder="请选择活动区域">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通用户" value="普通用户"></el-option>
                  </el-select>
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

//引入账号管理请求函数 
import {batchDelete, accountEdit, accountDel, saveEdit, getDataByPage } from '@/api/account';

export default {
     data() {
         return {
            //账号表格数据
           accountTableData:[],
           currentPage: 1, //当前页 
           pageSize: 3 ,//每页条数
            total:15  ,//总条数
            //修改表当
            editForm :{
                account:'', //用户名
                userGroup:'', //用户组
            },
            visible:false,
            editId:'', //保存id
            rules: { // 验证规则
                account: [
                    { required: true, message: '账号不能为空', trigger: 'change' },
                    { min: 3, max: 6, message:'长度3 ~ 6位', trigger: 'change' }
                ]
            },
           delIdArr:[], //批量删除的id 
       }
     },
    methods:{
        //批量删除
        batchDel(){ 
          //如果没有选中
          if(!this.delIdArr.length){
            this.$message.error('请选中要删除的文件');
            return;
          }

         //优化体验
              this.$confirm('确定批量删除文件?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => { //成功
                //发送 id 给后端
                let params ={
                    idArr : this.delIdArr
                }
               batchDelete( params )
                  //发送的参数 
                .then(res =>{
                   //接收参数
                   let { code, reason } = res;
                   if (code === 0){ //成功
                       this.$message({
                         type:'success',
                         message:reason
                       }) 
                       this.getAccountsByPage() // 刷新列表（重新请求一次数据）
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
          // 表格选中的改变事件
          selectChange(selectData) {
              this.delIdArr = selectData.map(v => v.id ) //循环选中的数据把每一页的id 取出来放入一个数组中
          },
        //取消选择
        deselect() {
            this.$refs.accountTableData.clearSelection();
        },
        //编辑
        handleEdit(id){
          //弹出模态框
          this.visible= true;
          //保存id
          this.editId = id

          accountEdit({id})
          .then(res =>{
              //  console.log(response.data)
              //接收参数
              let { data } = res;
                //回填表格
                this.editForm.account = data[0].account;
                this.editForm.userGroup = data[0].userGroup;
          })
          .catch(err =>{

            console.log(err)
          })

        },
         //删除 
        handleDelete (id) {
                 //删除优化
               this.$confirm('确定是否删除', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => { //确定走这里
                     //  console.log('删除',id)
                     accountDel({id})
                      .then(res=>{
                        // console.log(response.data);
                        //接收参数
                        let { code, reason} =res;
                        //判断
                        if(code === 0) { //成功
                          this.$message({
                            type:'success',
                            message:reason
                          }) 
                          // 刷新列表（重新请求一次数据）
                                this.getAccountsByPage()
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

        //保存修改
        saveEdit() {
          this.$refs.editForm.validate((valid) =>{
             if(valid) {
               //隐藏模态框的状态
               this.visible = false;
               //收集参数
               let params = {
                   account:this.editForm.account,
                   userGroup:this.editForm.userGroup,
                   id: this.editId
               }
                //发送post给后端
              saveEdit(params)
                  .then(res =>{
                    // console.log(response.data)
                    //接收参数
                    let { code , reason} = res;
                     //判断
                     if( code === 0 ){ //成功
                       this.$message({
                         type:'success',
                         message:reason
                        
                       })
                        this.getAccountsByPage() //重新渲染一次
                     } else if (code === 1){ //失败
                        this.$message.error(reason);
                     }
                  })
                  .catch(err =>{
                    console.log(err)

                  })


             } else {
               return false; //阻止提交
             }

          }) 
        
        },


        // pageSize（每页条数）改变
        handleSizeChange(pageSize){
          // console.log('每页条数',pageSize)
           this.pageSize = pageSize; //把用户选择的每页条数 赋值给data中的pageSize
           this.getAccountsByPage(); // 调用分页请求
        },
        // currentPage（当前页）改变 
        handleCurrentChange(currentPage){ 
          //  console.log('当前页',currentPage)
          this.currentPage = currentPage; //把用户选择中的当前页 赋值给data中currentPage
          this.getAccountsByPage(); // 调用分页请求
        },

         //按照分页请求数据 
         getAccountsByPage(){
             //收集参数
             let params = {
               pageSize : this.pageSize,
               currentPage : this.currentPage
             }
               getDataByPage(params)
              .then(res =>{
                // console.log(res)
                //接收参数
                let { total, data } =res;
              // 渲染
                  this.total = total;
                  this.accountTableData = data;

                  //边界判定
                  if(!data.length && this.currentPage !== 1 ){
                      this.currentPage -= 1;
                      this.getAccountsByPage();
                  }
              })
              .catch(err =>{
                console.log(err)
              })
       
         },

    },
    created() {
      this.getAccountsByPage() //调用请求数据函数
    },
    filters:{
      filterCtime( ctime ){ //过滤时间
        return moment(ctime).format('YYYY-MM-DD hh:mm:ss')
      }
    }
    
}
</script>

<style lang="less">
     .account-management{
           .el-card__header{
          background-color: #f1f1f1;
       }
     }
</style>
