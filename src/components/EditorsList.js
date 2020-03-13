import React from "react";
import BackEnd from "../api/BackEnd";
import Contract from "./Contract";

class EditorsList extends React.Component {
  state = { contracts: [] };

  onPageLoad = async () => {
    const response = await BackEnd.get("/models");
    //console.log(response.data);
    this.setState({ contracts: JSON.parse(response.data) });
  };

  componentDidMount() {
    this.onPageLoad();
  }

  renderContracts() {
    const contracts = this.state.contracts.map(contract => {
      return <Contract key={contract.id} contract={contract} />;
    });
    return contracts;
  }
  render() {
    if (!this.state.contracts.length) {
      return <div>Fetching contracts ...</div>;
    } else {
      return (
        <div className="ui relaxed divided list">{this.renderContracts()}</div>
      );
    }
  }
}

export default EditorsList;
