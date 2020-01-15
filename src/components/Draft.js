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
  }
  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  downloadHtmlFile = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))],
      {
        type: "html"
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = "DraftEditorText.html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

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
        <button className="ui primary button" onClick={this.downloadHtmlFile}>
          Get HTML
        </button>
      </div>
    );
  }
}

export default Draft;
