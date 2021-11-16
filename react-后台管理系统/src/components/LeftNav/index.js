import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link,withRouter } from 'react-router-dom';
import meunConfig from '../../components/config/menuConfig'

import logo from '../../assets/images/logo192.png'
import './index.less'
const {  Sider } = Layout;
const { SubMenu } = Menu;

 class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        
        return menuList.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                           <Icon type={item.icon}></Icon>
                           <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                 // 如果当前请求路由地址与当前菜单的某个子菜单的key匹配，将父菜单的key保存到openKey
                  const cItem =  item.children.find(cItem=>cItem.key=== path);
                 if(cItem){
                    this.openKey = item.key;
                 }
                return (
                    <SubMenu 
                    key={item.key}
                    title={
                        <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </span>
                    }                    
                    >
                     {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })

    }
    UNSAFE_componentWillMount(){
        this.menuNodes = this.getMenuNodes(meunConfig)
        // console.log(meunConfig)
    }
    
    render() {
        // console.log(this.props)
       let defaulkey =  this.props.location.pathname;
    //    console.log(defaulkey)

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo">
                    <Link className='left-nav-link' to='/home'>
                    <img src={logo} alt="" />
                    <h1>我的后台</h1>
                    </Link>
                <Menu theme="dark" selectedKeys={[defaulkey]} mode="inline" defaultOpenKeys={[this.openKey]}>
                    {this.menuNodes}
                </Menu>
               
                </div>
                </Sider>
        )
    }
}
export default withRouter(LeftNav)