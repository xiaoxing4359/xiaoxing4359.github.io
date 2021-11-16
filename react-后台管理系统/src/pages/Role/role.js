import { Card ,Button,Table,Modal, message} from 'antd'
import React, { Component } from 'react'
import  AddRoule from './add-role'
import { reqCreatRouleName,reqRoleList } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import { getRoles } from '@testing-library/dom';
import AddAuth from './add-auth';




export default class Role extends Component {
    constructor(props){
     super(props);
       this.state = {
        isShowModal: false,
        isShowAuth:false,
             roles:[]
        }
    }
    initColumn = () => {
       
         
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
              
              
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              render:(create_time) =>{
                  if(create_time){
                      return new Date(create_time).toLocaleString()
                  }else{
                      return;
                  }
              }
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:(auth_time) =>{
                    if(auth_time){
                        return new Date(auth_time).toLocaleString()
                    }else{
                        return;
                    }
                }
              },
              {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
              },
              {
                title: '操作',
                
                render: (role) => <Button type='primary' onClick={()=>this.showauth(role)}>设置权限</Button>
              },
        ]
      

    }
    getRoles = async() =>{
       const res = await reqRoleList();
    //    console.log(res)
       if(res.status===0){
           const roles = res.data;
           this.setState({
               roles
           })
       }
    }
    componentDidMount(){
        this.getRoles()
    }
    componentWillMount(){
        this.initColumn()
    }
    showauth = role => {
        this.role = role;
        this.setState({
            isShowAuth: true,
        });
      };

    showModal = () => {
      this.setState({
        isShowModal: true,
      });
    };
  
    handleOk = () => {
        this.form.validateFields(async(err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
                this.setState({
                    isShowModal: false,
                });

              const res = await reqCreatRouleName(values.roleName);
              console.log(res);
            if(res.status === 0){
                message.success('添加角色成功');
                const role = res.data
                // 修改状态 当依赖于上一个状态时必须这样修改
                this.setState(state =>({
                    roles:[...state.roles,role]
                }))
            }else{
                message.error(res.msg)
            }
            }
          });
    };
    // addAuth = () =>{
    //     this.form.validateFields(async(err, values) => {
    //         if (!err) {
    //           console.log('Received values of form: ', values);
    //             this.setState({
    //                 isShowAuth: false,
    //             });
    //         }
    //     })

    // }
  
    
    
    render() {
        const { isShowModal,isShowAuth, roles } = this.state;
        const title = (
            <Button type='primary' onClick={this.showModal}>创建角色</Button>
        )
        return (
            <Card title={title}>
                <Table 
                columns={this.columns} 
                dataSource={roles}
                bordered 
                rowKey='_id'
                pagination={{ defaultPageSize: 7 }}
                />
                <Modal
                    title="添加角色"
                    visible={isShowModal}
                    onOk={this.handleOk}
                    onCancel={()=>{
                        this.setState({
                            isShowModal:false
                        })
                    }}
                    okText='确定'
                    cancelText='取消'
                    >
                    <AddRoule setForm={form => this.form = form}></AddRoule>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.addAuth}
                    onCancel={()=>{
                        this.setState({
                            isShowAuth:false
                        })
                    }}
                    okText='确定'
                    cancelText='取消'
                    >
                    <AddAuth ref='addAuth' role={this.role}></AddAuth>
                </Modal>

            </Card>
        )
    }
}
