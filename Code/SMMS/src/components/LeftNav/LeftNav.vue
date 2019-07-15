<template>
    <div class="left-nav">
        <h3 class="title"> 
            <i class="el-icon-user-solid"></i>  华联超市管理系统 </h3>
        <el-menu
        :default-active="$route.path"
        unique-opened
        active-text-color="rgb(64, 158, 255)"
        background-color="rgb(48, 65, 86)"
        router
       >
        <!-- 导航条一 -->
      <el-submenu :index="(i+1) + '' " v-for="(nav, i) in leftNav" :key="i">
        <template slot="title">
          <i :class="nav.iconCls"></i>
          <span>{{ nav.navTile }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item 
          v-for="(subnav, i) in nav.children" :key="i"
          :index="subnav.path">
         {{ subnav.subTile }}
          </el-menu-item>
           
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
       
    </div>
</template>

<script>
//引入
import { getRole } from'@/api/account'
export default {
     data() {
        return {
           leftNav:[]
        }
     },
     created(){
         getRole()
           .then( res =>{
            //  console.log(res)
            //接收参数
            let{ role } = res;
             let nav = [
                    //导航1
                {
                  iconCls:'el-icon-s-tools',
                  navTile: '系统管理',
                  role: ['超级管理员', '普通用户'],
                  children:[
                        {path:'/home/SystemInfo',subTile:'系统信息'}
                    ]
                },
                //导航2
                {
                  iconCls:'el-icon-s-order',
                  navTile:'账号管理',
                  role:['超级管理员'],
                  children:[
                      {  path:'/home/AccountManagement',subTile:'账号管理' },
                      { path:'/home/AccountAdds',subTile:'添加账号' },
                      {path:'/home/PasswordModify',subTile:'密码修改' }
                  ]
                },
                //导航3
                {
                  iconCls:'el-icon-s-goods',
                  navTile:'商品管理',
                  role:['超级管理员','普通用户'],
                  children:[
                     {path:'/home/CommodityManagement',subTile:'商品管理'},
                     {path:'/home/GoodsAdd',subTile:'添加商品'}
                  ]
                },
                //导航4
                {
                  iconCls:'el-icon-first-aid-kit',
                  navTile:'统计管理',
                  role:['超级管理员'],
                  children:[
                    {path:'/home/SalesTotal',subTile:'销售统计'},
                    {path:'/home/StockTotal',subTile:'进货统计'}
                  ]
                },
                //导航5
                {
                   iconCls:'el-icon-shopping-cart-2',
                   navTile:'进货管理',
                    role:['超级管理员','普通用户'],
                    children:[
                    {path:'/home/StockManagement',subTile:'商品入库'},
                    {path:'/home/InventoryManagement',subTile:'库存管理'}
                   
                  ]
                },
                //导航6
                {
                  iconCls:'el-icon-set-up',
                   navTile:'出货管理',
                    role:['超级管理员','普通用户'],
                    children:[
                    {path:'/home/SalesParticular',subTile:'销售明细'},
                    {path:'/home/MerchandiseSales',subTile:'商品销售'},
                    {path:'/home/GoodsReturn',subTile:'商品退货'},
                   
                  ]
                }
             ]

             //过滤导航
           this.leftNav = nav.filter(v => v.role.includes( role ))
           })
           .catch(err =>{
             console.log(err) 
           })
     }
    
}
</script>

<style lang="less">
   .left-nav{
       .title{
           color: #fff;
           font-size: 16px;
           text-align: center;
       }
       .el-menu{
           border-right: none;
           .el-submenu__title{
               color: #fff;
                & > i {
                    color: #fff;
                } 
           }
           .el-menu-item{
               color: #fff;
           }
       }
   }
  

</style>
