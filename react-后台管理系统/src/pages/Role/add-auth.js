import React, { Component } from 'react'
import { Input,Form } from 'antd'
const Item = Form.Item

export default class AddAuth extends Component {
    render() {
        const{ role } = this.props
        console.log(role);
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
          }
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                <Input value={role.name} disabled></Input>
                </Item>
               
            </div>
        )
    }
}
