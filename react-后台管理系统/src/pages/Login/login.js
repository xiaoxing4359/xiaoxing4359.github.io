import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import { Form, Icon, Input, Button, message,  } from 'antd';
import storageUtils from '../../utils/storageUtils';
import './login.less'
import { reqLogin } from '../../api';
import { Redirect } from 'react-router';
import memoryUtils from '../../utils/memoryUtils';

 class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const {username,password} = values;
            const res = await reqLogin(username,password);
            console.log(res);
            if(res.status === 0){
                const user = res.data;
                // 将用户信息保存到local中 localStorage
                storageUtils.saveUser(user);
                 // 将用户信息数据保存到内存 优化  redux react-redux
                memoryUtils.user = user;
                // this.props.setUser(user);
                this.props.history.replace('/');
                message.success('登陆成功')
  
            }else{
                message.error(res.msg)
            }
          }
          

          
        });
      };
   
    render() {
        const user = memoryUtils.user;
        if(user._id){
            return <Redirect to='/'></Redirect>
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <div className='login-header'>
                <img src={logo} alt="" />
                <h1>瑞星后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h2>用户登陆</h2>
                         <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'300px',margin:'40px auto'}}>
                        <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue: 'admin',
                            rules: [
                                { required: true, message: '必须输入用户名' },
                                {min:4,message:'用户名不能小于4位'},
                                { max: 12, message: '用户名不能大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或者下划线组成' }
                            ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder=""
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码' },
                                { min: 4, message: '用户名不能小于4位' },
                                { max: 12, message: '用户名不能大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或者下划线组成' }
                            ],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                       
                        
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                            登陆
                        </Button>
                        
                        </Form.Item>
                      </Form>
                </div>
                
            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(Login);
