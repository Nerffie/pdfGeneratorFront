import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BackEnd from "../api/BackEnd";
//import { Link } from "react-router-dom";
class Quill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {},
      id: null,
      oldEditorContent: {},
      savedInDb: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
  }

  defaultContent = {
    ops: [
      {
        insert: "This is a "
      },
      {
        attributes: {
          underline: true
        },
        insert: "default "
      },
      {
        attributes: {
          bold: true
        },
        insert: "state"
      },
      {
        insert: "\nYou can write "
      },
      {
        attributes: {
          bold: true
        },
        insert: "anything "
      },
      {
        insert: "with "
      },
      {
        attributes: {
          strike: true
        },
        insert: "different "
      },
      {
        insert: "styling and "
      },
      {
        attributes: {
          italic: true
        },
        insert: "all"
      },
      {
        insert: "."
      },
      {
        attributes: {
          header: 1
        },
        insert: "\n"
      },
      {
        insert: "\nTry it for yourself !"
      },
      {
        attributes: {
          align: "center"
        },
        insert: "\n"
      }
    ]
  };

  componentWillMount() {
    if (typeof this.props.location.state != "undefined") {
      const parsedOldEditorContent = JSON.parse(
        this.props.location.state.oldEditorContent
      );
      this.setState({
        id: this.props.match.params.id,
        oldEditorContent: parsedOldEditorContent,
        content: parsedOldEditorContent
      });
    } else {
      this.setState({
        oldEditorContent: this.defaultContent,
        content: this.defaultContent
      });
    }
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      [{ align: [] }],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align"
  ];

  handleChange(value, delta, source, editor) {
    this.setState({ content: editor.getContents() });
  }

  saveToDB = async () => {
    const ops = this.state.content.ops;
    this.setState({ savedInDb: true });
    if (typeof this.props.location.state != "undefined") {
      await BackEnd.put(`/editor/id/${this.props.match.params.id}`, { ops });
    } else {
      // I send an array of objects
      await BackEnd.post("/editor", { ops });
    }
    this.props.history.push("/");
  };

  render() {
    if (!this.state.savedInDb) {
      return (
        <div>
          <h1>Editeur de modèle</h1>
          <ReactQuill
            theme="snow"
            defaultValue={this.state.oldEditorContent}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
          />

          <button className="ui primary button" onClick={this.saveToDB}>
            Sauvegarder
          </button>
        </div>
      );
    } else {
      return (
        <div className="segment">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Sauvegarde du modèle...</div>
          </div>
        </div>
      );
    }
  }
}

export default Quill;
