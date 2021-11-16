import React, { Component } from 'react'
import { Layout,Button,Modal } from 'antd';
import { withRouter } from "react-router-dom";
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
import userEvent from '@testing-library/user-event';
import storageUtils from '../../utils/storageUtils';
const {  Header } = Layout;
const { confirm } = Modal;



class MHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentTime: new Date().toLocaleString(),
          dayPictureUrl: '', //当前天气的图片
          weather: '' //当前天气
        }
      }

      logout = () => {
        confirm({
          title: '你要退出登陆吗?',
         
          onOk:() =>{
            storageUtils.removeUser();
            memoryUtils.user = {};
            this.props.history.replace('/home')
          },
          onCancel() {
            console.log('Cancel')
          },
        });
      }
      componentDidMount(){
        this.timer =  setInterval(()=>{
              this.setState({
                  currentTime: new Date().toLocaleString()
              })
          },1000)
      }
      componentWillUnmount() {
        clearInterval(this.timer);
      }
    render() {
        const user = memoryUtils.user;
        // console.log(user)
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <div className='header'>
                    <h2 className='header-title'>首页</h2> 
                    <div className='header-user'>
                        <div className='currentTime'>{this.state.currentTime}</div>
                        <div className='weatherPic'>
                            <img src="" alt="" />
                        </div>
                        <div className='userINfo'>
                            欢迎{user.username}
                            <Button onClick={this.logout}>退出</Button>
                        </div>
                    </div>
                </div>

            </Header>
        )
    }
}
export default withRouter(MHeader)
