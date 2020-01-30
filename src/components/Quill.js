import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Quill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", delta: {}, source: {}, editor: {}, content: {} };
    this.handleChange = this.handleChange.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
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

  /*componentDidMount() {
    this.setState({ content: this.defaultContent });
    // this.setState({ editor: Editor.setContents(this.state.content) });
  }*/
  handleChange(value, delta, source, editor) {
    this.setState({ text: value });
    this.setState({ delta: delta });
    this.setState({ editor: editor });
    this.setState({ content: editor.getContents() });
    //onChange(content, delta, source, editor)
    //console.log(this.state.content);
    //editor.setContents(this.defaultContent);
    console.log(this.state.content);
  }

  saveToDB() {
    console.log(this.state.content);

    //onChange(content, delta, source, editor)
  }

  /*downloadHtmlFile = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.text], {
      type: "html"
    });
    element.href = URL.createObjectURL(file);
    element.download = "QuillEditorText.html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };*/

  render() {
    return (
      <div>
        <h1>Quill Editor</h1>
        <ReactQuill
          theme="snow"
          defaultValue={this.defaultContent}
          //value={this.state.content}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
        <button className="ui primary button" onClick={this.saveToDB}>
          Sauvegarder
        </button>
      </div>
    );
  }
}

export default Quill;
