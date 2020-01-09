import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Quill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.getHTML = this.getHTML.bind(this);
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
    "image"
  ];

  handleChange(value) {
    this.setState({ text: value });
  }

  getHTML() {
    console.log("Quill : " + this.state.text);
  }

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
        <button className="ui primary button" onClick={this.getHTML}>
          Get HTML
        </button>
      </div>
    );
  }
}

export default Quill;
