import React, { Component } from 'react'
import { Card,Button,Icon,Table, message,Modal } from 'antd';
import { reqCategorys,reqAddCategory,reqUpdateCategory } from '../../api';
import AddUpdateForm from './add-update-from';


export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categorys: [],
          showStatus:0,
        }
      }
    initColumns = () => {
        this.columns = [
        {
           title:'分类的名称',
           dataIndex:'name'
        },
        {
            title: '操作',
            width:300,
            render: (category) => <Button type='primary' onClick={()=>{
                // console.log(category);
                this.category = category;
                this.setState({
                    showStatus:2
                })
            }}>修改分类</Button>,
          },
        ]
    }
    getCategorys = async() =>{
       const res = await reqCategorys();
    //    console.log(res);
    if(res.status===0){
        this.setState({
            categorys:res.data
        })
    }else{
        message.error('获取分类列表失败');
    }
    }

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getCategorys();
    }
    handleOk = () => {
        this.form.validateFields(async(err, values) => {
            if (!err) {
                const { categoryName } = values;
                console.log('Received values of form: ', values);
              
                const { showStatus } = this.state;
                const actionText = showStatus === 1 ? '添加' : '修改';
                console.log(this.showStatus)
                console.log(this.state)
                let result;
                if (showStatus === 1) {
                // 做添加 showStatus = 1
                result = await reqAddCategory({ categoryName });
                } else {
                // 做修改  showSatus = 2
                const categoryId = this.category._id;
                result = await reqUpdateCategory({ categoryId, categoryName });
                }
                // 重置输入的表单数据
                this.form.resetFields();
                // 模态框消失
                
                this.setState({ showStatus: 0 });
                
                if (result.status === 0) {
                // 重新获取分类列表数据显示
                this.getCategorys();
                message.success(actionText + '分类成功')

                } else {
                message.success(actionText + '分类失败');
                }

            }
          });
        
    }

    handleCancel = () => {
        this.setState({
          showStatus: 0
        })
      }
    render() {
        const extra = (
            <Button type='primary' onClick={()=>{
                this.category = {};
                this.setState({
                    showStatus:1
                })
            }}>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )
        const category = this.category || {}
        return (
            <div>
                <Card
                style={{ width: '100%' }}
                title="品类管理"
                extra={extra}
                >
                <Table
                columns={this.columns}
                bordered
                dataSource={this.state.categorys}
                rowKey='_id'
                pagination={{ defaultPageSize: 2,showQuickJumper: true,}}
                ></Table>
                 <Modal
                    title={this.state.showStatus === 1 ? '添加分类' : '修改分类'}
                    visible={this.state.showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    >
                    <AddUpdateForm categoryName={category.name} setForm={form => this.form = form}></AddUpdateForm>
                    
                </Modal>
                </Card>
            </div>
        )
    }
}
