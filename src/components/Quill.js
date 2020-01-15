import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Quill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(value) {
    this.setState({ text: value });
  }

  downloadHtmlFile = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.text], {
      type: "html"
    });
    element.href = URL.createObjectURL(file);
    element.download = "QuillEditorText.html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
        <button className="ui primary button" onClick={this.downloadHtmlFile}>
          Get HTML
        </button>
      </div>
    );
  }
}

export default Quill;
