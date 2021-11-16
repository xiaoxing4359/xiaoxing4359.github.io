import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Icon,
  Select,
  Button,
  message
} from 'antd';
import { reqCategorys, reqProduct } from "../../api";
import PicturesWall from './PicturesWall';
import RichTextEditor from './RichTextEditor';
import { reqAddOrUpdateProduct } from "../../api";
import qs from 'qs'
const { Option } = Select;
class AddUpdate extends Component {
  state = {
    categorys: [],
    product: {}
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { name, price, desc, categoryId } = values;
        const { isUpdate } = this;
        // 获取上传的图片数组
        // console.log(this.refs.picture);
        const imgs = this.refs.picture.getImgs();
        const detail = this.refs.richEditor.getDetail();
        // 包装一个product对象
        const product = { name, price, desc, categoryId, imgs, detail }
        if (isUpdate) {
          // 更新
          product._id = this.state.product._id;
        }
        // 提交数据到服务器
        const res = await reqAddOrUpdateProduct(product);

        if (res.status === 0) {
          message.success(`${isUpdate ? '修改' : '添加'}商品成功`);
          this.props.history.replace('/product');
        } else {
          message.error(res.msg);
        }

      }
    });
  };


  async componentWillMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true //去掉问号
    })
    const productId = query.productId;

    // 发起ajax 根据商品id获取当前商品的数据
    const res = await reqProduct(productId);
    if (res.status === 0) {
      // 组件将要加载的时候 获取该商品数据 存起来
      this.setState({
        product: res.data
      })
      // 是否有商品 来决定是false还是true
      const product = res.data || {};
      this.isUpdate = !!product._id;
    }
  }
  validatePirce = (rule, value, callback) => {
    if (value === '') {
      callback();
    } else if (value * 1 <= 0) {
      callback('价格必须大于0')
    } else {
      callback();
    }
  }
  // 获取所有的分类
  getCategorys = async () => {
    const res = await reqCategorys();
    if (res.status === 0) {
      this.setState({
        categorys: res.data
      })
    }
  }
  componentDidMount() {
    
    this.getCategorys();
  }
  render() {
    const { isUpdate } = this;
    console.log(isUpdate)
    const title = (
      <span>
        <Button type='link' onClick={() => {
          this.props.history.goBack();
        }}>
          <Icon type='arrow-left' />
        </Button>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { categorys } = this.state;
    const product = this.state.product || {};
    // 初始渲染时空对象
    console.log(product);

    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [
                {
                  required: true,
                  message: '必须输入商品名称!',
                },
              ],
            })(<Input placeholder='商品名称' />)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                {
                  required: true,
                  message: '必须输入商品描述!',
                },
              ],
            })(<Input placeholder='商品描述' />)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                {
                  required: true,
                  message: '必须输入商品价格!',
                },
                {
                  validator: this.validatePirce
                }
              ],
            })(<Input placeholder='商品价格' type='number' addonAfter='元' />)}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: product.categoryId || '',
              rules: [
                {
                  required: true,
                  message: '必须输入商品分类!',
                },
                {
                  validator: this.validatePirce
                }
              ],
            })(<Select>
              <Option value=''>未选择</Option>
              {
                categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
              }

            </Select>)}
          </Form.Item>
          <Form.Item label='商品图片'>
            <PicturesWall ref='picture' imgs={product.imgs}></PicturesWall>
          </Form.Item>
          <Form.Item label='商品详情' wrapperCol={{ span: 20 }}>
            <RichTextEditor ref='richEditor' detail = {product.detail}></RichTextEditor>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(AddUpdate);
