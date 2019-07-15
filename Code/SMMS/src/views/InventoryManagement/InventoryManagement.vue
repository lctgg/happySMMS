<template>
   <div class="inventory-management">
     <el-card class="box-card">
         <div slot="header" class="clearfix">
           <h3>库存管理</h3>
         </div>
           <div>
            <div class="topbox">
            <!-- 选择分类 -->
            分类：
            <el-select v-model="value" clearable placeholder="----选择分类----">
               <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value"
               ></el-option>
            </el-select>
            <!-- 关键字 -->
            <span class="character">关键字：</span>
            <!-- 输入款 -->
            <el-input v-model="input" style="width:300px">
               <!-- 商品名称 -->
            </el-input>
            <span class="name">(商品名称，条形码)</span>
            <!-- 按钮 -->
            <el-button type="success">查询</el-button>
         </div>

           <el-table
          ref="inventoryTable"
          :data="inventoryTable"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- 选择款 -->
          <el-table-column type="selection" width="30"></el-table-column>

          <!-- 商品条形码 -->
          <el-table-column prop="shapeCode" label="商品条形码" width="200px"></el-table-column>

          <!-- 商品名称 -->
          <el-table-column prop="name" label="商品名称" width="200px"></el-table-column>

          <!-- 进价（元） -->
          <el-table-column prop="purchasing" width="100px" label="进价(元)"></el-table-column>

          <!-- 入库 -->
          <el-table-column prop="enterBank"  width="100px" label="入库"></el-table-column>

          <!-- 库存 -->
          <el-table-column prop="inventory" width="100px" label="库存"></el-table-column>

          <!-- 已售 -->
          <el-table-column prop="printOut" width="100px" label="已售"></el-table-column>

          <!-- 管理 -->
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
   </div>
</template>
<script>
export default {
    data() {
    return {
      //选择分类的参数
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "",
      input: "",
      //库存管理表格参数
      inventoryTable: [
        {
          //条形码
          shapeCode: "6911989622",
          // 商品名称
          name: "我的优乐美",
          //进价
          purchasing: "2.00",
          //入库
          enterBank: "10",
          //库存
          inventory: "0(缺)",
          //已售
          printOut: "5",
        },
       
      ],
      currentPage: 1, //当前页
      pageSize: 5, //每页条数
      total: 15 //总条数
    };
  },
  methods: {
    //编辑
    handleEdit() {},
    //删除
    handleDelete() {},
    // pageSize（每页条数）改变
    handleSizeChange() {},
    // currentPage（当前页）改变
    handleCurrentChange() {}
  }    
}
</script>
<style lang="less">
  .inventory-management{
      //卡片头部
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
       }
  }

</style>
