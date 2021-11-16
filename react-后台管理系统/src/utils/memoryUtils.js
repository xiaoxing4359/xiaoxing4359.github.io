import storageUtils from "./storageUtils";
//用来存储用户登陆的信息 初始值为local 中读取的user
export default {
    user:storageUtils.getUser(),
    product:{}
}