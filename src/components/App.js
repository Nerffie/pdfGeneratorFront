import React from "react";
import Quill from "./Quill";
import Draft from "./Draft";

class App extends React.Component {
  render() {
    return (
      <div className="container ui">
        <h1>Quill Editor</h1>
        <Quill />
        <h1>Draft Editor</h1>
        <Draft />
      </div>
    );
  }
}

export default App;
