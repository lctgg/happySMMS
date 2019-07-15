/* 商品管理模块路由 */
var express = require('express');
var router = express.Router();



//统一设置跨域请求头
router.all('*',(req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	next() //放行
})

 //引入模块
const connection = require('./js/conn');

/* --- 验证token合法性开始 ---- */ 

  // 引入express-jwt模块 此模块主要用于验证token的合法性
  const expressJwt = require('express-jwt');
  //定义秘钥
  const secret = 'itsource';

  // 验证token合法性（检查用户携带的token是否正确）
  router.use(expressJwt ({
      secret 
  }).unless({
      path: ['/login/checklogin']  // 不需要验证的url
  }))

  // 如果token不正确，就会抛出错误，如果错误的名字是“UnauthorizedError” 可以断定就是token无效的错误
  router.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {  

        // token无效 就给前端浏览器响应401状态码 且响应错误提示信息 
          res.status(401).send('无效的token，前端发送的请求，必须在请求头上携带token，才能拿到数据哦！');
      }
  })

/* --- 验证token合法性结尾 ---- */ 

 // 商品添加
 router.post('/goodsadd',(req, res) =>{
 //接收参数
 let{ category, barCode, goodsName, costPrice, salePrice, marketPrice, stockCount, goodsWeight, goodsUnit, vipDiscount, promotion, goodsDesc}=req.body;    

  //准备sql
  let sqlStr = `insert into goods(category, barCode, goodsName, costPrice, salePrice, marketPrice, stockCount, goodsWeight, goodsUnit, vipDiscount, promotion, goodsDesc) values (?,?,?,?,?,?,?,?,?,?,?,?)`

   //参数
  let sqlParams =[category, barCode, goodsName, costPrice, salePrice, marketPrice, stockCount, goodsWeight, goodsUnit, vipDiscount, promotion, goodsDesc]  
  
  // console.log(sqlStr, sqlParams)
  //执行sql
  connection.query(sqlStr, sqlParams, (err, data) =>{
  	   // console.log(data)
  	   if (err) throw err;
  	   //判断
  	   if (data. affectedRows > 0 ) {
  	   	  res.send({code:0, reason:'添加商品成功'})
  	   } else {
          res.send({code:0, reason:'添加商品失败'})
  	   }
  })
 })


//商品管理 分页的请求
router.get('/goodslistbypage',(req, res) =>{
 //接收参数
	let {pageSize, currentPage, category, keyWord} = req.query;

	// 构造sql
	let sqlStr = `select * from goods where 1=1`
  console.log(sqlStr);

	// 定义变量 保存数总条数
	let total;

  //如果分类不等于空 且不等于 全部
   if (category !== '' && category !== '全部分类') {
        //拼接第一个 查询sql
        sqlStr +=` and category='${category}'`
        console.log(sqlStr)
   }

   //如果第二个 关键字不为空
   if (keyWord !== '') {
      sqlStr += ` and (goodsName like '%${keyWord}%' or barCode like '%${keyWord}%')`
      console.log(sqlStr)
   }

   // 拼接排序
  sqlStr += ` order by ctime desc`

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length;   // 总数据条数
	})

	// 拼接分页sql
	let n = (currentPage - 1) * pageSize;
	sqlStr += ` limit ${n}, ${pageSize}`;
     // console.log(sqlStr)

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ total, data })
	})

})

//编辑回填数据
router.get('/goodsedit',(req, res) => {
    //接收参数
     let { id } = req.query;
     //准备 sql
     const sqlStr = `select * from goods where id = ${id}`
     // console.log(sqlStr)
     //执行sql
     connection.query(sqlStr, (err, data) =>{
     	// console.log(data)
     	res.send({data}) //响应数据给前端
     })
})

   // 单条删除
   router.get('/goodsdel',(req, res) =>{
   	 //接收参数
   	 let { id } =req.query;
   	//准备sql
   	const sqlStr = `delete from goods where id = ${id} `;
   	// console.log(sqlStr)
   	 //执行sql
   	 connection.query(sqlStr, (err, data) =>{
   	 	 if (err) throw err;
        // console.log(data)
         //判断
        if (data.affectedRows > 0){
        	res.send({ code: 0, reason:'删除成功'}) //响应删除成功给前端
        } else {
        	res.send({code: 1, reason:'删除失败' }) //响应删除失败给前端
        }    
   	 })
   })

 //保存修改
 router.post('/goodsaveedit',(req, res) =>{
   //接收参数
   let { barCode, goodsName, category, salePrice, promotion, id} = req.body;
   //准备sql
    const sqlStr = `update goods set barCode='${barCode}', goodsName='${goodsName}',category='${category}', salePrice='${salePrice}', promotion='${promotion}' where id=${id}`;
   
    //执行sql
    connection.query(sqlStr, (err, data) =>{
    	 if (err) throw err;
         //判断
         if (data.affectedRows > 0) {
         	res.send({code:0, reason:'修改成功'}) //发送修改成功的数据给前端
         } else{
         	res.send({code:1, reason:'修改失败'})//发送修改失败的数据给前端
         } 
    })
 })  

//批量删除
router.get('/goodsdelete',(req, res) =>{
	//接收参数
     let { idArr } = req.query;
     //准备sql
      const sqlStr = `delete from goods where id in (${idArr})`
      console.log(sqlStr);
      // 执行sql
       connection.query(sqlStr, (err, data) =>{
       	  // console.log(data)
       	  if (err) throw err;
       	  if (data.affectedRows > 0) {
       	  	 res.send({code:0, reason:'批量删除成功'}) //批量删除成功的数据 响应给前端
       	  } else{
       	  	res.send({code:1, reason:'批量删除失败'}) //批量删除失败的数据 响应给前端
       	  }
       })
})


 //报表 
 router.get('/selldata', (req, res) => {
  res.send({
    category: ['19-06-30', '19-07-1', '19-07-2', '19-07-03', '19-07-04', '19-07-05', '19-07-06'],
    value:  [1000, 1500, 8001, 2434, 2000, 1330, 3300]
  })
})


module.exports = router;