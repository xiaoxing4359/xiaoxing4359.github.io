import React from 'react'

import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      
    ],
  };
  componentWillReceiveProps(nextProps){
    const imgs = this.props.imgs;
    // console.log(imgs)
    if(imgs && imgs.length > 0){
        const fileList =  imgs.map((imgName,i) => ({
          uid:-i,
          name:imgName,
          status:'done',
          url:'http://localhost:5000/upload/' + imgName
        }))
        this.setState({fileList});
    }

  }
 

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
   
  getImgs = () => this.state.fileList.map(file=>file.name) ;

  handleChange = ({ file,fileList }) => {
    if (file.status === 'done') {
        // 将数组最后一个file保存到file变量
        file = fileList[fileList.length - 1];
        // 取出响应数据中的图片url和文件名
        const { name, url } = file.response.data;
        // 保存到上传的file对象
        file.name = name;
        file.url = url;
      }
  
      this.setState({ fileList })
    
  }
// handleChange = ({ fileList }) => this.setState({ fileList });
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;