import React, { Component } from 'react'
import { reqCategory, reqProduct } from '../../api'
import { Card,Button,Icon,List } from 'antd';

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            product:{},
            categoryName:''
        }
    }
    getProduct = async() =>{
        const id = this.props.match.params.id;
       const res =  await reqProduct(id);
       const categoryId = res.data.categoryId;
    //    console.log(res)
if(res.status===0){
    this.setState({
        product:res.data
    });
    //根据分类第获取商品的分类的名称
    if(categoryId){
      const categoryRes =   await reqCategory(categoryId);
    //   console.log(categoryRes)
    if(categoryRes.status === 0){
        this.setState({
            categoryName:categoryRes.data.name
        })
    }
    }
}
    }
    componentDidMount(){
        this.getProduct();
    }
    render() {
        const title = (
            <span>
                <Button type='link' onClick={()=>{this.props.history.goBack()}}>
                    <Icon type='arrow-left'></Icon>
                </Button>
                <span>商品详情</span>
            </span>
        )
        const {product,categoryName} = this.state;
        return (
            <Card title={title}>
                <List>
                <List.Item>
                    <p>
                        <span>商品名称</span>
                        <span>{product.name}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p>
                        <span>商品描述</span>
                        <span>{product.desc}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p>
                        <span>商品价格</span>
                        <span>{product.prce}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p>
                        <span>所属分类</span>
                        <span>{categoryName}</span>
                    </p>
                </List.Item>
                <List.Item>
                    <p>
                        <span>商品图片</span>
                        <span>{product.imgs && product.imgs.map(src=> <img src={'http://localhost:5000/upload/' + src} alt="img" key={src} /> )}</span>
                    </p>
                </List.Item>
                <List.Item>
                    
                        <span>商品详情</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                    
                </List.Item>
                </List>
            </Card>
        )
    }
}
