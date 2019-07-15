var express = require('express');
var router = express.Router();

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

//统一设置跨域请求头
router.all('*',(req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	next() //放行
})

 //引入模块
const connection = require('./js/conn');

//测试 数据
 // router.get('/', (req, res) => {
 //   res.send('测试账号管理模块路由!')
 // })
 
 //添加账号
 router.post('/accountadd',(req, res) =>{
	 //接收参数
	let {account, password, userGroup} = req.body;
	 
	 //准备Sql
	const sqlStr = `insert into accounts(account, password, userGroup) values('${account}', '${password}', '${userGroup}')`;
		// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// console.log(data)
		// 判断
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '添加账号成功'}) // 响应成功的数据给前端
		} else {
			res.send({code: 1, reason: '添加账号失败'}) // 响应失败的数据给前端
		  }
		})
 })
 
   // 账号列表
   // router.get('/accountlist',(req, res) =>{
	  //  //准备sql
	  //  const sqlStr = `select * from accounts order by ctime desc`;
	  //  console.log(sqlStr)
	  // //执行sql
	  // connection.query(sqlStr, (err, data) =>{
		 //  if( err ) throw err;
		 //   console.log(err);
		 //   res.send({data}) //响应数据给前端
	  // })
	  
   // })

   // 单条删除
   router.get('/accountdel',(req, res) =>{
   	 //接收参数
   	 let { id } =req.query;
   	//准备sql
   	const sqlStr = `delete from accounts where id = ${id} `;
   	console.log(sqlStr)
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

   //编辑回填数据
   router.get('/accountedit', (req, res) =>{
		  //接收参数
		  let { id } = req.query;
		    //准备 sql
		    const sqlStr = `select * from accounts where id = ${id}`
		    // console.log(sqlStr)
		    //执行sql
		    connection.query(sqlStr, (err, data) =>{
		    	if (err) throw err;
		    	res.send({data}) //响应数据给前端
		    })
   })

   //保存修改请求
   router.post('/saveedit', (req , res) =>{
   	  //接收参数
   	  let {account, userGroup, id} = req.body;
   	  //准备sql
   	    const sqlStr = `update accounts set account='${account}', userGroup='${userGroup}' where id=${id}`;
   	  // console.log(sqlStr);
         connection.query(sqlStr, (err, data) =>{
         	 if (err) throw err;
         	   //判断
         	   if (data.affectedRows > 0 ) {
         	   	   res.send({code:0, reason:'修改成功'}) //修改成功数据响应给前端
         	   } else{
         	   	 res.send({code:1, reason:'修改失败'}) // 修改是失败的数据响应给前端
         	   }
         })    

   })

   //批量删除
   router.get('/batchdelete',(req, res) =>{
     //接收参数
     let { idArr } = req.query;

      //准备sql
      const sqlStr = `delete from accounts where id in (${idArr})`
     
      //执行sql
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
 
 //分页请求数据
 router.get('/accountlistbypage', (req, res) =>{
    //接收参数
    let { pageSize ,currentPage  } =req.query;
     //定义变量保存数据总数
     let total ;
    console.log(total)
    //准备sql
    let sqlStr = `select * from accounts order by ctime desc`

    //执行sql
    connection.query(sqlStr, (err, data) =>{
    	 // console.log(data);
    	 if (err) throw err;
    	 
    	 total=data.length //获取数据总条数
    	 // console.log(total)
    })

 
     // / 构造sql 按照分页查询数据
  let n = (currentPage - 1) * pageSize; // 跳过多少条
  sqlStr += ` limit ${n}, ${pageSize}`; // 分页的sql
       // console.log(sqlStr);
       //执行sql
       connection.query(sqlStr, (err, data) =>{
       	   if (err) throw err;
       	     // console.log(data);
       	    res.send({ total, data })
       })
 })

 /*   检查原密码是否正确    */
 router.post('/checkoldpass',(req, res) =>{
    //接收参数
    let { oldPwd }  = req.body;
    //验证密码是否正确
      if (oldPwd === req.user.password) {
          res.send({code:0, reason:'原密码正确'})
      } else{
        res.send({code:1, reason:'原密码不正确'})
      }
 }) 

/*  修改密码的 */
router.post('/passwordmodify',(req, res) =>{
    //接收参数
    let {newPassword} = req.body;
    //取出id
    let id = req.user.id;
    //构造sql
    let sqlStr = `update accounts set password='${newPassword}' where id=${id}`
     //准备sql
     connection.query(sqlStr,(err, data) =>{
         // console.log(data)
         if (err) throw err;
         if (data.affectedRows > 0 ) {
             res.send({code:0, reason:'密码修改成功'}) //把修改成功的密码发送给前端
         } else{
            res.send({code:1,reason:'密码修改失败'}) //把修改失败的密码发送给前端
         }
     })
}) 

/* -----上传开始---- */ 
// 引入node上传模块
var multer = require('multer');

// 配置存储路径 和 重命名
var storage = multer.diskStorage({
    // 图片上传到服务器以后 要放置的路径
    destination: 'public/upload',

    // 图片重命名
    filename: function (req, file, cb) {
        var fileFormat =(file.originalname).split(".");
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 上传对象
var upload = multer({
    storage,
});

// 接收上传请求
router.post('/uploadavatar', upload.single('file'), (req, res) => {
    // 接收到的文件信息
  var file = req.file;
  console.log(file)

  // 文件名
  let fileName = file.filename;
  // 拼接文件路径
  let avatarUrl = '/upload/' + fileName

  // 构造sql
  const sqlStr = `update accounts set avatarUrl = '${avatarUrl}' where id=${req.user.id}`;
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({code: 0, reason: "上传成功", avatarUrl})
    } else {
      res.send({code: 1, reason: "上传失败"})
    }
  })
})

/* ----上传结束----- */ 




/*账号信息*/
router.get('/info',(req, res) =>{
  // console.log(req.user)
  //获取id
  let id = req.user.id;
  // console.log(id)
  //准备sql
  let sqlStr =`select * from accounts where id=${id}`
  // console.log(sqlStr)
  //执行sql
  connection.query(sqlStr,(err, data) =>{
     res.send({data}) //发送账号信息给前端
  }) 
})

/* 权限管理 */
router.get('/role',(req, res) =>{
  res.send({role:req.user.userGroup}) //响应前端数据
})

module.exports = router;
