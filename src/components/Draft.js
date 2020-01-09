import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.getHTML = this.getHTML.bind(this);
  }
  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  getHTML() {
    console.log(
      "Draft : " +
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Begin typing..."
        />
        <button className="ui primary button" onClick={this.getHTML}>
          Get HTML
        </button>
      </div>
    );
  }
}

export default Draft;
