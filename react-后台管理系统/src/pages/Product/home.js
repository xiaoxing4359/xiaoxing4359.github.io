import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table } from 'antd'
import { reqProducts, reqSearchProducts } from '../../api';


const { Option } = Select;
const PAGE_SIZE = 4;
export default class ProductHome extends Component {
    constructor(){
        super()
        this.state = {
            searchType:'productName',
            searchName:'',
            products:[],
                
                 
        }
        
    }
    initColums = () =>{
        this.columns = [
            {
                title:'商品名称',
                dataIndex:'name'
            },
            {
                title:'商品描述',
                dataIndex:'desc'
            },
            {
                title:'价格',
                dataIndex:'price',
                render: price => '¥' + price
            },
            {
                title:'状态',
                render:()=>{
                    return(
                        <span>
                            <Button>上架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title:'操作',
                
                render:(product)=>{
                    return(
                        <span>
                            <Button type='link' onClick={()=>{
                                
                                this.isUpdate = true;
                                this.props.history.push({
                                pathname:'./product/addUpdate',
                                search:'?productId=' + product._id
                            })}}>修改</Button>
                            <Button type='link' onClick={()=>{this.props.history.push('./product/detail/'+ product._id)  }}>详情</Button>
                           
                        </span>
                    )
                }
            }
        ]
    }
    
    getProducts = async(pageNum)=>{
        const {searchType,searchName} = this.state;
        let result;
        if(!this.isSearch){
             result = await reqProducts(pageNum,PAGE_SIZE);
        }else{
          result =  await reqSearchProducts({
                pageNum,
                pageSize:PAGE_SIZE,
                searchType,
                searchName
            })
        }
        
        
        if(result.status === 0){
            const { list } = result.data;
            this.setState({
                products:list
            })
        }
    }
    componentWillMount(){
        this.initColums();
    }
    componentDidMount(){
        //获取第一页数据
        this.getProducts(1);
    }
    
    render() {
        const { searchType,searchName,products } = this.state
        // 
        
       const extra = (
           <Button type='primary' onClick={()=>{
               this.props.history.push('/product/addUpdate')
           }}>
           <Icon type='plus'></Icon>
           添加商品
           </Button>
       )
       const title = (
        <span>
            <Select value={searchType} style={{width:120}} onChange={value=>this.setState({searchType:value})}>
            
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input
            placeholder='关键字'
            style={{width:120,margin:'0 10px'}}
            value={searchName}
            onChange={e => this.setState({searchName:e.target.value})}
        
            ></Input>
            
            <Button type='primary' onClick={()=>{
               this.isSearch = true;
               this.getProducts(1)
            }}>搜索</Button>
        </span>
    )
    
        return (
            <Card
            title={title}
            extra={extra}
            >
            <Table
            bordered
            columns={this.columns}
            dataSource={products}
            rowKey='_id'

            pagination={{
                defaultPageSize:PAGE_SIZE,
                showQuickJumper:true
            }}

            ></Table>
            </Card>
        )
    }
}
