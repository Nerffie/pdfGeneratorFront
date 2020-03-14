import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Quill from "./Quill";
import Header from "./Header";
import EditorsList from "./EditorsList";
import Form from "./Form";

class App extends React.Component {
  render() {
    return (
      <div className="container ui">
        <BrowserRouter>
          <Header />

          <Route path="/" exact>
            <EditorsList />
          </Route>
          <Route path="/editor/new" component={Quill}></Route>
          <Route path="/editor/id/:id" component={Quill}></Route>
          <Route path="/form" component={Form}></Route>
          <Route path="/editor/form" exact></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
