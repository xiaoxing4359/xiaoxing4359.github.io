import ajax from './ajax';


const BASE = ''
export const reqLogin = (username,password) => {
    
    return ajax({
        method:'post',
        url:BASE + '/login',
        data:{
            username,
            password
        }
    })
}
//获取分类列表
export const reqCategorys = () =>{
    
    return ajax({
        method:'get',
        url:BASE + '/manage/category/list'
    })
}

export const reqUpdateCategory = ({ categoryId, categoryName }) => {
    return ajax.post(BASE + '/manage/category/update', {
      categoryId,
      categoryName
    })
  }
  // 添加分类
  export const reqAddCategory = ({ categoryName }) => {
    return ajax.post(BASE + '/manage/category/add', {
      categoryName
    })
  }
  //获取商品分页列表
  export const reqProducts = (pageNum ,pageSize)=>{
    return ajax(BASE + '/manage/product/list',{
      params:{
        pageNum ,
        pageSize
      }
      
    })
  }
  //根据商品的关键字获取商品分页列表
  //根据名称搜索
  //根据描述搜索
export const reqSearchProducts = ({pageNum,pageSize,searchType,searchName})=>{
  return ajax (BASE + '/manage/product/search',{
      params:{
        pageNum,
        pageSize,
        [searchType]:searchName
      }
  })
}


  //添加商品
  export const reqAddOrUpdateProduct = (product) => {
    return ajax.post(`${BASE}/manage/product/${product._id ? 'update' : 'add'}`, product)
  }

 // 根据商品Id获取商品详情
  export const reqProduct = (productId) => {
    return ajax(BASE + '/manage/product/info', {
      params: {
        productId
      }
    })
  }
  // 根据分类Id获取商品分类的名称
export const reqCategory = (categoryId) => {
  return ajax(BASE + '/manage/category/info', {
    params: {
      categoryId
    }
  })
}
//添加角色接口
export const reqCreatRouleName = (roleName) => {
  return ajax.post(BASE + '/manage/role/add',{
    roleName
  }) 
}
//获取角色列表
export const reqRoleList = () =>{
  return ajax(BASE + '/manage/role/list')
}
