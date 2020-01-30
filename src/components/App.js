import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Quill from "./Quill";
import Header from "./Header";
import EditorsList from "./EditorsList";

class App extends React.Component {
  render() {
    return (
      <div className="container ui">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact>
              <EditorsList />
            </Route>
            <Route path="/editor" exact>
              <Quill />
            </Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
