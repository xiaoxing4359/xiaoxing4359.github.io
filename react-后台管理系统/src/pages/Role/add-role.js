import React, { Component } from 'react'
import { Form ,Input} from 'antd'

 class AddRoule extends Component {
     componentWillMount(){
         this.props.setForm(this.props.form);
     }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 }
          };
        return (
            <Form {...formItemLayout}>
                <Form.Item label='角色名称'>
                    {getFieldDecorator('roleName',{
                        rules:[
                            {
                                required:true,
                                message:'必须输入角色名称'
                            }
                        ]
                    })( <Input placeholder='请输入角色名称'></Input> )}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create({ name: 'role' })(AddRoule);
