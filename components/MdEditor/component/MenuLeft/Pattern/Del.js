import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {del} from "../../../utils/editorKeyEvents";
import {hotKeys} from "../../../utils/hotkey";



@inject("content")
@observer
class Del extends Component {
  handleClick = () => {
    const {markdownEditor} = this.props.content;
    const selection = markdownEditor.getSelection();
    del(markdownEditor, selection);

    // 上传后实时更新内容
    const content = markdownEditor.getValue();
    this.props.content.setContent(content);
    markdownEditor.focus();
  };

  render() {
    return (
      <div id="nice-menu-del" className="nice-menu-item" onClick={this.handleClick}>
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">删除线</span>
        </span>
        <span className="nice-menu-shortcut">{hotKeys.del}</span>
      </div>
    );
  }
}

export default Del;