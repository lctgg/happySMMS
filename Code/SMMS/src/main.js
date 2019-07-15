import Vue from 'vue'  //引入vue
import App from './App.vue'  //引入App.vue 顶级组件
import router from './router'  //引入路由
import './assets/css/reset.css' //引入重置样式
import './assets/css/common.css' //引入公用样式

import ElementUI from 'element-ui'; // 引入JS组件ElementUI
import 'element-ui/lib/theme-chalk/index.css'; // 引入css样式 

///引入 Echarts 
import echarts from 'echarts'; 

Vue.prototype.echarts = echarts //在原型上挂载Echarts

Vue.use(ElementUI);  // 注册elementui，

//路由守卫拦截所有路由
router.beforeEach((to, from, next) =>{
  //获取token
  const token = window.localStorage.getItem('user_token')
  //判读
   if(token) {
      next() //如果有令牌：放行  
   } else{
       //如果去的是登录 直接放行
        if(to.path === '/login'){
          next() //放行
        } else{
          next({path:'/login'})  //如果去的是其他页面，直接跳转到登录页面。
        }
   }
})


Vue.config.productionTip = false  // 阻止生产提示


new Vue({  // 创建vue实例 
  router,  // 传入路由，才能使用路由相关的组件和功能，router-view router-link
  render: h => h(App) // 传入顶级组件App.vue 渲染
}).$mount('#app')  // 挂载dom
