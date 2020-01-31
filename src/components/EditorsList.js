import React from "react";
import BackEnd from "../api/BackEnd";

class EditorsList extends React.Component {
  state = { contrats: [] };

  onPageLoad = async () => {
    const response = await BackEnd.get("/json");

    console.log(response);
  };

  componentDidMount() {
    this.onPageLoad();
  }

  render() {
    return <div>Fetching contracts ...</div>;
  }
}

export default EditorsList;
