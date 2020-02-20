import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BackEnd from "../api/BackEnd";
import { Link } from "react-router-dom";
class Quill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {},
      id: null,
      oldEditorContent: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.match != "undefined") {
      this.setState({
        id: this.props.match.params.id,
        oldEditorContent: this.props.location.state.oldEditorContent
      });
    }else{
      this.setState({oldEditorContent:this.defaultContent});
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

  handleChange(value, delta, source, editor) {
    this.setState({ content: editor.getContents() });
  }

  saveToDB = async () => {
    const ops = this.state.content.ops;
    console.log(ops);
    if (typeof this.props.match != "undefined") {
      const response = await BackEnd.put(
        `/editor/id/${this.props.match.params.id}`,
        { ops }
      );
      console.log(response.statusText);
    } else {
      const response = await BackEnd.post("/editor", { ops });
      console.log(response.statusText);
    }
  };

  render() {
    return (
      <div>
        <h1>Quill Editor</h1>
        <ReactQuill
          theme="snow"
          defaultValue={this.state.oldEditorContent}
          //value={this.state.content}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
        <Link to={{ pathname: "/" }}>
          <button className="ui primary button" onClick={this.saveToDB}>
            Sauvegarder
          </button>
        </Link>
      </div>
    );
  }
}

export default Quill;
