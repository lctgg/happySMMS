import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router) //注册路由

export default new Router({
  routes: [
    { path: '/', redirect: '/login' }, // 根目录重定向到 login
    { path: '/login', component: () => import('./views/Login/Login.vue') }, //登录
    {
      path: '/home', component: () => import('./views/Home/Home.vue'),  //父组件
      redirect: '/home/systeminfo', //重定向
      children: [ //子组件
        //系统信息
        {
          path: '/home/SystemInfo', //路径
          component:() =>import ('./views/SystemInfo/SystemInfo.vue')
        },
        //账户管理
        {
          path: '/home/AccountManagement',
          component:() =>import('./views/AccountManagement/AccountManagement.vue')
        },
         //添加账户
         {
           path: '/home/AccountAdds',
           component:() =>import('./views/AccountAdds/AccountAdds.vue')
         },
         //密码修改
         {
           path:'/home/PasswordModify',
           component:() =>import ('./views/PasswordModify/PasswordModify.vue')
         },
         //商品管理
         {
           path:'/home/CommodityManagement',
           component:() =>import ('./views/CommodityManagement/CommodityManagement.vue')
         },
         //添加商品
         {
           path:'/home/GoodsAdd',
           component:() =>import('./views/GoodsAdd/GoodsAdd.vue')
         },
         //销售统计
         {
           path:'/home/SalesTotal',
           component:() =>import('./views/SalesTotal/SalesTotal.vue')
         },
         //进货统计
         {
           path:'/home/StockTotal',
           component:() =>import('./views/StockTotal/StockTotal.vue')
         },
         //进货管理 商品入库
         {
           path:'/home/StockManagement',
           component:() =>import('./views/StockManagement/StockManagement.vue')
         },
          //进货管理 库存管理
          {
            path:'/home/InventoryManagement',
            component:() =>import('./views/InventoryManagement/InventoryManagement.vue')
          },
          //出货管理 销售明细
          {
            path:'/home/SalesParticular',
            component:() =>import('./views/SalesParticular/SalesParticular.vue')
          },
          //出货管理 商品销售
          {
            path:'/home/MerchandiseSales',
            component:() =>import('./views/MerchandiseSales/MerchandiseSales.vue')
          },
          //出货管理   商品退货
          {
            path:'/home/GoodsReturn',
            component:()=> import('./views/GoodsReturn/GoodsReturn.vue')
          },
          //个人中心
          {
            path:'/home/Personal',
            component:() =>import('./views/Personal/Personal.vue')
          }


      ]
    }
  ]
})
