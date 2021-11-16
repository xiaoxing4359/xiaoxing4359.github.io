import React, { Component } from 'react'
import { Layout } from 'antd';
import { Redirect,Switch,Route } from 'react-router-dom';
import LeftNav from '../../components/LeftNav';
import MHeader from '../../components/MHeader';
import Home from '../Home/home'
import Category from '../Category/category'
import Product from '../Product/product'
import User from '../User/user'
import Role from '../Role/role'
import Bar from '../Charts/bar'
import Line from '../Charts/line'
import Pie from '../Charts/pie'

import memoryUtils from '../../utils/memoryUtils';


const { Header, Sider, Content,Footer } = Layout;
export default class Admin extends Component {
    state = {
        collapsed: false,
      };
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render() {
        const user = memoryUtils.user;
        if(!user._id){
            return <Redirect to='/login'></Redirect>
        }
        return (
            <Layout style={{height:'100%'}}>
                <LeftNav collapsed={this.state.collapsed}></LeftNav>
                
                <Layout>
                <MHeader></MHeader>
                
                <Content
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route path='/home' component={Home}></Route>                       
                        <Route path='/category' component={Category}></Route>
                        <Route path='/product' component={Product}></Route>
                        <Route path='/user' component={User}></Route>
                        <Route path='/role' component={Role}></Route>
                        <Route path='/charts/bar' component={Bar}></Route>
                        <Route path='/charts/line' component={Line}></Route>
                        <Route path='/charts/pie' component={Pie}></Route>
                        
                        <Redirect to='/home'></Redirect>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
