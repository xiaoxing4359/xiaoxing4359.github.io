import React, { Component } from 'react'
import { Form,Input } from 'antd'

 class AddUpdateForm extends Component {
    componentWillMount() {
        this.props.setForm(this.props.form)
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props;
        return (
            <Form>
                <Form.Item>
                    {
                      getFieldDecorator('categoryName', {
                        initialValue: categoryName,
                        rules: [
                          {
                            required: true,
                            message: '分类名称必须输入'
                          }
                        ]
                      })(
                        <Input type='text' placeholder='请输入分类名称' />
                      )
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddUpdateForm);