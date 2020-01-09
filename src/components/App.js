import React from "react";
import Quill from "./Quill";

class App extends React.Component {
  render() {
    return (
      <div className="container ui">
        <h1>Quill Editor</h1>
        <Quill />
      </div>
    );
  }
}

export default App;
