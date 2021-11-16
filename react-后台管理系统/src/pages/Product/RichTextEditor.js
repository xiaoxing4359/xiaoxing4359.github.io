import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import uploadImageCallBack from '../../utils/uploadImageCallBack';
export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // 获取网页中的标签内容，生成一个editorState并更新
    const detail = nextProps.detail;
    if (detail) {
      const contentBlock = htmlToDraft(detail);
      // trim is not a function
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        // 更新状态
        this.setState({
          editorState
        })
      }
    }

  }
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{ height: 200, border: '1px solid black', paddingLeft: 10 }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: uploadImageCallBack, alt: { present: true }, previewImage: true },
            fontFamily: {
              options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Roboto', 'Times New Roman', 'Verdana'],
            }
          }}
        />
      </div>
    )
  }
}
