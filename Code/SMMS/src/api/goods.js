/* 
  商品管理请求

*/

// 引入封装好的 request.js
import req from '@/utils/request'



/* 商品添加 */
export function goodsAdd (params) {
    return req.post('/goods/goodsadd', params )
}


/* 商品管理的 分页请求 */
export function getDataByPage (params) {
  return req.get('/goods/goodslistbypage', params)
}

/* 编辑 */
export function goodsEdit (params) {
  return req.get('/goods/goodsedit', params )
}

/* 单条删除 */
export function goodsDel(params) {
  return req.get('/goods/goodsdel', params)
}
/* 保存修改 */
export function saveEdit (params) {
  return req.post('/goods/goodsaveedit', params)
}

 /* 批量删除 */
export function goodsDelete ( params) {
  return  req.get('/goods/goodsdelete',params)
}
/* 报表数据 */
export function getSellData(params){
  return req.get('/goods/selldata',params)
}


