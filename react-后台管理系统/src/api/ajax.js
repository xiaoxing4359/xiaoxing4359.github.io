// 封装能发ajax请求的函数
import axios from 'axios'
import qs from 'qs'
import { message } from "antd";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截器 在发送请求数据之前，提前对数据做处理
axios.interceptors.request.use(function (config) {
  const {method,data} = config;
  if(method.toLocaleLowerCase()==='post' && typeof data === 'object'){
    config.data = qs.stringify(data);
  }
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截器 响应数据之前做工作
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  message.error('请求失败了'+error.message);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // 让错误处于pending状态，不再往下执行
  return new Promise(()=>{})
});



export default axios;